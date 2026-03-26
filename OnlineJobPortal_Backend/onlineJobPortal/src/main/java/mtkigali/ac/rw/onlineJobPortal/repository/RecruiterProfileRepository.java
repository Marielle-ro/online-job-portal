package mtkigali.ac.rw.onlineJobPortal.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mtkigali.ac.rw.onlineJobPortal.model.RecruiterProfile;

@Repository
public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, UUID> {

    // Optional<RecruiterProfile> findByUsername(String username);
    Optional<RecruiterProfile> findByUser_Username(String username);

//     @Query("SELECT r FROM RecruiterProfile r " +
//     "JOIN r.user u " +
//     "WHERE LOWER(r.companyName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
//     "LOWER(r.companyDescription) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
//     "LOWER(r.website) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
// List<RecruiterProfile> searchRecruiters(@Param("searchTerm") String searchTerm);

    List<RecruiterProfile> findByCompanyNameContainingIgnoreCaseOrCompanyDescriptionContainingIgnoreCase(
        String companyName, String companyDescription
    );
}




