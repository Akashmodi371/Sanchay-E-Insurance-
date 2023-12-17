import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './ChangeAgentPassword.css';

const ChangeAgentPassword = () => {
  const accessid = localStorage.getItem('accessid');
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;

  // State variables for form fields and errors
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = (passwordField) => {
    if (passwordField === 'newPassword') {
      setShowPassword(!showPassword);
    } else if (passwordField === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation errors when input changes
    setErrors({
      ...errors,
      [name]: '',
    });

    // Validate newPassword and confirmPassword fields
    if (name === 'newPassword') {
      const newPasswordErrors = validateNewPassword(value);
      setErrors({
        ...errors,
        newPassword: newPasswordErrors,
      });
    } else if (name === 'confirmPassword') {
      const confirmPasswordErrors = validateConfirmPassword(value);
      setErrors({
        ...errors,
        confirmPassword: confirmPasswordErrors,
      });
    }
  };

  // Function to validate newPassword field
  const validateNewPassword = (value) => {
    if (!value) {
      return 'New password is required.';
    } else if (!PASSWORD_REGEX.test(value)) {
      return 'Password should be of 8 length and must contain lowercase, uppercase, number, and special character.';
    } else {
      return '';
    }
  };

  // Function to validate confirmPassword field
  const validateConfirmPassword = (value) => {
    if (!value) {
      return 'Confirm password is required.';
    } else if (value !== formData.newPassword) {
      return 'Passwords do not match.';
    } else {
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = {
      newPassword: validateNewPassword(formData.newPassword),
      confirmPassword: validateConfirmPassword(formData.confirmPassword),
    };

    setErrors(validationErrors);

    if (Object.keys(validationErrors).some((key) => validationErrors[key])) {
      return;
    }

    // Call an API to change the password (you can replace this with your actual API call)
    try {
      const response = await axios.post(
        `http://localhost:8080/agentapp/changepassword/${accessid}/${formData.oldPassword}/${formData.newPassword}`
      );
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      Swal.fire('Done', response.data, 'success');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="agent-changepassword text-dark bg-light">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='oldPassword'>Old Password</label>
        <div className='changepassword-input-div'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='oldPassword'
            name='oldPassword'
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <button
            type='button'
            className='password-toggle text-dark bg-light'
            onClick={() => togglePasswordVisibility('oldPassword')}
          >
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
        </div>
        {errors.oldPassword && <p className='error'>{errors.oldPassword}</p>}

        <label htmlFor='newPassword'>New Password</label>
        <div className='changepassword-input-div'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='newPassword'
            name='newPassword'
            value={formData.newPassword}
            onChange={handleChange}
          />
          <button
            type='button'
            className='password-toggle text-dark bg-light'
            onClick={() => togglePasswordVisibility('newPassword')}
          >
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
        </div>
        {errors.newPassword && <p className='error'>{errors.newPassword}</p>}

        <label htmlFor='confirmPassword'>Confirm Password</label>
        <div className='changepassword-input-div'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type='button'
            className='password-toggle text-dark bg-light'
            onClick={() => togglePasswordVisibility('confirmPassword')}
          >
            {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </button>
        </div>
        {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}

        <button type='submit' className='mt-3'>
          Change Password
        </button>
      </form>
      {successMessage && <p className='success'>{successMessage}</p>}
    </div>
  );
};

export default ChangeAgentPassword;
