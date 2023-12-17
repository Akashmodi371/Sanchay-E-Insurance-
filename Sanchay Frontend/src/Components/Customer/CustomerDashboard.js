import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Modal, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { getRole } from "../../services/authorization (1)";
import {
  getCustomerData,
  updateCustomer,
} from "../../services/CustomerService";
import CustomerProfile from "./CustomerProfile";
import ChangePassword from "../../sharedComponents/ChangePassword";
import PlanServices from "../../services/PlanServices";
import InsuranceAccount from "./InsuranceAccount";
import Enquiry from "../../sharedComponents/query/Enquiry";
import { getQueryData } from "../../services/QueryService";
import ModalFeedback from "../../sharedComponents/query/ModalFeedback";
import { Helmet } from "react-helmet";
import "./Customer.css";
import CustomerHome from "./CustomerHome";

const CustomerDashboard = () => {
  const navigation = useNavigate();
  const accessid = localStorage.getItem("accessid");
  const [planData, setPlanData] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackdata, setFeedBackData] = useState([]);
  const [showNavbar, setShowNavbar] = useState(false);
  const[showcustomerhome,setShowCustomerHome]=useState(true)

  const [showProfile, setShowProfile] = useState(false);
  const [showInsurancePlan, setShowInsurancePlan] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showInsuranceAccount, setShowInsuranceAccount] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  const [showFeedback, setShowFeedBack] = useState(false);

  const closeAllModal = () => {
    setShowProfile(false);
    setShowInsurancePlan(false);
    setShowChangePassword(false);
    setShowInsuranceAccount(false);
    setShowQuery(false);
    setShowFeedBack(false);
    setShowCustomerHome(false);
  };

  const handleProfile = () => {
    closeAllModal();
    setShowProfile(true);
  };

  const handleChangePassword = () => {
    closeAllModal();
    setShowChangePassword(true);
  };

  const handleInsuranceAccount = () => {
    closeAllModal();
    setShowInsuranceAccount(true);
  };

  const handleInsurancePlan = () => {
    closeAllModal();
    setShowInsurancePlan(true);
  };

  const handleQuery = () => {
    closeAllModal();
    setShowQuery(true);
  };

  const handleFeedback = () => {
    closeAllModal();
    fetchQueryData();
    setShowFeedBack(true);
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem("auth");
    if (token == null) {
      navigation("/");
    } else {
      const nrole = await getRole(token);
      if (nrole !== "ROLE_CUSTOMER") {
        localStorage.clear();
        navigation("/");
      }
    }
  };

  const fetchQueryData = async () => {
    try {
      const response = await getQueryData();
      setFeedBackData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = () => {
    fetchQueryData();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setShowFeedBack(false);
  };

  const handleUpdateProfile = async (updatedData) => {
    const response = await updateCustomer(accessid, updatedData);
    if (response) {
      setCustomerData(response);
    }
  };

  const getCustomer = async () => {
    if (accessid !== undefined) {
      try {
        const response = await getCustomerData(accessid);
        setCustomerData(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    getCustomer();
  }, []);

  const handPlanNameSet = (e) => {
    setSelectedPlan(e);
  };

  const plans = async () => {
    const res = await axios.get("http://localhost:8080/planapp/getall");
    setPlanData(res.data);
  };

  let planNames;
  if (planData) {
    planNames = planData.map((bt) => {
      return (
        <Dropdown.Item
          href="#"
          value={bt.planid}
          onClick={() => {
            closeAllModal();
            handPlanNameSet(bt.planid);
            setShowInsurancePlan(true);
          }}
          style={{ whiteSpace: "normal" }}
          key={bt.planname}
        >
          {bt.planname !== null ? bt.planname : "Select plan name"}
        </Dropdown.Item>
      );
    });
  }

  useEffect(() => {
    plans();
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handles={
    handleInsuranceAccount,
    handleQuery,
    handleFeedback,
    handleProfile,
    handleChangePassword,
  }


  return (
    <>
      {/* <Helmet>
        <link href="./Customer.css" rel="stylesheet" />
      </Helmet> */}
      <div className="Customer-header fixed-top">
        <nav className="customer-navbar">
          <ul>
            <li>
              <a href="/Customerdashboard" className="text-light customer-home">
                Home
              </a>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="fw-bold"
                >
                  Customer Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleProfile}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-plan"
                  className="fw-bold"
                >
                  Insurance Plans
                </Dropdown.Toggle>
                <Dropdown.Menu>{planNames}</Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <button
                className="bg-light text-dark fw-bold"
                onClick={handleInsuranceAccount}
              >
                Insurance Account
              </button>
            </li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="fw-bold"
                >
                  Queries
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={() => {
                      handleQuery();
                      closeModal();
                    }}
                  >
                    Query
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleFeedback}
                  >
                    Feed Back
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <button
                className="bg-light text-dark fw-bold"
                onClick={() => {
                  localStorage.clear();
                  navigation("/");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className='Customer-content '>
        <div className="div-profile">
          {showProfile && (
            <CustomerProfile
              customerData={customerData}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </div>
        {showcustomerhome && <CustomerHome handles={handles}/>}
        <div className="div-changepassword">
          {showChangePassword && <ChangePassword />}
        </div>
        <div className="planservices-div">
          {showInsurancePlan && (
            <PlanServices selectedPlan={selectedPlan} accessid={accessid} closeAllModal={closeAllModal} />
          )}
        </div>
        <div className="customer-insurance-div">
          {showInsuranceAccount && <InsuranceAccount setShowInsuranceAccount={setShowInsuranceAccount}/>}
        </div>
        <div className="div-queries">{showQuery && <Enquiry />}</div>
        {showFeedback && <ModalFeedback data={feedbackdata} closeModal={closeModal} />}
      </div>
    </>
  );
};

export default CustomerDashboard;
