import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SchemeForm.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faStar } from "@fortawesome/free-solid-svg-icons";

const SchemeForm = () => {
  const [formData, setFormData] = useState({
    schemename: "",
    description: "",
    minage: "",
    maxage: "",
    minamount: "",
    maxamount: "",
    mininvesttime: "",
    maxinvesttime: "",
    registrationcommission: "",
    documentsrequired: "",
    planName: "", // Plan name dropdown
  });

  const [planNames, setPlanNames] = useState([]);

  const [errors, setErrors] = useState({
    schemename: "",
    description: "",
    minage: "",
    maxage: "",
    minamount: "",
    maxamount: "",
    mininvesttime: "",
    maxinvesttime: "",
    registrationcommission: "",
    documentsrequired: "",
    planName: "",
  });
  const documentRegex = /^[A-Za-z,.\s]*$/;

  // Fetch plan names from your API or data source
  useEffect(() => {
    axios
      .get("http://localhost:8080/planapp/getall")
      .then((response) => {
        setPlanNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching plan names:", error);
      });
  }, []);

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "schemename":
        if (!value) {
          newErrors.schemename = "Scheme Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors.schemename =
            "Scheme Name should only contain letters and spaces";
        } else {
          newErrors.schemename = "";
        }
        break;
      case "description":
        if (!value) {
          newErrors.description = "Description is required";
        } else {
          newErrors.description = "";
        }
        break;
      case "minage":
        if (!value) {
          newErrors.minage = "Minimum Age is required";
        } else {
          newErrors.minage = "";
        }
        break;
        case "maxage":
          if (!value) {
            newErrors.maxage = "Maximum Age is required";
          } else if (parseInt(value) <= parseInt(formData.minage)) {
            newErrors.maxage = "Maximum Age should be greater than Minimum Age";
          } else {
            newErrors.maxage = "";
          }
          break;
        

      case "minamount":
        if (!value) {
          newErrors.minamount = "Minimum Amount is required";
        } else {
          newErrors.minamount = "";
        }
        break;

      case "maxamount":
        if (!value) {
          newErrors.maxamount = "Maximum Amount is required";
        } 
        else if (parseInt(value) <= parseInt(formData.minamount)) {
          newErrors.maxamount = "Maximum amount should be greater than Minimum amount";
        }
        
        else {
          newErrors.maxamount = "";
        }
        break;

      case "mininvesttime":
        if (!value) {
          newErrors.mininvesttime =
            "Minimum Investment Time (in months) is required";
        } else {
          newErrors.mininvesttime = "";
        }
        break;

      case "maxinvesttime":
        if (!value) {
          newErrors.maxinvesttime =
            "Maximum Investment Time (in months) is required";
        } 
        else if (parseInt(value) <= parseInt(formData.mininvesttime)) {
          newErrors.maxinvesttime = "Maximum investiment time should be greater than Minimum investiment time";
        }
        else {
          newErrors.maxinvesttime = "";
        }
        break;

      case "registrationcommission":
        if (!value) {
          newErrors.registrationcommission = "Profit Ratio is required";
        } else {
          newErrors.registrationcommission = "";
        }
        break;
      case "documentsrequired":
        if (!value) {
          newErrors.documentsrequired = "Documents Required is required";
        } 
        else if (!documentRegex.test(value)) {
          newErrors.documentsrequired = "Documents should only contain letters, commas, and .";
        }
        else {
          newErrors.documentsrequired = "";
        }
        break;
      case "planName":
        if (!value) {
          newErrors.planName = "Plan Name is required";
        } else {
          newErrors.planName = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = Object.values(errors).every((error) => !error);

    if (isFormValid) {
      try {
        let response = await axios.post(
          `http://localhost:8080/schemeapp/addschemebyplanname?planname=${formData.planName}`,
          {
            schemename: formData.schemename,
            description: formData.description,
            minage: formData.minage,
            maxage: formData.maxage,
            minamount: formData.minamount,
            maxamount: formData.maxamount,
            mininvesttime: formData.mininvesttime,
            maxinvesttime: formData.maxinvesttime,
            registrationcommission: formData.registrationcommission,
            documentsrequire: formData.documentsrequired,
          }
        );

        console.log("Form data submitted successfully:", response.data);
        Swal.fire("Done", response.data, "");
        // Reset the form or perform any necessary actions
        setFormData({
          schemename: "",
          description: "",
          minage: "",
          maxage: "",
          minamount: "",
          maxamount: "",
          mininvesttime: "",
          maxinvesttime: "",
          registrationcommission: "",
          documentsrequired: "",
          planName: "",
        });
      } catch (error) {
        console.log(error);
        Swal.fire("", error.response.data, "error");
      }
    }
  };

  return (
    <div className="scheme-form-container">
      <h2 className="text-center mb-4 fw-bold">Add Scheme</h2>
      <form onSubmit={handleSubmit} className="scheme-form">
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="schemename">Scheme Name*</label>
            <input
              type="text"
              id="schemename"
              name="schemename"
              value={formData.schemename}
              onChange={handleInputChange}
              required
              pattern="[A-Za-z\s]+"
              title="Only letters and spaces are allowed"
              className={`form-control ${
                errors.schemename ? "is-invalid" : ""
              }`}
            />
          </div>

          {errors.schemename && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.schemename}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="planName">Select Plan Name*</label>
          <select
            id="planName"
            name="planName"
            value={formData.planName}
            onChange={handleInputChange}
            required
            className={`form-control ${errors.planName ? "is-invalid" : ""}`}
            style={{ width: "330px" }}
          >
            <option value="">Select a Plan Name</option>
            {planNames.map((plan) => (
              <option key={plan.planname} value={plan.planname}>
                {plan.planname}
              </option>
            ))}
          </select>
          {errors.planName && (
            <div className="invalid-feedback">{errors.planName}</div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="description">Description*</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
            />
          </div>

          {errors.description && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.description}
            </div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="minage">Minimum Age*</label>
            <input
              type="number"
              id="minage"
              name="minage"
              value={formData.minage}
              onChange={handleInputChange}
              required
              className={`form-control ${errors.minage ? "is-invalid" : ""}`}
              min="0"
              step="1"
            />
          </div>

          {errors.minage && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.minage}
            </div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="maxage">Maximum Age*</label>
            <input
              type="number"
              id="maxage"
              name="maxage"
              value={formData.maxage}
              onChange={handleInputChange}
              required
              className={`form-control ${errors.maxage ? "is-invalid" : ""}`}
              min="0"
              step="1"
            />
          </div>

          {errors.maxage && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.maxage}
            </div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="minamount">Minimum Amount*</label>
            <input
              type="number"
              id="minamount"
              name="minamount"
              value={formData.minamount}
              onChange={handleInputChange}
              required
              className={`form-control ${errors.minamount ? "is-invalid" : ""}`}
              min="0"
              step="1"
            />
          </div>

          {errors.minamount && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.minamount}
            </div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="maxamount">Maximum Amount*</label>
            <input
              type="number"
              id="maxamount"
              name="maxamount"
              value={formData.maxamount}
              onChange={handleInputChange}
              required
              className={`form-control ${errors.maxamount ? "is-invalid" : ""}`}
              min="0"
              step="1"
            />
          </div>

          {errors.maxamount && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.maxamount}
            </div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="mininvesttime">
              Minimum Investment Time (in months)*
            </label>
            <input
              type="number"
              id="mininvesttime"
              name="mininvesttime"
              value={formData.mininvesttime}
              onChange={handleInputChange}
              required
              className={`form-control ${
                errors.mininvesttime ? "is-invalid" : ""
              }`}
              min="0"
              step="1"
            />
          </div>
          {errors.mininvesttime && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.mininvesttime}
            </div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="maxinvesttime">
              Maximum Investment Time (in months)*
            </label>
            <input
              type="number"
              id="maxinvesttime"
              name="maxinvesttime"
              value={formData.maxinvesttime}
              onChange={handleInputChange}
              required
              className={`form-control ${
                errors.maxinvesttime ? "is-invalid" : ""
              }`}
              min="0"
              step="1"
            />
          </div>

          {errors.maxinvesttime && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.maxinvesttime}
            </div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="documentsrequired">Documents Required*</label>
            <input
              type="text"
              id="documentsrequired"
              name="documentsrequired"
              value={formData.documentsrequired}
              onChange={handleInputChange}
              required
              className={`form-control ${
                errors.documentsrequired ? "is-invalid" : ""
              }`}
            />
          </div>

          {errors.documentsrequired && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.documentsrequired}
            </div>
          )}
        </div>
        <div
          className="form-group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <label htmlFor="registrationcommission">Profit Ratio*</label>
            <input
              type="number"
              id="registrationcommission"
              name="registrationcommission"
              value={formData.registrationcommission}
              onChange={handleInputChange}
              required
              className={`form-control ${
                errors.registrationcommission ? "is-invalid" : ""
              }`}
              min="0"
              step="1"
            />
          </div>

          {errors.registrationcommission && (
            <div
              className="invalid-feedback"
              style={{ display: "flex", fontSize: "12px", marginLeft: "160px" }}
            >
              {errors.registrationcommission}
            </div>
          )}
        </div>
        <div className="form-actions text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchemeForm;
