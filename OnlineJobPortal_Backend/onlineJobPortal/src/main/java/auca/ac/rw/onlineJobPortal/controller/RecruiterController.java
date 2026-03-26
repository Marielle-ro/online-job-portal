package auca.ac.rw.onlineJobPortal.controller;

import auca.ac.rw.onlineJobPortal.model.ApplicationDetailsDTO;
import auca.ac.rw.onlineJobPortal.model.ApplicationStatus;
import auca.ac.rw.onlineJobPortal.model.Category;
import auca.ac.rw.onlineJobPortal.model.EmploymentType;
import auca.ac.rw.onlineJobPortal.model.Job;
import auca.ac.rw.onlineJobPortal.model.JobDTO;
import auca.ac.rw.onlineJobPortal.model.LocationEnum;
import auca.ac.rw.onlineJobPortal.model.RecruiterProfile;
import auca.ac.rw.onlineJobPortal.model.User;
import auca.ac.rw.onlineJobPortal.repository.ApplicationRepository;
import auca.ac.rw.onlineJobPortal.service.MessageTemplateService;
import auca.ac.rw.onlineJobPortal.service.ApplicationService;
import auca.ac.rw.onlineJobPortal.service.CategoryService;
import auca.ac.rw.onlineJobPortal.service.JobService;
import auca.ac.rw.onlineJobPortal.service.RecruiterProfileService;
import auca.ac.rw.onlineJobPortal.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/recruiter")
public class RecruiterController {

    @Autowired
    private JobService jobService;

    @Autowired
    private ApplicationRepository applicationRepository;

      @Autowired
    private RecruiterProfileService recruiterProfileService;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    

    @Autowired
    private MessageTemplateService messageTemplateService;

    @Autowired
    private ApplicationService applicationService;


    @PostMapping("/recruiter_profile")
    public ResponseEntity<String> saveRecruiterProfile(@RequestBody Map<String, Object> profileData) {
        try {
            String userIdString = (String) profileData.get("userId");
            if (userIdString == null || userIdString.isEmpty()) {
                return ResponseEntity.badRequest().body("User ID is required");
            }
            
            UUID userId = UUID.fromString(userIdString);
            Optional<User> userOptional = userService.findById(userId);
            
            if (!userOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            User user = userOptional.get();
            
            // Check if profile already exists
            RecruiterProfile existingProfile = user.getRecruiterProfile();
            RecruiterProfile profile;
            
            if (existingProfile != null) {
                // Update existing profile
                profile = existingProfile;
            } else {
                // Create new profile
                profile = new RecruiterProfile();
                profile.setId(UUID.randomUUID());
                profile.setUser(user);
            }
            
            // Update profile fields
            if (profileData.get("companyName") != null) {
                profile.setCompanyName((String) profileData.get("companyName"));
            }
            if (profileData.get("companyDescription") != null) {
                profile.setCompanyDescription((String) profileData.get("companyDescription"));
            }
            if (profileData.get("website") != null) {
                profile.setWebsite((String) profileData.get("website"));
            }
            if (profileData.get("industry") != null) {
                profile.setIndustry((String) profileData.get("industry"));
            }
            if (profileData.get("companySize") != null) {
                profile.setCompanySize((String) profileData.get("companySize"));
            }
            if (profileData.get("foundedYear") != null) {
                profile.setFoundedYear((String) profileData.get("foundedYear"));
            }
            if (profileData.get("headquarters") != null) {
                profile.setHeadquarters((String) profileData.get("headquarters"));
            }
            if (profileData.get("contactEmail") != null) {
                profile.setContactEmail((String) profileData.get("contactEmail"));
            }
            if (profileData.get("contactPhone") != null) {
                profile.setContactPhone((String) profileData.get("contactPhone"));
            }
            if (profileData.get("linkedinUrl") != null) {
                profile.setLinkedinUrl((String) profileData.get("linkedinUrl"));
            }
            if (profileData.get("twitterUrl") != null) {
                profile.setTwitterUrl((String) profileData.get("twitterUrl"));
            }
            if (profileData.get("facebookUrl") != null) {
                profile.setFacebookUrl((String) profileData.get("facebookUrl"));
            }
            if (profileData.get("mission") != null) {
                profile.setMission((String) profileData.get("mission"));
            }
            if (profileData.get("values") != null) {
                profile.setValues((String) profileData.get("values"));
            }
            if (profileData.get("benefits") != null) {
                profile.setBenefits((String) profileData.get("benefits"));
            }
            if (profileData.get("culture") != null) {
                profile.setCulture((String) profileData.get("culture"));
            }
            
            recruiterProfileService.saveProfile(profile);
            return ResponseEntity.ok("Recruiter profile saved successfully!");
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid user ID format");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving profile: " + e.getMessage());
        }
    }


