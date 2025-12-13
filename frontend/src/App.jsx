import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Resume from './components/Resume'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [showResume, setShowResume] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-content">
          <span className="loader-text">H</span>
        </div>
      </div>
    )
  }

  if (showResume) {
    return <Resume onBack={() => setShowResume(false)} />
  }

  return (
    <div className="app">
      <Navbar onResumeClick={() => setShowResume(true)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
