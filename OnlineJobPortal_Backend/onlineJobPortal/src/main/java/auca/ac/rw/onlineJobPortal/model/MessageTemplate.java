package auca.ac.rw.onlineJobPortal.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "message_template")
public class MessageTemplate {

    @Id
    @GeneratedValue
    @Column(name = "template_id", nullable = false, updatable = false)
    private UUID templateId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "recruiter_id", nullable = false)
    private User recruiter;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_type", nullable = false)
    private ApplicationStatus statusType;

    @Column(name = "subject", nullable = false)
    private String subject;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt = new Date();

    public MessageTemplate() {}

    public MessageTemplate(UUID templateId, User recruiter, ApplicationStatus statusType, String subject, String content) {
        this.templateId = templateId;
        this.recruiter = recruiter;
        this.statusType = statusType;
        this.subject = subject;
        this.content = content;
        this.updatedAt = new Date();
    }

    public UUID getTemplateId() {
        return templateId;
    }

    public void setTemplateId(UUID templateId) {
        this.templateId = templateId;
    }

    public User getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(User recruiter) {
        this.recruiter = recruiter;
    }

    public ApplicationStatus getStatusType() {
        return statusType;
    }

    public void setStatusType(ApplicationStatus statusType) {
        this.statusType = statusType;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}


