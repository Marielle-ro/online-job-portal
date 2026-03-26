package mtkigali.ac.rw.onlineJobPortal.service;

import mtkigali.ac.rw.onlineJobPortal.model.Job;
import mtkigali.ac.rw.onlineJobPortal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getJobsByCategory(UUID categoryId) {
        return jobRepository.findByCategory_CategoryId(categoryId);
    }

    public List<Job> searchJobs(String keyword) {
        return jobRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getJobsByRecruiter(UUID personId) {
        return jobRepository.findByRecruiter_personId(personId);
    }

    public Optional<Job> findById(UUID id) {
        return jobRepository.findById(id); // Use the repository to find the user by UUID
    }

    
    
}
