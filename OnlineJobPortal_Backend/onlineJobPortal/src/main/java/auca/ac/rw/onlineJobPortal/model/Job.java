// package auca.ac.rw.onlineJobPortal.model;

// import jakarta.persistence.*;
// import java.util.Date;
// import java.util.List;
// import java.util.UUID;

// @Entity
// @Table(name = "job")
// public class Job {

//     @Id
//     @GeneratedValue
//     @Column(name = "job_id", nullable = false, updatable = false)
//     private UUID jobId;

//     @Column(name = "title", nullable = false)
//     private String title;

//     @Column(name = "description", nullable = false)
//     private String description;

//     @Column(name = "requirements", nullable = false)
//     private String requirements;

//     @Column(name = "salary_range")
//     private String salaryRange;

//     @Column(name = "location", nullable = false)
//     private String location;

//     @Column(name = "posted_date", nullable = false)
//     @Temporal(TemporalType.DATE)
//     private Date postedDate;

//     @ManyToOne
//     @JoinColumn(name = "recruiter_id", nullable = false)
//     private User recruiter;

//     @ManyToOne
//     @JoinColumn(name = "category_id")
//     private Category category;

//     @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
//     private List<Application> applications;

    
    

//     public Job(UUID jobId, String title, String description, String requirements, String salaryRange, String location,
//             Date postedDate, User recruiter, Category category, List<Application> applications) {
//         this.jobId = jobId;
//         this.title = title;
//         this.description = description;
//         this.requirements = requirements;
//         this.salaryRange = salaryRange;
//         this.location = location;
//         this.postedDate = postedDate;
//         this.recruiter = recruiter;
//         this.category = category;
//         this.applications = applications;
//     }

//     // Getters and Setters
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

//     public String getSalaryRange() {
//         return salaryRange;
//     }

//     public void setSalaryRange(String salaryRange) {
//         this.salaryRange = salaryRange;
//     }

//     public String getLocation() {
//         return location;
//     }

//     public void setLocation(String location) {
//         this.location = location;
//     }

//     public Date getPostedDate() {
//         return postedDate;
//     }

//     public void setPostedDate(Date postedDate) {
//         this.postedDate = postedDate;
//     }

//     public User getRecruiter() {
//         return recruiter;
//     }

//     public void setRecruiter(User recruiter) {
//         this.recruiter = recruiter;
//     }

//     public Category getCategory() {
//         return category;
//     }

//     public void setCategory(Category category) {
//         this.category = category;
//     }

//     public List<Application> getApplications() {
//         return applications;
//     }

//     public void setApplications(List<Application> applications) {
//         this.applications = applications;
//     }
// }

// iyiri Modified 
package auca.ac.rw.onlineJobPortal.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "job")
public class Job {

    @Id
    @GeneratedValue
    @Column(name = "job_id", nullable = false, updatable = false)
    private UUID jobId;

    @Column(name = "title", nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_type", nullable = false)
    private EmploymentType employmentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "location", nullable = false)
    private LocationEnum location; // Updated to use the Location enum

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "requirements", nullable = false)
    private String requirements;

    @Column(name = "min_salary")
    private Double minSalary;

    @Column(name = "max_salary")
    private Double maxSalary;

    @Column(name = "posted_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date postedDate;

    @Column(name = "application_deadline", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date applicationDeadline;

    @ManyToOne
    // @JoinColumn(name = "recruiter_id", nullable = false)
    @JoinColumn(name = "recruiter_id")
    private User recruiter;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private List<Application> applications;

    // Default Constructor
    public Job() {}

    // Parameterized Constructor
    public Job(UUID jobId, String title, EmploymentType employmentType, LocationEnum location, String description, 
               String requirements, Double minSalary, Double maxSalary, Date postedDate,
               Date applicationDeadline, User recruiter, Category category, List<Application> applications) {
        this.jobId = jobId;
        this.title = title;
        this.employmentType = employmentType;
        this.location = location;
        this.description = description;
        this.requirements = requirements;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
        this.postedDate = postedDate;
        this.applicationDeadline = applicationDeadline;
        this.recruiter = recruiter;
        this.category = category;
        this.applications = applications;
    }

    // Getters and Setters
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

    public User getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(User recruiter) {
        this.recruiter = recruiter;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }

    public LocationEnum getLocation() {
        return location;
    }

    public void setLocation(LocationEnum location) {
        this.location = location;
    }
}



