import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './AddPlan.css';

const AddPlan = ({ onClose }) => {
  const [planName, setPlanName] = useState('');
  const [errors, setErrors] = useState({});

  const validatePlanName = (value) => {
    const planNameRegex = /^[A-Za-z\s]+$/;
    if (!value) {
      setErrors({ ...errors, planName: 'Plan Name is required' });
    } else if (!planNameRegex.test(value)) {
      setErrors({ ...errors, planName: 'Only characters and spaces are allowed' });
    } else {
      setErrors({ ...errors, planName: '' });
    }
    setPlanName(value);
  };

  const handleAddPlan = async () => {
    try {
      if (planName.trim() === '') {
        alert('Please enter a plan name.'); // You can replace this with a more user-friendly validation
        return;
      }

      const response = await axios.post('http://localhost:8080/planapp/addplan', {
        planname: planName,
      });

      Swal.fire('Done', response.data, 'success');
      setPlanName('');
      onClose();
    } catch (error) {
      console.log(error);
      Swal.fire('', error.response.data, 'error');
    }
  };

  return (
    <div className="div-addplan">
      <div className="fw-bold" style={{ fontSize: '22px' }}>
        Add Plan Here
      </div>
      <input
        type="text"
        placeholder="Enter Plan Name"
        value={planName}
        onChange={(e) => validatePlanName(e.target.value)}
        style={{ maxWidth: '200px', marginTop: '10px' }}
      />
      {errors.planName && (
        <span className="error" style={{ color: 'red', fontSize: '10px', marginTop: '5px' }}>
          {errors.planName}
        </span>
      )}
      <button onClick={handleAddPlan} style={{ maxWidth: '200px', marginTop: '10px' }}>
        Add Plan
      </button>
    </div>
  );
};

export default AddPlan;
