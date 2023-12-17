import React, { useEffect, useState } from "react";
import "./Employee.css"; // You can reuse some styles from Customer.css if needed
import { useNavigate } from "react-router-dom";
import { getRole } from "../../services/authorization (1)";
import { Button, Dropdown, Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import axios from "axios";
import Swal from "sweetalert2";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeChangePassword from "./EmployeeChangePassword";
import ViewCustomerTable from "../Customer/ViewCustomer/ViewCustomerTable";
import ViewAllPolicies from "./ViewAllPolicies";
import EmployeeHome from "./EmployeeHome";

const EmployeeDashboard = () => {
  const navigation = useNavigate();
  const[showHome,setShowhome]=useState(true)
  const accessid = localStorage.getItem("accessid");
  const [showProfile, setShowProfile] = useState(false);
  const [ProfileData, setProfileData] = useState({});
  const [showEmployeechange, setShowEmployeeChange] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [customersData, setCustomersData] = useState({});
  const [showpolicies, setShowPolicies] = useState(false);
  const [policiesdata, setPoliciesData] = useState("");

  const authenticateuser = async () => {
    const token = localStorage.getItem("auth");
    if (token == null) {
      navigation("/");
    } else {
      const nrole = await getRole(token);
      console.log(nrole);
      if (nrole !== "ROLE_EMPLOYEE") {
        localStorage.clear();
        navigation("/");
      }
    }
  };

  const OffAllModals = () => {
    setShowProfile(false);
    setShowEmployeeChange(false);
    setShowCustomers(false);
    setShowPolicies(false);
    setShowhome(false)
  };

  const handleHome=()=>{
    OffAllModals();
    setShowhome(true);
  }

  const getEmployeeData = async () => {
    if (accessid !== undefined) {
      try {
        const response = await axios.get(
          `http://localhost:8080/employeeapp/employee/${accessid}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleForShowProfile = async () => {
    OffAllModals();
    setShowProfile(true);
  };

  const handleUpdateProfile = async (updatedData) => {
    const response = await axios.post(
      `http://localhost:8080/employeeapp/update/${accessid}`,
      {
        firstname: updatedData.firstname,
        lastname: updatedData.lastname,
        email: updatedData.email,
        username: updatedData.UserInfo.username,
      }
    );

    if (response) {
      setProfileData(response);
    }
  };

  const handleforChangepassword = () => {
    OffAllModals();
    setShowEmployeeChange(true);
  };

  const handleforShowCustomers = async () => {
    OffAllModals();
    try {
      const response = await axios.get(
        "http://localhost:8080/customerapp/customers"
      );
      console.log(response.data);
      setCustomersData(response.data);
    } catch (error) {
      alert(error.meesage);
    }
    setShowCustomers(true);
  };

  const handleforShowPolicies = async () => {
    OffAllModals();
    try {
      const response = await axios.get(
        "http://localhost:8080/policyapp/getall"
      );
      setPoliciesData(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.meesage);
    }
    setShowPolicies(true);
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  useEffect(() => {
    authenticateuser();
  }, []);

  const [showNavbar, setShowNavbar] = React.useState(false);

  console.log("outside the nav");

const handles={
  handleForShowProfile,
  handleforChangepassword,
  handleforShowCustomers,
  handleforShowPolicies,
  }

  return (
    <>
      <div className="employee-header fixed-top">
        <nav className="employee-navbar">
          <ul>
            <li>
              <h4 className="text-light"> Welcome {ProfileData.firstname}</h4>
            </li>
            <li>
              <button
                className="bg-light text-dark"
                onClick={handleHome}
              >
                Home
              </button>
            </li>

            <li>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Account
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleForShowProfile}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleforChangepassword}
                  >
                    Change Password
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Insurance
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    style={{ whiteSpace: "normal" }}
                    onClick={handleforShowCustomers}
                  >
                    View customers
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleforShowPolicies}
                  >
                    View Policies
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li>
              <Button
                variant="light"
                onClick={() => {
                  localStorage.clear();
                  navigation("/");
                }}
              >
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="employee-content">
      {showHome && <EmployeeHome handles={handles}/>}
        {showProfile && (
          <EmployeeProfile
            employeeData={ProfileData}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {showEmployeechange && <EmployeeChangePassword />}
        {showCustomers && <ViewCustomerTable customerData={customersData} />}

        {showpolicies && <ViewAllPolicies policiesData={policiesdata} />}
      </div>
    </>
  );
};

export default EmployeeDashboard;
