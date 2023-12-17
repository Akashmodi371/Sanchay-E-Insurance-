import React, { useState } from 'react'
import './ViewCustomerTable.css'

const ViewCustomerTable = ({ customerData }) => {
  console.log(customerData);
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter data based on the search query
  const filteredData = customerData.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
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
    <div className='div-cutomerview text-dark'>
      <h2 className='text-center fw-bold text-dark'>Customers Detail</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          style={{ maxWidth: '120px', marginTop: '10px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="form-group">
        {/* Page size dropdown */}
        <select
          className="form-control"
          value={pageSize}
          style={{ maxWidth: '80px', marginTop: '0px' }}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5 </option>
          <option value={10}>10 </option>
          <option value={30}>30 </option>
        </select>
      </div>
      <table className="table text-center">
        <thead className='bg-dark'>
          <tr>
            <th scope="col">Customer id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">Pincode</th>
            <th scope="col">Mobileno</th>
            <th scope="col">Birthdate</th>
          </tr>
        </thead>
        <tbody style={{fontWeight:'400'}}>
          {currentData.map((customer, index) => (
            <tr key={index}>
              <th scope="row">{customer.customerid}</th>
              <td>{customer.firstname}</td>
              <td>{customer.lastname}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.state}</td>
              <td>{customer.city}</td>
              <td>{customer.pincode}</td>
              <td>{customer.mobileno}</td>
              <td>{customer.birthdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center" style={{ display: 'flex', justifyContent:'center'}}>
        {/* Pagination buttons */}
        <button
          className="btn btn-primary me-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ maxWidth: '80px', height:'40px',marginTop:'10px'}}
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
      <div className="text-center text-dark">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}

export default ViewCustomerTable
