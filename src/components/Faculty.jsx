import React, { useState } from 'react'
import './Faculty.css'

const Faculty = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null)

  const facultyMembers = [
    {
      id: 1,
      name: 'Col. Rajesh Kumar (Retd.)',
      designation: 'Director & Chief Faculty',
      subjects: ['Mathematics', 'Physics', 'Strategy'],
      experience: '25+ Years',
      education: 'M.Tech IIT Delhi, Ex-Army Officer',
      image: '👨‍🏫',
      specialization: 'NDA, CDS Mathematics & Physics',
      achievements: [
        'Former Commanding Officer, Army Engineering Corps',
        'IIT Delhi Alumni',
        'Trained 2000+ successful candidates',
        'Expert in Advanced Mathematics & Physics'
      ],
      description: 'Col. Rajesh Kumar brings over 25 years of combined military and teaching experience. His unique approach combines practical military knowledge with academic excellence, making complex mathematical concepts easy to understand.',
      courses: ['NDA Mathematics', 'CDS Mathematics', 'Physics for Defence Exams']
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      designation: 'Senior Faculty - English & GAT',
      subjects: ['English', 'General Ability', 'Essay Writing'],
      experience: '15+ Years',
      education: 'PhD English Literature, Delhi University',
      image: '👩‍🎓',
      specialization: 'English Language & Literature',
      achievements: [
        'PhD in English Literature from DU',
        'Published author of 3 books on English Grammar',
        'Expert in competitive exam English',
        'Mentor to 1500+ successful students'
      ],
      description: 'Dr. Priya Sharma is renowned for her innovative teaching methods in English and General Ability Test preparation. Her comprehensive approach ensures students excel in language skills and general knowledge.',
      courses: ['NDA English', 'CDS English', 'AFCAT English', 'Essay Writing']
    },
    {
      id: 3,
      name: 'Maj. Vikram Singh (Retd.)',
      designation: 'SSB Interview Expert',
      subjects: ['SSB Preparation', 'Personality Development', 'Leadership'],
      experience: '20+ Years',
      education: 'MBA, Ex-Infantry Officer',
      image: '🎖️',
      specialization: 'SSB Interview & Personality Development',
      achievements: [
        'Former Infantry Major with combat experience',
        'SSB Interview Board member (5 years)',
        'MBA in Human Resource Management',
        'Successfully coached 3000+ candidates for SSB'
      ],
      description: 'Maj. Vikram Singh specializes in SSB interview preparation with insider knowledge of the selection process. His military background and MBA qualification provide unique insights into leadership assessment.',
      courses: ['SSB Interview Preparation', 'Group Discussions', 'Personal Interview', 'Psychological Tests']
    },
    {
      id: 4,
      name: 'Dr. Anita Gupta',
      designation: 'Senior Faculty - General Studies',
      subjects: ['History', 'Geography', 'Polity', 'Current Affairs'],
      experience: '18+ Years',
      education: 'PhD History, JNU',
      image: '📚',
      specialization: 'General Studies & Current Affairs',
      achievements: [
        'PhD in Modern Indian History from JNU',
        'Former UPSC aspirant with Mains qualification',
        'Expert in Indian History and Geography',
        'Regular contributor to defence magazines'
      ],
      description: 'Dr. Anita Gupta brings deep academic knowledge and practical exam insight to General Studies preparation. Her comprehensive coverage of history, geography, and current affairs is unmatched.',
      courses: ['General Studies for CDS', 'History for NDA', 'Geography', 'Current Affairs']
    },
    {
      id: 5,
      name: 'Wg Cdr. Amit Patel (Retd.)',
      designation: 'AFCAT Specialist',
      subjects: ['Aviation Science', 'Technical Subjects', 'AFCAT Preparation'],
      experience: '22+ Years',
      education: 'B.Tech Aerospace, Ex-Air Force Officer',
      image: '✈️',
      specialization: 'AFCAT & Aviation Sciences',
      achievements: [
        'Former Wing Commander, Indian Air Force',
        'B.Tech in Aerospace Engineering',
        'Fighter pilot with 2000+ flying hours',
        'AFCAT subject matter expert'
      ],
      description: 'Wg Cdr. Amit Patel provides unparalleled expertise in AFCAT preparation with real Air Force experience. His technical knowledge and aviation background give students authentic insights.',
      courses: ['AFCAT Preparation', 'Aviation Sciences', 'Technical Subjects', 'Air Force Procedures']
    },
    {
      id: 6,
      name: 'Capt. Meera Reddy (Retd.)',
      designation: 'CAPF Expert',
      subjects: ['Law', 'Constitution', 'CAPF Subjects'],
      experience: '16+ Years',
      education: 'LLB, Ex-CRPF Officer',
      image: '👮‍♀️',
      specialization: 'CAPF Examination & Law',
      achievements: [
        'Former Captain in CRPF',
        'LLB with specialization in Constitutional Law',
        'Expert in paramilitary force procedures',
        'Successful track record in CAPF coaching'
      ],
      description: 'Capt. Meera Reddy combines practical CAPF experience with legal expertise to provide comprehensive preparation for Central Armed Police Forces examinations.',
      courses: ['CAPF Preparation', 'Constitutional Law', 'Police Procedures', 'General Studies for CAPF']
    }
  ]

  const openModal = (faculty) => {
    setSelectedFaculty(faculty)
  }

  const closeModal = () => {
    setSelectedFaculty(null)
  }

  return (
    <section id="faculty" className="section faculty">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Expert Faculty</h2>
          <p className="section-subtitle">
            Learn from experienced professionals with military background and proven academic excellence
          </p>
        </div>

        <div className="faculty-grid">
          {facultyMembers.map((faculty) => (
            <div key={faculty.id} className="faculty-card">
              <div className="faculty-image">
                <span className="faculty-avatar">{faculty.image}</span>
                <div className="experience-badge">{faculty.experience}</div>
              </div>
              
              <div className="faculty-info">
                <h3 className="faculty-name">{faculty.name}</h3>
                <p className="faculty-designation">{faculty.designation}</p>
                <p className="faculty-education">{faculty.education}</p>
                
                <div className="subjects-taught">
                  <h4>Subjects:</h4>
                  <div className="subject-tags">
                    {faculty.subjects.map((subject, index) => (
                      <span key={index} className="subject-tag">{subject}</span>
                    ))}
                  </div>
                </div>
                
                <div className="specialization">
                  <strong>Specialization:</strong> {faculty.specialization}
                </div>
                
                <button 
                  className="btn view-profile-btn"
                  onClick={() => openModal(faculty)}
                >
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedFaculty && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>&times;</button>
              
              <div className="modal-header">
                <div className="modal-avatar">{selectedFaculty.image}</div>
                <div className="modal-info">
                  <h2>{selectedFaculty.name}</h2>
                  <p className="modal-designation">{selectedFaculty.designation}</p>
                  <p className="modal-education">{selectedFaculty.education}</p>
                  <div className="modal-experience">{selectedFaculty.experience} Experience</div>
                </div>
              </div>
              
              <div className="modal-body">
                <div className="modal-description">
                  <h3>About</h3>
                  <p>{selectedFaculty.description}</p>
                </div>
                
                <div className="modal-achievements">
                  <h3>Key Achievements</h3>
                  <ul>
                    {selectedFaculty.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-courses">
                  <h3>Courses Taught</h3>
                  <div className="course-list">
                    {selectedFaculty.courses.map((course, index) => (
                      <span key={index} className="course-tag">{course}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="faculty-stats">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Expert Faculty</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Years Combined Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Ex-Defence Officers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">PhD Holders</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faculty