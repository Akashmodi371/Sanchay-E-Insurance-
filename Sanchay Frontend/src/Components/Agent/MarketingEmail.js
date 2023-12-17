import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './MarketingEmail.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function MarketingEmail() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'video'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  // Validation function for instant email validation
  const validateEmail = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  };

  const subjectRegex=/^.{30}$/;

  // Validation function for instant field validation
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Invalid email format';
        } else {
          delete newErrors.email;
        }
        break;
      case 'subject':
        if (!value) {
          newErrors.subject = 'Subject is required';
        } 
        else if(subjectRegex.test(value)){
          newErrors.subject="Subject contains less than 30 character";
        }
        else {
          delete newErrors.subject;
        }
        break;
      case 'message':
        if (!value) {
          newErrors.message = 'Message is required';
        } else {
          delete newErrors.message;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateField('email', value);
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSubject(value);
    validateField('subject', value);
  };

  const handleMessageChange = (value) => {
    setMessage(value);
    validateField('message', value);
  };

  const handleSendMail = async () => {
    if (Object.keys(errors).length === 0) {
      // Implement your send mail logic here, e.g., using a backend API
      console.log('Sending mail...');
      console.log('Email:', email);
      console.log('Subject:', subject);
      console.log('Message:', message);

      try {
        const response = await axios.post('http://localhost:8080/mailapp/', {
          toemail: email,
          subject,
          body: message,
        });

        Swal.fire('', response.data, '');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="marketing-container text-dark">
      <h1 className="text-dark">Send Mail</h1>
      <div className="form-container">
        <div className="input-container">
          <label htmlFor="email">Email ID*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email ID"
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error" style={{fontSize:"12px"}}>{errors.email}</span>}
        </div>

        <div className="input-container">
          <label htmlFor="subject">Subject*</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            placeholder="Enter subject"
            className={errors.subject ? 'error-input' : ''}
          />
          {errors.subject && <span className="error" style={{fontSize:"12px"}}>{errors.subject}</span>}
        </div>

        <div className="input-container">
          <label htmlFor="message">Message*</label>
          <ReactQuill
            value={message}
            style={{ height: '200px' }}
            onChange={handleMessageChange}
            modules={modules}
            formats={formats}
            placeholder="Enter your message"
            className={errors.message ? 'error-input' : ''}
          />
          {errors.message && <span className="error" style={{fontSize:"12px"}}>{errors.message}</span>}
        </div>

        <button onClick={handleSendMail} className="mt-5">
          Send Mail
        </button>
      </div>
    </div>
  );
}

export default MarketingEmail;
