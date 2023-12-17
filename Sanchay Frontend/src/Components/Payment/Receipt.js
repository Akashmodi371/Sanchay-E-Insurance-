import React from 'react'
import { useLocation } from 'react-router-dom'
import './Receipt.css'

const Receipt = ({ data }) => {
  console.log(data)
  console.log(data.installmentAmount)
  const location = useLocation()
  const formData = location.state.data.data

  return (
    <div className="receipt">
      <h1>Receipt</h1>
      <table className="receipt-table">
        <tbody>
          {/* <tr>
            <th>Date:</th>
            <td>{formData.date ? formData.date.toDateString() : ""}</td>
          </tr> */}
          <tr>
            <th>Installment Amount:</th>
            <td>{formData.installmentAmount}</td>
          </tr>
          <tr>
            <th>Tax Amount:</th>
            <td>{formData.taxAmount}</td>
          </tr>
          <tr>
            <th>Total Amount:</th>
            <td>{formData.totalAmount}</td>
          </tr>
          <tr>
            <th>Payment Type:</th>
            <td>{formData.paymentType}</td>
          </tr>
          {formData.paymentType === 'credit card' ||
          formData.paymentType === 'debit card'
            ? (
            <>
              <tr>
                <th>Card Holder:</th>
                <td>{formData.cardHolder}</td>
              </tr>
              <tr>
                <th>Card Number:</th>
                <td>{formData.cardNumber}</td>
              </tr>
              <tr>
                <th>CVV Number:</th>
                <td>{formData.cvvNumber}</td>
              </tr>
              <tr>
                <th>Expire Date:</th>
                <td>{formData.expireDate}</td>
              </tr>
            </>
              )
            : null}
          <tr>
            <th>Amount:</th>
            <td>{formData.installmentAmount}</td>
          </tr>
          <tr>
            <th>Tax:</th>
            <td>{formData.taxAmount}</td>
          </tr>
          <tr>
            <th>Total:</th>
            <td>{formData.totalAmount}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => window.print()}>Print</button>
    </div>
  )
}

export default Receipt
