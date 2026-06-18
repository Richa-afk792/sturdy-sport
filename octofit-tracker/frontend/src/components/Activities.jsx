import { useEffect, useState } from 'react'
import { fetchFromApi, handleResponse } from '../utils/api'

// API endpoint: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('activities')
        const activitiesList = handleResponse(data)
        setActivities(activitiesList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
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
        Error loading activities: {error}
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-md-10 mx-auto">
        <h2 className="mb-4">Activities</h2>
        {activities.length === 0 ? (
          <p className="text-muted">No activities found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>User</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id || activity._id}>
                    <td>{activity.id || activity._id}</td>
                    <td>{activity.type || 'N/A'}</td>
                    <td>{activity.description || 'N/A'}</td>
                    <td>{activity.user || 'N/A'}</td>
                    <td>
                      {activity.createdAt
                        ? new Date(activity.createdAt).toLocaleDateString()
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

export default Activities
