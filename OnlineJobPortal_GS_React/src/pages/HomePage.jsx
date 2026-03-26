import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Users, Briefcase, Star, Clock } from 'lucide-react';

export default function HomePage() {
  const [stats, setStats] = useState([
    { label: 'Active Job Postings', value: '0', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Total Applications', value: '0', icon: Users, color: 'text-teal-600' },
    { label: 'Shortlisted', value: '0', icon: Star, color: 'text-yellow-600' },
  ]);

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const recruiterId = localStorage.getItem('userId');
    if (!recruiterId) return;

    Promise.all([
      fetch(`http://localhost:8089/recruiter/getjobs?recruiterId=${recruiterId}`).then(r => r.json()),
      fetch(`http://localhost:8089/recruiter/applications?recruiterId=${recruiterId}`).then(r => r.json()),
    ])
      .then(([jobs, apps]) => {
        const activeJobs = Array.isArray(jobs) ? jobs.length : 0;
        const totalApps = Array.isArray(apps) ? apps.length : 0;
        const shortlisted = Array.isArray(apps) ? apps.filter(a => a.status === 'SHORTLISTED').length : 0;

        setStats([
          { label: 'Active Job Postings', value: String(activeJobs), icon: Briefcase, color: 'text-blue-600' },
          { label: 'Total Applications', value: String(totalApps), icon: Users, color: 'text-teal-600' },
          { label: 'Shortlisted', value: String(shortlisted), icon: Star, color: 'text-yellow-600' },
        ]);

        const activity = (apps || []).slice(0, 5).map((a, idx) => ({
          id: idx + 1,
          action: `${a.firstName} ${a.lastName} applied for ${a.title}`,
          timestamp: new Date(a.appliedDate).toLocaleDateString(),
        }));
        setRecentActivity(activity);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-1 text-gray-600">Here's what's happening with your recruitment activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center border-b pb-4 last:border-0">
              <p className="text-gray-700">{activity.action}</p>
              <span className="text-sm text-gray-500">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}