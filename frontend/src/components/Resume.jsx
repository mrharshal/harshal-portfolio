import { FaArrowLeft, FaDownload } from 'react-icons/fa'
import './Resume.css'

const Resume = ({ onBack }) => {
  return (
    <div className="resume-page">
      <div className="resume-header">
        <button className="resume-back" onClick={onBack}>
          <FaArrowLeft />
          Back to Portfolio
        </button>
        <a 
          href="/Harshal%20New%20Resume.pdf" 
          download="Harshal_Shirsath_Resume.pdf"
          className="resume-download"
        >
          <FaDownload />
          Download Resume
        </a>
      </div>
      
      <div className="resume-container">
        <iframe
          src="/Harshal%20New%20Resume.pdf"
          title="Harshal Shirsath Resume"
          className="resume-iframe"
        />
      </div>
    </div>
  )
}

export default Resume
