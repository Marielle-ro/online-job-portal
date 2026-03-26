package auca.ac.rw.onlineJobPortal.controller;

import auca.ac.rw.onlineJobPortal.model.Application;
import auca.ac.rw.onlineJobPortal.model.ApplicationStatus;
import auca.ac.rw.onlineJobPortal.model.Job;
import auca.ac.rw.onlineJobPortal.model.JobResponse;
import auca.ac.rw.onlineJobPortal.model.JobSeekerProfile;
import auca.ac.rw.onlineJobPortal.service.JobService;
import auca.ac.rw.onlineJobPortal.service.RecruiterProfileService;
import auca.ac.rw.onlineJobPortal.service.UserService;
import auca.ac.rw.onlineJobPortal.service.JobSeekerProfileService;
import auca.ac.rw.onlineJobPortal.model.User;
import auca.ac.rw.onlineJobPortal.model.UserDTO;
import auca.ac.rw.onlineJobPortal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.HashMap;

@RestController
@RequestMapping("/jobseeker")
public class JobSeekerController {

    @Autowired
    private JobSeekerProfileService profileService;

    @Autowired
    private JobService jobService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;

    // @PostMapping("/profile")
    // public ResponseEntity<String> updateProfile(@RequestBody JobSeekerProfile profile) {
    //     profileService.saveProfile(profile);
    //     return ResponseEntity.ok("Profile updated successfully");
    // }

//     @PostMapping("/profile")
// public ResponseEntity<String> updateProfile(
//         @RequestParam("photo") MultipartFile photo,
//         @RequestParam("resume") MultipartFile resume,
//         @RequestParam("skills") String skills,
//         @RequestParam("userId") UUID userId) {
//     try {
//         // Define directories for storing files
//         String photoDirectory = System.getProperty("user.home") + "/Pictures";
//         String resumeDirectory = System.getProperty("user.home") + "/Documents";

//         // Save photo
//         String photoFilename = UUID.randomUUID() + "_" + photo.getOriginalFilename();
//         File photoFile = new File(photoDirectory, photoFilename);
//         photo.transferTo(photoFile);

//         // Save resume
//         String resumeFilename = UUID.randomUUID() + "_" + resume.getOriginalFilename();
//         File resumeFile = new File(resumeDirectory, resumeFilename);
//         resume.transferTo(resumeFile);

//         // Save the profile details
//         JobSeekerProfile profile = new JobSeekerProfile();
//         profile.setPhoto(photoFile.getAbsolutePath());
//         profile.setResume(resumeFile.getAbsolutePath());
//         profile.setSkills(skills);

//         // Find the user and associate the profile
//         User user = userService.findById(userId)
//                 .orElseThrow(() -> new RuntimeException("User not found"));
//         profile.setUser(user);

//         // Save to the database
//         profileService.saveProfile(profile);

//         return ResponseEntity.ok("Profile updated successfully");
//     } catch (Exception e) {
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body("Failed to update profile: " + e.getMessage());
//     }
// }

@PostMapping("/profile")
public ResponseEntity<String> updateProfile(
        @RequestParam("photo") MultipartFile photo,
        @RequestParam("resume") MultipartFile resume,
        @RequestParam("skills") String skills,
        @RequestParam("userId") UUID userId) {
    try {
        // Define directories for storing files
        String photoDirectory = System.getProperty("user.home") + "/Pictures";
        String resumeDirectory = System.getProperty("user.home") + "/Documents";

        // Ensure the directories exist
        File photoDir = new File(photoDirectory);
        if (!photoDir.exists()) {
            photoDir.mkdirs();
        }
        File resumeDir = new File(resumeDirectory);
        if (!resumeDir.exists()) {
            resumeDir.mkdirs();
        }

        // Save photo
        String photoFilename = UUID.randomUUID() + "_" + photo.getOriginalFilename();
        File photoFile = new File(photoDir, photoFilename);
        photo.transferTo(photoFile);

        // Save resume
        String resumeFilename = UUID.randomUUID() + "_" + resume.getOriginalFilename();
        File resumeFile = new File(resumeDir, resumeFilename);
        resume.transferTo(resumeFile);

        // Save the profile details
        JobSeekerProfile profile = new JobSeekerProfile();
        profile.setPhoto(photoFile.getAbsolutePath());
        profile.setResume(resumeFile.getAbsolutePath());
        profile.setSkills(skills);

        // Find the user and associate the profile
        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        profile.setUser(user);

        // Save to the database
        profileService.saveProfile(profile);

        return ResponseEntity.ok("Profile updated successfully");
    } catch (Exception e) {
        e.printStackTrace();  // Log the exception for debugging
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to update profile: " + e.getMessage());
    }
}



