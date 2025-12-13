import { useState, useEffect } from 'react'
import './Cursor.css'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseLeave = () => setHidden(true)
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        className={`cursor-dot ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
      <div
        className={`cursor-ring ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
    </>
  )
}

export default Cursor
