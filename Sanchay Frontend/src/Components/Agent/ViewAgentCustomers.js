import React from 'react';
import './ViewAgentCustomer.css'

const ViewAgentCustomers = ({ agentCustomers }) => {
  // Check if agentCustomers is an array or if it's empty
  if (!Array.isArray(agentCustomers) || agentCustomers.length === 0) {
    return (
      <div className="container">
        <h2>Agent Customers</h2>
        <p>No customer data available.</p>
      </div>
    );
  }

  return (
    <div className="view-agent-customer text-dark">
      <h2>Agent Customers</h2>
      <div className="table-responsive table-agent-view">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Pincode</th>
              <th scope="col">Birthdate</th>
              {/* <th scope="col">Policy Number</th> */}
            </tr>
          </thead>
          <tbody style={{fontWeight:'400'}}>
            {agentCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.firstname || 'N/A'}</td>
                <td>{customer.lastname || 'N/A'}</td>
                <td>{customer.email || 'N/A'}</td>
                <td>{customer.mobileno || 'N/A'}</td>
                <td>{customer.address || 'N/A'}</td>
                <td>{customer.city || 'N/A'}</td>
                <td>{customer.state || 'N/A'}</td>
                <td>{customer.pincode || 'N/A'}</td>
                <td>{customer.birthdate || 'N/A'}</td>
                {/* <td>
                  {customer.policies && customer.policies.length > 0
                    ? customer.policies.map((policy) => policy.policynumber).join(', ')
                    : 'N/A'}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAgentCustomers;
