import React from 'react'
import { Modal } from 'react-bootstrap'
import './Calculatormodal.css'
const Calculatormodal = ({ isOpen, closeModal, value }) => {
  console.log(value);  
    
  return (
    <div className='calculatormodal-div'>
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="My Modal">
      <h2>Modal Content</h2>
      <p>Value received: {value}</p>
      {/* Add your calculation results here */}
      <button onClick={closeModal}>Close Modal</button>
    </Modal>
    </div>
    
  )
}

export default Calculatormodal