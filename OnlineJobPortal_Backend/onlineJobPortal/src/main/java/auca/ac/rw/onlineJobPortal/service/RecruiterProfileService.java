package auca.ac.rw.onlineJobPortal.service;

import auca.ac.rw.onlineJobPortal.model.RecruiterProfile;
import auca.ac.rw.onlineJobPortal.model.User;
import auca.ac.rw.onlineJobPortal.repository.RecruiterProfileRepository;
import auca.ac.rw.onlineJobPortal.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class RecruiterProfileService {

    @Autowired
    private RecruiterProfileRepository recruiterProfileRepository;

       @Autowired
    private UserRepository userRepository; // Make sure this is injected


    public void saveProfile(RecruiterProfile profile) {
        recruiterProfileRepository.save(profile); // Save to database
    }

    public Optional<RecruiterProfile> getProfileByUsername(String username) {
        // Find the User by username (or email if needed)
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            // Retrieve the associated RecruiterProfile via User entity
            return Optional.ofNullable(user.get().getRecruiterProfile());
        } else {
            // If no user is found, return an empty Optional
            return Optional.empty();
        }
    }

    // public List<RecruiterProfile> searchRecruiters(String searchTerm) {
    //     if (searchTerm == null || searchTerm.trim().isEmpty()) {
    //         throw new IllegalArgumentException("Search term cannot be null or empty");
    //     }
        
    //     // Call the repository method
    //     return recruiterProfileRepository.searchRecruiters(searchTerm.trim());
    // }
    

    
    
}
