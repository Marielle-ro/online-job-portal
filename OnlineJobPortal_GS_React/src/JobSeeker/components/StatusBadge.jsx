import { memo } from 'react'

const statusColors = {
  'PENDING': 'bg-yellow-500',
  'SHORTLISTED': 'bg-purple-500',
  'INTERVIEW_SCHEDULED': 'bg-indigo-500',
  'ACCEPTED': 'bg-green-500',
  'REJECTED': 'bg-red-500'
}

const statusLabels = {
  'PENDING': 'Pending',
  'SHORTLISTED': 'Shortlisted',
  'INTERVIEW_SCHEDULED': 'Interview Scheduled',
  'ACCEPTED': 'Accepted',
  'REJECTED': 'Rejected'
}

function StatusBadge({ status }) {
  const color = statusColors[status] || 'bg-gray-500'
  const label = statusLabels[status] || status

  return (
    <span className={`${color} px-3 py-1 rounded-full text-white text-sm font-medium`}>
      {label}
    </span>
  )
}

export default memo(StatusBadge)