import { useState, useEffect } from 'react'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'

function Applications() {
  const [applications, setApplications] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User ID not found')
          setLoading(false)
          return
        }

        const response = await fetch(`http://localhost:8089/jobseeker/applications/${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch applications')
        }

        const data = await response.json()
        setApplications(data)
      } catch (err) {
        console.error('Error fetching applications:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const filteredApplications = applications.filter(app => {
    if (selectedStatus === 'all') return true;
    
    const statusMapping = {
      'pending': 'PENDING',
      'shortlisted': 'SHORTLISTED',
      'interview_scheduled': 'INTERVIEW_SCHEDULED',
      'accepted': 'ACCEPTED',
      'rejected': 'REJECTED'
    };
    
    return app.status === statusMapping[selectedStatus];
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">Error loading applications: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Applications</h1>

      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'shortlisted', 'interview_scheduled', 'accepted', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-md ${
              selectedStatus === status
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All' : 
             status === 'interview_scheduled' ? 'Interview Scheduled' :
             status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map(application => (
            <div key={application.applicationId} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">
                    {application.jobTitle}
                  </h3>
                  <p className="text-gray-600 mb-2">{application.company}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Location:</span> {application.location}
                  </p>
                  {application.salaryRange && (
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Salary:</span> {application.salaryRange}
                    </p>
                  )}
                </div>
                <StatusBadge status={application.status} />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  Applied: {new Date(application.appliedDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => setSelectedApplication(application)}
                  className="btn-secondary"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedStatus === 'all' ? 'No applications yet' : `No ${selectedStatus === 'interview_scheduled' ? 'interview scheduled' : selectedStatus} applications`}
            </h3>
            <p className="text-gray-500 mb-4">
              {selectedStatus === 'all' 
                ? "You haven't applied to any jobs yet. Start your job search to see your applications here!"
                : `You don't have any ${selectedStatus === 'interview_scheduled' ? 'interview scheduled' : selectedStatus} applications at the moment.`
              }
            </p>
            {selectedStatus === 'all' && (
              <button 
                onClick={() => window.location.href = '/jobseeker/dashboard/job-search'}
                className="btn-primary"
              >
                Browse Jobs
              </button>
            )}
          </div>
        </div>
      )}

      <Modal
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
        title="Application Details"
      >
        {selectedApplication && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{selectedApplication.jobTitle}</h3>
              <p className="text-gray-600">{selectedApplication.company}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Location</h4>
                <p className="text-gray-600">{selectedApplication.location}</p>
              </div>
              {selectedApplication.salaryRange && (
                <div>
                  <h4 className="font-medium text-gray-700">Salary Range</h4>
                  <p className="text-gray-600">{selectedApplication.salaryRange}</p>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Job Description</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedApplication.jobDescription}
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-gray-500 text-sm">
                  Applied: {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Status: <StatusBadge status={selectedApplication.status} />
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Applications