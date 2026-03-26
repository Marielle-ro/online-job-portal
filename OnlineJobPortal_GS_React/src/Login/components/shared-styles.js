import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #D2B48C;
  background-image: url('../images/back.jpeg');
  background-size: cover;
  background-position: center;
`;

export const FormContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 500px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: #3E2722;
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Arial', sans-serif;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem 0.9rem 2.5rem;
  border: 1px solid #C2B280;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: border-color 0.3s;
  background-color: #FFFFFF;
  color: #333333;
  font-family: 'Arial', sans-serif;

  &:focus {
    outline: none;
    border-color: #008080;
  }
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #78866B;
  font-size: 1.2rem;
`;

export const Button = styled.button`
  background-color: #008080;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.9rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Arial', sans-serif;

  &:hover {
    background-color: #006666;
  }

  &:disabled {
    background-color: #C2B280;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #D32F2F;
  font-size: 1rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 1.2rem;
  font-size: 1rem;
  color: #3E2723;
  font-family: 'Arial', sans-serif;

  a {
    color: #008080;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.9rem 1.2rem 0.9rem 2.5rem;
  border: 1px solid #C2B280;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: border-color 0.3s;
  background-color: #FFFFFF;
  color: #333333;
  appearance: none;
  font-family: 'Arial', sans-serif;

  &:focus {
    outline: none;
    border-color: #008080;
  }
`;

export const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #e6ffe6; /* Light green background */
  color: #2e7d32; /* Green text */
  font-size: 1.1rem;
  text-align: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;
