import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '../components/Toast'

const MemeDetailScreen = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const data = location.state?.data

  const [image, setImage] = useState(data?.blank)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [loading, setLoading] = useState(false)

  if (!data) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2>Meme not found</h2>
          <button style={styles.button} onClick={() => navigate('/')}>
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  const createMeme = async () => {
    if (!topText.trim() && !bottomText.trim()) {
      showToast('Please enter some text', 'error')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post('https://api.memegen.link/images', {
        template_id: data.id,
        text: [topText.trim() || ' ', bottomText.trim() || ' ']
      })
      
      if (response.data?.url) {
        setImage(response.data.url)
        showToast('Meme created successfully!')
      }
    } catch (error) {
      console.error('Error creating meme:', error)
      showToast('Failed to create meme', 'error')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async () => {
    try {
      setLoading(true)
      const response = await fetch(image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `meme_${data.name.replace(/\s+/g, '_')}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      showToast('Image downloaded successfully!')
    } catch (error) {
      console.error('Error downloading image:', error)
      showToast('Failed to download image', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 style={styles.title}>{data.name}</h1>
        <div style={styles.spacer}></div>
      </div>

      <div style={styles.content}>
        <div style={styles.inputSection}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Top Text:</label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              style={styles.input}
              placeholder="Enter top text"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Bottom Text:</label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              style={styles.input}
              placeholder="Enter bottom text"
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              style={styles.button}
              onClick={createMeme}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Meme'}
            </button>
            <button
              style={styles.button}
              onClick={downloadImage}
              disabled={loading}
            >
              {loading ? 'Downloading...' : 'Download'}
            </button>
          </div>
        </div>

        <div style={styles.imageSection}>
          <div style={styles.imageContainer}>
            <img
              src={image}
              alt={data.name}
              style={styles.image}
              onError={(e) => {
                e.target.src = data.blank
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e5e5',
    backgroundColor: '#fdb622'
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#000',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    color: '#000'
  },
  spacer: {
    width: '80px'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#000'
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #d9d9d9',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s ease',
    outline: 'none'
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
    marginTop: '20px'
  },
  button: {
    backgroundColor: '#fdb622',
    color: '#000',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: 1
  },
  imageSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  imageContainer: {
    maxWidth: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f5f5f5'
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block'
  },
  errorContainer: {
    textAlign: 'center',
    padding: '100px 20px',
    color: '#666'
  }
}

// Add responsive styles
const mediaQuery = window.matchMedia('(max-width: 768px)')
if (mediaQuery.matches) {
  styles.content.gridTemplateColumns = '1fr'
  styles.content.gap = '30px'
  styles.content.padding = '20px'
  styles.buttonGroup.flexDirection = 'column'
}

export default MemeDetailScreen