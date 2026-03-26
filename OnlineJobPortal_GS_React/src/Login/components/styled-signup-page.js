import React, { useState } from "react";
import {
  User,
  Lock,
  Mail,
  AlertCircle,
  Phone,
  Calendar,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
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
} from "./shared-styles";

export function StyledSignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactInfo: "",
    role: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      console.log("Signup attempted with:", formData);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Calendar size={18} />
            </InputIcon>
            <Input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Phone size={18} />
            </InputIcon>
            <Input
              type="tel"
              name="contactInfo"
              placeholder="Contact Info"
              value={formData.contactInfo}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <UserCircle size={18} />
            </InputIcon>
            <Select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
              <option value="admin">Admin</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>
          {error && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {error}
            </ErrorMessage>
          )}
          <Button type="submit">Sign Up</Button>
        </Form>
        <LinkText>
          Already have an account? <Link href="/login">Log in</Link>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
}
