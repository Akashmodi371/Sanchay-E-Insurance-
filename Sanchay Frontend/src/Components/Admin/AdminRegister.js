import React, { useState } from 'react';
// import './AdminRegister.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AdminRegister = () => {
  const [adminName, setAdminName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    const firstnameRegex=/^[A-Za-z\s]*$/;
    if (!adminName) newErrors.adminName = 'Admin Name is required';
    else if(!firstnameRegex.test(adminName)) newErrors.adminName="Admin Name contains characters"

    const usernameRegex = /^[A-Za-z0-9]+$/;
    if(!userName) newErrors.userName="username required";
    else if (!usernameRegex.test(userName)) newErrors.userName = 'User Name should contain only characters and numbers';

    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    if(!email) newErrors.email="email required";
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    if(!password) newErrors.password="password required";
    else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password conatins least 8 characters, contains lowercase ,uppercase letter, number, and one special character';
    }

    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdminNameChange = (value) => {
    const isAlphabetical = /^[A-Za-z\s]*$/.test(value);
    if (!isAlphabetical) {
      setErrors({ ...errors, adminName: 'Admin Name must contain only characters' });
    } else {
      setErrors({ ...errors, adminName: '' });
    }
    setAdminName(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:8080/adminapp/register',
          {
            adminname: adminName,
            email,
            userInfo: {
              username: userName,
              password,
            },
          }
        );

        Swal.fire('', response.data, '');

        setAdminName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2 className="text-center fw-bold">Admin Registration</h2>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <label>Admin Name*</label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => handleAdminNameChange(e.target.value)}
            />
          </div>
          {errors.adminName && <span className="error" style={{ color: 'red', fontSize: '10px',marginRight:'270px' }}>{errors.adminName}</span>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <label>User Name*</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          {errors.userName && <span className="error" style={{ color: 'red', fontSize: '10px',marginRight:'330px' }}>{errors.userName}</span>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <label>Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <span className="error" style={{ color: 'red', fontSize: '10px', marginRight: '340px' }}>{errors.email}</span>}
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div className="password-input password-input-admin" style={{ display: 'flex' }} >
          <label style={{marginLeft:'20px'}}>Password*</label>
          <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // style={{ width: '300px' }}
            />
            <button
              type="button"
              className="password-toggle text-dark bg-light"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.password && <span className="error" style={{ color: 'red', fontSize: '10px',marginRight:'340px'}}>{errors.password}</span>}
          </div>
          
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div className="password-input password-input-admin" style={{ display: 'flex' }}>
          <label style={{marginLeft:"20px"}}>Confirm Password*</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '360px' }}
            />
            <button
              type="button"
              className="password-toggle text-dark bg-light"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="error" style={{ color: 'red', fontSize: '10px',marginRight:'310px' }}>{errors.confirmPassword}</span>
          )}
        </div>

        <div className="text-center">
          <Button type="submit" variant="success" style={{ fontSize: '20px' }}>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;
