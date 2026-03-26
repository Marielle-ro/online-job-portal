package mtkigali.ac.rw.onlineJobPortal.service;

import mtkigali.ac.rw.onlineJobPortal.model.User;
import mtkigali.ac.rw.onlineJobPortal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final Map<String, String> otpStorage = new HashMap<>();
    private final Map<String, String> resetTokenStorage = new HashMap<>();

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void storeOtp(String username, String otp) {
        otpStorage.put(username, otp);
    }

    public boolean verifyOtp(String username, String otp) {
        String storedOtp = otpStorage.get(username);
        return storedOtp != null && storedOtp.equals(otp);
    }

    public void invalidateOtp(String username) {
        otpStorage.remove(username);
    }

    // Reset Token Methods
    public void storeResetToken(String username, String token) {
        resetTokenStorage.put(username, token);
    }

    public boolean verifyResetToken(String username, String token) {
        String storedToken = resetTokenStorage.get(username);
        return storedToken != null && storedToken.equals(token);
    }

    public void invalidateResetToken(String username) {
        resetTokenStorage.remove(username);
    }

    public Optional<User> findById(UUID id) {
        return userRepository.findById(id); // Use the repository to find the user by UUID
    }

    public User getUserById(UUID userId) {
        return userRepository.findById(userId).orElse(null);
    }

    
}
