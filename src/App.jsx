import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [notifications, setNotifications] = useState(3)

  const handleNotificationClick = () => {
    setNotifications(0)
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>UBG Redesign</h1>
          </div>
          <nav className="nav">
            <button 
              className={activeTab === 'home' ? 'active' : ''}
              onClick={() => setActiveTab('home')}
            >
              Home
            </button>
            <button 
              className={activeTab === 'features' ? 'active' : ''}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button 
              className={activeTab === 'about' ? 'active' : ''}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
          </nav>
          <div className="header-actions">
            <button className="notification-btn" onClick={handleNotificationClick}>
              🔔
              {notifications > 0 && <span className="badge">{notifications}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'home' && (
          <div className="tab-content">
            <h2>Welcome to UBG Redesign</h2>
            <p className="subtitle">Interactive Mockup Platform</p>
            
            <div className="hero-section">
              <div className="hero-content">
                <h3>Create Beautiful Mockups</h3>
                <p>This is a sample interactive mockup built with React and Vite. 
                   Submit issue requests to create new screens and mockups.</p>
                <button className="cta-button">Get Started</button>
              </div>
              <div className="hero-image">
                <div className="placeholder-image">
                  <span>📱</span>
                  <p>Mockup Preview</p>
                </div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <h4>⚡ Fast</h4>
                <p>Lightning-fast development with Vite</p>
              </div>
              <div className="stat-card">
                <h4>🎨 Modern</h4>
                <p>Built with React 19 and modern CSS</p>
              </div>
              <div className="stat-card">
                <h4>🚀 Deployed</h4>
                <p>Automatically deployed via GitHub Actions</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="tab-content">
            <h2>Features</h2>
            <div className="features-list">
              <div className="feature-item">
                <h3>🎯 Interactive Components</h3>
                <p>Fully interactive UI components with state management</p>
              </div>
              <div className="feature-item">
                <h3>📱 Responsive Design</h3>
                <p>Works seamlessly across all devices and screen sizes</p>
              </div>
              <div className="feature-item">
                <h3>🔄 Live Updates</h3>
                <p>Hot module replacement for instant feedback during development</p>
              </div>
              <div className="feature-item">
                <h3>🎨 Customizable</h3>
                <p>Easy to customize and extend with your own components</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="tab-content">
            <h2>About This Project</h2>
            <div className="about-content">
              <p>
                This is a sample mockup infrastructure built with modern web technologies:
              </p>
              <ul>
                <li><strong>React 19</strong> - Latest version of the most popular UI framework</li>
                <li><strong>Vite</strong> - Next-generation frontend tooling</li>
                <li><strong>GitHub Pages</strong> - Free hosting for your mockups</li>
                <li><strong>GitHub Actions</strong> - Automated CI/CD pipeline</li>
              </ul>
              <p>
                Submit issues to request new mockup screens, and they will be automatically 
                built and deployed to GitHub Pages.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 UBG Redesign - Built with React + Vite</p>
        <p className="footer-note">
          Submit issues on GitHub to request new mockup screens
        </p>
      </footer>
    </div>
  )
}

export default App
