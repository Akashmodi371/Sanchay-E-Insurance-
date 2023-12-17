import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import ViewPolicyPayment from '../Components/Payment/ViewPolicyPayment'

const SharedTable = ({
  data,
  columns,
  buttonstatus,
  handleSelectedScheme,
  viewpremiumbutton,
  setPremiumButton,
  setPolicyFetch
}) => {
  console.log(data);
  const [selectedPolicyData, setSelectedPolicyData] = useState({})
  const [viewPolicyPayment, setViewPolicyPayment] = useState(false)
  const [viewpolicies, setViewPolicies] = useState(true)

  const handleViewPolicy = async (data) => {
    if (data.status === 'VERIFIED') {
      setViewPolicies(false)
      setSelectedPolicyData(data)
      setViewPolicyPayment(true)
    } else {
      // Display a message or handle the case when the policy is not verified.
      alert('This policy is not yet verified and cannot be viewed.')
    }
  }
  console.log(data);

  return (
    <div>
      {viewpolicies && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              {buttonstatus
                ? (
                <th className="bg-secondary text-center">Buy Policy</th>
                  )
                : (
                <></>
                  )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{item[column]}</td>
                ))}
                {viewpremiumbutton ? (
                  <td className="bg-secondary">
                    <Button
                      variant="light"
                      value={item.schemename}
                      onClick={() => handleViewPolicy(data[rowIndex])}
                      disabled={item.status !== 'VERIFIED'} // Disable the button if status is not "VERIFIED"
                    >
                      View Policy
                    </Button>
                  </td>
                ) : (
                  ''
                )}
                {buttonstatus
                  ? (
                  <td className="bg-light">
                  
                    <button className='bg-light text-dark'
                      value={item.schemeid}
                      onClick={handleSelectedScheme}
                    >
                      View Scheme
                    </button>
                  </td>
                    )
                  : (
                      ''
                    )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {viewPolicyPayment && (
        <ViewPolicyPayment policyData={selectedPolicyData} setPolicyFetch={setPolicyFetch} />
      )}
    </div>
  )
}

export default SharedTable
