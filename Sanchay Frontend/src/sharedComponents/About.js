// About.js (React Component)
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="company-details">
        <h1 className='about-title'>About <br /> Sanchay Insurance Company</h1>
        <p>
          Sanchay Insurance Company is a trusted name in the insurance industry,
          providing reliable coverage and financial protection to individuals and
          businesses for over 1800 years.
        </p>
        <p>
          Founded by <span> Aakash Modi and Anil Kumar</span> , our company has been committed to
          safeguarding our customers' futures with a wide range of insurance
          products and services.
        </p>
      </div>

      <div className="cards-container">
        <div className="card ">
          {/* <img src="image1.jpg" alt="Image 1" /> */}
          <h2>Our Services</h2>
          <p>Explore our comprehensive insurance services.</p>
        </div>
        <div className="card">
          {/* <img src="image2.jpg" alt="Image 2" /> */}
          <h2>Why Choose Us</h2>
          <p>Discover the reasons to trust Sanchay Insurance Company.</p>
        </div>
        <div className="card">
          {/* <img src="image3.jpg" alt="Image 3" /> */}
          <h2>Contact Us</h2>
          <p>Get in touch with our team for any inquiries.</p>
        </div>
      </div>

      <div className='about-marquee'><marquee behavior="" direction="left-to-right"> Sanchay Insurnace</marquee></div>
    </div>
  );
};

export default About;
