import React, { useState } from 'react'
import './Notices.css'

const Notices = () => {
  const [activeTab, setActiveTab] = useState('announcements')

  const announcements = [
    {
      id: 1,
      title: 'New Batch for NDA 2024 (II) Starting Soon',
      date: '2024-01-15',
      type: 'New Batch',
      priority: 'high',
      content: 'We are excited to announce the commencement of our comprehensive NDA 2024 (II) preparation batch starting from February 1st, 2024. Limited seats available - only 35 students per batch for personalized attention.',
      details: [
        'Batch Size: 35 students only',
        'Duration: 12 months comprehensive program',
        'Timing: Morning (9 AM - 1 PM) & Evening (2 PM - 6 PM)',
        'Includes: Study material, mock tests, SSB preparation',
        'Early bird discount: 15% off till January 25th'
      ]
    },
    {
      id: 2,
      title: 'AFCAT 2024 (I) Results Declared - Congratulations!',
      date: '2024-01-10',
      type: 'Results',
      priority: 'high',
      content: 'Exceptional results from our AFCAT 2024 (I) batch! 92% of our students have cleared the written examination. Special congratulations to our top performers.',
      details: [
        'Overall Success Rate: 92%',
        'Students in Top 100: 15',
        'Students in Top 500: 45',
        'Flying Branch selections: 8',
        'Technical Branch selections: 12'
      ]
    },
    {
      id: 3,
      title: 'Free Demo Classes for CDS 2024 (I)',
      date: '2024-01-08',
      type: 'Demo Class',
      priority: 'medium',
      content: 'Join our free demo classes for CDS 2024 (I) preparation. Experience our teaching methodology and interact with our expert faculty before enrolling.',
      details: [
        'Date: January 20-22, 2024',
        'Time: 10 AM - 12 PM',
        'Subjects covered: English, GK, Mathematics',
        'Expert faculty interaction',
        'Free study material provided'
      ]
    },
    {
      id: 4,
      title: 'SSB Interview Workshop - Weekend Special',
      date: '2024-01-05',
      type: 'Workshop',
      priority: 'medium',
      content: 'Intensive SSB interview preparation workshop conducted by ex-defence officers. Learn the secrets of cracking SSB interviews with practical exercises.',
      details: [
        'Duration: 2 days (Weekend)',
        'Conducted by: Maj. Vikram Singh (Retd.)',
        'Includes: Mock interviews, GD, psychological tests',
        'Group exercises and leadership tasks',
        'Certificate of participation provided'
      ]
    }
  ]

  const examDates = [
    {
      id: 1,
      exam: 'NDA 2024 (II)',
      applicationStart: '2024-02-01',
      applicationEnd: '2024-02-28',
      examDate: '2024-04-21',
      status: 'upcoming',
      details: [
        'Age Limit: 16.5 - 19.5 years',
        'Eligibility: 10+2 (Science)',
        'Application Fee: ₹100',
        'Exam Pattern: Written + SSB',
        'Vacancies: 400 (approx.)'
      ]
    },
    {
      id: 2,
      exam: 'CDS 2024 (I)',
      applicationStart: '2024-01-10',
      applicationEnd: '2024-01-30',
      examDate: '2024-04-14',
      status: 'active',
      details: [
        'Age Limit: 20 - 26 years',
        'Eligibility: Graduate',
        'Application Fee: ₹200',
        'Exam Pattern: Written + SSB',
        'Vacancies: 341'
      ]
    },
    {
      id: 3,
      exam: 'AFCAT 2024 (I)',
      applicationStart: '2023-12-01',
      applicationEnd: '2023-12-30',
      examDate: '2024-02-24',
      status: 'closed',
      details: [
        'Age Limit: 20 - 26 years',
        'Eligibility: Graduate (Any stream)',
        'Application Fee: ₹250',
        'Exam Pattern: Written + AFSB',
        'Vacancies: 336'
      ]
    },
    {
      id: 4,
      exam: 'CAPF 2024',
      applicationStart: '2024-03-01',
      applicationEnd: '2024-03-31',
      examDate: '2024-05-26',
      status: 'upcoming',
      details: [
        'Age Limit: 20 - 25 years',
        'Eligibility: Graduate',
        'Application Fee: ₹200',
        'Exam Pattern: Written + Interview + Medical',
        'Vacancies: 506'
      ]
    }
  ]

  const events = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: '2024-01-25',
      time: '10:00 AM - 2:00 PM',
      type: 'Meeting',
      description: 'Monthly parent-teacher interaction to discuss student progress and performance analysis.'
    },
    {
      id: 2,
      title: 'Mock Test Series - NDA',
      date: '2024-01-28',
      time: '9:00 AM - 1:00 PM',
      type: 'Test',
      description: 'Full-length mock test following exact NDA exam pattern with detailed analysis.'
    },
    {
      id: 3,
      title: 'Motivational Seminar by Ex-Army Officer',
      date: '2024-02-02',
      time: '4:00 PM - 6:00 PM',
      type: 'Seminar',
      description: 'Inspirational session by Col. (Retd.) A.K. Sharma on "Journey to Defence Services".'
    },
    {
      id: 4,
      title: 'Current Affairs Quiz Competition',
      date: '2024-02-05',
      time: '11:00 AM - 1:00 PM',
      type: 'Competition',
      description: 'Inter-batch current affairs quiz with exciting prizes for winners.'
    }
  ]

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745'
      case 'upcoming': return '#007bff'
      case 'closed': return '#6c757d'
      default: return '#6c757d'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
      default: return '#6c757d'
    }
  }

  return (
    <section id="notices" className="section notices">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Notices & Updates</h2>
          <p className="section-subtitle">
            Stay updated with the latest announcements, exam dates, and important events
          </p>
        </div>

        <div className="notices-tabs">
          <button 
            className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            📢 Announcements
          </button>
          <button 
            className={`tab-btn ${activeTab === 'examDates' ? 'active' : ''}`}
            onClick={() => setActiveTab('examDates')}
          >
            📅 Exam Calendar
          </button>
          <button 
            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            🎯 Events
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'announcements' && (
            <div className="announcements-grid">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="announcement-card">
                  <div className="announcement-header">
                    <div className="announcement-meta">
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                      >
                        {announcement.priority.toUpperCase()}
                      </span>
                      <span className="announcement-type">{announcement.type}</span>
                      <span className="announcement-date">{formatDate(announcement.date)}</span>
                    </div>
                  </div>
                  <h3 className="announcement-title">{announcement.title}</h3>
                  <p className="announcement-content">{announcement.content}</p>
                  <div className="announcement-details">
                    <h4>Details:</h4>
                    <ul>
                      {announcement.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="announcement-actions">
                    <button className="btn btn-primary">Learn More</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'examDates' && (
            <div className="exam-calendar">
              {examDates.map((exam) => (
                <div key={exam.id} className="exam-card">
                  <div className="exam-header">
                    <h3 className="exam-name">{exam.exam}</h3>
                    <span 
                      className="exam-status"
                      style={{ backgroundColor: getStatusColor(exam.status) }}
                    >
                      {exam.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="exam-dates">
                    <div className="date-item">
                      <span className="date-label">Application Start:</span>
                      <span className="date-value">{formatDate(exam.applicationStart)}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Application End:</span>
                      <span className="date-value">{formatDate(exam.applicationEnd)}</span>
                    </div>
                    <div className="date-item exam-date">
                      <span className="date-label">Exam Date:</span>
                      <span className="date-value">{formatDate(exam.examDate)}</span>
                    </div>
                  </div>
                  <div className="exam-details">
                    <h4>Exam Details:</h4>
                    <ul>
                      {exam.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="exam-actions">
                    <button className="btn">Apply Now</button>
                    <button className="btn btn-primary">Start Preparation</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="events-timeline">
              {events.map((event, index) => (
                <div key={event.id} className="event-item">
                  <div className="event-date">
                    <div className="event-day">{new Date(event.date).getDate()}</div>
                    <div className="event-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                  </div>
                  <div className="event-content">
                    <div className="event-header">
                      <h3 className="event-title">{event.title}</h3>
                      <span className="event-type">{event.type}</span>
                    </div>
                    <div className="event-time">⏰ {event.time}</div>
                    <p className="event-description">{event.description}</p>
                    <button className="btn event-register">Register Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Notices