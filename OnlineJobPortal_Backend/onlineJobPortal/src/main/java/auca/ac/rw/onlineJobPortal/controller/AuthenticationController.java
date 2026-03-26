package auca.ac.rw.onlineJobPortal.controller;

import auca.ac.rw.onlineJobPortal.model.User;
import auca.ac.rw.onlineJobPortal.service.UserService;
import auca.ac.rw.onlineJobPortal.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")

public class AuthenticationController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JavaMailSender mailSender;
 

    // Login without OTP
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String username, @RequestParam String password) {
        Optional<User> user = userService.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            // Generate JWT token directly
            String token = jwtUtil.generateToken(user.get().getUsername(), user.get().getRole().toString());

            // Send back token, role, and userId
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.get().getRole().toString());
            response.put("userId", user.get().getPersonId().toString());
            
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(null);
    }

    // // Verify 2FA OTP
    // @PostMapping("/verify-2fa")
    // public ResponseEntity<String> verify2FA(@RequestParam String username, @RequestParam String otp) {
    //     if (userService.verifyOtp(username, otp)) { // Validate OTP
    //         Optional<User> user = userService.findByUsername(username);

    //         if (user.isPresent()) {
    //             String token = jwtUtil.generateToken(user.get().getUsername(), user.get().getRole().toString());
    //             return ResponseEntity.ok(token);
    //         }
    //     }
    //     return ResponseEntity.status(401).body("Invalid or expired OTP");
    // }
    @PostMapping("/verify-2fa")
public ResponseEntity<Map<String, String>> verify2FA(@RequestParam String username, @RequestParam String otp) {
    if (userService.verifyOtp(username, otp)) { // Validate OTP
        Optional<User> user = userService.findByUsername(username);

        if (user.isPresent()) {
            String token = jwtUtil.generateToken(user.get().getUsername(), user.get().getRole().toString());

            // Send back both token and role
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.get().getRole().toString()); // e.g., jobseeker, jobrecruiter
            response.put("userId", user.get().getPersonId().toString());
            return ResponseEntity.ok(response);
        }
    }
    return ResponseEntity.status(401).body(null); // Invalid OTP
}

    
   
    // Signup
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

   
@PostMapping("/forgot-password")
public ResponseEntity<String> forgotPassword(@RequestParam String username) {
    Optional<User> user = userService.findByUsername(username);
    if (user.isPresent()) {
        String resetToken = UUID.randomUUID().toString();
        userService.storeResetToken(username, resetToken); // Store reset token in DB

        sendEmail(username, "Password Reset Request", "Your reset token is: " + resetToken);

        return ResponseEntity.ok("Reset token sent to your email.");
    }
    return ResponseEntity.status(404).body("User not found");
}

// Reset Password using Token
@PostMapping("/reset-password")
public ResponseEntity<String> resetPassword(@RequestParam String username, @RequestParam String token, @RequestParam String newPassword) {
    if (userService.verifyResetToken(username, token)) { // Validate reset token
        Optional<User> user = userService.findByUsername(username);
        if (user.isPresent()) {
            user.get().setPassword(passwordEncoder.encode(newPassword)); // Set new password
            userService.saveUser(user.get());
            userService.invalidateResetToken(username); // Invalidate the token after reset
            return ResponseEntity.ok("Password reset successfully");
        }
    }
    return ResponseEntity.status(400).body("Invalid or expired reset token");
}


    // Helper method to send email
    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
