import { useEffect, useState } from 'react'
import { fetchFromApi, handleResponse } from '../utils/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true)
        const data = await fetchFromApi('workouts')
        const workoutsList = handleResponse(data)
        setWorkouts(workoutsList)
        setError(null)
      } catch (err) {
        setError(err.message)
        setWorkouts([])
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
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
        Error loading workouts: {error}
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-md-10 mx-auto">
        <h2 className="mb-4">Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-muted">No workouts found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>User</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id || workout._id}>
                    <td>{workout.id || workout._id}</td>
                    <td>{workout.name || 'N/A'}</td>
                    <td>{workout.type || 'N/A'}</td>
                    <td>{workout.duration || 'N/A'}</td>
                    <td>{workout.user || 'N/A'}</td>
                    <td>
                      {workout.createdAt
                        ? new Date(workout.createdAt).toLocaleDateString()
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

export default Workouts
