import { useEffect, useState } from 'react'
import { fetchFromApi, handleResponse } from '../utils/api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('leaderboard')
        const entriesList = handleResponse(data)
        setEntries(entriesList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setEntries([])
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading leaderboard: {error}
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-md-10 mx-auto">
        <h2 className="mb-4">Leaderboard</h2>
        {entries.length === 0 ? (
          <p className="text-muted">No leaderboard entries found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                  <th>Team</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id || entry._id}>
                    <td>
                      <strong>#{index + 1}</strong>
                    </td>
                    <td>{entry.user || entry.userName || 'N/A'}</td>
                    <td>{entry.score || 0}</td>
                    <td>{entry.team || entry.teamName || 'N/A'}</td>
                    <td>
                      {entry.updatedAt
                        ? new Date(entry.updatedAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
