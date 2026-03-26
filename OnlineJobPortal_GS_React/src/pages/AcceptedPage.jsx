import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Pagination } from '../components/ui/Pagination';

const ITEMS_PER_PAGE = 4;

export default function AcceptedPage() {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recruiterId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAccepted = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:8089/recruiter/applications', { params: { recruiterId } });
        const mapped = data
          .filter((a) => a.status === 'ACCEPTED')
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
        setError('Failed to load accepted applications');
      } finally {
        setLoading(false);
      }
    };
    if (recruiterId) fetchAccepted();
  }, [recruiterId]);

  const paginated = applications.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  if (loading) return <p>Loading accepted applications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accepted Applications</h1>
        <p className="mt-1 text-gray-600">Candidates who have been accepted.</p>
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


