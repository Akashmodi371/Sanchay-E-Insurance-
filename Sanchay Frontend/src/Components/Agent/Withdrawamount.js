import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Form, BrowserRouter as Router } from 'react-router-dom'
import Swal from 'sweetalert2'

const Withdrawamount = ({ show, onHide }) => {
  const [commission, setCommission] = useState('')
  const [commissionValue, setCommissionValue] = useState('')

  const handleCommissionSubmit = (commission) => {
    setCommissionValue(commission)
  }

  const agentid = localStorage.getItem('accessid')

  const handleCommissionChange = (e) => {
    setCommission(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      // Make an API request to post the commission
      const response = await axios.post('')
      // onsubmit(commission); // Pass the commission back to the parent component
      Swal.fire(
        '',
        response.data,
        ''
      )

      onHide() // Close the modal
    } catch (error) {
      console.error('Error posting commission:', error)
    }
  }
}

export default Withdrawamount
