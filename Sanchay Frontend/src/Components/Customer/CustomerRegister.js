import React, { useState } from "react";
import "./CustomerRegister.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { subYears } from "date-fns";
import CustomDatePickerInput from "./../../sharedComponents/CustomDatePickerInput";

const CustomerRegister = () => {
  // State variables for form fields and errors
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [nominee, setNominee] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation function for each field
  const validateField = (fieldName, value) => {
    const usernameRegex = /^[A-Za-z0-9]*$/;
    const PASSWORD_REGEX =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!^\d)(?!.*\s).{8,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const newErrors = { ...errors };

    switch (fieldName) {
      case "firstName":
        if (!value) {
          newErrors.firstName = "First Name is required";
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          newErrors.firstName = "First Name should only contain letters";
        } else {
          delete newErrors.firstName;
        }
        break;
      case "lastName":
        if (!value) {
          newErrors.lastName = "Last Name is required";
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          newErrors.lastName = "Last Name should only contain letters";
        } else {
          delete newErrors.lastName;
        }
        break;
      case "userName":
        if (!value) {
          newErrors.userName = "User Name is required";
        } else if (!usernameRegex.test(value)) {
          newErrors.userName =
            "User Name should contain characters and numbers and start with a character";
        } else {
          delete newErrors.userName;
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
      case "address":
        if (!value) {
          newErrors.address = "Address is required";
        } else {
          delete newErrors.address;
        }
        break;
      case "city":
        if (!value) {
          newErrors.city = "City is required";
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          newErrors.city = "City should only contain letters";
        } else {
          delete newErrors.city;
        }
        break;
      case "state":
        if (!value) {
          newErrors.state = "State is required";
        } else if (!/^[A-Za-z\s]+$/i.test(value)) {
          newErrors.state = "State should only contain letters and spaces";
        } else {
          delete newErrors.state;
        }
        break;
      case "pincode":
        if (!value) {
          newErrors.pincode = "Pincode is required";
        } else if (!/^[0-9]{6}$/.test(value)) {
          newErrors.pincode =
            "Pincode must be 6 digits long and contain only numbers";
        } else {
          delete newErrors.pincode;
        }
        break;
      case "mobileNo":
        if (!value) {
          newErrors.mobileNo = "Mobile Number is required";
        } else if (!mobileRegex.test(value)) {
          newErrors.mobileNo = "Mobile Number must be exactly 10 digits";
        } else {
          delete newErrors.mobileNo;
        }
        break;
      case "birthdate":
        if (!value) {
          newErrors.birthdate = "Birthdate is required";
        } else {
          delete newErrors.birthdate;
        }
        break;
      case "nominee":
        if (!value) {
          newErrors.nominee = "Nominee is required";
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          newErrors.nominee = "Nominee should only contain letters";
        } else {
          delete newErrors.nominee;
        }
        break;
      case "nomineeRelation":
        if (!value) {
          newErrors.nomineeRelation = "Nominee Relation is required";
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          newErrors.nomineeRelation =
            "Nominee Relation should only contain letters";
        } else {
          delete newErrors.nomineeRelation;
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (!PASSWORD_REGEX.test(value)) {
          newErrors.password =
            "Password must be at least 8 characters long and contain lowercase, uppercase, numbers, and special characters";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Confirm Password is required";
        } else if (value !== password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Handle input change for form fields
  const handleInputChange = (fieldName, value) => {
    validateField(fieldName, value);

    switch (fieldName) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "pincode":
        setPincode(value);
        break;
      case "mobileNo":
        setMobileNo(value);
        break;
      case "birthdate":
        setBirthdate(value);
        break;
      case "nominee":
        setNominee(value);
        break;
      case "nomineeRelation":
        setNomineeRelation(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post(
          "http://localhost:8080/customerapp/register",
          {
            firstname: firstName,
            lastname: lastName,
            email,
            address,
            state,
            city,
            pincode,
            mobileno: mobileNo,
            birthdate,
            // nominee,
            // nomineerelation: nomineeRelation,
            userInfo: {
              username: userName,
              password,
            },
          }
        );

        Swal.fire("Registered", "Successfully", "success");
        console.log(res);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(error.response.data);
      }
    }
  };

  return (
    <div className="registration-form-container mx-2 my-2">
      <div>
        <h2 className="text-center fw-bold " style={{ marginTop: "100px" }}>
          CUSTOMER REGISTRATION
        </h2>
      </div>

      <div className="form-scroll-container">
        <Form onSubmit={handleSubmit} className="registration-form">
          <Row>
            <Col>
              {/* First Name */}
              <Form.Group controlId="firstName">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  isInvalid={!!errors.firstName}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/* Last Name */}
              <Form.Group controlId="lastName">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  isInvalid={!!errors.lastName}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* User Name */}
              <Form.Group controlId="userName">
                <Form.Label>User Name*</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
                  isInvalid={!!errors.userName}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.userName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/* Email */}
              <Form.Group controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  isInvalid={!!errors.email}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* Address */}
              <Form.Group controlId="address">
                <Form.Label>Address*</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  isInvalid={!!errors.address}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/* City */}
              <Form.Group controlId="city">
                <Form.Label>City*</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  isInvalid={!!errors.city}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* State */}
              <Form.Group controlId="state">
                <Form.Label>State*</Form.Label>
                <Form.Control
                  type="text"
                  value={state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  isInvalid={!!errors.state}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/* Pincode */}
              <Form.Group controlId="pincode">
                <Form.Label>Pincode*</Form.Label>
                <Form.Control
                  type="text"
                  value={pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  isInvalid={!!errors.pincode}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.pincode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* Mobile No */}
              <Form.Group controlId="mobileNo">
                <Form.Label>Mobile No*</Form.Label>
                <Form.Control
                  type="text"
                  value={mobileNo}
                  onChange={(e) =>
                    handleInputChange("mobileNo", e.target.value)
                  }
                  isInvalid={!!errors.mobileNo}
                  size="sm"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.mobileNo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/* Birthdate */}
              <Form.Group controlId="birthdate">
                <Form.Label>Birthdate*</Form.Label>
                <br />
                <DatePicker
                  selected={birthdate}
                  onChange={(date) => handleInputChange("birthdate", date)}
                  dateFormat="yyyy-MM-dd"
                  size="sm"
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  maxDate={subYears(new Date(), 1)} // Allow dates up to 1 year ago
                  minDate={subYears(new Date(), 100)} // Allow dates up to 100 years ago
                  customInput={<CustomDatePickerInput />} // Use a custom input field
                  className={`form-control form-control-sm ${
                    errors.birthdate ? "is-invalid" : ""
                  }`}
                />
                {errors.birthdate && (
                  <div
                    className="invalid-feedback"
                    style={{ fontSize: "10px" }}
                  >
                    {errors.birthdate}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* Password */}
              <Form.Group controlId="password">
                <Form.Label>Password*</Form.Label>
                <div className="password-input password-input-div-customer">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onBlur={(e) => validateField("password", e.target.value)}
                    isInvalid={!!errors.password}
                    style={{width:'250px',marginTop:'20px'}}
                    size="sm"
                  />
                  <div className="password-toggle text-dark" style={{marginLeft:'20px',marginTop:'20px'}} onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </div>
                </div>
                <div className="error-text">
                  {errors.password && <span className="text-danger" style={{ fontSize: "10px" }}>{errors.password}</span>}
                </div>
              </Form.Group>
            </Col>
            <Col>
              {/* Confirm Password */}
              <Form.Group controlId="confirmPassword">
                <Form.Label >Confirm Password*</Form.Label>
                <div className="password-input password-input-div-customer">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    onBlur={(e) => validateField("confirmPassword", e.target.value)}
                    isInvalid={!!errors.confirmPassword}
                    style={{width:'250px'}}
                    size="sm"
                  />
                  <div className="password-toggle text-dark" style={{marginLeft:'20px',marginTop:'10px'}} onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </div>
                </div>
                <div className="error-text">
                  {errors.confirmPassword && <span className="text-danger" style={{ fontSize: "10px" ,lineHeight:'2px'}}>{errors.confirmPassword}</span>}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center">
            <Button
              type="submit"
              variant="success"
              style={{ fontSize: "20px" }}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CustomerRegister;
