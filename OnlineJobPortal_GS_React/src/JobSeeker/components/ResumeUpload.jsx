import { FileText, Upload, X } from 'lucide-react'
import { memo } from 'react'

function ResumeUpload({ resume, onChange, isEditing }) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
      <div className="flex flex-col items-center gap-4">
        <FileText size={40} className="text-gray-400" />
        {resume ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{resume.name}</span>
            {isEditing && (
              <button
                onClick={() => onChange({ target: { name: 'resume', files: [] } })}
                className="text-red-500 hover:text-red-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Upload your resume (PDF only)
            </p>
            {isEditing && (
              <label className="btn-secondary cursor-pointer inline-flex items-center gap-2">
                <Upload size={16} />
                Choose File
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={onChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(ResumeUpload)