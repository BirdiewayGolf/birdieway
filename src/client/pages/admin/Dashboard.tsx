import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Trophy, 
  Users, 
  PlusCircle, 
  Clock,
  ChevronRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  // Check if admin is authenticated
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const dashboardItems = [
    {
      title: 'Create Tournament',
      icon: <PlusCircle size={24} />,
      link: '/admin/tournaments/create',
      description: 'Add a new tournament to any league'
    },
    {
      title: 'Manage Tournaments',
      icon: <Calendar size={24} />,
      link: '/admin/tournaments',
      description: 'View and edit existing tournaments'
    },
    {
      title: 'Standings',
      icon: <Trophy size={24} />,
      link: '/admin/standings',
      description: 'Update league and tournament standings'
    },
    {
      title: 'Registrations',
      icon: <Users size={24} />,
      link: '/admin/registrations',
      description: 'View and manage tournament registrations'
    },
    {
      title: 'Tee Times',
      icon: <Clock size={24} />,
      link: '/admin/tee-times',
      description: 'Manage tournament tee times'
    }
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">
        {dashboardItems.map((item, index) => (
          <Link to={item.link} key={index} className="dashboard-card">
            <div className="card-icon">
              {item.icon}
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <ChevronRight className="card-arrow" size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;