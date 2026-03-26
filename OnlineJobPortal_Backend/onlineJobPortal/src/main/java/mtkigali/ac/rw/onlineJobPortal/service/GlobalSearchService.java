package mtkigali.ac.rw.onlineJobPortal.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Arrays;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mtkigali.ac.rw.onlineJobPortal.model.EmploymentType;
import mtkigali.ac.rw.onlineJobPortal.model.Job;
import mtkigali.ac.rw.onlineJobPortal.model.JobDTO;
import mtkigali.ac.rw.onlineJobPortal.model.LocationEnum;
import mtkigali.ac.rw.onlineJobPortal.model.RecruiterProfile;
import mtkigali.ac.rw.onlineJobPortal.repository.JobRepository;
import mtkigali.ac.rw.onlineJobPortal.repository.RecruiterProfileRepository;

// @Service
// public class GlobalSearchService {
//     @Autowired
//     private JobRepository jobRepository;
    
//     @Autowired
//     private RecruiterProfileRepository recruiterRepository;

//     @Autowired
//     private JobRepository jobRepository;
    
//     @Autowired
//     private RecruiterProfileRepository recruiterRepository;

//     @Service
//     public class GlobalSearchService {


//     public Map<String, Object> globalSearch(String searchTerm) {
//         Map<String, Object> results = new HashMap<>();
        
//         // Search in jobs
//         List<JobDTO> jobs = jobRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrRequirementsContainingIgnoreCase(
//             searchTerm, searchTerm, searchTerm
//         ).stream()
//         .map(job -> new JobDTO(
//             job.getJobId(),
//             job.getTitle(),
//             job.getDescription(),
//             job.getLocation(),
//             job.getEmploymentType(),
//             job.getPostedDate(),
//             job.getApplicationDeadline(),
//             job.getRequirements(),
//             job.getMinSalary(),
//             job.getMaxSalary()
//         ))
//         .collect(Collectors.toList());
        
//         // Search in recruiters
//         List<RecruiterProfile> recruiters = recruiterRepository
//             .findByCompanyNameContainingIgnoreCaseOrCompanyDescriptionContainingIgnoreCase(
//                 searchTerm, searchTerm
//             );
        
//         results.put("jobs", jobs);
//         results.put("recruiters", recruiters);
        
//         return results;
//     }
// }


    
//         // Search in recruiters
//         List<RecruiterProfile> recruiters = recruiterRepository
//             .findByCompanyNameContainingIgnoreCaseOrCompanyDescriptionContainingIgnoreCase(
//                 searchTerm, searchTerm
//             );
        
//         results.put("jobs", jobs);
//         results.put("recruiters", recruiters);
        
//         return results;
//     }

@Service
public class GlobalSearchService {
    private static final Logger logger = LoggerFactory.getLogger(GlobalSearchService.class);

    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private RecruiterProfileRepository recruiterRepository;

    public Map<String, Object> globalSearch(String searchTerm) {
        Map<String, Object> results = new HashMap<>();
        
        // Regular text search for jobs
        List<JobDTO> textMatchedJobs = jobRepository
            .findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrRequirementsContainingIgnoreCase(
                searchTerm, searchTerm, searchTerm
            )
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());

        // Handle enum matching for partial searches
        List<JobDTO> enumMatchedJobs = Arrays.stream(LocationEnum.values())
            .filter(location -> location.name().toLowerCase().contains(searchTerm.toLowerCase()))
            .flatMap(location -> jobRepository.findByLocation(location).stream())
            .map(this::convertToDTO)
            .collect(Collectors.toList());

        // Add employment type matching
        enumMatchedJobs.addAll(
            Arrays.stream(EmploymentType.values())
                .filter(type -> type.name().toLowerCase().contains(searchTerm.toLowerCase()))
                .flatMap(type -> jobRepository.findByEmploymentType(type).stream())
                .map(this::convertToDTO)
                .collect(Collectors.toList())
        );

        // Combine all job results
        textMatchedJobs.addAll(enumMatchedJobs);

        // Search in recruiters
        List<RecruiterProfile> recruiters = recruiterRepository
            .findByCompanyNameContainingIgnoreCaseOrCompanyDescriptionContainingIgnoreCase(
                searchTerm, searchTerm
            );

        results.put("jobs", textMatchedJobs);
        results.put("recruiters", recruiters);
        
        return results;
    }

    private JobDTO convertToDTO(Job job) {
        return new JobDTO(
            job.getJobId(),
            job.getTitle(),
            job.getDescription(),
            job.getLocation(),
            job.getEmploymentType(),
            job.getPostedDate(),
            job.getApplicationDeadline(),
            job.getRequirements(),
            job.getMinSalary(),
            job.getMaxSalary()
        );
    }
}
