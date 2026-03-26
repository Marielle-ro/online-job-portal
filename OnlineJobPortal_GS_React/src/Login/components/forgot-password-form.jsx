// import React, { useState } from "react";
// import { requestPasswordReset } from "./connecting/forgotpass"; 
// import { Mail, AlertCircle, Loader } from "lucide-react"; // Import icons
// import {
//   PageContainer,
//   FormContainer,
//   Title,
//   Form,
//   InputGroup,
//   Input,
//   InputIcon,
//   Button,
//   ErrorMessage,
//   LinkText,
// } from "./shared-styles"; // Import your styled-components


// function ForgotPasswordPage() {
//   const [formData, setFormData] = useState({
//     username: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) {
//       newErrors.username = "Email is required.";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.username)
//     ) {
//       newErrors.username = "Please provide a valid email address.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       setIsLoading(true);
//       setSuccess(false);
//       setErrorMessage("");

//       try {
//         await requestPasswordReset(formData.username);
//         setSuccess(true);
//       } catch (error) {
//         setErrorMessage(error || "Failed to send reset instructions.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <PageContainer>
//       <FormContainer>
//         <Title>Forgot Password</Title>

//         {success ? (
//           <div style={{ color: "green", marginBottom: "15px" }}>
//             Password reset instructions have been sent to your email.
//             <LinkText>
//               <a href="/login">Return to Login</a>
//             </LinkText>
//           </div>
//         ) : (
//           <Form onSubmit={handleSubmit}>
//             {/* Email Input */}
//             <InputGroup>
//               <InputIcon>
//                 <Mail size={18} /> {/* Email Icon */}
//               </InputIcon>
//               <Input
//                 type="username"
//                 name="username"
//                 placeholder="Enter your email"
//                 value={formData.username}
//                 onChange={handleChange}
//                 aria-invalid={!!errors.username}
//               />
//             </InputGroup>

//             {/* Error Message */}
//             {errors.username && (
//               <ErrorMessage aria-live="assertive">
//                 <AlertCircle size={18} /> {/* Error Icon */}
//                 {errors.username}
//               </ErrorMessage>
//             )}
//             {errorMessage && (
//               <ErrorMessage aria-live="assertive">
//                 <AlertCircle size={18} /> {/* Error Icon */}
//                 {errorMessage}
//               </ErrorMessage>
//             )}

//             {/* Submit Button */}
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader
//                     className="animate-spin"
//                     size={18}
//                     style={{ marginRight: "8px" }}
//                   />
//                   Sending...
//                 </>
//               ) : (
//                 "Reset Password"
//               )}
//             </Button>
//           </Form>
//         )}

//         {/* Additional Links */}
//         <LinkText>
//           Remember your password? <a href="/login">Log in</a>
//         </LinkText>
//       </FormContainer>
//     </PageContainer>
//   );
// }

// export default ForgotPasswordPage;


// import React, { useState } from "react";
// // import login from './LoginPage';
// import { requestPasswordReset, resetPassword } from "./connecting/forgotpass"; 
// import { Mail, AlertCircle, Loader } from "lucide-react"; // Import icons
// import {
//   PageContainer,
//   FormContainer,
//   Title,
//   Form,
//   InputGroup,
//   Input,
//   InputIcon,
//   Button,
//   ErrorMessage,
//   LinkText,
// } from "./shared-styles"; // Import your styled-components

// function ForgotPasswordPage() {
//   const [formData, setFormData] = useState({
//     username: "",
//     resetKey: "", // For the reset key entered by the user
//     newPassword: "", // For the new password entered by the user
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");
//   const [resetRequested, setResetRequested] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) {
//       newErrors.username = "Email is required.";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.username)
//     ) {
//       newErrors.username = "Please provide a valid email address.";
//     }
//     if (resetRequested) {
//       if (!formData.resetKey.trim()) {
//         newErrors.resetKey = "Reset key is required.";
//       }
//       if (!formData.newPassword.trim()) {
//         newErrors.newPassword = "New password is required.";
//       }
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsLoading(true);
//       setSuccess(false);
//       setErrorMessage("");
//       try {
//         await requestPasswordReset(formData.username);
//         setSuccess(true);
//         setResetRequested(true); // After the reset email is sent, show reset fields
//       } catch (error) {
//         setErrorMessage(error || "Failed to send reset instructions.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleResetSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsLoading(true);
//       setErrorMessage("");
//       try {
//         await resetPassword(formData.username, formData.resetKey, formData.newPassword);
//         setSuccess(true);
//       } catch (error) {
//         setErrorMessage(error || "Failed to reset the password.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <PageContainer>
//       <FormContainer>
//         <Title>Forgot Password</Title>

//         {success ? (
//           <div style={{ color: "green", marginBottom: "15px" }}>
//             Password reset successfully.
//             <LinkText>
//               <a href="/login">Return to Login</a>
//             </LinkText>
//           </div>
//         ) : (
//           <Form onSubmit={resetRequested ? handleResetSubmit : handleEmailSubmit}>
//             {/* Email Input */}
//             {!resetRequested && (
//               <InputGroup>
//                 <InputIcon>
//                   <Mail size={18} /> {/* Email Icon */}
//                 </InputIcon>
//                 <Input
//                   type="username"
//                   name="username"
//                   placeholder="Enter your email"
//                   value={formData.username}
//                   onChange={handleChange}
//                   aria-invalid={!!errors.username}
//                 />
//               </InputGroup>
//             )}

