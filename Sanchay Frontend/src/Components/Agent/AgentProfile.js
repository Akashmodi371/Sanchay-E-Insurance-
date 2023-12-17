import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";

const AgentProfile = ({ agentData }) => {
  console.log(agentData, "agent data here");
  const agentid = localStorage.getItem("accessid");
  const [formData, setFormData] = useState(agentData);
  const [formChanges, setFormChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const isFormChanged = !Object.keys(formData).every(
      (key) => agentData[key] === formData[key]
    );
    setFormChanges(isFormChanged);
  }, [formData, agentData]);

  const validateField = (fieldName, value) => {
    const newErrors = { ...validationErrors };

    switch (fieldName) {
      case "firstname":
      case "lastname":
        if (!value) {
          newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1)} is required`;
        } else if (!/^[A-Za-z ]{1,30}$/.test(value)) {
          newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1)} should contain only letters and spaces`;
        } else {
          delete newErrors[fieldName];
        }
        break;
      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "mobileno":
        if (!value) {
          newErrors.mobileno = "Mobile Number is required";
        } else if (value.length !== 10) {
          newErrors.mobileno = "Mobile Number must be 10 digits";
        } else {
          delete newErrors.mobileno;
        }
        break;
      default:
        break;
    }

    setValidationErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value); // Validate the field
  };

  const handleUpdate = async () => {
    try {
      // Check for validation errors
      const hasValidationErrors = Object.values(validationErrors).some(
        (error) => error
      );

      if (hasValidationErrors) {
        Swal.fire(
          "Validation Error",
          "Please fix the validation errors.",
          "error"
        );
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/agentapp/update/${agentid}`,
        {
          ...formData,
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully");
        setFormChanges(false);
      } else {
        console.error("Profile update failed");
      }
      Swal.fire("Done", response.data, "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire(" ",error.response.data,'error');
    }
  };

  return (
    <div className="customer-profile-container">
      <h2 className="text-center fw-bold mb-3">AGENT PROFILE</h2>
      <Form className="border border-dark rounded p-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstname">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                isInvalid={!!validationErrors.firstname}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.firstname}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastname">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                isInvalid={!!validationErrors.lastname}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.lastname}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                style={{ border: "1px solid #ccc" }}
                onChange={handleChange}
                isInvalid={!!validationErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="mobileno">
              <Form.Label>Mobile Number:</Form.Label>
              <Form.Control
                type="text"
                name="mobileno"
                value={formData.mobileno}
                onChange={handleChange}
                isInvalid={!!validationErrors.mobileno}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.mobileno}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="referancenumber">
              <Form.Label>ReferenceNumber:</Form.Label>
              <Form.Control
                type="number"
                name="referencenumber"
                value={formData.referencenumber}
                style={{ border: "1px solid #ccc" }}
                onChange={handleChange}
                isInvalid={!!validationErrors.referencenumber}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.referencenumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="username">
              <Form.Label>user Name:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!validationErrors.username}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button
            variant="primary"
            type="button"
            onClick={handleUpdate}
            disabled={!formChanges}
            className="mt-4"
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AgentProfile;
