import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash,faStar } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [data, setdata] = useState([])
  const [accessid, setAccessid] = useState('')
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateEmail = () => {
    if (!email) {
      setEmailError('UserName is required')
    }
  }

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required')
    }
    if (password) {
      setPasswordError('')
    }
  }

  const navigate = useNavigate()

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
  }

  const hasClicked = async (e) => {
    e.preventDefault()
    validateEmail()
    validatePassword()
    try {
      const res = await axios.post('http://localhost:8080/userinfoapp/login', {
        username: email,
        password,
      })
      const auth = res.data.accessToken
      localStorage.setItem('auth', auth)
      setAccessid(res.data.accessid)

      const rolename = res.data.rolename
      localStorage.setItem('accessid', res.data.accessid)
      if (rolename === 'ROLE_CUSTOMER') {
        navigate('/CustomerDashboard')
        return
      } else if (rolename === 'ROLE_EMPLOYEE') {
        navigate('/Employeedashboard')
        return
      } else if (rolename === 'ROLE_AGENT') {
        navigate('/AgentDashboard')
        return
      } else navigate('/AdminDashboard')

      localStorage.setItem('auth', res.data.accessToken)
    } catch (error) {
      Swal.fire(
        'Wrong Credentials',
        '',
        'error'
      )
    }
  }

  return (
    <>
      <div className="login-div">
        <form className="form-main">
          <h3 className="text-center">Sign In</h3>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              style={{border:'.1px solid black'}}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              // onBlur={validateEmail}
            />
            {emailError && <span className="error">{emailError}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                style={{border:'.1px solid black'}}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                // onBlur={validatePassword}
              />
              
              <button
                className="btn btn-outline-secondary bg-light text-dark"
                type="button"
                onClick={handlePasswordToggle}
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} />: <FontAwesomeIcon icon={faEye} />} {/* Toggle button text */}
              </button>
            </div>
            {passwordError && <span className="error">{passwordError}</span>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={hasClicked}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
