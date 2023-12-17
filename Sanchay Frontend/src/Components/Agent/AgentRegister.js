import React, { useEffect, useState } from 'react';
import './AgentRegister.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { generateUniqueReferenceNumber } from './../../services/AgentService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from '@emotion/styled';

const AgentRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    referenceNumber: '',
    mobileNumber: '',
    userName: '',
    password: '',
    confirmPassword: ''
  });

  // Function to validate that a string contains only alphabetic characters
  const isStringValid = (value) => {
    const regex = /^[a-zA-Z\s]*$/; // Only alphabets and spaces are allowed
    return regex.test(value);
  };

  // Function to validate email format
  const isEmailValid = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  };

  const usernameRegex = /^[A-Za-z0-9]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!^\d)(?!.*\s).{8,}$/;

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) return 'First Name is required';
        if (!isStringValid(value)) return 'Invalid characters in First Name';
        break;
      case 'lastName':
        if (!value.trim()) return 'Last Name is required';
        if (!isStringValid(value)) return 'Invalid characters in Last Name';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isEmailValid(value)) return 'Invalid email format';
        break;
      case 'referenceNumber':
        if (!value.trim()) return 'Reference Number is required';
        break;
      case 'mobileNumber':
        if (!value.trim()) return 'Mobile Number is required';
        if (!/^\d{10}$/.test(value)) return 'Mobile number must be 10 digits';
        break;
      case 'userName':
        if (!value.trim()) return 'User Name is required';
        else if(!usernameRegex.test(value)){
          return "User Name should contain only characters and numbers";
        }
        break;
      case 'password':
        if (!value.trim()) return 'Password is required';
        else if (!passwordRegex.test(value)) return 'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number, and one special character';
        break;
      case 'confirmPassword':
        if (!value.trim()) return 'Confirm Password is required';
        if (value !== password) return 'Passwords do not match';
        break;
      default:
        break;
    }
    return '';
  };

  useEffect(() => {
    const uniqueReferenceNumber = generateUniqueReferenceNumber();
    setReferenceNumber(uniqueReferenceNumber);
  }, []);

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
        const response = await axios.post('http://localhost:8080/agentapp/register', {
          firstname: firstName,
          lastname: lastName,
          email,
          referencenumber: referenceNumber,
          mobileno: mobileNumber,
          userInfo: {
            username: userName,
            password,
          },
        });

        Swal.fire('', response.data, 'success');
        setFirstName('');
        setLastName('');
        setEmail('');
        setReferenceNumber('');
        setMobileNumber('');
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
      <h2 className="text-center fw-bold">Agent Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
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
          {errors.firstName && <span className="error" style={{ color: 'red', fontSize: '10px', marginRight: '320px' }}>{errors.firstName}</span>}
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
          
          
          {errors.lastName && <span className="error" style={{ color: 'red', fontSize: '10px', marginRight: '310px' }}>{errors.lastName}</span>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <label>Mobile Number*</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
              handleInputChange('mobileNumber', e.target.value);
            }}
          />
          </div>
          {errors.mobileNumber && <span className="error" style={{ color: 'red', fontSize: '10px', marginRight: '290px' }}>{errors.mobileNumber}</span>}
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
          {errors.email && <span className="error" style={{ color: 'red', fontSize: '10px', marginRight: '340px' }}>{errors.email}</span>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <label>Reference Number*</label>
          <input
            type="text"
            value={referenceNumber}
            disabled
          />
          </div>
          {errors.referenceNumber && <span className="error" >{errors.referenceNumber}</span>}
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
          {errors.userName && <span className="error" style={{ color: 'red', fontSize: '10px', marginRight: '150px' }}>{errors.userName}</span>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <label style={{marginLeft:'120px'}}>Password*</label>
          <div className="password-input password-input-div-agent">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              style={{marginLeft:'0px'}}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange('password', e.target.value);
              }}
            />
            </div>
            <button
              type="button"
              className="password-toggle bg-light text-dark"
              onClick={togglePasswordVisibility}
              
            >
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.password && <span className="error" style={{ color: 'red', fontSize: '12px', marginRight: '50px',marginLeft:'190px' }}>{errors.password}</span>}
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <label style={{marginLeft:'110px'}}>Confirm Password*</label>
          <div className="password-input password-input-div-agent">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              style={{marginLeft:'10px'}}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleInputChange('confirmPassword', e.target.value);
              }}
            />
            </div>
            <button
              type="button"
              className="password-toggle bg-light text-dark"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="error" style={{ color: 'red', fontSize: '12px', marginRight: '200px' }}>{errors.confirmPassword}</span>
          )}
        </div>
        <div className='text-center'>
          <Button type="submit" variant='success' style={{ fontSize: '20px' }}>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default AgentRegister;
