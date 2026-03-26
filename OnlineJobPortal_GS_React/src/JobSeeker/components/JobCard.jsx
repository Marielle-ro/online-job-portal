import { memo } from 'react'
import { Building2, MapPin, Clock, Globe } from 'lucide-react'

function JobCard({ 
  title, 
  company, 
  location, 
  salary, 
  description, 
  isRemote,
  type,
  onViewDetails, 
  onApply 
}) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Building2 size={18} />
          <span>{company}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={18} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-4">
          {isRemote && (
            <div className="flex items-center gap-1 text-primary">
              <Globe size={18} />
              <span className="text-sm">Remote</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-primary">
            <Clock size={18} />
            <span className="text-sm">{type}</span>
          </div>
        </div>
      </div>
      <p className="text-primary font-medium mb-4">{salary}</p>
      <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
      <div className="flex gap-3">
        <button onClick={onViewDetails} className="btn-secondary">
          View Details
        </button>
        <button onClick={onApply} className="btn-primary">
          Apply Now
        </button>
      </div>
    </div>
  )
}

export default memo(JobCard)