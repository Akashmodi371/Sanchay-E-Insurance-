import React from 'react';
import './ViewInsurance.css';

const ViewInsurance = ({ data }) => {
  console.log(data);

  return (
    <div className="view-insurance-container text-dark">
      <h2 className='sticky'>Insurance Policies</h2>
      <table className="table view-insurance-table">
        <thead>
          <tr>
            <th>Policy Number</th>
            <td>Customer Id</td>
            <td>CustomerName</td>
            <th>Issue Date</th>
            <th>Maturity Date</th>
            <th>PaidInstallments</th>
            <th>Total Installment</th>
            <th>Premium Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody style={{fontWeight:'400'}}>
          {data.map((policy, index) => (
            <tr key={index}>
              <td>{policy.policyNumber}</td>
              <td>{policy.customerId}</td>
              <td>{policy.customerName}</td>
              <td>{policy.issueDate}</td>
              <td>{policy.maturityDate}</td>
              <td>{policy.paidInstallments}</td>
              <td>{policy.numberOfInstallment}</td>
              <td><del>&#2352;</del> {policy.premiumAmount}</td>
              <td>{policy.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewInsurance;
