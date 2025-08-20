import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <h1>Defence Coaching Institute</h1>
            <span className="tagline">Excellence in Defence Preparation</span>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><button onClick={() => scrollToSection('home')} className="nav-link">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="nav-link">About Us</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="nav-link">Courses</button></li>
              <li><button onClick={() => scrollToSection('success-stories')} className="nav-link">Success Stories</button></li>
              <li><button onClick={() => scrollToSection('faculty')} className="nav-link">Faculty</button></li>
              <li><button onClick={() => scrollToSection('notices')} className="nav-link">Notices</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button></li>
            </ul>
          </nav>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header