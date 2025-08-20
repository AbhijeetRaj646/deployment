import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Courses from './components/Courses'
import SuccessStories from './components/SuccessStories'
import Faculty from './components/Faculty'
import Notices from './components/Notices'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Courses />
        <SuccessStories />
        <Faculty />
        <Notices />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App