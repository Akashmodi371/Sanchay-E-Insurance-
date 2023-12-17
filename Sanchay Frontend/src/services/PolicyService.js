import axios from 'axios'
import { useState } from 'react'

export const addPolicytoCustomer = async (
  accessid,
  schemename,
  formData,
  formDataWithFiles,
  noOfYear,
  premiumt,
  selectedAgent
) => {

  console.log(premiumt)
  console.log(noOfYear, 'in policy')
  const totalinstallment = premiumt * noOfYear
  console.log(totalinstallment)

  // Create a FormData object to hold the non-file fields
  const formDataFields = new FormData()
  formDataFields.append('issuedate', formData.dateCreated)
  formDataFields.append('maturitydate', formData.maturityDate)
  formDataFields.append('premiumamount', formData.installmentAmount)
  formDataFields.append('numberofinstallment', totalinstallment)
  formDataFields.append('status', 'PENDING')
  const token = localStorage.getItem('auth')
  // Append the files to the formDataFields
  for (let i = 0; i < formDataWithFiles.length; i++) {
    formDataFields.append('documentFiles', formDataWithFiles[i])
  }
  console.log(formDataWithFiles, 'formdata')
  // console.log(formDataFields.noOfYear);

  try {
    const response = await axios.post(
      `http://localhost:8080/policyapp/addpolicy/${accessid}/${schemename}/${premiumt}/${selectedAgent}`,
      formDataFields,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error uploading files:', error)
    throw new Error('Error uploading files. Please try again.')
  }
}
