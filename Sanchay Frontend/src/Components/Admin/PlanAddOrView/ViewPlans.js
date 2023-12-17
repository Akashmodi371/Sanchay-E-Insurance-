import React, { useState, useEffect } from 'react'

import './ViewPlans.css'

const ViewPlans = ({ planData }) => {
  console.log(planData)
  const [searchQuery, setSearchQuery] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter planData based on the search query
  const filteredData = planData.filter((plan) =>
    plan.planname.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination variables
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const currentData = filteredData.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div className='div-view-plans'>
      <h2 className='text-center fw-bold text-dark'>Insurance Plans</h2>

      {/* Search Filter */}
      <div>
        <input
          type="text"
          placeholder="Search Plan Name"
          value={searchQuery}
          style={{ maxWidth: '150px', marginTop: '10px' }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Page Size Dropdown */}
      <div>
   
        <select
          id="pageSize"
          style={{ maxWidth: '80px', marginTop: '10px', marginLeft: '00px' }}
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5 </option>
          <option value={10}>10 </option>
          <option value={20}>20 </option>
        </select>
      </div>

      {/* Table */}
      <table className='text-center table'>
        <thead className='text-center'>
          <tr>
            <th>Plan ID</th>
            <th>Plan Name</th>
          </tr>
        </thead> 
        <tbody className='text-dark' style={{fontWeight:'400'}}>
          {currentData.map((plan, index) => (
            <tr key={index}>
              <td>{plan.planid}</td>
              <td>{plan.planname}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ maxWidth: '100px', marginTop: '10px' }} 
          className='me-3'
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ maxWidth: '100px', marginTop: '10px' }}
        >
          Next
        </button>
        
      </div>
      <div style={{display:'flex',justifyContent:'center'}}><span> Page {currentPage} of {totalPages} </span></div>
    </div>
  )
}

export default ViewPlans