    // @GetMapping("/jobs")
    // public ResponseEntity<List<Job>> getAllJobs(@RequestParam(required = false) UUID categoryId) {
    //     if (categoryId != null) {
    //         return ResponseEntity.ok(jobService.getJobsByCategory(categoryId));
    //     }
    //     return ResponseEntity.ok(jobService.searchJobs(""));
    // }

    @GetMapping("/jobs")
public ResponseEntity<List<JobResponse>> getAllJobs(@RequestParam(required = false) UUID categoryId) {
    List<Job> jobs = categoryId != null ? jobService.getJobsByCategory(categoryId) : jobService.searchJobs("");
    List<JobResponse> jobResponses = jobs.stream().map(job -> new JobResponse(job)).collect(Collectors.toList());
    return ResponseEntity.ok(jobResponses);
}

    @GetMapping("/jobs/search")
    public ResponseEntity<List<Job>> searchJobs(@RequestParam String keyword) {
        return ResponseEntity.ok(jobService.searchJobs(keyword));
    }

    @PostMapping("/applications")
public ResponseEntity<String> applyForJob(@RequestBody Map<String, Object> applicationData) {
    try {
        // Logging incoming data
        System.out.println("Received application data: " + applicationData);

        // Extract jobSeekerId and jobId from the request
        String jobSeekerIdString = (String) applicationData.get("jobSeekerId");
        String jobIdString = (String) applicationData.get("jobId");

        if (jobSeekerIdString == null || jobSeekerIdString.isEmpty() ||
            jobIdString == null || jobIdString.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job Seeker ID or Job ID is missing.");
        }

        // Convert jobSeekerId and jobId to UUID
        UUID jobSeekerId = UUID.fromString(jobSeekerIdString);
        UUID jobId = UUID.fromString(jobIdString);

        // Fetch the Job Seeker
        Optional<User> jobSeekerOptional = userService.findById(jobSeekerId);
        if (!jobSeekerOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job Seeker not found.");
        }
        User jobSeeker = jobSeekerOptional.get();

        // Fetch the Job
        Optional<Job> jobOptional = jobService.findById(jobId);
        if (!jobOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found.");
        }
        Job job = jobOptional.get();

        // Check if the job seeker has already applied
        // boolean alreadyApplied = applicationService.hasAlreadyApplied(jobSeekerId, jobId);
        // if (alreadyApplied) {
        //     return ResponseEntity.status(HttpStatus.CONFLICT).body("You have already applied for this job.");
        // }

        // Create and save the application
        Application application = new Application();
        application.setApplicationId(UUID.randomUUID());
        application.setStatus(ApplicationStatus.PENDING); // Default status
        application.setAppliedDate(new Date());
        application.setJobSeeker(jobSeeker);
        application.setJob(job);

        applicationService.saveApplication(application);
        return ResponseEntity.ok("Application submitted successfully.");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while applying for the job: " + e.getMessage());
    }
}

 @GetMapping("/getuser")
    public ResponseEntity<UserDTO> getUserById(@RequestParam String userId) {
        try {
            // Convert String to UUID
            UUID uuid = UUID.fromString(userId);

            // Fetch the user by UUID
            User user = userService.getUserById(uuid);

            // Check if user exists
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // Optionally return an error message or custom response object
            }

            // Map the user to UserDTO
            UserDTO userDTO = new UserDTO(
                user.getPersonId(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getUsername()
            );

            return ResponseEntity.ok(userDTO);

        } catch (IllegalArgumentException ex) {
            // Handle invalid UUID format
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(null); // Optionally return an error response
        }
    }

