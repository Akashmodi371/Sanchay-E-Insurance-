import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeProfile.css';
import Swal from 'sweetalert2';

const EmployeeProfile = ({ employeeData }) => {
  const employeeId = localStorage.getItem('accessid');

  const [formData, setFormData] = useState(employeeData);
  const [formChanges, setFormChanges] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const isFormChanged = !Object.keys(formData).every(
      (key) => employeeData[key] === formData[key]
    );
    setFormChanges(isFormChanged);
  }, [formData, employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'firstname':
        if (!value) {
          newErrors.firstname = 'First Name is required';
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          newErrors.firstname = 'First Name should only contain letters';
        } else {
          delete newErrors.firstname;
        }
        break;
      case 'lastname':
        if (!value) {
          newErrors.lastname = 'Last Name is required';
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          newErrors.lastname = 'Last Name should only contain letters';
        } else {
          delete newErrors.lastname;
        }
        break;
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Invalid email format';
        } else {
          delete newErrors.email;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/employeeapp/update/${employeeId}`,
        {
          ...formData,
        }
      );

      if (response.ok) {
        console.log('Profile updated successfully');
        setFormChanges(false);
      } else {
        console.error('Profile update failed');
      }
      Swal.fire('Done', response.data, 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='employee-profile-div text-dark'>
      <h2 className='text-center mb-4 '>Employee Profile</h2>
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
                isInvalid={!!errors.firstname}
              />
              <Form.Control.Feedback type='invalid' style={{fontSize:'12px'}}>
                {errors.firstname}
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
                isInvalid={!!errors.lastname}
              />
              <Form.Control.Feedback type='invalid' style={{fontSize:'12px'}}>
                {errors.lastname}
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
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid' style={{fontSize:'12px'}}>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='username'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                name='username'
                disabled
                value={formData.userInfo.username}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* Other fields can be added similarly */}
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

export default EmployeeProfile;
