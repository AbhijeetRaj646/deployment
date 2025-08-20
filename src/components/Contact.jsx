import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: ''
      })
      setTimeout(() => setFormStatus(''), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Get in touch with us to start your journey towards defence excellence
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-details">
                <h3>Visit Our Campus</h3>
                <p>Defence Coaching Institute<br/>
                123 Defence Academy Road<br/>
                Karol Bagh, New Delhi - 110005<br/>
                Near Metro Station</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <div className="info-details">
                <h3>Call Us</h3>
                <p>
                  <strong>Main Office:</strong> +91 9876543210<br/>
                  <strong>Admission:</strong> +91 9876543211<br/>
                  <strong>Student Support:</strong> +91 9876543212<br/>
                  <strong>Landline:</strong> 011-25738492
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <div className="info-details">
                <h3>Email Us</h3>
                <p>
                  <strong>General Inquiry:</strong> info@defencecoaching.com<br/>
                  <strong>Admissions:</strong> admissions@defencecoaching.com<br/>
                  <strong>Support:</strong> support@defencecoaching.com<br/>
                  <strong>Director:</strong> director@defencecoaching.com
                </p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">🕒</div>
              <div className="info-details">
                <h3>Office Hours</h3>
                <p>
                  <strong>Monday - Saturday:</strong> 8:00 AM - 8:00 PM<br/>
                  <strong>Sunday:</strong> 9:00 AM - 5:00 PM<br/>
                  <strong>Public Holidays:</strong> 10:00 AM - 2:00 PM<br/>
                  <em>24/7 Online Support Available</em>
                </p>
              </div>
            </div>

            <div className="social-media">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link facebook">
                  <span className="social-icon">📘</span>
                  <span>Facebook</span>
                </a>
                <a href="#" className="social-link youtube">
                  <span className="social-icon">📺</span>
                  <span>YouTube</span>
                </a>
                <a href="#" className="social-link instagram">
                  <span className="social-icon">📷</span>
                  <span>Instagram</span>
                </a>
                <a href="#" className="social-link twitter">
                  <span className="social-icon">🐦</span>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-header">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="course">Course of Interest</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                >
                  <option value="">Select a course</option>
                  <option value="nda">NDA (National Defence Academy)</option>
                  <option value="cds">CDS (Combined Defence Services)</option>
                  <option value="afcat">AFCAT (Air Force Common Admission Test)</option>
                  <option value="capf">CAPF (Central Armed Police Forces)</option>
                  <option value="ssb">SSB Interview Preparation</option>
                  <option value="other">Other / General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Please describe your inquiry, questions, or how we can help you..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${formStatus}`}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 
                 formStatus === 'success' ? 'Message Sent!' : 
                 'Send Message'}
              </button>

              {formStatus === 'success' && (
                <div className="success-message">
                  ✅ Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="map-section">
          <h3>Find Us on Map</h3>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-content">
                <div className="map-icon">🗺️</div>
                <h4>Defence Coaching Institute</h4>
                <p>123 Defence Academy Road, Karol Bagh<br/>New Delhi - 110005</p>
                <div className="map-features">
                  <span className="feature">🚇 Near Metro Station</span>
                  <span className="feature">🚌 Bus Stop Nearby</span>
                  <span className="feature">🚗 Parking Available</span>
                </div>
                <button className="btn map-btn">View on Google Maps</button>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-contact">
          <div className="quick-contact-content">
            <h3>Need Quick Help?</h3>
            <p>Our counselors are available to help you choose the right course</p>
            <div className="quick-actions">
              <button className="btn btn-primary">Schedule a Call</button>
              <button className="btn">Chat with Us</button>
              <button className="btn">Download Brochure</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact