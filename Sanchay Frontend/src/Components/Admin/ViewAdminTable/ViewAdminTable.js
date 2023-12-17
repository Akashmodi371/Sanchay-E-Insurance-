import React, { useState, useEffect } from 'react';
import './ViewAdminTable.css'

const ViewAdminTable = ({ data }) => {
  // State variables
  const [adminData, setAdminData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [adminIdFilter, setAdminIdFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // useEffect to initialize adminData and filteredData
  useEffect(() => {
    setAdminData(data);
    setFilteredData(data);
  }, [data]);

  // Function to handle filtering by adminid
  useEffect(() => {
    if (adminIdFilter) {
      const filtered = adminData.filter(
        (admin) => admin.adminid === parseInt(adminIdFilter)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(adminData);
    }
    setCurrentPage(1); // Reset to the first page after filtering
  }, [adminIdFilter, adminData]);

  // Function to handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate pagination variables
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className='view-admins-t'>
      <h2>Admins Detail</h2>
      <div style={{display:'flex',marginRight:'77%'}}>
        <input
          placeholder='Search by Admin ID'
          type="text"
          id="adminIdFilter"
          value={adminIdFilter}
          onChange={(e) => setAdminIdFilter(e.target.value)}
          style={{width:'180px',marginRight:'100px'}}
        />
      </div>
      <table className="table view-admin-table">
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Admin Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody style={{fontWeight:'400'}}>
          {currentData.map((admin, index) => (
            <tr key={index}>
              <td>{admin.adminid}</td>
              <td>{admin.adminname}</td>
              <td>{admin.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='me-3 bg-primary'
          style={{borderRadius:'10px'}}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{borderRadius:'10px'}}
          className='bg-primary'
        >
          Next
        </button>
      </div>
      <div>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default ViewAdminTable;
