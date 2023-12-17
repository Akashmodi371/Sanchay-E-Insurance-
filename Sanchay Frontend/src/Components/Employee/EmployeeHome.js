import React from "react";
// import "./CustomerHome.css";
import { Image } from "react-bootstrap";
import changepasswordpic from '../../assets/changepasswordpic.png'
import addperson from '../../assets/addadmin.png'
import addemployee from '../../assets/addemployee.png'
import addplan from '../../assets/addplan.png'
import viewemployee from '../../assets/viewemployee.png'
import viewplan from '../../assets/viewplan.png'
import viewfeedback from '../../assets/viewfeedback.png'
import logout from '../../assets/logout.png'
// import AddAdmin from './AddSchemeorView/AddAdmin';
import buddy from '../../assets/buddy.jpg'
import { useNavigate } from "react-router-dom";


function EmployeeHome({handles}) {

    // const handles={
    //     handleForShowProfile,
    //     handleforChangepassword,
    //     handleforShowCustomers,
    //     handleforShowPolicies,
    //     }
  const navigate=useNavigate();

  return (
    <div className="admin-container">
      {/* Content */}
      <div className="content">
        <h2 className="text-center mb-4 text-dark">
          Welcome to the Employee Dashboard
        </h2>

        {/* Cards */}
        <div className="cards-container-admin">
          <div className="card-row">
            <div className="card-admin" onClick={handles.handleForShowProfile}>
              <img
                src='https://rb.gy/6renf'
              />
              <h3>View Profile</h3>
            </div>
            <div className="card-admin" onClick={handles.handleforChangepassword}>
              <img
                src={changepasswordpic}
                alt="Profile Image"
              />
              <h5 className=" mt-3" style={{fontSize:'16px'}}>Change Password</h5>
            </div>
            <div className="card-admin" onClick={handles.handleforShowPolicies}>
              <img
                src="https://rb.gy/jks5n"
              />
              <h3>View Policies</h3>
            </div>
            <div className="card-admin" onClick={handles.handleforShowCustomers}>
              <img
                src="https://rb.gy/jks5n"
              />
              <h3>View Customers</h3>
            </div>
            
          </div>
       
          
          
        </div>
      </div>
    </div>
  );
}

export default EmployeeHome;
