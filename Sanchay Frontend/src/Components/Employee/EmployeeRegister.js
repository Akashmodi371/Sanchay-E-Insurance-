import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';

const EmployeeRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /\S+@\S+\.\S+/;
  const usernameRegex = /^[A-Za-z0-9]*$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!^\d)(?!.*\s).{8,}$/;

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
        if (!value) return 'First Name is required';
        if (!nameRegex.test(value)) return 'First Name should contain only characters';
        break;
      case 'lastName':
        if (!value) return 'Last Name is required';
        if (!nameRegex.test(value)) return 'Last Name should contain only characters';
        break;
      case 'email':
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Invalid email format';
        break;
      case 'userName':
        if (!value) return 'User Name is required';
        if (!usernameRegex.test(value)) return 'User Name should contain only characters and numbers';
        break;
      case 'password':
        if (!passwordRegex.test(value)) return 'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number, and one special character';
        break;
      case 'confirmPassword':
        if (value !== password) return 'Passwords do not match';
        break;
      default:
        break;
    }
    return '';
  };

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (fieldName, value) => {
    const errorMessage = validateField(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValid = Object.values(errors).every((error) => error === '');
    
    if (formValid) {
      try {
        const response = await axios.post('http://localhost:8080/employeeapp/register', {
          firstname: firstName,
          lastname: lastName,
          email,
          userInfo: {
            username: userName,
            password,
          },
        });

        Swal.fire('', 'Registered Successfully!', '');
        setFirstName('');
        setLastName('');
        setEmail('');
        setUserName('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        Swal.fire('', error.response.data, 'error');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2 className="text-center fw-bold">Employee Registration</h2>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <label>First Name*</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                handleInputChange('firstName', e.target.value);
              }}
            />
          </div>

          {errors.firstName && <div style={{ color: 'red', fontSize: '12px', marginRight: '200px' }}>{errors.firstName}</div>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <label>Last Name*</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                handleInputChange('lastName', e.target.value);
              }}
            />
          </div>

          {errors.lastName && <div style={{ color: 'red', fontSize: '12px', marginRight: '200px' }}>{errors.lastName}</div>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <label>Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange('email', e.target.value);
              }}
            />
          </div>

          {errors.email && <div style={{ color: 'red', fontSize: '12px', marginRight: '330px' }}>{errors.email}</div>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <label>User Name*</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                handleInputChange('userName', e.target.value);
              }}
            />
          </div>
          {errors.userName && <div style={{ color: 'red', fontSize: '12px', marginRight: '120px' }}>{errors.userName}</div>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="password-input password-input-div-employee" style={{ display: 'flex' }} >
            <label style={{ marginLeft: '25px' }}>Password*</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange('password', e.target.value);
              }}
            />
            <button
              type="button"
              className="password-toggle bg-light text-dark"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.password && <div style={{ color: 'red', marginLeft: '193px', fontSize: '12px' }}>{errors.password}</div>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="password-input password-input-div-employee" style={{ display: 'flex' }}>
            <label style={{ marginLeft: '25px' }}>Confirm Password*</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleInputChange('confirmPassword', e.target.value);
              }}
            />
            <button
              type="button"
              className="password-toggle bg-light text-dark"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.confirmPassword && <div style={{ color: 'red', marginLeft: '160px', fontSize: '12px', marginRight: '270px' }}>{errors.confirmPassword}</div>}
        </div>

        <div className='text-center'>
          <Button type="submit" variant='success' style={{ fontSize: '20px' }}>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegister;
