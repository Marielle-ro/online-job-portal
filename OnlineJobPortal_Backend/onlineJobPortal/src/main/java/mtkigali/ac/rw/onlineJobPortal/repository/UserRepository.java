package mtkigali.ac.rw.onlineJobPortal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import mtkigali.ac.rw.onlineJobPortal.model.User;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);

    
}

