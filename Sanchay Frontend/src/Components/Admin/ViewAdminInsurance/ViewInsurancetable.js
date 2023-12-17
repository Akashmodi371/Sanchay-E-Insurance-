import React, { useState } from 'react';

import './ViewInsurancetable.css';

const ViewInsurancetable = ({ insurancetabledata }) => {
  console.log(insurancetabledata,"here agent id");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Function to handle sorting of table data
  const handleSort = (column) => {
    if (column === sortColumn) {
      // Toggle sort direction if clicking on the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set a new column for sorting
      setSortColumn(column);
      setSortDirection('asc'); // Default to ascending order
    }
  };

  // Function to handle changing the page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle changing the page size
  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing page size
  };

  // Sort data based on the selected column and direction
  const sortedData = [...insurancetabledata].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      // Handle non-string values
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  // Calculate pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const visibleData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="div-agentview">
      <h3 className="fw-bold text-dark" style={{ fontSize: '28px'}}>
        Insurance Accounts
      </h3>
      <div className="table-toolbar">
        <div className="page-size-dropdown text-dark">
          
          <select value={pageSize} onChange={handlePageSizeChange} style={{width:'80px'}}>
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          
        </div>
      </div>
      <table className="table mt-4 isurance-admin-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('policyNumber')}>
              Policy Number
              {sortColumn === 'policyNumber' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('issueDate')}>
              Issue Date
              {sortColumn === 'issueDate' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('maturityDate')}>
              Maturity Date
              {sortColumn === 'maturityDate' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('premiumType')}>
              Premium Type
              {sortColumn === 'premiumType' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('premiumAmount')}>
              Premium Amount
              {sortColumn === 'premiumAmount' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('numberOfInstallment')}>
              Number of Installments
              {sortColumn === 'numberOfInstallment' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('status')}>
              Status
              {sortColumn === 'status' && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            {/* <th>Nominee</th> */}
            <th>Paid Installments</th>
            <th>Agent</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody style={{fontWeight:'400'}}>
          {visibleData.map((rowData, index) => (
            <tr key={index}>
              <td>{rowData.policyNumber}</td>
              <td>{rowData.issueDate}</td>
              <td>{rowData.maturityDate}</td>
              <td>{rowData.premiumType}</td>
              <td><del>&#2352;</del>{rowData.premiumAmount}</td>
              <td>{rowData.numberOfInstallment}</td>
              <td>{rowData.status}</td>
              <td>{rowData.paidInstallments}</td>
              {/* <td>{rowData.nomineename || 'N/A'}</td> */}
              <td>
                {rowData.agentId}
              </td>
              {/* Map more columns here */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='me-3'
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewInsurancetable;
