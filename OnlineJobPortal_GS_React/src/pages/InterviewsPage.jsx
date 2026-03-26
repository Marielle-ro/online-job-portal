import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Pagination } from '../components/ui/Pagination';

const ITEMS_PER_PAGE = 4;

export default function InterviewsPage() {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recruiterId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:8089/recruiter/applications', { params: { recruiterId } });
        const mapped = data
          .filter((a) => a.status === 'INTERVIEW_SCHEDULED')
          .map((app) => ({
            applicationId: app.applicationId,
            candidateName: `${app.firstName} ${app.lastName}`,
            email: app.username,
            phone: app.phoneNumber,
            status: app.status,
            resumeUrl: `http://localhost:8089/files?filePath=${encodeURIComponent(app.resume)}`,
            job: { title: app.title, location: app.location, employmentType: app.employmentType },
          }));
        setApplications(mapped);
      } catch (e) {
        setError('Failed to load interviews');
      } finally {
        setLoading(false);
      }
    };
    if (recruiterId) fetchInterviews();
  }, [recruiterId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8089/recruiter/${applicationId}/status`, { status: newStatus });
      setApplications((prev) => prev.map((a) => a.applicationId === applicationId ? { ...a, status: newStatus } : a));
    } catch (e) {
      setError('Failed to update status');
    }
  };

  const paginated = applications.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  if (loading) return <p>Loading interviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
        <p className="mt-1 text-gray-600">Review interviews and update decisions.</p>
      </div>

      <div className="grid gap-4">
        {paginated.map((application) => (
          <Card key={application.applicationId} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{application.candidateName}</h3>
                  <p className="text-sm text-gray-600">{application.email}</p>
                  <p className="text-sm text-gray-600">{application.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Position: {application.job.title}</p>
                  <p className="text-sm text-gray-600">{application.job.location} • {application.job.employmentType}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-3">
                <select
                  value={application.status}
                  onChange={(e) => handleStatusChange(application.applicationId, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>
          </Card>
        ))}

        {applications.length > ITEMS_PER_PAGE && (
          <div className="mt-6">
            <Pagination
              pageCount={Math.ceil(applications.length / ITEMS_PER_PAGE)}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}


