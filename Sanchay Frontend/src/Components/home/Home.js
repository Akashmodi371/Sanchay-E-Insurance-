import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import axios from 'axios'
import './Home.css'
// import Login from '../login/Login';
// import Login from '../login/login';
import HomeDashboard from './HomeDashboard'
import Login from './../login/Login'
import CustomerRegister from './../Customer/CustomerRegister'
import Contact from './../../sharedComponents/Contact'
import PlanServices from './../../services/PlanServices'
import { button, Dropdown, Image } from 'react-bootstrap'
import footer from '../../assets/footer.png'
import About from './../../sharedComponents/About';
import PlanCardHome from './PlanCardHome'
import Swal from 'sweetalert2'

const Home = () => {
  const [showHome, setShowHome] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showInsurancePlan, setShowInsurancePlan] = useState(false)
  const [showContactUs, setShowContactUs] = useState(false)
  const [showAboutUs, setShowAboutUs] = useState(false)
  const [planData, setPlanData] = useState('')
  const [planName, setPlanName] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [showNavbar, setShowNavbar] = React.useState(false)
  const navigate = useNavigate()
  const[temp,setTemp]=useState()

  const offALlModals = () => {
    setShowContactUs(false)
    setShowHome(false)
    setShowRegister(false)
    setShowInsurancePlan(false)
    setShowLogin(false)
    setShowAboutUs(false)
    setShowHome(false)
  }

  const handleShowHome = () => {
    offALlModals()

    // navigate('/home')
    setShowHome(true)
  }

  const handleShowAboutus = () => {
    offALlModals()
    setShowAboutUs(true)
  }

  const handleShowLogin = () => {
    offALlModals()
    setShowLogin(true)
  }

  const handleShowRegister = () => {
    offALlModals()
    setShowRegister(true)
  }

  const handleShowInsurancePlan = () => {
    offALlModals()
    setTemp(Math.random())
    setShowInsurancePlan(true)
  }

  const handleShowContactUs = () => {
    offALlModals()

    setShowContactUs(true)
  }

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const plans = async () => {
    try {
      const res = await axios.get('http://localhost:8080/planapp/getall')
    if (res != null) {
      setPlanData(res.data)
    }
    // Swal.fire(
    //   '',
    //   res.data,
    //   'error'
    // )
    } catch (error) {
      // alert(error.message);
      // console.log(error);
      
    }
    
  }

  const handplannameset = (e) => {
    setSelectedPlan(e)
  }

  let planNames
  if (planData) {
    planNames = planData.map((bt) => {
      return (
        <Dropdown.Item
          href="#"
          value={bt.planid}
          className='bg-light text-dark'
          onClick={() => {
            handplannameset(bt.planid)
            handleShowInsurancePlan()
          }}
          style={{ whiteSpace: 'normal' }}
        >
          {bt.planname !== null ? bt.planname : 'select plan name'}
        </Dropdown.Item>
      )
    })
  }

  useEffect(() => {
    plans()
  }, [])

  return (
    <>
      <div className="container">
        <div className="header">
          <nav className="navbar fixed-top">
            <div className="container-nav">
              <div className="logo">
                <h3 className="text-dark" style={{fontSize:'32px'}}>Sanchay Insurance</h3>
              </div>
              <div className={` ${showNavbar && 'active'} nav-elements`}>
                <ul >
                  <li>
                    <button
                      className="bg-light text-dark fw-bold"
                      onClick={handleShowHome}
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      className="bg-light text-dark fw-bold"
                      onClick={handleShowAboutus}
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      className="bg-light text-dark fw-bold"
                      onClick={handleShowLogin}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      className="bg-light text-dark fw-bold"
                      onClick={handleShowRegister}
                    >
                      Register
                    </button>
                  </li>
                  <li>
                    <Dropdown >
                      <Dropdown.Toggle variant="light" className='fw-bold' id="dropdown-basic" style={{height:'45px',marginBottom:'2px'}}>
                        Insurance Plans
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="light">
                        {planNames}
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li>
                    <button
                      className="bg-light text-dark fw-bold"
                      onClick={handleShowContactUs}
                    >
                      Contact-us
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="content">
          {showHome && <HomeDashboard />}
          {showLogin && <Login/>}
          {showAboutUs && <About/>}
        {showRegister && <CustomerRegister/>}
        {showContactUs && <Contact/>}
         {/* {showInsurancePlan && <PlanServices selectedPlan={selectedPlan}/>} */}
         {showInsurancePlan && <PlanCardHome selectedPlan={selectedPlan}/>}
        </div>
        {/* <div className="footer fixed-bottom">
          <Image src={footer} className="d-block w-100 img" />
        </div> */}
      </div>
    </>
  )
}

export default Home
