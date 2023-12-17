import axios from 'axios'

export const getRole = async (token) => {
  const response = await axios.get(`http://localhost:8080/auth/getrole?token=${token}`)
  // console.log(response.data);
  return response.data
}

export const getUsername = async (token) => {
  const response = await axios.post('http://localhost:8080/api/auth/getusername', {}, {
    params: {
      token
    }
  })
  return response
}

export const login = async (username, password) => {
  const response = await axios.post('http://localhost:8080/api/auth/login', {
    username,
    password
  })
  return response
}

export const adminRegistartion = async (firstname, lastname, username, password) => {
  const response = await axios.post('http://localhost:8080/api/auth/adminregister', {
    firstname,
    lastname,
    username,
    password,
    roleid: 1
  })
  return response
}

export const employeeRegistration = async (firstname, lastname, username, password, salary, token) => {
  const response = await axios.post('http://localhost:8080/api/auth/employeeregister', {
    firstname,
    lastname,
    username,
    password,
    salary,
    roleid: 2
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export const agentRegistration = async (firstname, lastname, username, password, qualification) => {
  const response = await axios.post('http://localhost:8080/api/auth/agentregister', {
    firstname,
    lastname,
    username,
    password,
    qualification,
    roleid: 3
  })
  return response
}

export const customerRegistration = async (firstname, lastname, age, username, password, mobile, email, state, city) => {
  const response = await axios.post('http://localhost:8080/api/auth/customerregister', {
    firstname,
    lastname,
    age,
    username,
    password,
    mobileNo: mobile,
    email,
    state,
    city,
    roleid: 4
  })
  return response
}
