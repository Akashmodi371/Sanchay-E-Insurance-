import React from 'react'
import './Error.css'
import { BiErrorCircle } from 'react-icons/bi'
import { Button } from 'react-bootstrap'
const Error = ({ msg, type }) => {
  return (
    <>

<div className="container">
  <div className="alert-box">
    <div className="alert alert-warning">
      <div className="alert-icon text-center">
        <BiErrorCircle/>
      </div>
      <div className="alert-message text-center">
        <strong>{msg}</strong>.
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Error
