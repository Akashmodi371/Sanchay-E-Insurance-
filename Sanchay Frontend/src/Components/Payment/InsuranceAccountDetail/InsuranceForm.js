import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './InsuranceForm.css'
import { addPolicytoCustomer } from '../../../services/PolicyService'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'

function InsuranceForm ({
  data,
  noOfYear,
  selectedPlan,
  maturityDate,
  currDate,
  calulatedata,
  investAmount,
  premiumtype
}) {
  let accessid=localStorage.getItem("accessid");
  // state to keep agent name and data
  const [agentNames, setAgentNames] = useState([])
  const [selectedAgent, setSelectedAgent] = useState('')
  const[temp,setTemp]=useState()
  const [agentid,setAgentid]=useState(0)
  // State to keep track of selected files
  const [selectedFiles, setSelectedFiles] = useState([])
  const maxFiles = 3 // Maximum number of allowed files

  const token = localStorage.getItem('auth')

  const fetchAgents = () => {
    axios
      .get('http://localhost:8080/agentapp/agents')
      .then((response) => {
        setTemp(Math.random())
        setAgentNames(response.data)
      })
      .catch((error) => {
        console.error('Error fetching agent names:', error.message)
      })
  }

  useEffect(() => {
    fetchAgents()
  }, [])
  // Function to handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = []

    // Filter and validate the selected files
    for (const file of files) {
      const fileType = file.type.toLowerCase()
      const fileName = file.name.toLowerCase()

      // Define allowed file types (image or PDF)
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      if (allowedTypes.includes(fileType) && validFiles.length < maxFiles) {
        validFiles.push(file)
      } else {
        alert(
          `Invalid file: ${fileName}. Only images (jpeg, jpg, png) and PDF (pdf,
             doc, docx) files are allowed, and you can upload a maximum of ${maxFiles} files.`
        )
      }
    }
    // Update the selected files state
    setSelectedFiles([...selectedFiles, ...validFiles])
  }

  // Function to render the selected files list
  const renderSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      return <p>No files selected.</p>
    }

    return (
      <ul>
        {selectedFiles.map((file, index) => (
          <li key={index}>
            {file.name}{' '}
            <Button
              variant="danger"
              onClick={() => handleFileRemove(index)}
              style={{ maxWidth: '100px', marginTop: '2px' }}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    )
  }

  // Function to remove a file from the selected files list
  const handleFileRemove = (index) => {
    const updatedFiles = [...selectedFiles]
    updatedFiles.splice(index, 1)
    setSelectedFiles(updatedFiles)
  }

  // Create initial formData state
  const initialFormData = {
    insuranceType: selectedPlan,
    insuranceScheme: data.schemename,
    numOfYears: noOfYear,
    profitRatio: data.registrationcommission,
    totalInvestmentAmount: investAmount,
    premiumType: premiumtype,
    installmentAmount: calulatedata.installmentAmount,
    totalAmount: calulatedata.totalAmount,
    dateCreated: currDate,
    maturityDate,
    interestAmount: calulatedata.interestAmount
  }

  // State to manage form data
  const [formData, setFormData] = useState(initialFormData)

  // State to manage form errors
  const [formErrors, setFormErrors] = useState({
    insuranceType: '',
    insuranceScheme: '',
    numOfYears: '',
    profitRatio: '',
    totalInvestmentAmount: '',
    premiumType: '',
    installmentAmount: '',
    totalAmount: '',
    dateCreated: '',
    maturityDate: ''
  })

  // Function to handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Function to handle date changes
  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date
    })
  }

  // Function to validate the form
  const validateForm = () => {
    const errors = {}
    let isValid = true
    for (const key in formData) {
      if (formData[key] === '') {
        errors[key] = 'Required'
        isValid = false
      }
    }
    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedFiles.length > 0) { // Check if at least one file is selected
      const formDataWithFiles = []
      selectedFiles.forEach((file, index) => {
        formDataWithFiles.push('documentFiles', file)
      })

      if (validateForm()) {
        // onSubmit(formData)

        try {
          const premiumt = formData.premiumType
          console.log(premiumt)
          console.log(selectedAgent);
          const response = await addPolicytoCustomer(
            accessid,
            data.schemename,
            formData,
            formDataWithFiles,
            parseInt(noOfYear),
            parseInt(premiumt),
            selectedAgent
          )

          setSelectedFiles([])

          Swal.fire(
            'Send For Verification',
            'Wait Until the policy gets verified',
            'right'
          )
        } catch (error) {
          console.error('Error uploading files:', error)
          alert('Error uploading files. Please try again.')
        }
      } else {
        alert('Enter Incorrect Credentials')
      }
    } else {
      alert('Please select at least one valid file to upload.')
    }
  }

  return (
    <>
      <h1>Insurance Account Details</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="insuranceType">Plan Id:</label>
            <input
              type="text"
              id="insuranceType"
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.insuranceType}</div>
          </div>
          <div className="form-group">
            <label htmlFor="insuranceScheme">Insurance Scheme:</label>
            <input
              type="text"
              id="insuranceScheme"
              name="insuranceScheme"
              value={formData.insuranceScheme}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.insuranceScheme}</div>
          </div>
          <div className="form-group">
            <label htmlFor="numOfYears">No. of Months:</label>
            <input
              type="number"
              id="numOfYears"
              name="numOfYears"
              value={formData.numOfYears}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.numOfYears}</div>
          </div>
          <div className="form-group">
            <label htmlFor="profitRatio">Profit Ratio (%):</label>
            <input
              type="number"
              id="profitRatio"
              name="profitRatio"
              value={formData.profitRatio}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.profitRatio}</div>
          </div>
          <div className="form-group">
            <label htmlFor="totalInvestmentAmount">
              Total Investment Amount:
            </label>
            <input
              type="number"
              id="totalInvestmentAmount"
              name="totalInvestmentAmount"
              value={formData.totalInvestmentAmount}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.totalInvestmentAmount}</div>
          </div>
          <div className="form-group">
            <label htmlFor="premiumType">Premium Type:</label>
            <input
              type="text"
              id="premiumType"
              name="premiumType"
              value={formData.premiumType + ' Months'}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.premiumType}</div>
          </div>
          <div className="form-group">
            <label htmlFor="installmentAmount">Installment Amount:</label>
            <input
              type="number"
              id="installmentAmount"
              name="installmentAmount"
              value={formData.installmentAmount}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.installmentAmount}</div>
          </div>

          <div className="form-group">
            <label htmlFor="interestAmount">Interest Amount:</label>
            <input
              type="number"
              id="interestAmount"
              name="interestAmount"
              value={formData.interestAmount}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.installmentAmount}</div>
          </div>

          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount:</label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              disabled
            />
            <div className="error">{formErrors.totalAmount}</div>
          </div>
          <div className="form-group">
            <label htmlFor="dateCreated">Date Created:</label>
            <input
              type="text"
              id="dateCreated"
              name="dateCreated"
              value={formData.dateCreated}
              disabled
            />
            <div className="error">{formErrors.dateCreated}</div>
          </div>
          <div className="form-group">
            <label htmlFor="maturityDate">Maturity Date:</label>
            <input
              type="text"
              id="maturityDate"
              name="maturityDate"
              value={formData.maturityDate}
              disabled
            />
            <div className="error">{formErrors.maturityDate}</div>
          </div>
          <div className="form-group">
            <label htmlFor="agentName">Select Agent:</label>
            <select
              id="agentName"
              name="agentName"
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(parseInt(e.target.value))}
            >
              <option value="0">Select an Agent</option>
              {/* <option value="0">No Agent</option> */}
              {agentNames.map((agent, index) => (
                <option key={index} value={agent.agentid}>
                  {agent.firstname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="documentfile">Upload Document</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
                name="documentfile"
                onChange={handleFileChange}
                multiple // Allow multiple file selection
              />
            </div>
            {renderSelectedFiles()}
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Click Here to Proceed
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default InsuranceForm
