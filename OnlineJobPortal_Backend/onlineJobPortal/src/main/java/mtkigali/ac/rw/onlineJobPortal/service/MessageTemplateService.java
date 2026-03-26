package mtkigali.ac.rw.onlineJobPortal.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mtkigali.ac.rw.onlineJobPortal.model.ApplicationStatus;
import mtkigali.ac.rw.onlineJobPortal.model.MessageTemplate;
import mtkigali.ac.rw.onlineJobPortal.model.User;
import mtkigali.ac.rw.onlineJobPortal.repository.MessageTemplateRepository;

@Service
public class MessageTemplateService {

    @Autowired
    private MessageTemplateRepository messageTemplateRepository;

    public Optional<MessageTemplate> getTemplateFor(User recruiter, ApplicationStatus status) {
        return messageTemplateRepository.findByRecruiterAndStatusType(recruiter, status);
    }

    public MessageTemplate upsertTemplate(User recruiter, ApplicationStatus status, String subject, String content) {
        Optional<MessageTemplate> existing = messageTemplateRepository.findByRecruiterAndStatusType(recruiter, status);
        MessageTemplate template = existing.orElseGet(() -> new MessageTemplate(null, recruiter, status, subject, content));
        template.setSubject(subject);
        template.setContent(content);
        template.setUpdatedAt(new Date());
        return messageTemplateRepository.save(template);
    }
}


