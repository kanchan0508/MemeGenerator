import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import CardImage from '../components/CardImage'

const HomeScreen = () => {
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMemes()
  }, [])

  const fetchMemes = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://api.memegen.link/templates')
      setMemes(response.data || [])
    } catch (err) {
      setError('Failed to load memes')
      console.error('Error fetching memes:', err)
    } finally {
      setLoading(false)
    }
  }

  const renderLoading = () => (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  )

  const renderError = () => (
    <div style={styles.errorContainer}>
      <p style={styles.errorText}>{error}</p>
      <button style={styles.retryButton} onClick={fetchMemes}>
        Try Again
      </button>
    </div>
  )

  return (
    <div style={styles.container}>
      <Header />
      <div className="container">
        {loading ? (
          renderLoading()
        ) : error ? (
          renderError()
        ) : (
          <div style={styles.grid}>
            {memes.map((meme) => (
              <div key={meme.id} className="card-image">
                <CardImage data={meme} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    padding: '0 0 40px 0'
  },
  errorContainer: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666'
  },
  errorText: {
    fontSize: '18px',
    marginBottom: '20px'
  },
  retryButton: {
    backgroundColor: '#fdb622',
    color: '#000',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  }
}

export default HomeScreen