    @GetMapping("/recruiter_profile/me")
    public ResponseEntity<?> getLoggedInUserProfile(@RequestParam String userId) {
        try {
            UUID uuid = UUID.fromString(userId);
            Optional<User> userOptional = userService.findById(uuid);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                RecruiterProfile profile = user.getRecruiterProfile();
                
                Map<String, Object> response = new HashMap<>();
                response.put("firstName", user.getFirstName());
                response.put("lastName", user.getLastName());
                response.put("username", user.getUsername());
                response.put("phoneNumber", user.getPhoneNumber());
                
                if (profile != null) {
                    response.put("companyName", profile.getCompanyName());
                    response.put("companyDescription", profile.getCompanyDescription());
                    response.put("website", profile.getWebsite());
                    response.put("industry", profile.getIndustry());
                    response.put("companySize", profile.getCompanySize());
                    response.put("foundedYear", profile.getFoundedYear());
                    response.put("headquarters", profile.getHeadquarters());
                    response.put("contactEmail", profile.getContactEmail());
                    response.put("contactPhone", profile.getContactPhone());
                    response.put("linkedinUrl", profile.getLinkedinUrl());
                    response.put("twitterUrl", profile.getTwitterUrl());
                    response.put("facebookUrl", profile.getFacebookUrl());
                    response.put("mission", profile.getMission());
                    response.put("values", profile.getValues());
                    response.put("benefits", profile.getBenefits());
                    response.put("culture", profile.getCulture());
                }
                
                return ResponseEntity.ok(response);
            }
            
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid user ID format");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching profile: " + e.getMessage());
        }
    }

    
//Save Job that works!!
    // @PostMapping("/jobs")
    // public ResponseEntity<String> postJob(@RequestBody Job job) {
    //     System.out.println("Received job: " + job);
    //     jobService.saveJob(job);
    //     return ResponseEntity.ok("Job posted successfully");
    // }

    //otherrr
//     @PostMapping("/jobs")
// public ResponseEntity<String> postJob(@RequestBody Map<String, Object> jobData) {
//     try {
//         // Extract recruiterId (UUID as String) from jobData
//         String recruiterIdString = (String) jobData.get("recruiter");
//         if (recruiterIdString == null || recruiterIdString.isEmpty()) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Recruiter ID is missing.");
//         }

//         // Convert recruiterIdString to UUID
//         UUID recruiterId;
//         try {
//             recruiterId = UUID.fromString(recruiterIdString);
//         } catch (IllegalArgumentException e) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Recruiter ID format.");
//         }

//         // Find the recruiter in the database
//         Optional<User> recruiterOptional = userService.findById(recruiterId);
//         if (!recruiterOptional.isPresent()) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recruiter not found.");
//         }

//         User recruiter = recruiterOptional.get();

//         // Create a new Job object
//         Job job = new Job();
//         job.setTitle((String) jobData.get("title"));
//         job.setEmploymentType(EmploymentType.valueOf((String) jobData.get("employmentType")));
//         job.setLocation(LocationEnum.valueOf((String) jobData.get("location")));
//         job.setDescription((String) jobData.get("description"));
//         job.setRequirements((String) jobData.get("requirements"));
//         // job.setMinSalary((Double) jobData.get("minSalary"));
//         // job.setMaxSalary((Double) jobData.get("maxSalary"));
//         job.setPostedDate(new Date()); // Set current date
//         job.setApplicationDeadline(new Date((Long) jobData.get("applicationDeadline")));
//         job.setRecruiter(recruiter);

//         // Save the job
//         jobService.saveJob(job);

//         return ResponseEntity.ok("Job posted successfully.");
//     } catch (Exception e) {
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body("An error occurred while saving the job: " + e.getMessage());
//     }
// }


