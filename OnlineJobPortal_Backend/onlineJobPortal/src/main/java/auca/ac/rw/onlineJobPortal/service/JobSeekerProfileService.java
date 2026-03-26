package auca.ac.rw.onlineJobPortal.service;

import auca.ac.rw.onlineJobPortal.model.JobSeekerProfile;
import auca.ac.rw.onlineJobPortal.repository.JobSeekerProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class JobSeekerProfileService {

    private final JobSeekerProfileRepository jobSeekerProfileRepository;

    @Autowired
    public JobSeekerProfileService(JobSeekerProfileRepository jobSeekerProfileRepository) {
        this.jobSeekerProfileRepository = jobSeekerProfileRepository;
    }

    public JobSeekerProfile saveOrUpdateProfile(JobSeekerProfile profile) {
        return jobSeekerProfileRepository.save(profile);
    }

    // public Optional<JobSeekerProfile> getProfileByUserId(Long userId) {
    //     return jobSeekerProfileRepository.findByUserId(userId);
    // }

    public Optional<JobSeekerProfile> getProfileByPersonId(UUID userId) {
        return jobSeekerProfileRepository.findByUser_PersonId(userId);
    }

    public JobSeekerProfile saveProfile(JobSeekerProfile profile) { // Add this method
        return jobSeekerProfileRepository.save(profile);
    }
}
