package auca.ac.rw.onlineJobPortal.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import auca.ac.rw.onlineJobPortal.model.ApplicationStatus;
import auca.ac.rw.onlineJobPortal.model.MessageTemplate;
import auca.ac.rw.onlineJobPortal.model.User;

@Repository
public interface MessageTemplateRepository extends JpaRepository<MessageTemplate, UUID> {
    Optional<MessageTemplate> findByRecruiterAndStatusType(User recruiter, ApplicationStatus statusType);
}


