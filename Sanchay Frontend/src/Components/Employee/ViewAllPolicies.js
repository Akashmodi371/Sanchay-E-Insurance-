import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './ViewAllPolicies.css';
import { downloadFiles } from './../../services/DocumentService';

const ViewAllPolicies = ({ policiesData }) => {
  // State variables
  const [selectedAction, setSelectedAction] = useState({});
  const [statusOptions] = useState({
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED',
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Filter policies based on policy number
  const filteredPolicies = policiesData.filter((policy) =>
    policy.policyNumber.toString().includes(searchQuery)
  );

  // Handle for downloading documents
  const handleforDocuments = async (policynumber) => {
    try {
      const files = await axios.get(`http://localhost:8080/documentapp/getdocuments/${policynumber}`);
      // Handle downloading files here
      console.log(files.data);
      downloadFiles(files.data);
    } catch (error) {
      Swal.fire('', error.message, 'error');
    }
  };

  // Handle action change for a specific row
  const handleActionChange = (policyNumber, newAction) => {
    // Convert newAction to uppercase
    newAction = newAction.toUpperCase();
    
    setSelectedAction((prevState) => ({
      ...prevState,
      [policyNumber]: newAction,
    }));
  };

  // Handle save action button click
  const handleSaveAction = async (policyNumber) => {
    const newAction = selectedAction[policyNumber];

    try {
      // Send an API request to update the policy status
      const response = await axios.post(
        `http://localhost:8080/policyapp/changestatuspolicy/${policyNumber}`,
        newAction, // Send newAction in the request body
        {
          headers: {
            'Content-Type': 'text/plain', // Set content type to plain text
          },
        }
      );

      // Show a success message
      Swal.fire('', response.data, '');
    } catch (error) {
      // Handle API call errors here
      Swal.fire('',error.response.data,'error')
      alert(error.message);
    }
  };

  return (
    <div className="div-policies-employee text-dark">
      <h2 className="text-center fw-bold " >All Policies</h2>
      {/* Search */}
      <div className="mb-3" style={{marginRight:'83%'}}>
        <input
          type="text"
          placeholder="Search by Policy Number"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{width:'200px'}}
        />
      </div>

      <table className="table  div-policies-employee-table">
        <thead>
          <tr>
            <th scope="col">Policy Number</th>
            <th scope="col">Issue Date</th>
            <th scope="col">Maturity Date</th>
            <th scope="col">Number of Installments</th>
            <th scope="col">Premium Type</th>
            <th scope="col">Status</th>
            <th scope="col">Documents</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody style={{fontWeight:'400'}}>
          {filteredPolicies.map((policy, index) => (
            <tr key={index}>
              <td>{policy.policyNumber}</td>
              <td>{policy.issueDate}</td>
              <td>{policy.maturityDate}</td>
              <td>{policy.numberOfInstallment}</td>
              <td>{policy.premiumType}</td>
              <td>{policy.status}</td>
              <td>
                <button
                  className="btn btn-dark"
                  onClick={() => handleforDocuments(policy.policyNumber)}
                >
                  View Documents
                </button>
              </td>
              <td className='text-center'>
                <div className="dropdown">
                  <select
                    className="form-select"
                    onChange={(e) => handleActionChange(policy.policyNumber, e.target.value)}
                    value={selectedAction[policy.policyNumber] || ''}
                  >
                    <option value="">Actions</option>
                    {Object.keys(statusOptions).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-warning mt-2"
                    onClick={() => handleSaveAction(policy.policyNumber)}
                  >
                    Save
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllPolicies;
