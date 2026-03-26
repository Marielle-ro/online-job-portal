import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from './connecting/saveuser';
import { User, Lock, AlertCircle, Phone, Calendar, UserCircle, Loader } from 'lucide-react'; // Import icons
import {
  PageContainer,
  FormContainer,
  Title,
  Form,
  InputGroup,
  Input,
  InputIcon,
  Button,
  ErrorMessage,
  LinkText,
  Select,
} from "./shared-styles"; // Import shared styles
 // Import the saveUser function

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "", // This will now represent the phone number
    role: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Date of birth is required.";
    }
    if (!formData.phoneNumber.trim() || !/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "A valid phone number is required.";
    }
    // if (!formData.phoneNumber.trim()) {
    //   newErrors.phoneNumber = "A valid phone number is required.";
    // }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required.";
    }
    if (formData.password.trim().length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
          createUser(formData)
              .then(() => {
                  alert("User information saved successfully!");
                  setFormData({
                      username: "",
                      firstName: "",
                      lastName: "",
                      dateOfBirth: "",
                      phoneNumber: "",
                      role: "",
                      password: ""
                  });
                  setErrors({});
              })
              .catch((error) => {
                  alert("An error occurred while saving the user. Please try again.");
              });
      } catch (error) {
          console.error("Unexpected error:", error);
      }
  }
  
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit}>
          {/* Username Input */}
          <InputGroup>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </InputGroup>
          {errors.username && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {errors.username}
            </ErrorMessage>
          )}

          {/* First Name Input */}
          <InputGroup>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </InputGroup>
          {errors.firstName && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {errors.firstName}
            </ErrorMessage>
          )}

          {/* Last Name Input */}
          <InputGroup>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </InputGroup>
          {errors.lastName && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {errors.lastName}
            </ErrorMessage>
          )}

          {/* Date of Birth Input */}
          <InputGroup>
            <InputIcon>
              <Calendar size={18} />
            </InputIcon>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </InputGroup>
          {errors.dateOfBirth && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {errors.dateOfBirth}
            </ErrorMessage>
          )}

          {/* Phone Number Input */}
<InputGroup>
  <InputIcon>
    <Phone size={18} />
  </InputIcon>
  <Input
    type="tel"
    name="phoneNumber" // Ensure this matches the key in formData
    value={formData.phoneNumber}
    onChange={handleChange}
    placeholder="Phone Number"
  />
</InputGroup>
{errors.phoneNumber && (
  <ErrorMessage>
    <AlertCircle size={18} />
    {errors.phoneNumber}
  </ErrorMessage>
)}

          {/* Role Select */}
          <InputGroup>
            <InputIcon>
              <UserCircle size={18} />
            </InputIcon>
            <Select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="JOB_SEEKER">JOB_SEEKER</option>
              <option value="RECRUITER">RECRUITER</option>
              <option value="ADMIN">ADMIN</option>
            </Select>
          </InputGroup>
          {errors.role && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {errors.role}
            </ErrorMessage>
          )}

          {/* Password Input */}
          <InputGroup>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </InputGroup>
          {errors.password && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {errors.password}
            </ErrorMessage>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={18} style={{ marginRight: "8px" }} />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </Form>

        {/* Links */}
        <LinkText>
          Already have an account? <a href="/login">Log in</a>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
}

export default SignupPage;