@PostMapping("/jobs")
public ResponseEntity<String> postJob(@RequestBody Map<String, Object> jobData) {
    try {
        // Logging incoming data
        System.out.println("Received job data: " + jobData);

        // Extract recruiterId and validate
        String recruiterIdString = (String) jobData.get("recruiter");
        if (recruiterIdString == null || recruiterIdString.isEmpty()) {
            System.out.println("Recruiter ID is missing.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Recruiter ID is missing.");
        }

        String categoryId = (String) jobData.get("categoryId");
        Category category = categoryService.findById(UUID.fromString(categoryId))
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID."));

        // Convert recruiterIdString to UUID
        UUID recruiterId;
        try {
            recruiterId = UUID.fromString(recruiterIdString);
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid Recruiter ID format: " + recruiterIdString);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Recruiter ID format.");
        }

        // Find the recruiter
        Optional<User> recruiterOptional = userService.findById(recruiterId);
        if (!recruiterOptional.isPresent()) {
            System.out.println("Recruiter not found: " + recruiterId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recruiter not found.");
        }

        User recruiter = recruiterOptional.get();

        // Create Job
        Job job = new Job();
        job.setTitle((String) jobData.get("title"));
        job.setEmploymentType(EmploymentType.valueOf((String) jobData.get("employmentType")));
        job.setLocation(LocationEnum.valueOf((String) jobData.get("location")));
        job.setDescription((String) jobData.get("description"));
        job.setRequirements((String) jobData.get("requirements"));
//        job.setMinSalary((Double) jobData.get("minSalary"));
//        job.setMaxSalary((Double) jobData.get("maxSalary"));
        Object minSalaryObj = jobData.get("minSalary");
        Object maxSalaryObj = jobData.get("maxSalary");

        double minSalary = minSalaryObj instanceof Number
                ? ((Number) minSalaryObj).doubleValue()
                : Double.parseDouble(minSalaryObj.toString());

        double maxSalary = maxSalaryObj instanceof Number
                ? ((Number) maxSalaryObj).doubleValue()
                : Double.parseDouble(maxSalaryObj.toString());

        job.setMinSalary(minSalary);
        job.setMaxSalary(maxSalary);

        job.setPostedDate(new Date()); // Set current date
        job.setApplicationDeadline(new Date((Long) jobData.get("applicationDeadline")));
        job.setRecruiter(recruiter);
        job.setCategory(category);

        System.out.println("Prepared job: " + job);

        // Save Job
        jobService.saveJob(job);
        return ResponseEntity.ok("Job posted successfully.");
    } catch (Exception e) {
        e.printStackTrace(); // Print stack trace for debugging
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while saving the job: " + e.getMessage());
    }
}





    

//     @PostMapping("/jobs")
// public ResponseEntity<String> postJob(
//         @RequestBody Job job,
//         @RequestHeader("Authorization") String authHeader) {

//     if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//         return ResponseEntity.status(401).body("Missing or invalid Authorization header");
//     }

//     // Extract token from Authorization header
//     String token = authHeader.substring(7); // Remove "Bearer " prefix
//     String username = jwtUtil.extractUsername(token); // Extract username from token

//     // Validate the token
//     if (!jwtUtil.isTokenValid(token, username)) {
//         return ResponseEntity.status(401).body("Invalid or expired token");
//     }

//     // Find the user by username
//     Optional<User> user = userService.findByUsername(username);
//     if (user.isEmpty()) {
//         return ResponseEntity.status(404).body("User not found");
//     }

//     // Check user role (if specific role authorization is needed)
//     String role = user.get().getRole().toString(); // Assuming role is a field in User

//     // If role-specific access is required
//     if (!role.equals("jobrecruiter")) { // Example: only job recruiters can post jobs
//         return ResponseEntity.status(403).body("Access denied: insufficient permissions");
//     }

//     // Save the job
//     jobService.saveJob(job);
//     return ResponseEntity.ok("Job posted successfully");
// }

// @PostMapping("/jobs")
// public ResponseEntity<String> postJob(
//         @RequestBody Job job,
//         @RequestHeader("Authorization") String authHeader) {

//     if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//         return ResponseEntity.status(401).body("Missing or invalid Authorization header");
//     }

//     // Extract token from Authorization header
//     String token = authHeader.substring(7); // Remove "Bearer " prefix
//     String username = jwtUtil.extractUsername(token); // Extract username from token

//     //Validate the token
//     if (!jwtUtil.isTokenValid(token, username)) {
//         return ResponseEntity.status(401).body("Invalid or expired token");
//     }

//     // Find the user by username
//     Optional<User> user = userService.findByUsername(username);
//     if (user.isEmpty()) {
//         return ResponseEntity.status(404).body("User not found");
//     }

//     // Check user role (if specific role authorization is needed)
//     String role = user.get().getRole().toString(); // Assuming role is a field in User

//     // If role-specific access is required
//     if (!role.equals("jobrecruiter")) { // Example: only job recruiters can post jobs
//         return ResponseEntity.status(403).body("Access denied: insufficient permissions");
//     }

//     // Save the job
//     jobService.saveJob(job);
//     return ResponseEntity.ok("Job posted successfully");
// }

    

    // @GetMapping("/applications/{jobId}")
    // public ResponseEntity<List<Application>> viewApplications(@PathVariable UUID jobId) {
    //     return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
    // }

    // @PutMapping("/applications/{applicationId}/update")
    // public ResponseEntity<String> updateApplicationStatus(@PathVariable UUID applicationId, @RequestParam String status) {
    //     // Logic to update application status here
    //     return ResponseEntity.ok("Application status updated");
    // }

