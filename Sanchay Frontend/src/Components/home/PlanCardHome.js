import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getSchemesByPlanid } from './../../services/SchemesService';
import './PlanCardHome.css'; // Make sure to include the CSS file properly
import SchemeForm from './../Admin/AddSchemeorView/SchemeForm';
import Calculatormodal from './Calculatormodal';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PlanCardHome = ({ selectedPlan }) => {
  console.log(selectedPlan, "selected plan here");
  const [SchemesOfPlan, setSchemeOfPlan] = useState([]); // Initialize with an empty array
  const[calculatordata,setcalculatorData]=useState(null)
 



 

  


  const getPlanCards = async () => {
    try {
      // Assuming getSchemesByPlanid returns a promise
      let response = await getSchemesByPlanid(selectedPlan);
      setSchemeOfPlan(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      Swal.fire('',error.response.data,'error')
      // alert(error.message);
    }
  }

 



  useEffect(() => {
    getPlanCards();
  }, [selectedPlan]); // Include selectedPlan as a dependency for the useEffect

  return (
    <>
      {!calculatordata && <div className="plan-card-container">
      {SchemesOfPlan.map((scheme) => (
        <div className="plan-card" key={scheme.schemeId}>
          <h2>{scheme.schemeName}</h2>
          <div className="plan-details">
            <p>Age: {scheme.minAge} - {scheme.maxAge} years</p>
            <p>Amount: <del>&#2352;</del>{scheme.minAmount} - <del>&#2352;</del>{scheme.maxAmount}</p>
            <p>Time: {scheme.minInvestTime} - {scheme.maxInvestTime} Months</p>
            <p>Registration Commission: {scheme.registrationCommission}%</p>
            <p>Description: {scheme.description}</p>
            <p>Documents Required: {scheme.documentsRequire}</p>
          </div>
        </div>
      ))}
    </div> }
      
        
   
    </>
    
  )
}

export default PlanCardHome;
