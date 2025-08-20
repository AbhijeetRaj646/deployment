import React from 'react'
import './Footer.css'

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Defence Coaching Institute</h3>
            <p>Your trusted partner in defence exam preparation. We are committed to helping you achieve your dreams of serving the nation.</p>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">YouTube</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('home')} className="footer-link">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="footer-link">About Us</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="footer-link">Courses</button></li>
              <li><button onClick={() => scrollToSection('faculty')} className="footer-link">Faculty</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Courses</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">NDA Coaching</a></li>
              <li><a href="#" className="footer-link">CDS Coaching</a></li>
              <li><a href="#" className="footer-link">AFCAT Coaching</a></li>
              <li><a href="#" className="footer-link">CAPF Coaching</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Defence Academy Road, New Delhi - 110001</p>
              <p>📞 +91 9876543210</p>
              <p>✉️ info@defencecoaching.com</p>
              <p>🕒 Mon - Sat: 8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Defence Coaching Institute. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer