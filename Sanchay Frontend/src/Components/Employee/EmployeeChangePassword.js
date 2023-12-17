import React, { useState } from 'react';
import './EmployeeChangePassword.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faStar } from '@fortawesome/free-solid-svg-icons';

const EmployeeChangePassword = () => {
  const accessid = localStorage.getItem('accessid');
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
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
    // Validate the field immediately when it changes
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Call an API to change the password (you can replace this with your actual API call)
    try {
      const response = await axios.post(
        `http://localhost:8080/employeeapp/changepassword/${accessid}/${formData.oldPassword}/${formData.newPassword}`
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

  const validateField = (fieldName, value) => {
    const PASSWORD_REGEX =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'newPassword':
        if (!value) {
          newErrors.newPassword = 'New Password is required.';
        } else if (!PASSWORD_REGEX.test(value)) {
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

  const validateForm = (data) => {
    const errors = {};
    if (!data.oldPassword) {
      errors.oldPassword = 'Old password is required.';
    }
    if (!data.newPassword) {
      errors.newPassword = 'New password is required.';
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required.';
    }
    if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
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
    <div className="employee-div-passwod text-dark">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <div className="changepassword-input-div">
            <input
              type={showOldPassword ? 'text' : 'password'} // Toggle input type based on state
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle text-dark bg-light"
              onClick={() => togglePasswordVisibility('oldPassword')} // Toggle password visibility
            >
              {showOldPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          {errors.oldPassword && <p className="error">{errors.oldPassword}</p>}
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <div className="changepassword-input-div">
            <input
              type={showNewPassword ? 'text' : 'password'} // Toggle input type based on state
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              onBlur={() => validateField('newPassword', formData.newPassword)} // Validate on blur
            />
            <button
              type="button"
              className="password-toggle text-dark bg-light"
              onClick={() => togglePasswordVisibility('newPassword')} // Toggle password visibility
            >
              {showNewPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          {errors.newPassword && <p className="error">{errors.newPassword}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="changepassword-input-div">
            <input
              type={showConfirmPassword ? 'text' : 'password'} // Toggle input type based on state
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() =>
                validateField('confirmPassword', formData.confirmPassword) // Validate on blur
              }
            />
            <button
              type="button"
              className="password-toggle text-dark bg-light"
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
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className="mt-3 text-center" style={{ marginLeft: '70px' }}>
          Change Password
        </button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default EmployeeChangePassword;
