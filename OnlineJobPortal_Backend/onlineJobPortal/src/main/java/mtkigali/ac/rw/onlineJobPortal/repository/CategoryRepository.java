package mtkigali.ac.rw.onlineJobPortal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import mtkigali.ac.rw.onlineJobPortal.model.Category;

import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
