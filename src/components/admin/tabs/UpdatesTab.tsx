import React, { useState } from 'react';
import { Card, Button, Form, Table, Modal, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Project, Update } from '../../project/ProjectHero';

interface UpdatesTabProps {
  project: Project;
}

const UpdatesTab: React.FC<UpdatesTabProps> = ({ project }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState<Update | null>(null);
  const [formData, setFormData] = useState<{ title: string; content: string }>({
    title: '',
    content: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormData({ title: '', content: '' });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentUpdate(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentUpdate(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleShowEditModal = (update: Update) => {
    setCurrentUpdate(update);
    setFormData({
      title: update.title,
      content: update.content
    });
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (update: Update) => {
    setCurrentUpdate(update);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUpdate = () => {
    // In a real app, this would be an API call
    setAlertMessage('Update added successfully!');
    setAlertVariant('success');
    setShowAlert(true);
    handleCloseAddModal();
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEditUpdate = () => {
    // In a real app, this would be an API call
    setAlertMessage('Update edited successfully!');
    setAlertVariant('success');
    setShowAlert(true);
    handleCloseEditModal();
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDeleteUpdate = () => {
    // In a real app, this would be an API call
    setAlertMessage('Update deleted successfully!');
    setAlertVariant('success');
    setShowAlert(true);
    handleCloseDeleteModal();
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div>
      {showAlert && (
        <Alert 
          variant={alertVariant} 
          onClose={() => setShowAlert(false)} 
          dismissible
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">Project Updates</h2>
        <Button variant="primary" size="sm" onClick={handleShowAddModal}>
          <FaPlus className="me-2" />
          Add Update
        </Button>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          {project.updates.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead className="bg-light">
                  <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {project.updates.map((update, index) => (
                    <tr key={index}>
                      <td style={{ minWidth: '100px' }}>{update.date}</td>
                      <td>{update.title}</td>
                      <td className="text-truncate" style={{ maxWidth: '400px' }}>
                        {update.content}
                      </td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleShowEditModal(update)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleShowDeleteModal(update)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5 text-muted">
              No updates available. Click "Add Update" to create your first project update.
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add Update Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="text" 
                value={new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} 
                disabled 
              />
              <Form.Text className="text-muted">
                Current date will be used for this update.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter update title" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control 
                as="textarea" 
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={5} 
                placeholder="Enter update content" 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUpdate}>
            Add Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Update Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="text" 
                value={currentUpdate?.date || ''} 
                disabled 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter update title" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control 
                as="textarea" 
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={5} 
                placeholder="Enter update content" 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Update Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the update "{currentUpdate?.title}"?</p>
          <p className="text-danger">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUpdate}>
            Delete Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdatesTab; 