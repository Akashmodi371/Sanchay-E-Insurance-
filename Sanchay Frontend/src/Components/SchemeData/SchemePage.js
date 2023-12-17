import React, { useState } from 'react'
import './SchemePage.css'
import { format } from 'date-fns'
import Calculator from './Calculator'
import { Button } from 'react-bootstrap'
// import InsuranceAccountPolicy from "../Payment/InsuranceAccountPolicy";
import InsuranceForm from '../Payment/InsuranceAccountDetail/InsuranceForm'
import PolicyPayment from '../Payment/PolicyPayment'
import Receipt from '../Payment/Receipt'
import NewReceipt from './../Payment/InsuranceAccountDetail/NewReceipt'

const SchemePage = ({ data, selectedPlan, accessid }) => {
  const [showInsurancePolicy, setShowInsurancePolicy] = useState(false)
  const [calulatedata, setCalculateData] = useState(null)
  const [noOfYear, setNumberofYear] = useState(null)
  const [currDate, setCurrDate] = useState(new Date())
  const [maturityDate, setMaturityDate] = useState(new Date())
  const [investAmount, setInvestAmount] = useState(null)
  const [premiumtype, setPremiumType] = useState()
  const [showPaymentOfPolicy, setPaymentOfPolicy] = useState(false)
  const [paymentdata, setPaymentData] = useState(null)
  const [paymentReceiptData, setPaymentReceiptData] = useState(null)

  const handleforpaymentReceipt = (e) => {
    // console.log(e);
    setPaymentReceiptData(e)
  }

  const handlecalculatedata = (e) => {
    setCalculateData(e)
  }
  const handlepremiumtype = (e) => {
    // console.log(e);
    setPremiumType(e)
  }

  const handlesetPaymentDatahandle = (e) => {
    setPaymentData(e)
  }

  const handleinvestmentamount = (e) => {
    setInvestAmount(e)
  }

  const handleNumberOfYear = (e) => {
    setNumberofYear(e)
    const currentDate = new Date()
    const formattedcurrentdate = currentDate.toISOString().split('T')[0]
    setCurrDate(formattedcurrentdate)
    const targetDate = new Date(currentDate)
    targetDate.setFullYear(targetDate.getFullYear() + +e)
    const formattedDate = targetDate.toISOString().split('T')[0]
    setMaturityDate(formattedDate)
    console.log(formattedDate)
  }

  const showInsurancePolicyhandle = () => {
    setShowInsurancePolicy(!showInsurancePolicy)
  }

  const showPaymentOfPolicyhandle = () => {
    setPaymentOfPolicy(!showPaymentOfPolicy)
  }

  if (!showInsurancePolicy) {
    if (!Array.isArray(data)) {
      return (
          <div className="container">
            <div className="plantable">
              <div className="description fw-bold text-center mt-3">
                {data.description}
              </div>
              <div className="Plan-detail">
                <h3 className="mb-5 text-center">Plans Details</h3>
                <table className="table table-striped table-dark">
                  <thead className="thead-dark"></thead>
                  {data
                    ? (<tbody>
                    <tr>
                      <td className="fw-bold">Policy-term-minimum</td>
                      <td>{data.mininvesttime}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Policy-term-maximum</td>
                      <td>{data.maxinvesttime}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Miniumum Age</td>
                      <td>{data.minage}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Maximum Age</td>
                      <td>{data.maxage}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Minimum investment Amount</td>
                      <td>{data.minamount}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Maximum investment Amount</td>
                      <td>{data.maxamount}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Profite Ratio</td>
                      <td>{data.registrationcommission}</td>
                    </tr>
                  </tbody>)
                    : ('')}
                </table>
              </div>
            </div>
            <div className="Calculator-div">
              <Calculator minamount={data.minamount} accessid={accessid} maxamount={data.maxamount}
              minyear={data.mininvesttime} maxyear={data.maxinvesttime} profitratio={data.registrationcommission} showInsurancePolicyhandle={showInsurancePolicyhandle}
              handlecalculatedata={handlecalculatedata} handleNumberOfYear={handleNumberOfYear} handleinvestmentamount={handleinvestmentamount}
              handlepremiumtype={handlepremiumtype} showPaymentOfPolicyhandle={showPaymentOfPolicyhandle}
              />
            </div>
          </div>
      )
    } else {
      return (
          <></>
      )
    }
  } else {
    if (!showPaymentOfPolicy) {
      return (
        { showInsurancePolicy } && <InsuranceForm data={data} accessid={accessid}
          selectedPlan={selectedPlan} noOfYear={noOfYear} maturityDate={maturityDate}
          currDate={currDate} calulatedata={calulatedata} investAmount={investAmount} premiumtype={premiumtype}
          showPaymentOfPolicyhandle={showPaymentOfPolicyhandle} onSubmit={handlesetPaymentDatahandle} />
      )
    } else {
      if (!paymentReceiptData) {
        return (
          { showPaymentOfPolicy } && <PolicyPayment paymentdata={paymentdata} handleforpaymentReceipt={handleforpaymentReceipt}/>
        )
      } else {
        return (
          { paymentReceiptData } && <NewReceipt data={paymentReceiptData}/>
        )
      }
    }
  }
}

export default SchemePage
