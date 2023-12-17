import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ChangeAdminPassword.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangeAdminPassword = () => {
  const navigation = useNavigate();

  const accessid = localStorage.getItem('accessid');
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  // State variables for toggling password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the newPassword and confirmPassword fields for emptiness
    if (name === 'newPassword' || name === 'confirmPassword') {
      if (!value.trim()) {
        setErrors({
          ...errors,
          [name]: 'This field is required.',
        });
      } else {
        setErrors({
          ...errors,
          [name]: '',
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Call an API to change the password (you can replace this with your actual API call)
    try {
      const response = await axios.post(
        `http://localhost:8080/adminapp/changepassword/${accessid}/${formData.oldPassword}/${formData.newPassword}`
      );
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setSuccessMessage(response.data);
      navigation('/login');
    } catch (error) {
      Swal.fire('', error.response.data, 'error');
      console.error('Error changing password:', error);
    }
  };

  const validateForm = (data) => {
    const validationErrors = {};

    if (!data.oldPassword) {
      validationErrors.oldPassword = 'Old password is required.';
    }

    if (!data.newPassword) {
      validationErrors.newPassword = 'New password is required.';
    } else if (!validatePassword(data.newPassword)) {
      validationErrors.newPassword =
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@#$%^&+=!), and be at least 8 characters long.';
    }

    if (!data.confirmPassword) {
      validationErrors.confirmPassword = 'Confirm password is required.';
    } else if (data.newPassword !== data.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    return validationErrors;
  };

  // Function to validate password against the given regex
  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    return passwordRegex.test(value);
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = (passwordField) => {
    switch (passwordField) {
      case 'oldPassword':
        setShowOldPassword(!showOldPassword);
        break;
      case 'newPassword':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmPassword':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <div className='div-admin-change'>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='oldPassword' style={{ fontWeight: '400' }}>Old Password </label>
        <div className='changepassword-input-div'>
          <input
            type={showOldPassword ? 'text' : 'password'} // Toggle input type based on state
            id='oldPassword'
            name='oldPassword'
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <button
            type='button'
            className='password-toggle text-dark bg-light'
            onClick={() => togglePasswordVisibility('oldPassword')} // Toggle password visibility
          >
            {showOldPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
          {errors.oldPassword && <p className='error'>{errors.oldPassword}</p>}
        </div>
        <label htmlFor='newPassword' style={{ fontWeight: '400' }}>New Password</label>
        <div className='changepassword-input-div'>
          <input
            type={showNewPassword ? 'text' : 'password'} // Toggle input type based on state
            id='newPassword'
            name='newPassword'
            value={formData.newPassword}
            onChange={handleChange}
          />
          <button
            type='button'
            className='password-toggle text-dark bg-light'
            onClick={() => togglePasswordVisibility('newPassword')} // Toggle password visibility
          >
            {showNewPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
          {errors.newPassword && <p className='error'>{errors.newPassword}</p>}
        </div>
        <label htmlFor='confirmPassword' style={{ fontWeight: '400' }}>Confirm Password</label>
        <div className='changepassword-input-div'>
          <input
            type={showConfirmPassword ? 'text' : 'password'} // Toggle input type based on state
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type='button'
            className='password-toggle text-dark bg-light'
            onClick={() => togglePasswordVisibility('confirmPassword')} // Toggle password visibility
          >
            {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
          {errors.confirmPassword && (
            <p className='error'>{errors.confirmPassword}</p>
          )}
        </div>
        <button type='submit' className='mt-3'>
          Change Password
        </button>
      </form>
      {successMessage && <p className='success'>{successMessage}</p>}
    </div>
  );
};

export default ChangeAdminPassword;
