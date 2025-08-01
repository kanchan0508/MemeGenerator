import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CardImage = ({ data }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleShowImageDetail = () => {
    navigate(`/meme/${data.id}`, { state: { data } })
  }

  const handleImageLoad = () => {
    setLoading(false)
  }

  const handleImageError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <div style={styles.container} onClick={handleShowImageDetail}>
      {loading && (
        <div style={styles.loadingContainer}>
          <div className="spinner"></div>
        </div>
      )}
      {error ? (
        <div style={styles.errorContainer}>
          <span>Failed to load</span>
        </div>
      ) : (
        <img
          src={data?.blank}
          alt={data?.name}
          style={{
            ...styles.image,
            display: loading ? 'none' : 'block'
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      <div style={styles.overlay}>
        <span style={styles.name}>{data?.name}</span>
      </div>
    </div>
  )
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2
  },
  errorContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#666',
    fontSize: '14px',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
    padding: '20px 12px 12px',
    color: 'white'
  },
  name: {
    fontSize: '14px',
    fontWeight: '600',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
  }
}

// Add hover effect
const hoverStyles = `
  .card-image:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`

// Inject hover styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = hoverStyles
  document.head.appendChild(styleSheet)
}

export default CardImage