//             {/* Reset Key and New Password Input */}
//             {resetRequested && (
//               <>
//                 <InputGroup>
//                   <Input
//                     type="text"
//                     name="resetKey"
//                     placeholder="Enter the reset key"
//                     value={formData.resetKey}
//                     onChange={handleChange}
//                     aria-invalid={!!errors.resetKey}
//                   />
//                 </InputGroup>
//                 <InputGroup>
//                   <Input
//                     type="password"
//                     name="newPassword"
//                     placeholder="Enter new password"
//                     value={formData.newPassword}
//                     onChange={handleChange}
//                     aria-invalid={!!errors.newPassword}
//                   />
//                 </InputGroup>
//               </>
//             )}

//             {/* Error Message */}
//             {errors.username && (
//               <ErrorMessage aria-live="assertive">
//                 <AlertCircle size={18} /> {/* Error Icon */}
//                 {errors.username}
//               </ErrorMessage>
//             )}
//             {errors.resetKey && (
//               <ErrorMessage aria-live="assertive">
//                 <AlertCircle size={18} /> {/* Error Icon */}
//                 {errors.resetKey}
//               </ErrorMessage>
//             )}
//             {errors.newPassword && (
//               <ErrorMessage aria-live="assertive">
//                 <AlertCircle size={18} /> {/* Error Icon */}
//                 {errors.newPassword}
//               </ErrorMessage>
//             )}
//             {errorMessage && (
//               <ErrorMessage aria-live="assertive">
//                 <AlertCircle size={18} /> {/* Error Icon */}
//                 {errorMessage}
//               </ErrorMessage>
//             )}

//             {/* Submit Button */}
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader className="animate-spin" size={18} style={{ marginRight: "8px" }} />
//                   Sending...
//                 </>
//               ) : resetRequested ? (
//                 "Reset Password"
//               ) : (
//                 "Send Reset Instructions"
//               )}
//             </Button>
//           </Form>
//         )}

//         {/* Additional Links */}
//         <LinkText>
//           Remember your password? <a href="/login">Log in</a>
//         </LinkText>
//       </FormContainer>
//     </PageContainer>
//   );
// }

// export default ForgotPasswordPage;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset, resetPassword } from "./connecting/forgotpass";
import { Mail, AlertCircle, Loader } from "lucide-react"; 
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
} from "./shared-styles";

function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    username: "",
    resetKey: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [resetRequested, setResetRequested] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.username)
    ) {
      newErrors.username = "Please provide a valid email address.";
    }
    if (resetRequested) {
      if (!formData.resetKey.trim()) {
        newErrors.resetKey = "Reset key is required.";
      }
      if (!formData.newPassword.trim()) {
        newErrors.newPassword = "New password is required.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setSuccess(false); // Don't show success yet
      setErrorMessage("");
      try {
        await requestPasswordReset(formData.username);
        setResetRequested(true); // Show reset fields after email is sent
      } catch (error) {
        setErrorMessage(error || "Failed to send reset instructions.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setErrorMessage("");
      try {
        await resetPassword(formData.username, formData.resetKey, formData.newPassword);
        setSuccess(true); // Only set success after password reset
      } catch (error) {
        setErrorMessage(error || "Failed to reset the password.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Forgot Password</Title>

        {success ? (
          <div style={{ color: "green", marginBottom: "15px" }}>
            Password reset successfully.
            <LinkText>
              <a href="/login">Return to Login</a>
            </LinkText>
          </div>
        ) : (
          <Form onSubmit={resetRequested ? handleResetSubmit : handleEmailSubmit}>
            {/* Email Input */}
            {!resetRequested && (
              <InputGroup>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input
                  type="username"
                  name="username"
                  placeholder="Enter your email"
                  value={formData.username}
                  onChange={handleChange}
                  aria-invalid={!!errors.username}
                />
              </InputGroup>
            )}

            {/* Reset Key and New Password Input */}
            {resetRequested && (
              <>
                <InputGroup>
                  <Input
                    type="text"
                    name="resetKey"
                    placeholder="Enter the reset key"
                    value={formData.resetKey}
                    onChange={handleChange}
                    aria-invalid={!!errors.resetKey}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    aria-invalid={!!errors.newPassword}
                  />
                </InputGroup>
              </>
            )}

            {/* Error Messages */}
            {errors.username && (
              <ErrorMessage aria-live="assertive">
                <AlertCircle size={18} />
                {errors.username}
              </ErrorMessage>
            )}
            {errors.resetKey && (
              <ErrorMessage aria-live="assertive">
                <AlertCircle size={18} />
                {errors.resetKey}
              </ErrorMessage>
            )}
            {errors.newPassword && (
              <ErrorMessage aria-live="assertive">
                <AlertCircle size={18} />
                {errors.newPassword}
              </ErrorMessage>
            )}
            {errorMessage && (
              <ErrorMessage aria-live="assertive">
                <AlertCircle size={18} />
                {errorMessage}
              </ErrorMessage>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="animate-spin" size={18} style={{ marginRight: "8px" }} />
                  Sending...
                </>
              ) : resetRequested ? (
                "Reset Password"
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
          </Form>
        )}

        {/* Additional Links */}
        <LinkText>
          Remember your password? <a href="/login">Log in</a>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
}

export default ForgotPasswordPage;

