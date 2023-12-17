import React, { useState } from 'react';
import './Contact.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { faEye, faEyeSlash,faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Contact = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate that both title and message are not empty
    if (!title || !message) {
      Swal.fire(
        'Validation Error',
        'Title and Message are required fields',
        'error'
      );
      return;
    }

    console.log('Submitted title:', title);
    console.log('Submitted message:', message);

    try {
      const response = await axios.post('http://localhost:8080/mailapp/', {
        toemail: 'akashmodi937@gmail.com',
        subject: title,
        body: message,
      });

      Swal.fire('', 'Our Executive will get back to you', 'info');

      // Clear the input fields after successful submission
      setMessage('');
      setTitle('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="text-center fw-bold mt-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group title-field">
          <label htmlFor="title">Title* </label>
          <input
            type="text"
            id="title"
            value={title}
          
            onChange={handleTitleChange}
            className="form-control"
            style={{ width: '440px',marginRight:'10px' }} // Apply Bootstrap form-control class for styling
            required // Adding required attribute for validation
          />
        </div>
        <div className="form-group message-field">
          <label htmlFor="message">Message*</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            
            style={{ width: '300px',marginRight:'40px',height:'100px',maxHeight:'150px' }}
            className="form-control" // Apply Bootstrap form-control class for styling
            required // Adding required attribute for validation
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mb-1">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
