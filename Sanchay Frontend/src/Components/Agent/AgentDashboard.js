import React, { useEffect, useState } from "react";
import "./Agent.css"; // You can reuse some styles from Customer.css if needed
import { useNavigate } from "react-router-dom";
import { getRole } from "../../services/authorization (1)";
import { Button, Dropdown, Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import axios from "axios";
import AgentProfile from "./AgentProfile"; // Create or import AgentProfile component
import ChangeAgentPassword from "./ChangeAgentPassword"; // Create or import ChangeAgentPassword component
import ViewAgentCommision from "./ViewAgentCommision"; // Create or import ViewAgentCommision component // Create or import MarketingAgent component
import MarketingEmail from "./MarketingEmail"; // Create or import MarketingEmail component
import ViewAgentCustomers from "./ViewAgentCustomers";
import ViewInsurance from "./ViewShowInsurance/ViewInsurance";
import Swal from "sweetalert2";
import Withdrawamount from "./Withdrawamount";
import AgentHome from "./AgentHome";
import PolicyCommissiontable from "./PolicyCommissiontable";



const AgentDashboard = () => {
  const navigation = useNavigate();
  const [agentProfileData, setAgentProfileData] = useState({});
  const [showAgentProfile, setShowAgentProfile] = useState(false);
  const [showChangePassword, setChangePassword] = useState(false);
  const [showViewCustomer, setViewCustomer] = useState(false);
  const [showViewCommission, setViewCommission] = useState(false);
  const [viewCustomerData, setViewCustomerData] = useState({});
  const [viewComissionData, setViewComissionData] = useState('  ');
  const [viewMarketing, setViewMarketing] = useState(false);
  const [viewMarketingEmail, setMarketingEmail] = useState(false);
  const[showHome,setShowhome]=useState(true)
  const [showInsurance, setShowInsurance] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false); // State to control Withdraw Amount Modal
  const [withdrawAmount, setWithdrawAmount] = useState(""); // State to store withdrawal amount
  const [viewInsurancedata, setViewInsuranceData] = useState([]);
  const [showNavbar, setShowNavbar] = React.useState(false);
  const accessid = localStorage.getItem("accessid");
  const[agentStatus,setAgentStatus]=useState('ACTIVE')
  const[policycommissiodata,setPolicyCommissionData]=useState({})
  


  const authenticateuser = async () => {
    const token = localStorage.getItem("auth");
    if (token == null) {
      navigation("/");
    } else {
      const nrole = await getRole(token);
      console.log(nrole);
      if (nrole !== "ROLE_AGENT") {
        localStorage.clear();
        navigation("/");
      }
    }
  };

  const verifyagentstatus=()=>{
    if(agentStatus!== 'ACTIVE'){
      navigation('/');
    }
    else{
    }
  }


  setTimeout(() => { 
    if(agentStatus!=='ACTIVE'){
      navigation('/')
      Swal.fire(
        'Contact Company',
        'Not Allowed to login',
        'warning'
      )
    }
  }, 1000);


  const OffAllModals = () => {
    setShowhome(false);
    setViewMarketing(false);
    setShowInsurance(false);
    setShowAgentProfile(false);
    setChangePassword(false);
    setViewCustomer(false);
    setViewCommission(false);
    setMarketingEmail(false);
    setShowWithdrawModal(false); // Close the Withdraw Amount Modal
    setWithdrawAmount(""); // Clear the withdrawal amount
  };

  const handlePolicyComissionview= async()=>{
    OffAllModals();

    let response=await axios.get(`http://localhost:8080/agentapp/getbypolicycommission/${accessid}`);

    setPolicyCommissionData(response.data);


    setViewCommission(true);
  }

  const handleMarketingEmail = () => {
    OffAllModals();
    setMarketingEmail(true);
  };

  const handleProfile = async () => {
    OffAllModals();
    // const adminid = localStorage.getItem("accessid");
    // try {
    //   const response = await axios.get(
    //     `http://localhost:8080/agentapp/getbyid/${adminid}`
    //   );
    //   setAgentProfileData(response.data);
    //   setAgentStatus(response.data.status)
    //   console.log(response.data);
    // } catch (error) {
    //   alert(error.message);
    // }
    setShowAgentProfile(true);
  };

  const handleChangePassword = () => {
    OffAllModals();
    setChangePassword(true);
  };

  const handleViewInsurance = async () => {
    OffAllModals();
    const response = await axios.get(
      `http://localhost:8080/policyapp/agent/${accessid}`
    );
    setViewInsuranceData(response.data);
    setShowInsurance(true);
  };

  const handleViewCustomers = async () => {
    OffAllModals();
    try {
      const response = await axios.get(
        `http://localhost:8080/policyapp/customerbyagent/${accessid}`
      );
      console.log(response.data,"here customer of agent");

      setViewCustomerData(response.data);
      // console.log(response.data, "Handl data");
    } catch (error) {
      alert(error.message);
    }
    setViewCustomer(true);
  };

  const handleViewCommission = async () => {
    // OffAllModals();
    try {
      const response = await axios.get(
        `http://localhost:8080/agentapp/getcommision/${accessid}`
      );
      var number = response.data;
      var roundedNumber = number.toFixed(2);
      setViewComissionData(roundedNumber);
      console.log(response.data);
      // Swal.fire(`Total available Commission ${response.data}`);
    } catch (error) {
      alert(error.message);
    }
    
  };

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const getAgentData = async () => {
    const adminid = localStorage.getItem("accessid");
    try {
      const response = await axios.get(
        `http://localhost:8080/agentapp/getbyid/${adminid}`
      );
      setAgentProfileData(response.data);
      setAgentStatus(response.data.status);
      console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    authenticateuser();
  }, []);

  useEffect(() => {
    getAgentData(); 
  }, []);

  const handleOpenWithdrawModal = () => {
    OffAllModals();
    setShowWithdrawModal(true);
  };

  const handleCloseWithdrawModal = () => {
    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  const handleWithdrawAmountSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/agentapp/withdrawamount/${withdrawAmount}/${accessid}`
      );
      Swal.fire("", response.data, "");
      handleCloseWithdrawModal();
    } catch (error) {
      Swal.fire(
        "Error",
        "Insufficient amount. Please try again.",
        "error"
      );
    }
  };

  const handleagenthome=()=>{
    OffAllModals();
    setShowhome(true);
  }

  const handles={
    handleMarketingEmail,
    handleViewCustomers,
    handleViewInsurance,
    handleProfile,
    handleChangePassword,
    handlePolicyComissionview,
    handleViewCommission,
    handleOpenWithdrawModal
  }


  return (
    <>
      <div className="agent-header fixed-top">
        <nav className="agent-navbar ">
          <ul>
            <li>
              <Button
                variant="light"
                onClick={handleagenthome}
              >
                Home
              </Button>
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
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li>
              <Button variant="light" onClick={handleMarketingEmail}>
                Marketing
              </Button>
            </li>

            <li>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Insurance
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    style={{ whiteSpace: "normal" }}
                    onClick={handleViewCustomers}
                  >
                    View customers
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={handleViewInsurance}
                  >
                    {" "}
                    insurance Account
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
                    onClick={()=>{handlePolicyComissionview();handleViewCommission();}}
                  >
                    view commission
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    style={{ whiteSpace: "normal" }}
                    onClick={()=>{handleOpenWithdrawModal();handleViewCommission()}} // Open Withdraw Amount Modal
                  >
                    view commission withdrawal
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
      <div className="agent-content">
      {showHome && <AgentHome handles={handles}/>}
      {showAgentProfile && <AgentProfile agentData={agentProfileData} />}
      {showChangePassword && <ChangeAgentPassword />}
      {showViewCustomer && (
        <ViewAgentCustomers agentCustomers={viewCustomerData} />
      )}
      {viewMarketingEmail && <MarketingEmail />}
      {showInsurance && <ViewInsurance data={viewInsurancedata} />}
    {showViewCommission && <PolicyCommissiontable data={policycommissiodata} viewComissionData={viewComissionData}/>}

      
      <Modal show={showWithdrawModal} onHide={handleCloseWithdrawModal} className="modal-commisson">
        <Modal.Header closeButton>
          <Modal.Title >Withdraw Amount <br /> Available Commission {viewComissionData}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="withdrawAmount" className="form-label">
              Enter Amount:
            </label>
            <input
              type="number"
              className="form-control"
              id="withdrawAmount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWithdrawModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleWithdrawAmountSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      
    </>
  );
};

export default AgentDashboard;
