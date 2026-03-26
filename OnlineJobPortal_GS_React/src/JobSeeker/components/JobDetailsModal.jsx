import { Building2, MapPin, Clock, Globe, CheckCircle2, BriefcaseIcon, GraduationCap, DollarSign } from 'lucide-react'
import Modal from './Modal'

function JobDetailsModal({ job, isOpen, onClose, onApply }) {
  if (!job) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xlarge"
      title={
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="text-primary" size={24} />
          <span>Job Details</span>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start border-b pb-6">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gray-900">{job.title}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Building2 size={20} />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={20} />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-lg">
              <DollarSign size={20} />
              <span className="font-semibold">{job.salary}</span>
            </div>
            <div className="flex gap-3">
              {job.isRemote && (
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <Globe size={18} />
                  <span className="font-medium">Remote</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <Clock size={18} />
                <span className="font-medium">{job.type}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Description Section */}
          <div className="col-span-2 space-y-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <GraduationCap className="text-primary" size={24} />
                Job Description
              </h4>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {job.fullDescription}
                </p>
              </div>
            </div>

            {/* Requirements Section */}
            <div>
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <CheckCircle2 className="text-primary" size={24} />
                Key Requirements
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {job.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl"
                  >
                    <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Apply Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Quick Apply</h4>
              <p className="text-gray-600 mb-6">
                Submit your application now and take the first step towards your new career opportunity.
              </p>
              <button
                onClick={onApply}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <BriefcaseIcon size={20} />
                Apply Now
              </button>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Why Join Us?</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={16} className="text-primary" />
                  Competitive salary package
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={16} className="text-primary" />
                  Professional growth opportunities
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={16} className="text-primary" />
                  Collaborative work environment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default JobDetailsModal