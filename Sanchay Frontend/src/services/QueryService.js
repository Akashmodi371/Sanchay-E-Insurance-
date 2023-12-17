import axios from 'axios'
import { useState } from 'react'

export const getQueryData = async (accessid) => {
  const response = await axios.get(
    'http://localhost:8080/queryapp/getqueries'
    // {body},
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  )
  //   console.log(response);
  return response.data
}
