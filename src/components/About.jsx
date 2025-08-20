import React from 'react'
import './About.css'

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Defence Coaching Institute</h2>
          <p className="section-subtitle">
            Leading the way in defence exam preparation with excellence, dedication, and proven results
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <h3>Shaping Future Defenders of the Nation</h3>
              <p>
                For over 15 years, Defence Coaching Institute has been the cornerstone of defence exam preparation, 
                guiding thousands of aspirants towards their dream of serving the nation. Our comprehensive approach 
                combines traditional teaching methods with modern educational techniques to ensure optimal results.
              </p>
            </div>
            
            <div className="mission-vision">
              <div className="mission">
                <h4>🎯 Our Mission</h4>
                <p>
                  To provide world-class coaching and mentorship that transforms defence aspirants into confident, 
                  capable officers ready to serve the nation with honor and distinction.
                </p>
              </div>
              
              <div className="vision">
                <h4>🌟 Our Vision</h4>
                <p>
                  To be India's most trusted and respected defence coaching institute, known for our unwavering 
                  commitment to excellence and the success of our students.
                </p>
              </div>
            </div>
          </div>
          
          <div className="about-features">
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h4>Comprehensive Curriculum</h4>
                <p>Complete coverage of all subjects with updated syllabus and exam patterns</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">👨‍🏫</div>
                <h4>Expert Faculty</h4>
                <p>Experienced instructors with military background and proven teaching expertise</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h4>Regular Assessments</h4>
                <p>Continuous evaluation through mock tests and performance analysis</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h4>Proven Track Record</h4>
                <p>95% success rate with students clearing NDA, CDS, AFCAT, and other exams</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h4>Personal Mentoring</h4>
                <p>Individual attention and guidance for personality development</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🎖️</div>
                <h4>SSB Preparation</h4>
                <p>Specialized training for Service Selection Board interviews and group tasks</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="achievements">
          <h3>Our Achievements</h3>
          <div className="achievement-stats">
            <div className="achievement">
              <div className="achievement-number">5000+</div>
              <div className="achievement-label">Students Successfully Trained</div>
            </div>
            <div className="achievement">
              <div className="achievement-number">95%</div>
              <div className="achievement-label">Overall Success Rate</div>
            </div>
            <div className="achievement">
              <div className="achievement-number">15+</div>
              <div className="achievement-label">Years of Excellence</div>
            </div>
            <div className="achievement">
              <div className="achievement-number">50+</div>
              <div className="achievement-label">Expert Faculty Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About