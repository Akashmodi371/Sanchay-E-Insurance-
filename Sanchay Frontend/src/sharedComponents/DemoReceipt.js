import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DemoReceipt = ({ data }) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/receipt', { newdata: data })
  }, [])
  return (
    <div>

    </div>
  )
}

export default DemoReceipt
