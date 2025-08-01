import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import MemeDetailScreen from './screens/MemeDetailScreen'
import { ToastProvider } from './components/Toast'

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/meme/:id" element={<MemeDetailScreen />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App