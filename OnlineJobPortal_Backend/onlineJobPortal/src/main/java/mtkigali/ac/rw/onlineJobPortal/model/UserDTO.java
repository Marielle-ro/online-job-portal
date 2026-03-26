package mtkigali.ac.rw.onlineJobPortal.model;

import java.util.UUID;

public class UserDTO {
    private UUID personId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String username;

    public UserDTO(UUID userId, String firstName, String lastName, String phoneNumber, String username) {
        this.personId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.username = username;
    }

    // Getters and setters
    public UUID getUserId() {
        return personId;
    }

    public void setUserId(UUID userId) {
        this.personId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
