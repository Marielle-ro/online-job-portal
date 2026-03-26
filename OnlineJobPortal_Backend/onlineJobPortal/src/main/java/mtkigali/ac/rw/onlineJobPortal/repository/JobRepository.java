package mtkigali.ac.rw.onlineJobPortal.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mtkigali.ac.rw.onlineJobPortal.model.EmploymentType;
import mtkigali.ac.rw.onlineJobPortal.model.Job;
import mtkigali.ac.rw.onlineJobPortal.model.LocationEnum;

@Repository
public interface JobRepository extends JpaRepository<Job, UUID> {
    List<Job> findByCategory_CategoryId(UUID categoryId);
    List<Job> findByTitleContainingIgnoreCase(String keyword);
    Page<Job> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description, Pageable pageable);
    List<Job> findByRecruiter_personId(UUID personId);
    List<Job> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrRequirementsContainingIgnoreCase(
        String title, String description, String requirements);
  List<Job> findByEmploymentTypeOrLocation(EmploymentType employmentType, LocationEnum location);   
  List<Job> findByLocation(LocationEnum location);
  List<Job> findByEmploymentType(EmploymentType employmentType);     
}






