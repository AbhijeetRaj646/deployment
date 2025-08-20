import React, { useState } from 'react'
import './Courses.css'

const Courses = () => {
  const [expandedCourse, setExpandedCourse] = useState(null)

  const courses = [
    {
      id: 'nda',
      title: 'NDA (National Defence Academy)',
      description: 'Comprehensive preparation for National Defence Academy entrance examination',
      duration: '12 Months',
      eligibility: '10+2 (Science)',
      ageLimit: '16.5 - 19.5 years',
      subjects: ['Mathematics', 'General Ability Test', 'English', 'Physics', 'Chemistry'],
      details: {
        overview: 'The NDA exam is conducted twice a year by UPSC for admission to the National Defence Academy and Naval Academy. Our comprehensive course covers all aspects of the written exam and SSB interview preparation.',
        syllabus: [
          'Mathematics: Algebra, Trigonometry, Analytical Geometry, Differential & Integral Calculus, Vector Algebra, Statistics & Probability',
          'General Ability Test: English, Physics, Chemistry, General Science, History, Geography, Current Affairs',
          'SSB Interview: Psychological Tests, Group Testing, Personal Interview'
        ],
        features: [
          'Daily practice sessions with previous year questions',
          'Weekly mock tests following exact exam pattern',
          'Individual doubt clearing sessions',
          'SSB interview preparation with mock interviews',
          'Physical fitness training guidance',
          'Study material updated as per latest syllabus'
        ],
        batchInfo: {
          batchSize: '30-35 students',
          timing: 'Morning (9 AM - 1 PM) & Evening (2 PM - 6 PM)',
          startDates: 'Every month',
          fee: '₹85,000 (including study material)'
        }
      }
    },
    {
      id: 'cds',
      title: 'CDS (Combined Defence Services)',
      description: 'Expert coaching for Combined Defence Services examination',
      duration: '10 Months',
      eligibility: 'Graduate',
      ageLimit: '20 - 26 years',
      subjects: ['English', 'General Knowledge', 'Elementary Mathematics'],
      details: {
        overview: 'CDS examination is conducted twice a year for admission to Indian Military Academy, Indian Naval Academy, Air Force Academy, and Officers Training Academy. Our course ensures comprehensive preparation for both written exam and SSB.',
        syllabus: [
          'English: Grammar, Vocabulary, Comprehension, Precise Writing, Letter Writing',
          'General Knowledge: Physics, Chemistry, Biology, History, Geography, Polity, Economics, Current Affairs',
          'Elementary Mathematics: Arithmetic, Algebra, Trigonometry, Geometry, Mensuration, Statistics'
        ],
        features: [
          'Specialized coaching by ex-defence officers',
          'Regular current affairs updates',
          'Comprehensive test series',
          'SSB preparation with group discussions',
          'Interview techniques and personality development',
          'Time management strategies'
        ],
        batchInfo: {
          batchSize: '25-30 students',
          timing: 'Morning (8 AM - 12 PM) & Evening (3 PM - 7 PM)',
          startDates: 'January, March, June, September',
          fee: '₹75,000 (including study material)'
        }
      }
    },
    {
      id: 'afcat',
      title: 'AFCAT (Air Force Common Admission Test)',
      description: 'Specialized training for Air Force Common Admission Test',
      duration: '8 Months',
      eligibility: 'Graduate (Science/Arts/Commerce)',
      ageLimit: '20 - 26 years',
      subjects: ['General Awareness', 'Verbal Ability', 'Numerical Ability', 'Reasoning'],
      details: {
        overview: 'AFCAT is conducted twice a year for selection of officers in Flying Branch, Ground Duty (Technical), and Ground Duty (Non-Technical) of the Indian Air Force. Our course provides comprehensive preparation.',
        syllabus: [
          'General Awareness: History, Geography, Civics, Physics, Chemistry, Biology, Sports, Current Affairs',
          'Verbal Ability: English Grammar, Vocabulary, Reading Comprehension, Error Detection',
          'Numerical Ability: Number System, Ratio & Proportion, Percentage, Time & Work, Simple & Compound Interest',
          'Reasoning: Verbal & Non-Verbal Reasoning, Spatial Ability'
        ],
        features: [
          'Air Force specific preparation strategies',
          'Technical and non-technical stream guidance',
          'Flying branch specific preparation',
          'Group discussions and extempore sessions',
          'Aviation knowledge enhancement',
          'AFSB interview preparation'
        ],
        batchInfo: {
          batchSize: '20-25 students',
          timing: 'Evening (4 PM - 8 PM) & Weekend batches',
          startDates: 'February, June, October',
          fee: '₹65,000 (including study material)'
        }
      }
    },
    {
      id: 'capf',
      title: 'CAPF (Central Armed Police Forces)',
      description: 'Complete preparation for Central Armed Police Forces examination',
      duration: '10 Months',
      eligibility: 'Graduate',
      ageLimit: '20 - 25 years',
      subjects: ['General Ability', 'General Studies', 'Essay', 'Comprehension'],
      details: {
        overview: 'CAPF examination is conducted by UPSC for recruitment to Assistant Commandant posts in BSF, CRPF, CISF, ITBP, and SSB. Our comprehensive course covers all aspects of the examination.',
        syllabus: [
          'General Ability & Intelligence: Logical Reasoning, Analytical Ability, Data Interpretation, Problem Solving',
          'General Studies: Indian History, Geography, Indian Polity, Economics, General Science, Current Events',
          'Essay: Topics of national and international importance',
          'Comprehension: English language comprehension and writing ability'
        ],
        features: [
          'Specialized coaching for paramilitary forces',
          'Essay writing workshops',
          'Current affairs daily updates',
          'Interview preparation for CAPF',
          'Physical standards guidance',
          'Medical examination preparation'
        ],
        batchInfo: {
          batchSize: '30-35 students',
          timing: 'Morning (9 AM - 1 PM)',
          startDates: 'March, July, November',
          fee: '₹70,000 (including study material)'
        }
      }
    }
  ]

  const toggleExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  return (
    <section id="courses" className="section courses">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Courses</h2>
          <p className="section-subtitle">
            Comprehensive coaching programs designed to help you excel in defence examinations
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className={`course-card ${expandedCourse === course.id ? 'expanded' : ''}`}>
              <div className="course-header">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
              </div>

              <div className="course-info">
                <div className="info-item">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">{course.duration}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Eligibility:</span>
                  <span className="info-value">{course.eligibility}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age Limit:</span>
                  <span className="info-value">{course.ageLimit}</span>
                </div>
              </div>

              <div className="course-subjects">
                <h4>Key Subjects:</h4>
                <div className="subjects-list">
                  {course.subjects.map((subject, index) => (
                    <span key={index} className="subject-tag">{subject}</span>
                  ))}
                </div>
              </div>

              {expandedCourse === course.id && (
                <div className="course-details">
                  <div className="detail-section">
                    <h4>Course Overview</h4>
                    <p>{course.details.overview}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Detailed Syllabus</h4>
                    <ul>
                      {course.details.syllabus.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>Course Features</h4>
                    <ul>
                      {course.details.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section batch-info">
                    <h4>Batch Information</h4>
                    <div className="batch-details">
                      <div className="batch-item">
                        <strong>Batch Size:</strong> {course.details.batchInfo.batchSize}
                      </div>
                      <div className="batch-item">
                        <strong>Timing:</strong> {course.details.batchInfo.timing}
                      </div>
                      <div className="batch-item">
                        <strong>Start Dates:</strong> {course.details.batchInfo.startDates}
                      </div>
                      <div className="batch-item fee">
                        <strong>Course Fee:</strong> {course.details.batchInfo.fee}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="course-actions">
                <button 
                  className="btn learn-more-btn"
                  onClick={() => toggleExpand(course.id)}
                >
                  {expandedCourse === course.id ? 'Show Less' : 'Learn More'}
                </button>
                <button className="btn btn-primary enroll-btn">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Courses