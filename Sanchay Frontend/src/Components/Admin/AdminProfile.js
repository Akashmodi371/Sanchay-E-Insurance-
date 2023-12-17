import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import './AdminProfile.css';

const AdminProfile = ({ data }) => {
  const adminId = localStorage.getItem('adminId');

  const [formData, setFormData] = useState(data);
  const [formChanges, setFormChanges] = useState(false);
  const [adminnameError, setAdminnameError] = useState('');

  useEffect(() => {
    const isFormChanged = !Object.keys(formData).every(
      (key) => data[key] === formData[key]
    );
    setFormChanges(isFormChanged);
  }, [formData, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Validate the adminname input
    validateAdminname(value);
  };

  const validateAdminname = (value) => {
    const regex = /^[A-Za-z]+$/; // Only allow characters
    if (!value) {
      setAdminnameError('Admin Name is required.');
    } else if (!regex.test(value)) {
      setAdminnameError('Only characters are allowed.');
    } else {
      setAdminnameError('');
    }
  };

  const handleUpdate = async () => {
    const adminid = localStorage.getItem('accessid');
    console.log(formData);

    // Check if adminname is valid before updating
    if (adminnameError) {
      Swal.fire('Error', 'Please fix the validation errors.', 'error');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/adminapp/update/${adminid}`, {
        adminname: formData.adminname,
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        setFormChanges(false);
      } else {
        console.error('Profile update failed');
      }
      Swal.fire('Done', response.data, 'success');
    } catch (error) {
      Swal.fire('', error.response.data, 'error');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="admin-profile-div">
      <h2 className="text-center">Admin Profile</h2>
      <Form className="border border-dark rounded p-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="adminname">
              <Form.Label>Admin Name*</Form.Label>
              <Form.Control
                type="text"
                name="adminname"
                value={formData.adminname}
                onChange={handleChange}
                isInvalid={!!adminnameError} // Highlight input if there's an error
              />
              <Form.Control.Feedback type="invalid">
                {adminnameError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                disabled
                value={formData.userInfo.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button
            variant="primary"
            type="button"
            onClick={handleUpdate}
            disabled={!formChanges || !!adminnameError} // Disable the button if there are form changes or validation errors
            className="mt-4"
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminProfile;