    @GetMapping("/applications/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserApplications(@PathVariable String userId) {
        try {
            UUID uuid = UUID.fromString(userId);
            List<Application> applications = applicationService.getApplicationsByJobSeeker(uuid);
            
            List<Map<String, Object>> applicationData = applications.stream()
                .map(app -> {
                    Map<String, Object> data = new HashMap<>();
                    data.put("applicationId", app.getApplicationId());
                    data.put("status", app.getStatus());
                    data.put("appliedDate", app.getAppliedDate());
                    data.put("jobTitle", app.getJob().getTitle());
                    data.put("jobDescription", app.getJob().getDescription());
                    data.put("location", app.getJob().getLocation());
                    // Format salary range from min and max salary
                    String salaryRange = "Not specified";
                    if (app.getJob().getMinSalary() != null && app.getJob().getMaxSalary() != null) {
                        salaryRange = "$" + app.getJob().getMinSalary() + " - $" + app.getJob().getMaxSalary();
                    } else if (app.getJob().getMinSalary() != null) {
                        salaryRange = "From $" + app.getJob().getMinSalary();
                    } else if (app.getJob().getMaxSalary() != null) {
                        salaryRange = "Up to $" + app.getJob().getMaxSalary();
                    }
                    data.put("salaryRange", salaryRange);
                    
                    // Get company name from recruiter profile
                    String companyName = "Unknown Company";
                    if (app.getJob().getRecruiter() != null && 
                        app.getJob().getRecruiter().getRecruiterProfile() != null) {
                        companyName = app.getJob().getRecruiter().getRecruiterProfile().getCompanyName();
                    }
                    data.put("company", companyName);
                    
                    return data;
                })
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(applicationData);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/stats/{userId}")
    public ResponseEntity<Map<String, Object>> getUserStats(@PathVariable String userId) {
        try {
            UUID uuid = UUID.fromString(userId);
            List<Application> applications = applicationService.getApplicationsByJobSeeker(uuid);
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalApplications", applications.size());
            
            // Count applications by status
            long pendingCount = applications.stream()
                .filter(app -> app.getStatus() == ApplicationStatus.PENDING)
                .count();
            long shortlistedCount = applications.stream()
                .filter(app -> app.getStatus() == ApplicationStatus.SHORTLISTED)
                .count();
            long interviewScheduledCount = applications.stream()
                .filter(app -> app.getStatus() == ApplicationStatus.INTERVIEW_SCHEDULED)
                .count();
            long acceptedCount = applications.stream()
                .filter(app -> app.getStatus() == ApplicationStatus.ACCEPTED)
                .count();
            long rejectedCount = applications.stream()
                .filter(app -> app.getStatus() == ApplicationStatus.REJECTED)
                .count();
            
            stats.put("pendingApplications", pendingCount);
            stats.put("shortlistedApplications", shortlistedCount);
            stats.put("interviewScheduledApplications", interviewScheduledCount);
            stats.put("acceptedApplications", acceptedCount);
            stats.put("rejectedApplications", rejectedCount);
            
            // Get recent activity (last 5 applications)
            List<Map<String, Object>> recentActivity = applications.stream()
                .sorted((a, b) -> b.getAppliedDate().compareTo(a.getAppliedDate()))
                .limit(5)
                .map(app -> {
                    Map<String, Object> activity = new HashMap<>();
                    activity.put("id", app.getApplicationId());
                    activity.put("action", "Applied to " + app.getJob().getTitle() + " position");
                    activity.put("date", app.getAppliedDate());
                    activity.put("status", app.getStatus());
                    return activity;
                })
                .collect(Collectors.toList());
            
            stats.put("recentActivity", recentActivity);
            
            return ResponseEntity.ok(stats);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
