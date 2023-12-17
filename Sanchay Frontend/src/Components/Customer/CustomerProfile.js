import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import './CustomerProfile.css';

const CustomerProfile = ({ customerData }) => {
  // Get the customer ID from local storage
  const customerid = localStorage.getItem('accessid');
  
  // Initialize state variables
  const [formData, setFormData] = useState(customerData);
  const [formChanges, setFormChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Check if the form data has changed
  useEffect(() => {
    const isFormChanged = !Object.keys(formData).every(
      (key) => customerData[key] === formData[key]
    );
    setFormChanges(isFormChanged);
  }, [formData, customerData]);

  // Validation functions for each field
  const validateField = (name, value) => {
    switch (name) {
      case 'firstname':
      case 'lastname':
        return /^[a-zA-Z]+$/.test(value);

      case 'email':
        return /\S+@\S+\.\S+/.test(value);

      case 'mobileno':
        return /^\d{10}$/.test(value);

      case 'pincode':
        return /^\d{6}$/.test(value);

      default:
        return true;
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the field
    const isValid = validateField(name, value);

    // Update the validation errors
    setValidationErrors({
      ...validationErrors,
      [name]: !isValid,
    });

    // Update the form data if valid
    if (isValid) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleUpdate = async () => {
    try {
      // Check if there are any validation errors
      if (Object.values(validationErrors).some((error) => error)) {
        Swal.fire('Validation Error', 'Please fix the validation errors.', 'error');
        return;
      }

      // Send a POST request to update the profile
      const response = await axios.post(
        `http://localhost:8080/customerapp/update/${customerid}`,
        {
          ...formData,
        }
      );

      if (response.status === 200) {
        console.log('Profile updated successfully');
        setFormChanges(false);
        Swal.fire('Done', response.data, 'success');
      } else {
        console.error('Profile update failed');
        Swal.fire('Error', 'Profile update failed', 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire('Error', 'Error updating profile', 'error');
    }
  };

  return (
    <div className='customer-profile-container'>
      <h2 className='text-center fw-bold mb-3'>CUSTOMER PROFILE</h2>
      <Form className='border border-dark rounded p-4'>
        <Row>
          <Col md={6}>
            <Form.Group controlId='firstname'>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type='text'
                name='firstname'
                value={formData.firstname}
                onChange={handleChange}
                isInvalid={validationErrors.firstname}
              />
              <Form.Control.Feedback type='invalid'>
                First name is required and should contain only characters.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='lastname'>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type='text'
                name='lastname'
                value={formData.lastname}
                onChange={handleChange}
                isInvalid={validationErrors.lastname}
              />
              <Form.Control.Feedback type='invalid'>
                Last name is required and should contain only characters.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId='email'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                isInvalid={validationErrors.email}
                style={{ border: '1px solid #ccc' }}
              />
              <Form.Control.Feedback type='invalid'>
                Email is required and should be in a valid format.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='address'>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId='state'>
              <Form.Label>State:</Form.Label>
              <Form.Control
                type='text'
                name='state'
                value={formData.state}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='city'>
              <Form.Label>City:</Form.Label>
              <Form.Control
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId='pincode'>
              <Form.Label>Pincode:</Form.Label>
              <Form.Control
                type='text'
                name='pincode'
                value={formData.pincode}
                onChange={handleChange}
                isInvalid={validationErrors.pincode}
              />
              <Form.Control.Feedback type='invalid'>
                Pincode is required and should be 6 digits.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='mobileno'>
              <Form.Label>Mobile Number:</Form.Label>
              <Form.Control
                type='text'
                name='mobileno'
                value={formData.mobileno}
                onChange={handleChange}
                isInvalid={validationErrors.mobileno}
              />
              <Form.Control.Feedback type='invalid'>
                Mobile number is required and should be 10 digits.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId='birthdate'>
              <Form.Label>Birthdate: </Form.Label> <br />
              <DatePicker
                selected={
                  formData.birthdate ? new Date(formData.birthdate) : null
                }
                onChange={(date) => {
                  const formattedDate = date
                    ? date.toISOString().split('T')[0]
                    : '';
                  handleChange({
                    target: { name: 'birthdate', value: formattedDate },
                  });
                }}
                dateFormat='yyyy-MM-dd'
                className='form-control'
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='username'>
              <Form.Label>User Name:</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={formData.username}
                disabled
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className='text-center'>
          <Button
            variant='primary'
            type='button'
            onClick={handleUpdate}
            disabled={!formChanges}
            className='mt-4'
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomerProfile;
