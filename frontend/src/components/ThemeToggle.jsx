import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className={`toggle-track ${theme}`}>
        <div className="toggle-thumb">
          {theme === 'dark' ? <FaMoon /> : <FaSun />}
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
