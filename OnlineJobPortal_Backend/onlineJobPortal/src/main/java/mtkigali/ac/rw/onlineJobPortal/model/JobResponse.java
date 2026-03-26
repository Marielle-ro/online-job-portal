
package mtkigali.ac.rw.onlineJobPortal.model;
import java.util.UUID;
import lombok.Data;

@Data
public class JobResponse {
    private UUID jobId;
    private String title;
    private String employmentType;
    private String location;
    private String description;
    private String requirements;
    private Double minSalary;
    private Double maxSalary;
    // private String companyName;
    private String category;

    public JobResponse(Job job) {
        this.jobId = job.getJobId();
        this.title = job.getTitle();
        this.employmentType = job.getEmploymentType().name();
        this.location = job.getLocation().name();
        this.description = job.getDescription();
        this.requirements = job.getRequirements();
        this.minSalary = job.getMinSalary();
        this.maxSalary = job.getMaxSalary();
        // this.companyName = job.getRecruiter().getRecruiterProfile().getCompanyName();
        this.category = job.getCategory() != null ? job.getCategory().getName() : "General";
    }


}
