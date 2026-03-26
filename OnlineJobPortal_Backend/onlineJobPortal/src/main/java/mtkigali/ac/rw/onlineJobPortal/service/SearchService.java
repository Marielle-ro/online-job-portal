package mtkigali.ac.rw.onlineJobPortal.service;

import mtkigali.ac.rw.onlineJobPortal.model.Job;
import mtkigali.ac.rw.onlineJobPortal.model.User;
import mtkigali.ac.rw.onlineJobPortal.repository.JobRepository;
import mtkigali.ac.rw.onlineJobPortal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Autowired
    public SearchService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public Page<Object> globalSearch(String keyword, Pageable pageable) {
        // Combine results from multiple repositories
        List<Object> results = new ArrayList<>();

        Page<Job> jobResults = jobRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword, pageable);
        results.addAll(jobResults.getContent());

        Page<User> userResults = userRepository.findByUsernameContainingIgnoreCase(keyword, pageable);
        results.addAll(userResults.getContent());

        return new PageImpl<>(results, pageable, results.size());
    }
}
