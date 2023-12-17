import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { getRole } from "../../services/authorization (1)";
import "./Admin.css";
import { Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import AdminHome from "./AdminHome";
import AgentRegister from "../Agent/AgentRegister";
import ViewAgentTable from "../Agent/ViewAgentTable/ViewAgentTable";
import { Helmet } from "react-helmet";
import ViewCustomerTable from "../Customer/ViewCustomer/ViewCustomerTable";
import ViewInsurancetable from "./ViewAdminInsurance/ViewInsurancetable";
import { getQueryData } from "../../services/QueryService";
import AdminViewFeedBack from "./ViewQueryFeedBack/AdminViewFeedBack";
import AddPlan from "./PlanAddOrView/AddPlan";
import ViewPlans from "./PlanAddOrView/ViewPlans";
import SchemeForm from "./AddSchemeorView/SchemeForm";
import ViewSchemeTable from "./AddSchemeorView/ViewSchemeTable";
import AddEmployee from "./AddSchemeorView/AddEmployee";
import AddAdmin from "./AddSchemeorView/AddAdmin";
import HandleProfile from "./AddSchemeorView/HandleProfile";
import EmployeeRegister from "../Employee/EmployeeRegister";
import AdminRegister from "./AdminRegister";
import AdminProfile from "./AdminProfile";
import ChangeAdminPassword from "./ChangeAdminPassword";
import ViewEmployeeTable from "./ViewEmployeeTable/ViewEmployeeTable";
import ViewAdminTable from "./ViewAdminTable/ViewAdminTable";

const AdminDashboard = () => {
  const accessid = localStorage.getItem("accessid");

  const [showNavbar, setShowNavbar] = React.useState(false);
  const [showHomepage, setShowHomePage] = useState(true);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [showViewAgent, setShowViewAgent] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [viewAgentData, setViewAgentData] = useState([]);
  const [viewInsurancetable, setViewInsurancetable] = useState(false);
  const [agentData, setAgentData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [insurancetabledata, setinsurancetabledata] = useState({});
  const [Viewqueryfeedback, setQueryFeedBack] = useState(false);
  const [viewschemetable, setViewSchemeTable] = useState(false);
  // const[viewPlanAddModal,setViewPlanAddModal]=useState(false);
  const [feedbackdata, setFeedBackData] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [viewPlansForm, setViewPlans] = useState(false);
  const [plansData, setPlansData] = useState({});
  const [addSchemeForm, setAddSchemeForm] = useState(false);
  const [viewSchemeData, setViewSchemeData] = useState({});

  const [viewEmployeeData, setViewEmployeeData] = useState({});
  const [viewEmployeeTable, setViewEmployeeTable] = useState(false);
  const [showAddAdmin, setAddAdmin] = useState(false);
  const [showAddEmployee, setAddEmployee] = useState(false);
  const [showAdminProfile, setAdminProfile] = useState(false);
  const [adminProfileData, setAdminProfileData] = useState({});
  const [showChangePassword, setChangePassword] = useState(false);
  const [viewAdminData, setViewAdminData] = useState({});
  const [showAdminsTable, setShowAdminTable] = useState(false);

  const [planData, setPlanData] = useState("");
  const [planName, setPlanName] = useState("");

  const navigation = useNavigate();

  const authenticateuser = async () => {
    const token = localStorage.getItem("auth");
    if (token == null) {
      navigation("/");
    } else {
      const nrole = await getRole(token);
      console.log(nrole);
      if (nrole !== "ROLE_ADMIN") {
        localStorage.clear();
        navigation("/");
      }
    }
  };

  const OffAllModal = () => {
    setChangePassword(false);
    setAdminProfile(false);
    setAddEmployee(false);
    setAddAdmin(false);
    setShowAddAgent(false);
    setViewInsurancetable(false);
    setAddSchemeForm(false);
    setViewSchemeTable(false);
    setShowViewAgent(false);
    setViewPlans(false);
    setViewEmployeeTable(false);
    setShowCustomers(false);
    setViewInsurancetable(false);
    setQueryFeedBack(false);
    setShowPlanModal(false);
    setShowAdminTable(false);
    setShowHomePage(false)
  };

  const handleChangePassword = () => {
    OffAllModal();
    setChangePassword(true);
  };

  const handleProfile = async () => {
    OffAllModal();
    const adminid = localStorage.getItem("accessid");
    try {
      const response = await axios.get(
        `http://localhost:8080/adminapp/getadmin/${adminid}`
      );
      setAdminProfileData(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }

    setAdminProfile(true);
  };

  const handleAddEmployee = () => {
    OffAllModal();
    setAddEmployee(true);
  };
  const handleAddAdmin = () => {
    OffAllModal();

    setAddAdmin(true);
  };

  const handleAddAgent = () => {
    OffAllModal();

    setShowAddAgent(true);
  };

  const handleViewSchemeTable = async () => {
    OffAllModal();

    try {
      const response = await axios.get(
        "http://localhost:8080/schemeapp/getall"
      );
      console.log(response.data,"schemedata");
      setViewSchemeData(response.data);
      // console.log(response.data, "insuhere ");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    setViewSchemeTable(true);
  };

  const handleAddSchemeForm = () => {
    OffAllModal();
    setAddSchemeForm(true);
  };

  const handleAddPlan = () => {
    OffAllModal();

    setShowPlanModal(true);
  };

  const handleViewAgent = async () => {
    OffAllModal();

    try {
      const response = await axios.get("http://localhost:8080/agentapp/agents");
      setAgentData(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
    setShowViewAgent(true);
  };

  const handleViewPlans = async () => {
    OffAllModal();
    try {
      const response = await axios.get("http://localhost:8080/planapp/getall");
      setPlansData(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
    setViewPlans(true);
  };

  const handleViewEmployee = async () => {
    OffAllModal();
    try {
      const response = await axios.get(
        "http://localhost:8080/employeeapp/employees"
      );
      setViewEmployeeData(response.data);
    } catch (error) {
      alert(error.message);
    }
    setViewEmployeeTable(true);
  };

  const handleViewAdmin = async () => {
    OffAllModal();

    try {
      const response = await axios.get("http://localhost:8080/adminapp/admins");
      console.log(response.data);
      setViewAdminData(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }

    // setViewAdminData(true);

    setShowAdminTable(true);
  };

  const handleViewCustomer = async () => {
    OffAllModal();
    try {
      const response = await axios.get(
        "http://localhost:8080/customerapp/customers"
      );
      setCustomerData(response.data);
    } catch (error) {
      alert(error.message);
    }
    setShowCustomers(true);
  };

  const handleviewInsurancetable = async () => {
    OffAllModal();
    try {
      const response = await axios.get(
        "http://localhost:8080/policyapp/getall"
      );
      console.log(response.data,"insurance account");
      setinsurancetabledata(response.data);
    } catch (error) {
      alert(error.message);
    }
    setViewInsurancetable(true);
  };

  const handlqueryfeedback = () => {
    OffAllModal();
    fetchQueryData();

    setQueryFeedBack(true);
  };

  const fetchQueryData = async () => {
    try {
      const response = await getQueryData();
      // console.log(response);
      setFeedBackData(response);
      // Set the fetched data in the state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const closeModal = () => {
    setQueryFeedBack(false); // Close the modal
  };
  const closePlanModal = () => {
    setViewPlans(false);
  };

  useEffect(() => {
    authenticateuser();
  }, []);
  
  const plans = async () => {
    try {
      const res = await axios.get("http://localhost:8080/planapp/getall");
    if (res != null) {
      setPlanData(res.data);
    }
    } catch (error) {
      // alert(error.message)
    }

    
  };

  let planNames;
  if (planData) {
    planNames = planData.map((bt) => {
      return (
        <Dropdown.Item
          href="#"
          value={bt.planname}
          onClick={() => {
            handleViewPlans();
          }}
          style={{ whiteSpace: "normal" }}
        >
          {bt.planname !== null ? bt.planname : "select plan name"}
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
    handleAddAgent,
    handleViewAgent,
    handleViewCustomer,
    handleviewInsurancetable,
    handlqueryfeedback,
    handleAddPlan,
    handleViewPlans,
    handleAddSchemeForm,
    handleViewSchemeTable,
    handleProfile,
    handleChangePassword,
    handleAddEmployee,
    handleViewEmployee,
    handleViewAdmin,
    handleAddAdmin
  }

  return (
    <>
      <div className="admin-header fixed-top">
        <nav className="admin-navbar ">
          <ul>
          <li>
              <a href="/AdminDashboard" className="text-light customer-home">
                Home
              </a>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Agent
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleAddAgent}
                  >
                    Add Agent
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleViewAgent}
                  >
                    View Agent
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
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleViewCustomer}
                  >
                    View Customer
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleviewInsurancetable}
                  >
                    Insurance Account
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Queries
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={() => {
                      handlqueryfeedback();
                    }}
                  >
                    View Feedback
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Insurance Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleAddPlan}
                  >
                    Add Insurance Plan
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleViewPlans}
                  >
                    View Insurance Plans
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleAddSchemeForm}
                  >
                    Add Insurance Scheme
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleViewSchemeTable}
                  >
                    View Insurance Schemes
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleAddEmployee}
                  >
                    Add Employee
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleViewEmployee}
                  >
                    View Employee
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleAddAdmin}
                  >
                    Add Admin
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleViewAdmin}
                  >
                    view Admin
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
      <div className="admin-content">
        {showHomepage && <AdminHome  handles={handles}/>}
        {showAddAgent && <AgentRegister />}
        {showViewAgent && <ViewAgentTable agentData={agentData} handleViewAgent={handleViewAgent} />}
        {showCustomers && <ViewCustomerTable customerData={customerData} />}
        {viewInsurancetable && (
          <ViewInsurancetable insurancetabledata={insurancetabledata} />
        )}
        {Viewqueryfeedback && (
          <AdminViewFeedBack
            data={feedbackdata}
            closeModal={closeModal}
            setQueryFeedBack={setQueryFeedBack}
          />
        )}
        {showPlanModal && <AddPlan onClose={closePlanModal} />}
        {viewPlansForm && <ViewPlans planData={plansData} />}
        {addSchemeForm && <SchemeForm />}
        {viewschemetable && <ViewSchemeTable schemeData={viewSchemeData} />}
        {showAddEmployee && <EmployeeRegister />}
        {showAddAdmin && <AdminRegister />}
        {viewEmployeeTable && <ViewEmployeeTable data={viewEmployeeData} />}
        {showAdminProfile && <AdminProfile data={adminProfileData} />}
        {showChangePassword && <ChangeAdminPassword />}
        {showAdminsTable && <ViewAdminTable data={viewAdminData} />}
      </div>
    </>
  );
};

export default AdminDashboard;
