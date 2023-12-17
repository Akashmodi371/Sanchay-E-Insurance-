import React, { useState } from 'react';
import './Calculator.css';
import { Button } from 'react-bootstrap';
import InsuranceForm from '../Payment/InsuranceAccountDetail/InsuranceForm';
import { agentRegistration } from '../../services/authorization (1)';

const Calculator = ({
  minamount,
  maxamount,
  minyear,
  maxyear,
  profitratio,
  data,
  selectedPlan,
  showInsurancePolicyhandle,
  handlecalculatedata,
  handleNumberOfYear,
  handleinvestmentamount,
  handlepremiumtype,
  accessid,
}) => {
  // State for input values and errors
  const [noOfYear, setNoOfYear] = useState(null); // Initialize to null
  const [investment, setInvestment] = useState('');
  const [month, setMonth] = useState('');
  const [interestRate, setInterestRate] = useState(data.registrationcommission);
  const [installment, setInstallmentamount] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [totamount, setTotalAmount] = useState(0);
  const [temp, setTemp] = useState('');

  // State for input validation errors
  const [errors, setErrors] = useState({
    noOfYearError: '',
    investmentError: '',
    monthError: '',
  });

  // Function to validate input fields
  const validateInput = () => {
    const errorsObj = {};

    // Validate "Number of Months"
    if (noOfYear === null || noOfYear === '') {
      errorsObj.noOfYearError = 'Number of Months is required';
    } else if (!/^\d+$/.test(noOfYear)) {
      errorsObj.noOfYearError = 'Number of Months must be a valid number';
    } else if (noOfYear < minyear || noOfYear > maxyear) {
      errorsObj.noOfYearError = `Number of Months must be between ${minyear} and ${maxyear}`;
    } else {
      errorsObj.noOfYearError = ''; // Clear the error if valid
    }

    // Validate "Total Investment Amount"
    const investmentAmount = parseFloat(investment);
    if (!investmentAmount || investmentAmount < minamount || investmentAmount > maxamount) {
      errorsObj.investmentError = `Total Investment Amount must be between ${minamount} and ${maxamount}`;
    } else {
      errorsObj.investmentError = ''; // Clear the error if valid
    }

    // Validate "Premium Duration"
    if (!month) {
      errorsObj.monthError = 'Premium Duration is required';
    } else {
      errorsObj.monthError = ''; // Clear the error if valid
    }

    setErrors(errorsObj);

    return Object.values(errorsObj).every((error) => error === ''); // Check if all errors are empty
  };

  // Function to calculate interest
  const calculateInterest = () => {
    const isValid = validateInput();

    if (!isValid) {
      return;
    }

    const totalMonths = noOfYear * 12;
    const totalNoOfInstallments = totalMonths / month;
    const investmentAmount = parseFloat(investment);

    const installmentAmount = investmentAmount / totalNoOfInstallments;
    const interestAmount = (interestRate / 100) * investmentAmount;
    const netAmount = investmentAmount + interestAmount;

    setInstallmentamount(installmentAmount);
    setInterestAmount(interestAmount);
    setTotalAmount(netAmount);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  let maturity = addYearsToDate(parseInt(noOfYear));

  const handleInsuranceformData = () => {
    setTemp(Math.random());
  };

  function addYearsToDate(yearsToAdd) {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + yearsToAdd);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Function to check if the Submit button should be disabled
  const isSubmitButtonDisabled = () => {
    return !noOfYear || !investment || !month || Object.values(errors).some((error) => error !== '');
  };

  return (
    <div className="calculator">
      <h1>Interest Calculator</h1>
      <div className="input-container">
        <label>Number of Months:</label>
        <input
          type="number"
          value={noOfYear !== null ? noOfYear : ''}
          onChange={(e) => setNoOfYear(e.target.value)}
          onBlur={validateInput} // Trigger validation on blur
        />
        <div className="error" style={{ color: 'red' }}>
          {errors.noOfYearError}
        </div>
      </div>
      <div className="input-container">
        <label>Total Investment Amount:</label>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          onBlur={validateInput} // Trigger validation on blur
        />
        <div className="error" style={{ color: 'red' }}>
          {errors.investmentError}
        </div>
      </div>
      <div className="input-container">
        <label>Premium Duration:</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          onBlur={validateInput} // Trigger validation on blur
        >
          <option value="">Select</option>
          <option value="3">3 Months (Quarterly)</option>
          <option value="6">6 Months (Half Yearly)</option>
          <option value="12">12 Months (Yearly)</option>
        </select>
        <div className="error" style={{ color: 'red' }}>
          {errors.monthError}
        </div>
      </div>
      <div className="input-container">
        <label>Interest Rate:</label>
        <input
          type="number"
          value={data.registrationcommission}
          placeholder={data.registrationcommission}
          disabled
        />
      </div>
      <Button
        onClick={calculateInterest}
        variant="warning"
        className="fw-bold"
        style={{ fontSize: '20px' }}
      >
        Calculate
      </Button>
      <table className="results-table text-dark">
        <thead>
          <tr>
            <th
              colSpan={2}
              className="fw-bold text-dark bg-light"
              style={{
                fontSize: '24px',
                fontFamily: 'cursive',
              }}
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Installment Amount:</td>
            <td>{installment}</td>
          </tr>
          <tr>
            <td>Interest Amount:</td>
            <td>{interestAmount}</td>
          </tr>
          <tr>
            <td>Total Amount:</td>
            <td>{totamount}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-center mt-3 fw-bold">
        <Button
          variant="danger"
          onClick={handleInsuranceformData}
          disabled={isSubmitButtonDisabled()}
        >
          Submit
        </Button>
      </div>
      {temp && (
        <InsuranceForm
          data={data}
          noOfYear={noOfYear}
          selectedPlan={selectedPlan}
          maturityDate={maturity}
          currDate={getCurrentDate()}
          calulatedata={{
            installmentAmount: installment.toFixed(2),
            interestAmount: interestAmount.toFixed(2),
            totalAmount: totamount.toFixed(2),
          }}
          investAmount={investment}
          premiumtype={month}
        />
      )}
    </div>
  );
};

export default Calculator;
