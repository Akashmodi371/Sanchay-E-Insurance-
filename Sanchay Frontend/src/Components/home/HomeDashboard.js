import React, { useState } from 'react'
import './HomeDashboard.css'
import Carousel from 'react-bootstrap/Carousel'
import img1 from '../../assets/Carousel2.jpg'
import img2 from '../../assets/carousel1.jpg'
import { Image } from 'react-bootstrap'
import pic1 from '../../assets/pic1.jpg'
import pic2 from '../../assets/pic2.jpg'

const HomeDashboard = () => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }
  return (
    <div>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image src={img2} className="d-block w-10 img"/>
      </Carousel.Item>
      <Carousel.Item>
      <Image src={pic1} className="d-block w-10  img-fluid"/>
      </Carousel.Item>
      <Carousel.Item>
      <Image src={pic2} className="d-block w-10  img"/>
      </Carousel.Item>
      <Carousel.Item>
      <Image src={img2} className="d-block w-10 img" />
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default HomeDashboard
