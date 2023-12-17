import React, { useEffect, useState } from 'react';
import { getPolicyOfCustomer } from '../../services/SchemesService';
import axios from 'axios';
import ViewPolicyPayment from '../Payment/ViewPolicyPayment';
import './InsuranceAccount.css'
import Swal from 'sweetalert2';

const InsuranceAccount = ({setShowInsuranceAccount}) => {

  // State to store policy data
  const [policyData, setPolicyData] = useState([]);
  const[showSpecific,setShowSpecific]=useState()
  const accessId = localStorage.getItem("accessid");
  const[temp,setTemp]=useState()

  // Function to fetch policy data
  const fetchPolicyData = async () => {
    try {
      // Make an API request to get policy data for the customer
      const response = await getPolicyOfCustomer(accessId);
      console.log(response);
      // Set the fetched policy data in the state
      setPolicyData(response);
    } catch (error) {
      console.log(error);
      Swal.fire('',error.response.data,'error');
    }
  };

  // useEffect to fetch policy data when the component mounts
  useEffect(() => {
    fetchPolicyData();
  }, []);

  // Function to handle paying a policy
  const handlePayPolicy = async (policyNumber, policyStatus) => {
    // Add your logic to handle paying the policy here
    if (policyStatus === 'VERIFIED') {

      // setShowInsuranceAccount(false);
      let response=await axios.get(`http://localhost:8080/policyapp/getbypolicynumber?policynumber=${policyNumber}`)
      console.log(response.data);
      setPolicyData(response.data);
      setTemp(Math.random())

    } else {
      
    }
  };


  return (
    <>
      <div className="policy-div text-dark">
      <h1 className='mb-3'>All Policies</h1>
      <div className='policy-customer-div'>
      {policyData && policyData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Policy Number</th>
              <th>Issue Date</th>
              <th>Maturity Date</th>
              <th>Premium Type</th>
              <th>Premium Amount</th>
              <th>Status</th>
              {/* <th>Agent ID</th> */}
              {/* <th>Customer ID</th> */}
              {/* <th>Scheme ID</th> */}
              <th>Scheme Name</th>

              <th>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody style={{fontWeight:'400'}}>
            {policyData.map((policy, index) => (
              <tr key={index}>
                <td>{policy.policyNumber}</td>
                <td>{policy.issueDate}</td>
                <td>{policy.maturityDate}</td>
                <td>{policy.premiumType}</td>
                <td><del>&#2352;</del> {policy.premiumAmount}</td>
                <td>{policy.status}</td>
                {/* <td>{policy.agentId}</td> */}
                {/* <td>{policy.customerId}</td> */}
                {/* <td>{policy.schemeId}</td> */}
                <td>{policy.schemeName}</td>
                <td>
                  <button
                    className={`btn btn-primary ${policy.status === 'PENDING' ? 'disabled' : ''}`}
                    onClick={() => handlePayPolicy(policy.policyNumber, policy.status)} 
                    disabled={policy.status === 'PENDING'}
                  >
                    Pay Policy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      
    </div>

    {temp && <ViewPolicyPayment policyData={policyData}/>}
    </>
    
  );
};

export default InsuranceAccount;
