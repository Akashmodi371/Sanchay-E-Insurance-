import React from "react";
import "./AdminHome.css";
import { Image } from "react-bootstrap";
import changepasswordpic from '../../assets/changepasswordpic.png'
import addperson from '../../assets/addadmin.png'
import addemployee from '../../assets/addemployee.png'
import addplan from '../../assets/addplan.png'
import viewemployee from '../../assets/viewemployee.png'
import viewplan from '../../assets/viewplan.png'
import viewfeedback from '../../assets/viewfeedback.png'
import logout from '../../assets/logout.png'
import AddAdmin from './AddSchemeorView/AddAdmin';
import buddy from '../../assets/buddy.jpg'
import { useNavigate } from "react-router-dom";


function AdminHome({handles}) {

  // const handles={
  //   handleAddAgent,
  //   handleViewAgent,
  //   handleViewCustomer,
  //   handleviewInsurancetable,
  //   handlqueryfeedback,
  //   handleAddPlan,
  //   handleViewPlans,
  //   handleAddSchemeForm,
  //   handleViewSchemeTable,
  //   handleProfile,
  //   handleChangePassword,
  //   handleAddEmployee,
  //   handleViewEmployee,
  //   handleViewAdmin
  // }
  const navigate=useNavigate();

  return (
    <div className="admin-container">
      {/* Content */}
      <div className="content">
        <h2 className="text-center mb-4 text-dark">
          Welcome to the Admin Dashboard
        </h2>

        {/* Cards */}
        <div className="cards-container-admin text-dark">
          <div className="card-row">
            <div className="card-admin" onClick={handles.handleProfile}>
              <img
                src='https://rb.gy/6renf'
              />
              <h3>Admin Profile</h3>
            </div>
            <div className="card-admin" onClick={handles.handleChangePassword}>
              <img
                src={changepasswordpic}
                alt="Profile Image"
              />
              <h5 className="text-dark mt-3" style={{fontSize:'16px'}}>Change Password</h5>
            </div>
            <div className="card-admin" onClick={handles.handleAddEmployee}>
              <img
                src="https://rb.gy/6renf"
              />
              <h3>Add Employee</h3>
            </div>
            <div className="card-admin" onClick={handles.handleViewEmployee}>
              <img
                src="https://rb.gy/6renf"
              />
              <h3>View Employee</h3>
            </div>
          </div>
          <div className="card-row">
            <div className="card-admin" onClick={handles.handleAddAdmin}>
              <img
                src="https://rb.gy/6renf"
              />
              <h3>Add Admin</h3>
            </div>
            <div className="card-admin" onClick={handles.handleViewAdmin}>
              <img
                src="https://rb.gy/6renf"
              />
              <h3>View Admin</h3>
            </div>
            <div className="card-admin" onClick={handles.handleAddPlan}>
              <img
                src='https://rb.gy/jks5n'
              />
              <h3>Add Plan</h3>
            </div>
            <div className="card-admin" onClick={handles.handleViewPlans}>
              <img
                src='https://rb.gy/jks5n'
              />
              <h3>View Plan</h3>
            </div>
          </div>
          <div className="card-row">
            <div className="card-admin" onClick={handles.handleAddSchemeForm}>
              <img
                src='https://rb.gy/jks5n'
              />
              <h3>Add Scheme</h3>
            </div>
            <div className="card-admin" onClick={handles.handleViewSchemeTable}>
              <img
                src='https://rb.gy/jks5n'
              />
              <h3>View Sceheme</h3>
            </div>
            <div className="card-admin" onClick={handles.handlqueryfeedback} >
              <img
                src='https://rb.gy/nqnjo'
              />
              <h3>View Feeback</h3>
            </div>
            <div className="card-admin" onClick={handles.handleViewCustomer}>
              <img
                src="https://rb.gy/6renf"
              />
              <h3>View Customer</h3>
            </div>
          </div>
          <div className="card-row">
            <div className="card-admin" onClick={handles.handleviewInsurancetable}>
              <img
                src='https://rb.gy/jks5n'
              />
              <h3>View Policies</h3>
            </div>
            <div className="card-admin" onClick={handles.handleAddAgent}>
              <img
                src="https://rb.gy/6renf"
              />
              <h3>Add Agent </h3>
            </div>
            <div className="card-admin" onClick={handles.handleViewAgent}>
              <img
                src="https://rb.gy/6renf"
              />
              <h3>View Agent</h3>
            </div>
            <div className="card-admin" onClick={()=>navigate('/')}>
              <img
                src='https://rb.gy/y1yf1'
              />
              <h3>Logout</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
