import axios from 'axios'

export const getSchemesByPlanid = async (selectedPlan) => {
  const response = await axios.get(`http://localhost:8080/schemeapp/getbyplanid?planid=${selectedPlan}`)
  // console.log(response.data);
  return response
}

export const getSchemeBySchemeid = async (selectScheme) => {
  const response = await axios.get(`http://localhost:8080/schemeapp/getbyid?schemeid=${selectScheme}`)
  console.log(response.data);
  return response
}

export const getPolicyOfCustomer = async (accessid) => {
  // console.log(accessid);
  const customerid = accessid
  const response = await axios.get(`http://localhost:8080/policyapp/getcustomerpolicy/${customerid}`)
  console.log(response.data,"policydataofcustomer");
  return response.data
}
