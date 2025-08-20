import React from 'react'
import './Hero.css'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Gateway to 
              <span className="highlight"> Defence Excellence</span>
            </h1>
            <p className="hero-subtitle">
              Premier coaching institute for NDA, CDS, AFCAT, CAPF and all defence examinations. 
              Join thousands of successful candidates who achieved their dreams with our expert guidance.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
              <div className="stat">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Students Trained</div>
              </div>
              <div className="stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('courses')} className="btn btn-primary">
                Explore Courses
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
                Get Started Today
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <div className="badge">🏆 Award Winning Institute</div>
              <div className="image-content">
                <h3>Excellence in Defence Training</h3>
                <p>Comprehensive preparation for all defence examinations with experienced faculty and proven methodologies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Hero