import React, { useState } from 'react';
import './ChangePassword.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ChangePassword = () => {
  const navigate = useNavigate();
  const accessid = localStorage.getItem('accessid');

  // State for form data and validation errors
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  // State variables for toggling password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const PASSWORD_REGEX =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field immediately when it changes
    validateField(name, value);
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

  // Function to validate a specific field
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'oldPassword':
        // Validate old password if needed
        break;
      case 'newPassword':
        if (!value) {
          newErrors.newPassword = 'New Password is required.';
        } else if (!PASSWORD_REGEX.test(formData.newPassword)) {
          newErrors.newPassword =
            'Password should be of 8 length and must contain lowercase, uppercase, number, and special character.';
        } else {
          delete newErrors.newPassword;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Confirm Password is required.';
        } else if (value !== formData.newPassword) {
          newErrors.confirmPassword = 'Passwords do not match.';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Function to validate the entire form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Old password is required.';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New Password is required.';
    } 

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (!validateForm()) {
      return;
    }

    // Call an API to change the password (replace with your actual API endpoint)
    try {
      const response = await axios.post(
        `http://localhost:8080/customerapp/changepassword/${accessid}`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }
      );

      // Clear form data on success
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      Swal.fire('Done', response.data, 'success');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className='customer-change-div text-dark'>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className='border border-dark rounded p-4'>
        <div>
          <label htmlFor='oldPassword'>Old Password</label>
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
              {showOldPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          {errors.oldPassword && <p className='error'>{errors.oldPassword}</p>}
        </div>
        <div>
          <label htmlFor='newPassword'>New Password</label>
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
              {showNewPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          {errors.newPassword && <p className='error'>{errors.newPassword}</p>}
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
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
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className='error'>{errors.confirmPassword}</p>
          )}
        </div>
        <button type='submit' className='mt-3'>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
