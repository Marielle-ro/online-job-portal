package auca.ac.rw.onlineJobPortal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import auca.ac.rw.onlineJobPortal.model.Application;
import auca.ac.rw.onlineJobPortal.model.ApplicationDetailsDTO;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    // List<Application> findByJobId(UUID jobId);
   // List<Application> findByJobSeekerId(UUID jobSeekerId);
    List<Application> findByJob_JobId(UUID jobId);
    List<Application> findByJobSeeker_PersonId(UUID personId);
    // boolean existsByJobSeekerIdAndJobId(UUID jobSeekerId, UUID jobId);


    @Query("""
        SELECT new auca.ac.rw.onlineJobPortal.model.ApplicationDetailsDTO(
            a.applicationId,
            a.appliedDate,
            a.status,
            u.firstName,
            u.lastName,
            u.username,
            u.phoneNumber,
            j.title,
            j.employmentType,
            j.location,
            p.skills,
            p.resume,
            j.description,
            j.requirements
        )
        FROM Application a
        JOIN a.job j
        JOIN a.jobSeeker u
        LEFT JOIN u.jobSeekerProfile p
        WHERE j.recruiter.personId = :recruiterId
    """)
    List<ApplicationDetailsDTO> findApplicationsByRecruiterId(@Param("recruiterId") UUID recruiterId);

    // @Query("SELECT a FROM Application a WHERE a.job.recruiter.id = :recruiterId")
    // List<ApplicationDetailsDTO> findApplicationsByRecruiterId(@Param("recruiterId") UUID recruiterId);

    // @Query(value = """
    //     SELECT 
    //         a.applied_date AS appliedDate,
    //         u.first_name AS firstName,
    //         u.last_name AS lastName,
    //         u.username AS username,
    //         u.phone_number AS phoneNumber,
    //         j.title AS title,
    //         j.employment_type AS employmentType,
    //         j.location AS location,
    //         p.skills AS skills,
    //         p.resume AS resume
    //     FROM application a
    //     JOIN job j ON j.job_id = a.job_id
    //     JOIN users r ON r.person_id = j.recruiter_id
    //     JOIN users u ON u.person_id = a.job_seeker_id
    //     JOIN job_seeker_profile p ON p.user_id = u.person_id
    //     WHERE r.person_id = :recruiterId
    // """, nativeQuery = true)
    // List<Object[]> findApplicationsByRecruiterIdNative(@Param("recruiterId") UUID recruiterId);


}
