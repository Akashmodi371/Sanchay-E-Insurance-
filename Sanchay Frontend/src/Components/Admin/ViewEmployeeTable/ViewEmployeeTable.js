import React, { useState, useEffect } from 'react';
import './ViewEmployeeTable.css';

const ViewEmployeeTable = ({ data }) => {
  console.log(data);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    // Update filteredData whenever data or searchQuery changes
    if (!searchQuery) {
      // If searchQuery is empty, show all data without filtering
      setFilteredData(data);
    } else {
      // Filter the data based on searchQuery
      const filteredData = data.filter((employee) =>
        Object.values(employee).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredData(filteredData);
    }
  }, [data, searchQuery]);

  // Calculate pagination variables
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="div-employeeview">
      <h2>Employees Detail</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        style={{width:'150px',marginBottom:'20px',marginRight:'87%'}}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table className="table employee-view-table">
        <thead>
          <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        <tbody style={{fontWeight:'400'}}>
          {currentData.map((employee, index) => (
            <tr key={index}>
              <th scope="row">{employee.employeeid}</th>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email}</td>
              <td>{employee.userInfo.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="text-center" style={{ display: 'flex', justifyContent:'center', alignItems: 'center' }}>
        <button
          className="btn btn-primary me-3"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ maxWidth: '80px', marginTop: '0px' }}
        >
          Previous
        </button>
        <button
          className="btn btn-primary mb-3"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ maxWidth: '80px', marginTop: '10px' }}
        >
          Next
        </button>
      </div>
      <div className="text-center">Page {currentPage} of {totalPages}</div>
    </div>
  );
};

export default ViewEmployeeTable;
