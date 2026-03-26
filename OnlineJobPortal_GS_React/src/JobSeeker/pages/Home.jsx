import { Users, Calendar, Eye, Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function Home() {
    const [stats, setStats] = useState({
        totalApplications: 0,
        pendingApplications: 0,
        interviewedApplications: 0,
        acceptedApplications: 0,
        rejectedApplications: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    setError('User ID not found');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:8089/jobseeker/stats/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user stats');
                }

                const data = await response.json();
                setStats({
                    totalApplications: data.totalApplications || 0,
                    pendingApplications: data.pendingApplications || 0,
                    interviewedApplications: data.interviewedApplications || 0,
                    acceptedApplications: data.acceptedApplications || 0,
                    rejectedApplications: data.rejectedApplications || 0
                });
                setRecentActivity(data.recentActivity || []);
            } catch (err) {
                console.error('Error fetching user stats:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserStats();
    }, []);

    const statsData = [
        {
            icon: Users,
            label: 'Total Applications',
            count: stats.totalApplications,
            color: 'text-blue-600'
        },
        {
            icon: Clock,
            label: 'Pending Review',
            count: stats.pendingApplications,
            color: 'text-yellow-600'
        },
        {
            icon: Calendar,
            label: 'Shortlisted',
            count: stats.shortlistedApplications,
            color: 'text-purple-600'
        },
        {
            icon: Eye,
            label: 'Interview Scheduled',
            count: stats.interviewScheduledApplications,
            color: 'text-indigo-600'
        }
    ];

    if (loading) {
        return (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Welcome back!</h1>
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Welcome back!</h1>
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-800">Error loading dashboard: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Welcome back!</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map(({ icon: Icon, label, count, color }) => (
                    <div key={label} className="card hover:shadow-lg transition-shadow">
                        <Icon size={24} className={`${color} mb-2`} />
                        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
                        <p className={`text-2xl font-bold ${color}`}>{count}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="card">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                {recentActivity.length > 0 ? (
                    <div className="space-y-4">
                        {recentActivity.map(({ id, action, date, status }) => (
                            <div key={id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{action}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                            status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            status === 'SHORTLISTED' ? 'bg-purple-100 text-purple-800' :
                                            status === 'INTERVIEW_SCHEDULED' ? 'bg-indigo-100 text-indigo-800' :
                                            status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                            status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {status}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500 ml-4">
                                    {new Date(date).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No recent activity to show.</p>
                        <p className="text-sm mt-2">Start applying to jobs to see your activity here!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
