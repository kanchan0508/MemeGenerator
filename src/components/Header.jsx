import React from 'react'

const Header = () => {
  return (
    <div style={styles.header}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>Mememe</h1>
        <span style={styles.subtitle}>Meme Generator</span>
      </div>
    </div>
  )
}

const styles = {
  header: {
    backgroundColor: '#fdb622',
    padding: '20px 0',
    borderBottomLeftRadius: '40px',
    borderBottomRightRadius: '40px',
    marginBottom: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  logo: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#000',
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500'
  }
}

export default Header