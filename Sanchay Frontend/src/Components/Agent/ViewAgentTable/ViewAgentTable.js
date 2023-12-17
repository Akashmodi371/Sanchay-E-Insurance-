import React, { useState, useEffect } from 'react';
import './ViewAgentTable.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewAgentTable = ({ agentData, handleViewAgent }) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAgentData, setFilteredAgentData] = useState(agentData);
  const [statusChanges, setStatusChanges] = useState({});

  useEffect(() => {
    if (!searchQuery) {
      setFilteredAgentData(agentData);
    } else {
      const filteredData = agentData.filter((agent) =>
        Object.values(agent).some((value) =>
          value
            ? value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            : false
        )
      );
      setFilteredAgentData(filteredData);
    }
  }, [agentData, searchQuery]);

  const totalItems = filteredAgentData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentData = filteredAgentData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleStatusChange = async (agentId, newStatus) => {
    setStatusChanges((prevChanges) => ({
      ...prevChanges,
      [agentId]: newStatus,
    }));
  };

  const handleSaveStatusChanges = async () => {
    for (const agentId in statusChanges) {
      const newStatus = statusChanges[agentId];
      try {
        let response = await axios.post(
          `http://localhost:8080/agentapp/changestatus/${agentId}/${newStatus}`
        );
        console.log(response);

        Swal.fire('Changed Agent Status', response.data, 'success');
        handleViewAgent();
      } catch (error) {
        alert(error.message);
      }
    }
    setStatusChanges({});
  };

  return (
    <div className="div-agentview text-dark">
      <h2>Agents Detail</h2>
      <div className='agent-table-header'>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        style={{width:'150px'}}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <label>
        <select value={pageSize} onChange={handlePageSizeChange} style={{width:'100px',marginTop:'10px'}}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="20">20</option>
        </select>
      </label>
      </div>
      

      <div className="table-container text-dark">
        <table className="table text-dark">
          <thead className='table-container-agent'>
            <tr>
              <th scope="col">Agent ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Reference Number</th>
              <th scope="col">Commission</th>
              <th scope="col">Username</th>
              <th scope="col">Current Status</th>
              <th scope="col">Change Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody style={{fontWeight:'400'}}>
            {currentData.map((agent) => (
              <tr key={agent.agentid}>
                <th scope="row">{agent.agentid}</th>
                <td>{agent.firstname}</td>
                <td>{agent.lastname}</td>
                <td>{agent.email}</td>
                <td>{agent.mobileno}</td>
                <td>{agent.referencenumber}</td>
                <td><del>&#2352;</del> {agent.commission}</td>
                <td>{agent.username}</td>
                
                <td>{agent.status || 'N/A'}</td> {/* Provide a default value */}
                <td>
                  <select
                    value={statusChanges[agent.agentid] || agent.status}
                    onChange={(e) =>
                      handleStatusChange(agent.agentid, e.target.value)
                    }
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveStatusChanges}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center pagination-text">
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ maxWidth: '80px', marginTop: '10px',marginRight:'20px' }}
        >
          Previous
        </button>
        <button
          className="btn btn-primary mb-3"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ maxWidth: '80px', marginTop: '24px' }}
        >
          Next
        </button>
      </div>
      <div className="text-center text-light fw-bold">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default ViewAgentTable;
