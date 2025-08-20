import React, { useState, useEffect } from 'react'
import './SuccessStories.css'

const SuccessStories = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Lt. Arjun Sharma',
      exam: 'NDA 2023',
      service: 'Indian Army',
      image: '👨‍✈️',
      quote: 'Defence Coaching Institute transformed my dream into reality. The comprehensive training, expert faculty, and personalized attention helped me crack NDA on my first attempt. The SSB preparation was exceptional!',
      achievement: 'All India Rank 15',
      batch: 'NDA Batch 2022-23'
    },
    {
      id: 2,
      name: 'Flying Officer Priya Patel',
      exam: 'AFCAT 2023',
      service: 'Indian Air Force',
      image: '👩‍✈️',
      quote: 'The institute\'s systematic approach and regular mock tests boosted my confidence. The faculty\'s guidance during AFSB preparation was invaluable. Today, I\'m proud to serve in the Indian Air Force.',
      achievement: 'Selected in Flying Branch',
      batch: 'AFCAT Batch 2022'
    },
    {
      id: 3,
      name: 'Lt. Commander Rahul Singh',
      exam: 'CDS 2022',
      service: 'Indian Navy',
      image: '👨‍💼',
      quote: 'Excellent coaching methodology and experienced faculty made all the difference. The institute\'s focus on both written exam and SSB interview preparation is commendable. Highly recommended!',
      achievement: 'All India Rank 8',
      batch: 'CDS Batch 2021-22'
    },
    {
      id: 4,
      name: 'Assistant Commandant Sneha Gupta',
      exam: 'CAPF 2023',
      service: 'CRPF',
      image: '👮‍♀️',
      quote: 'The comprehensive study material and regular assessments helped me understand my strengths and weaknesses. The faculty\'s continuous support and motivation were key to my success.',
      achievement: 'All India Rank 12',
      batch: 'CAPF Batch 2022-23'
    },
    {
      id: 5,
      name: 'Lt. Vikash Kumar',
      exam: 'NDA 2022',
      service: 'Indian Army',
      image: '🎖️',
      quote: 'From a small town dreamer to an Army officer - this journey wouldn\'t have been possible without the institute\'s guidance. The mentorship and quality education here are unmatched.',
      achievement: 'All India Rank 25',
      batch: 'NDA Batch 2021-22'
    },
    {
      id: 6,
      name: 'Flight Lieutenant Ananya Reddy',
      exam: 'AFCAT 2022',
      service: 'Indian Air Force',
      image: '✈️',
      quote: 'The institute not only prepared me for the written exam but also shaped my personality for the SSB interview. The comprehensive approach and dedicated faculty are truly exceptional.',
      achievement: 'Selected in Technical Branch',
      batch: 'AFCAT Batch 2021'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="success-stories" className="section success-stories">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">
            Hear from our successful candidates who are now serving the nation with pride
          </p>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-carousel">
            <button className="carousel-btn prev-btn" onClick={prevTestimonial}>
              ‹
            </button>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="student-avatar">
                  {testimonials[currentTestimonial].image}
                </div>
                <div className="student-info">
                  <h3 className="student-name">{testimonials[currentTestimonial].name}</h3>
                  <p className="student-service">{testimonials[currentTestimonial].service}</p>
                  <div className="achievement-badge">
                    {testimonials[currentTestimonial].achievement}
                  </div>
                </div>
              </div>
              
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-quote">
                  {testimonials[currentTestimonial].quote}
                </p>
              </div>
              
              <div className="testimonial-footer">
                <div className="exam-info">
                  <span className="exam-name">{testimonials[currentTestimonial].exam}</span>
                  <span className="batch-info">{testimonials[currentTestimonial].batch}</span>
                </div>
              </div>
            </div>
            
            <button className="carousel-btn next-btn" onClick={nextTestimonial}>
              ›
            </button>
          </div>
          
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        <div className="success-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🏆</div>
              <div className="stat-number">5000+</div>
              <div className="stat-label">Successful Candidates</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Top 100 Ranks</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎖️</div>
              <div className="stat-number">15+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
          </div>
        </div>

        <div className="all-testimonials">
          <h3>More Success Stories</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`mini-testimonial ${index === currentTestimonial ? 'featured' : ''}`}>
                <div className="mini-header">
                  <span className="mini-avatar">{testimonial.image}</span>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.exam}</p>
                  </div>
                </div>
                <p className="mini-quote">"{testimonial.quote.substring(0, 100)}..."</p>
                <div className="mini-achievement">{testimonial.achievement}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuccessStories