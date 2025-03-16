import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';

interface ProjectAdminLinkProps {
  projectId: string;
}

const ProjectAdminLink: React.FC<ProjectAdminLinkProps> = ({ projectId }) => {
  // In a real application, you would check if the current user is an admin
  // For now, we'll just show the link to everyone for demonstration purposes
  const isAdmin = true; // This would be determined by authentication logic

  if (!isAdmin) return null;

  return (
    <div className="admin-link-container position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1000 }}>
      <Link to={`/project/${projectId}/admin`}>
        <Button variant="primary" className="rounded-circle p-3 shadow">
          <FaCog size={24} />
        </Button>
      </Link>
    </div>
  );
};

export default ProjectAdminLink; 