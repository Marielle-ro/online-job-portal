// package auca.ac.rw.onlineJobPortal.model;

// import java.util.Date;

// public class ApplicationDetailsDTO {
//     private Date appliedDate;
//     private String firstName;
//     private String lastName;
//     private String username;
//     private String phoneNumber;
//     private String title;
//     private EmploymentType employmentType;
//     private LocationEnum location;
//     private String skills;
//     private String resume;

//     // public ApplicationDetailsDTO(Date appliedDate, String firstName, String lastName, String username, String phoneNumber,
//     //                               String title, String employmentType, String location, String skills, String resume) {
//     //     this.appliedDate = appliedDate;
//     //     this.firstName = firstName;
//     //     this.lastName = lastName;
//     //     this.username = username;
//     //     this.phoneNumber = phoneNumber;
//     //     this.title = title;
//     //     this.employmentType = employmentType;
//     //     this.location = location;
//     //     this.skills = skills;
//     //     this.resume = resume;
//     // }

//     // public ApplicationDetailsDTO(Date row, String firstName, String lastName, String username,
//     //                              String phoneNumber, String jobTitle, String row2,
//     //                              String location, String skills, String resume) {
//     //     this.appliedDate = row;
//     //     this.firstName = firstName;
//     //     this.lastName = lastName;
//     //     this.username = username;
//     //     this.phoneNumber = phoneNumber;
//     //     this.title = title;
//     //     this.employmentType = employmentType;
//     //     this.location = location;
//     //     this.skills = skills;
//     //     this.resume = resume;
//     // }

//     public ApplicationDetailsDTO(Date appliedDate, String firstName, String lastName, String username, 
//                                  String phoneNumber, String title, EmploymentType employmentType, 
//                                  LocationEnum location, String skills, String resume) {
//         this.appliedDate = appliedDate;
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.username = username;
//         this.phoneNumber = phoneNumber;
//         this.title = title;
//         this.employmentType = employmentType;
//         this.location = location;
//         this.skills = skills;
//         this.resume = resume;
//     }


//     public Date getAppliedDate() {
//         return appliedDate;
//     }

//     public void setAppliedDate(Date appliedDate) {
//         this.appliedDate = appliedDate;
//     }

//     public String getFirstName() {
//         return firstName;
//     }

//     public void setFirstName(String firstName) {
//         this.firstName = firstName;
//     }

//     public String getLastName() {
//         return lastName;
//     }

//     public void setLastName(String lastName) {
//         this.lastName = lastName;
//     }

//     public String getUsername() {
//         return username;
//     }

//     public void setUsername(String username) {
//         this.username = username;
//     }

//     public String getPhoneNumber() {
//         return phoneNumber;
//     }

//     public void setPhoneNumber(String phoneNumber) {
//         this.phoneNumber = phoneNumber;
//     }

//     public String getTitle() {
//         return title;
//     }

//     public void setTitle(String title) {
//         this.title = title;
//     }

//     public EmploymentType getEmploymentType() {
//         return employmentType;
//     }

//     public void setEmploymentType(EmploymentType employmentType) {
//         this.employmentType = employmentType;
//     }

//     public LocationEnum getLocation() {
//         return location;
//     }

//     public void setLocation(LocationEnum location) {
//         this.location = location;
//     }

//     public String getSkills() {
//         return skills;
//     }

//     public void setSkills(String skills) {
//         this.skills = skills;
//     }

//     public String getResume() {
//         return resume;
//     }

//     public void setResume(String resume) {
//         this.resume = resume;
//     }

//     // Getters and Setters (Optional for immutability)

    
// }


package mtkigali.ac.rw.onlineJobPortal.model;

import java.util.Date;
import java.util.UUID;

public class ApplicationDetailsDTO {
    
    private UUID applicationId;
    private Date appliedDate;
    private ApplicationStatus status;
    private String firstName;
    private String lastName;
    private String username;
    private String phoneNumber;
    private String title;
    private EmploymentType employmentType;
    private LocationEnum location;
    private String skills;
    private String resume;
    private String jobDescription;
    private String jobRequirements;

    // Constructor
    public ApplicationDetailsDTO(UUID applicationId, Date appliedDate, ApplicationStatus status, String firstName, String lastName, String username, 
                                 String phoneNumber, String title, EmploymentType employmentType, 
                                 LocationEnum location, String skills, String resume, String jobDescription, String jobRequirements) {
        this.applicationId=applicationId;                            
        this.appliedDate = appliedDate;
        this.status = status;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.title = title;
        this.employmentType = employmentType;
        this.location = location;
        this.skills = skills;
        this.resume = resume;
        this.jobDescription = jobDescription;
        this.jobRequirements = jobRequirements;
    }

    // Getters and Setters
   
    public Date getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(Date appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(EmploymentType employmentType) {
        this.employmentType = employmentType;
    }

    public LocationEnum getLocation() {
        return location;
    }

    public void setLocation(LocationEnum location) {
        this.location = location;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public UUID getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(UUID applicationId) {
        this.applicationId = applicationId;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getJobRequirements() {
        return jobRequirements;
    }

    public void setJobRequirements(String jobRequirements) {
        this.jobRequirements = jobRequirements;
    }

    
}
