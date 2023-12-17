import React from 'react'

import axios from "axios";
import { useState } from 'react';

export const getAgentsData = async (accessid) => {
  const response = await axios.get(
    // `http://localhost:8080/customerapp/customer?accessid=${accessid}`
    // {body},
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  return response.data;
};