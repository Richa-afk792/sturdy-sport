import { useEffect, useState } from 'react'
import { fetchFromApi, handleResponse } from '../utils/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('teams')
        const teamsList = handleResponse(data)
        setTeams(teamsList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setTeams([])
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
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
        Error loading teams: {error}
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-md-10 mx-auto">
        <h2 className="mb-4">Teams</h2>
        {teams.length === 0 ? (
          <p className="text-muted">No teams found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Members</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id || team._id}>
                    <td>{team.id || team._id}</td>
                    <td>{team.name || 'N/A'}</td>
                    <td>
                      {team.members
                        ? Array.isArray(team.members)
                          ? team.members.length
                          : team.memberCount || 0
                        : 0}
                    </td>
                    <td>
                      {team.createdAt
                        ? new Date(team.createdAt).toLocaleDateString()
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

export default Teams
