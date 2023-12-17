import React, { useState } from 'react'
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './PolicyPayment.css'

const PolicyPayment = ({ paymentdata, handleforpaymentReceipt }) => {
  // console.log(paymentdata.paymentdata.installmentAmount);
  const total =
  +paymentdata.paymentdata.installmentAmount +
  +paymentdata.paymentdata.installmentAmount * 0.12
  const [formData, setFormData] = useState({
    date: null,
    installmentAmount: paymentdata.paymentdata.installmentAmount,
    taxAmount: paymentdata.paymentdata.installmentAmount * 0.12,
    totalAmount: total,
    paymentType: '',
    cardHolder: '',
    cardNumber: '',
    cvvNumber: '',
    expireDate: ''
  })

  const [formErrors, setFormErrors] = useState({
    installmentAmount: '',
    taxAmount: '',
    totalAmount: '',
    paymentType: '',
    cardHolder: '',
    cardNumber: '',
    cvvNumber: '',
    expireDate: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    setFormErrors({
      ...formErrors,
      [name]: ''
    })
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let valid = true

    const errors = {
      installmentAmount: '',
      taxAmount: '',
      totalAmount: '',
      paymentType: '',
      cardHolder: '',
      cardNumber: '',
      cvvNumber: '',
      expireDate: ''
    }

    if (!formData.installmentAmount) {
      errors.installmentAmount = 'This field is required'
      valid = false
    }

    if (!formData.taxAmount) {
      errors.taxAmount = 'This field is required'
      valid = false
    }

    if (!formData.totalAmount) {
      errors.totalAmount = 'This field is required'
      valid = false
    }

    if (!formData.paymentType) {
      errors.paymentType = 'This field is required'
      valid = false
    }

    if (!formData.cardHolder) {
      errors.cardHolder = 'This field is required'
      valid = false
    }

    if (!formData.cardNumber) {
      errors.cardNumber = 'This field is required'
      valid = false
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      errors.cardNumber = '16 digits are required'
      valid = false
    }

    if (!formData.cvvNumber) {
      errors.cvvNumber = 'This field is required'
      valid = false
    } else if (!/^\d{3}$/.test(formData.cvvNumber)) {
      errors.cvvNumber = '3 digits are required'
      valid = false
    }

    if (!formData.expireDate) {
      errors.expireDate = 'This field is required'
      valid = false
    }

    if (valid) {
      // navigate.push("/receipt", {
      //   formData: formData
      console.log(paymentdata, 'in policy payment')
      console.log(formData, 'Policy payment form data')
      paymentdata.handleforpaymentReceipt(formData)
      console.log(formData)
      // });
    } else {
      setFormErrors(errors)
    }
  }

  return (
    <div className="policy-payment">
      <h1>Policy Payment</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="input-container">
          <label>Date:</label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            name="date"
          />
        </div>
        <div className="input-container">
          <label>Installment Amount:</label>
          <input
            type="number"
            name="installmentAmount"
            value={formData.installmentAmount}
            onChange={handleChange}
            required
          />
          <span className="error">{formErrors.installmentAmount}</span>
        </div>
        <div className="input-container">
          <label>Tax Amount(12%):</label>
          <input
            type="number"
            name="taxAmount"
            value={formData.taxAmount}
            onChange={handleChange}
            required
          />
          <span className="error">{formErrors.taxAmount}</span>
        </div>
        <div className="input-container">
          <label>Total Amount:</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />
          <span className="error">{formErrors.totalAmount}</span>
        </div>
        <div className="input-container">
          <label>Payment Type:</label>
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Type</option>
            <option value="credit card">Credit Card</option>
            <option value="debit card">Debit Card</option>
            <option value="VISA">VISA</option>
            <option value="master card">Master Card</option>
          </select>
          <span className="error">{formErrors.paymentType}</span>
        </div>
        <div className="input-container">
          <label>Card Holder:</label>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
            required
          />
          <span className="error">{formErrors.cardHolder}</span>
        </div>
        <div className="input-container">
          <label>Card Number:</label>
          <input
            type="number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <span className="error">{formErrors.cardNumber}</span>
        </div>
        <div className="input-container">
          <label>CVV Number:</label>
          <input
            type="number"
            name="cvvNumber"
            value={formData.cvvNumber}
            onChange={handleChange}
            required
          />
          <span className="error">{formErrors.cvvNumber}</span>
        </div>
        <div className="input-container">
          <label>Expire Date:</label>
          <input
            type="text"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            required
          />
          <span className="error">{formErrors.expireDate}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PolicyPayment