//     @GetMapping("/getjobs")
// public ResponseEntity<?> getJobsByRecruiter(@RequestParam UUID recruiterId) {
//     // Validate recruiter existence
//     Optional<User> recruiter = userService.findById(recruiterId);
//     if (recruiter.isEmpty()) {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recruiter not found");
//     }

//     // Fetch jobs by recruiter
//     List<Job> jobs = jobService.getJobsByRecruiter(recruiterId);

//     // Return the list of jobs
//     return ResponseEntity.ok(jobs);
// }

// @GetMapping("/getjobs")
// public ResponseEntity<List<JobDTO>> getJobsByRecruiter(@RequestParam UUID recruiterId) {
//     List<Job> jobs = jobService.getJobsByRecruiter(recruiterId);
//     System.out.println("Fetched jobs: " + jobs);
//     List<JobDTO> jobDTOs = jobs.stream()
//         .map(job -> new JobDTO(job.getJobId(), job.getTitle(), job.getDescription(), job.getLocation(), job.getEmploymentType()
//         ,job.getPostedDate(),job.getApplicationDeadline(),job.getRequirements()))
//         .collect(Collectors.toList());
//     return ResponseEntity.ok(jobDTOs);
// }

@GetMapping("/getjobs")
public ResponseEntity<List<JobDTO>> getJobsByRecruiter(@RequestParam UUID recruiterId) {
    List<Job> jobs = jobService.getJobsByRecruiter(recruiterId);

    // Log to confirm job data from service
    System.out.println("Fetched jobs from service: " + jobs);

    List<JobDTO> jobDTOs = jobs.stream()
        .map(job -> new JobDTO(
            job.getJobId(), 
            job.getTitle(), 
            job.getDescription(), 
            job.getLocation(),
            job.getEmploymentType(), 
            job.getPostedDate(), 
            job.getApplicationDeadline(), 
            job.getRequirements(),
            job.getMinSalary(), 
            job.getMaxSalary())) // Ensure minSalary and maxSalary are included
        .collect(Collectors.toList());

    // Log to confirm jobDTO data
    System.out.println("Mapped JobDTOs: " + jobDTOs);

    return ResponseEntity.ok(jobDTOs);
}


 @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDetailsDTO>> getApplications(@RequestParam UUID recruiterId) {
        try {
            System.out.println("Fetching applications for recruiterId: " + recruiterId);
            
            // Build DTOs via repository projection method if available, otherwise map manually
            List<ApplicationDetailsDTO> applications = applicationRepository.findApplicationsByRecruiterId(recruiterId);
            
            System.out.println("Found " + applications.size() + " applications");
            
            if (applications.isEmpty()) {
                System.out.println("No applications found for recruiter: " + recruiterId);
            }
            
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            System.err.println("Error fetching applications: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PatchMapping("/{applicationId}/status")
    public ResponseEntity<String> updateApplicationStatus(
            @PathVariable UUID applicationId,
            @RequestBody Map<String, String> request) {

        String newStatus = request.get("status");
        if (newStatus == null || newStatus.isEmpty()) {
            return ResponseEntity.badRequest().body("Status is required");
        }

        try {
            applicationService.updateApplicationStatus(applicationId, ApplicationStatus.valueOf(newStatus));
            return ResponseEntity.ok("Application status updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating application status");
        }
    }

    @PostMapping("/message-templates")
    public ResponseEntity<?> upsertMessageTemplate(@RequestBody Map<String, String> request) {
        try {
            String recruiterIdStr = request.get("recruiterId");
            String statusStr = request.get("status");
            String subject = request.get("subject");
            String content = request.get("content");

            if (recruiterIdStr == null || statusStr == null || subject == null || content == null) {
                return ResponseEntity.badRequest().body("Missing fields");
            }

            UUID recruiterId = UUID.fromString(recruiterIdStr);
            Optional<User> recruiterOpt = userService.findById(recruiterId);
            if (recruiterOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recruiter not found");
            }

            ApplicationStatus status = ApplicationStatus.valueOf(statusStr);
            return ResponseEntity.ok(messageTemplateService.upsertTemplate(recruiterOpt.get(), status, subject, content));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving template");
        }
    }

    @GetMapping("/message-templates")
    public ResponseEntity<?> getMessageTemplate(@RequestParam UUID recruiterId, @RequestParam String status) {
        Optional<User> recruiterOpt = userService.findById(recruiterId);
        if (recruiterOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recruiter not found");
        }
        ApplicationStatus st;
        try {
            st = ApplicationStatus.valueOf(status);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value");
        }
        return messageTemplateService.getTemplateFor(recruiterOpt.get(), st)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok().build());
    }


}


