import React, { useState, useEffect } from 'react';
import './PolicyCommissiontable.css';

const PolicyCommissionTable = ({ data ,viewComissionData}) => {
  // Define states for filtering, pagination, and page size
  const [filterText, setFilterText] = useState('');
  const [filterPolicyNumber, setFilterPolicyNumber] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // You can set the default page size here

  // Filtered and paginated data
  const filteredData = data.filter((item) => {
    const customerNameMatch = item.customername
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const policyNumberMatch = String(item.policynumber)
      .toLowerCase()
      .includes(filterPolicyNumber.toLowerCase());

    return customerNameMatch && policyNumberMatch;
  });

  const pageCount = Math.ceil(filteredData.length / pageSize);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when the filter or page size changes
  }, [filterText, filterPolicyNumber, pageSize]);

  // Calculate the current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className='policy-div-agent-commssion'>
      <h2>Policies Commission</h2>

      {/* Filter input for Customer Name */}
      

      {/* Filter input for Policy Number */}
      <input
        type="text"
        placeholder="Search by Policy Number"
        value={filterPolicyNumber}
        onChange={(e) => setFilterPolicyNumber(e.target.value)}
        style={{width:'200px',marginRight:'84%'}}
      />

      {/* Page size dropdown */}
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        style={{width:'80px',marginRight:'93.5%',marginTop:'10px'}}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <div className='total-commsion-div'>
        Total Commission:-       <del>&#2352;</del>{viewComissionData}
      </div>  
      <table className='table table-bordered-dark mt-3'>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Policy Number</th>
            <th>Policy Commission</th>
          </tr>
        </thead>
        <tbody style={{fontWeight:'400'}}>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.customerid}</td>
              <td>{item.customername}</td>
              <td>{item.policynumber}</td>
              <td><del>&#2352;</del> {item.policycommission}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PolicyCommissionTable;
