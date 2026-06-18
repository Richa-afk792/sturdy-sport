import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  const [apiConfigured, setApiConfigured] = useState(false)

  useEffect(() => {
    // Check if API is properly configured
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    if (!codespaceName) {
      console.warn(
        'VITE_CODESPACE_NAME not set. API will default to localhost:8000'
      )
    }
    setApiConfigured(true)
  }, [])

  if (!apiConfigured) {
    return <div>Loading...</div>
  }

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Octofit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container-fluid py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

function Home() {
  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <h1 className="mb-4">Welcome to Octofit Tracker</h1>
        <p className="lead">
          Track your workouts, build teams, and compete on the leaderboard!
        </p>
        <div className="alert alert-info">
          <h5>Getting Started</h5>
          <p>
            Use the navigation menu to explore different sections of the app:
          </p>
          <ul>
            <li><strong>Users</strong> - Manage user profiles</li>
            <li><strong>Activities</strong> - Log and track activities</li>
            <li><strong>Workouts</strong> - Create and manage workout routines</li>
            <li><strong>Teams</strong> - Create and join teams</li>
            <li><strong>Leaderboard</strong> - View competitive rankings</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
