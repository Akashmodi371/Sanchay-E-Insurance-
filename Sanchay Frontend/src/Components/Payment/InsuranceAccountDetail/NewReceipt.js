import React from 'react'
import './NewReceipt.css'

function NewReceipt ({ data }) {
  const currentDate = new Date()
  const formattedcurrentdate = currentDate.toISOString().split('T')[0]

  return (
      <div className="receipt">
        <h1>Receipt</h1>
        <table className="receipt-table">
          <tbody>
            <tr>
              <th>Date:</th>
              <td>{formattedcurrentdate}</td>
            </tr>
            <tr>
              <th>Installment Amount:</th>
              <td>{data.installmentAmount}</td>
            </tr>
            <tr>
              <th>Tax Amount:</th>
              <td>{data.taxAmount}</td>
            </tr>
            <tr>
              <th>Total Amount:</th>
              <td>{data.totalAmount}</td>
            </tr>
            <tr>
              <th>Payment Type:</th>
              <td>{data.paymentType}</td>
            </tr>
            {data.paymentType === 'credit card' || data.paymentType === 'debit card'
              ? (
              <>
                <tr>
                  <th>Card Holder:</th>
                  <td>{data.cardHolder}</td>
                </tr>
                <tr>
                  <th>Card Number:</th>
                  <td>{data.cardNumber}</td>
                </tr>
                <tr>
                  <th>CVV Number:</th>
                  <td>{data.cvvNumber}</td>
                </tr>
                <tr>
                  <th>Expire Date:</th>
                  <td>{data.expireDate}</td>
                </tr>
              </>
                )
              : null}
          </tbody>
        </table>
        <button onClick={() => window.print()}>Print</button>
      </div>
  )
}

export default NewReceipt
