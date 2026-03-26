package auca.ac.rw.onlineJobPortal.model;

import java.util.Date;
import java.util.UUID;

// public class JobDTO {
//     private UUID jobId;
//     private String title;
//     private EmploymentType employmentType;
//     private LocationEnum location;
//     private String description; 
//     private String requirements;
//     // private Double minSalary;
//     // private Double maxSalary;
//     private Date postedDate;
//     private Date applicationDeadline;

    

    

   
//     public JobDTO(UUID jobId2, String title2, String description2, LocationEnum location2,
//             EmploymentType employmentType2, Date postedDate2, Date applicationDeadline2, String requirements2) {
//         //TODO Auto-generated constructor stub
//     }
//     public UUID getJobId() {
//         return jobId;
//     }
//     public void setJobId(UUID jobId) {
//         this.jobId = jobId;
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
//     public String getDescription() {
//         return description;
//     }
//     public void setDescription(String description) {
//         this.description = description;
//     }
//     public String getRequirements() {
//         return requirements;
//     }
//     public void setRequirements(String requirements) {
//         this.requirements = requirements;
//     }
//     // public Double getMinSalary() {
//     //     return minSalary;
//     // }
//     // public void setMinSalary(Double minSalary) {
//     //     this.minSalary = minSalary;
//     // }
//     // public Double getMaxSalary() {
//     //     return maxSalary;
//     // }
//     // public void setMaxSalary(Double maxSalary) {
//     //     this.maxSalary = maxSalary;
//     // }
//     public Date getPostedDate() {
//         return postedDate;
//     }
//     public void setPostedDate(Date postedDate) {
//         this.postedDate = postedDate;
//     }
//     public Date getApplicationDeadline() {
//         return applicationDeadline;
//     }
//     public void setApplicationDeadline(Date applicationDeadline) {
//         this.applicationDeadline = applicationDeadline;
//     }

    
// }

public class JobDTO {
    private UUID jobId;
    private String title;
    private EmploymentType employmentType;
    private LocationEnum location;
    private String description;
    private String requirements;
    private Double minSalary; // Uncommented
    private Double maxSalary; // Uncommented
    private Date postedDate;
    private Date applicationDeadline;

    // Constructor to initialize the JobDTO from a Job entity
    public JobDTO(UUID jobId, String title, String description, LocationEnum location, 
                  EmploymentType employmentType, Date postedDate, Date applicationDeadline, 
                  String requirements, Double minSalary, Double maxSalary) {
        this.jobId = jobId;
        this.title = title;
        this.description = description;
        this.location = location;
        this.employmentType = employmentType;
        this.postedDate = postedDate;
        this.applicationDeadline = applicationDeadline;
        this.requirements = requirements;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
    }

    // Getters and setters
    public UUID getJobId() {
        return jobId;
    }

    public void setJobId(UUID jobId) {
        this.jobId = jobId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public Double getMinSalary() {
        return minSalary;
    }

    public void setMinSalary(Double minSalary) {
        this.minSalary = minSalary;
    }

    public Double getMaxSalary() {
        return maxSalary;
    }

    public void setMaxSalary(Double maxSalary) {
        this.maxSalary = maxSalary;
    }

    public Date getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }

    public Date getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(Date applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }
}

