import axios from 'axios'
import { useState } from 'react'

export const getCustomerData = async (accessid) => {
  const response = await axios.get(
    `http://localhost:8080/customerapp/customer?accessid=${accessid}`
    // {body},
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  )
  return response.data
}

export const updateCustomer = async (accessid, profileData) => {
  const response = await axios.post(
    `http://localhost:8080/customerapp/update/?accessid=${accessid}`,
    {
      firstname: profileData.firstname,
      lastname: profileData.lastname,
      email: profileData.email,
      address: profileData.address,
      state: profileData.state,
      city: profileData.city,
      pincode: profileData.pincode,
      mobileno: profileData.mobileno,
      birthdate: profileData.birthdate,
      nominee: profileData.nominee,
      nomineerelation: profileData.nomineerelation
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  )
  return response
}
