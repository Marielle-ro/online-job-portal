package mtkigali.ac.rw.onlineJobPortal.service;

import mtkigali.ac.rw.onlineJobPortal.model.Application;
import mtkigali.ac.rw.onlineJobPortal.model.ApplicationDetailsDTO;
import mtkigali.ac.rw.onlineJobPortal.model.ApplicationStatus;
import mtkigali.ac.rw.onlineJobPortal.model.User;
import mtkigali.ac.rw.onlineJobPortal.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private MessageTemplateService messageTemplateService;

    @Autowired
    private JavaMailSender mailSender;

    public List<Application> getApplicationsByJob(UUID jobId) {
        return applicationRepository.findByJob_JobId(jobId);
    }

    public List<Application> getApplicationsByJobSeeker(UUID jobSeekerId) {
        return applicationRepository.findByJobSeeker_PersonId(jobSeekerId);
    }

    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    public List<ApplicationDetailsDTO> getApplicationsForRecruiter(UUID recruiterId) {
        return applicationRepository.findApplicationsByRecruiterId(recruiterId);
    }

    @Transactional
    public void updateApplicationStatus(UUID applicationId, ApplicationStatus newStatus) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        application.setStatus(newStatus);
        applicationRepository.save(application);

        try {
            User recruiter = application.getJob().getRecruiter();
            messageTemplateService.getTemplateFor(recruiter, newStatus).ifPresent(template -> {
                String subject = template.getSubject();
                String content = personalizeTemplate(template.getContent(), application);
                sendEmail(application.getJobSeeker().getUsername(), subject, content);
            });
        } catch (Exception ignored) {
            // best-effort
        }
    }

    private String personalizeTemplate(String content, Application application) {
        String candidateName = application.getJobSeeker().getFirstName() + " " + application.getJobSeeker().getLastName();
        String position = application.getJob().getTitle();
        String companyName = "Online Job Portal";
        return content
                .replace("[Candidate Name]", candidateName)
                .replace("[Position]", position)
                .replace("[Company Name]", companyName);
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
