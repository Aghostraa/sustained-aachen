import React from 'react';
import { Card } from 'react-bootstrap';
import { 
  FaEuroSign, 
  FaHandsHelping, 
  FaGraduationCap 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ActivityItem {
  type: 'contribution' | 'volunteer' | 'course';
  title: string;
  description: string;
  date: string;
  impact: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  link?: string;
}

const RecentActivity: React.FC = () => {
  // Mock data (would come from API in a real application)
  const activities: ActivityItem[] = [
    {
      type: 'contribution',
      title: 'Financial Contribution',
      description: 'You contributed €25.00 to Klimaentscheid Aachen',
      date: '2025-02-25',
      impact: 'Generated €112.35 in matching',
      icon: <FaEuroSign />,
      iconBg: 'rgba(59, 130, 246, 0.1)',
      iconColor: '#3b82f6',
      link: '/project/klimaentscheid'
    },
    {
      type: 'volunteer',
      title: 'Volunteer Work',
      description: 'You volunteered 3 hours with SEK Müll',
      date: '2025-02-20',
      impact: 'Earned 150 impact points',
      icon: <FaHandsHelping />,
      iconBg: 'rgba(236, 72, 153, 0.1)',
      iconColor: '#ec4899',
      link: '/project/sekmuell'
    },
    {
      type: 'course',
      title: 'Course Completion',
      description: 'You completed the course "Urban Sustainability Basics"',
      date: '2025-02-15',
      impact: 'Earned 75 impact points',
      icon: <FaGraduationCap />,
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981'
    },
    {
      type: 'contribution',
      title: 'Financial Contribution',
      description: 'You contributed €15.00 to Ernährungsrat Aachen',
      date: '2025-02-10',
      impact: 'Generated €62.40 in matching',
      icon: <FaEuroSign />,
      iconBg: 'rgba(74, 222, 128, 0.1)',
      iconColor: '#4ade80',
      link: '/project/ernaehrungsrat'
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-0">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className={`d-flex align-items-start p-3 ${
              index < activities.length - 1 ? 'border-bottom' : ''
            }`}
          >
            <div 
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{ 
                width: 45, 
                height: 45, 
                backgroundColor: activity.iconBg,
                color: activity.iconColor,
                fontSize: '1.1rem'
              }}
            >
              {activity.icon}
            </div>
            
            <div className="ms-3">
              <h3 className="h6 mb-1">{activity.title}</h3>
              <p className="mb-1">
                {activity.description.includes('to') && activity.link ? (
                  <>
                    {activity.description.split('to')[0]}to{' '}
                    <Link to={activity.link} className="text-decoration-none">
                      {activity.description.split('to')[1].trim()}
                    </Link>
                  </>
                ) : (
                  activity.description
                )}
              </p>
              <div className="d-flex text-muted small">
                <span>{activity.date}</span>
                <span className="mx-2">•</span>
                <span>{activity.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default RecentActivity; 