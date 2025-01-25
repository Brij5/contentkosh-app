import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import DataTable from './DataTable';
import serviceService from '../../services/serviceService';
import { toast } from 'react-toastify';
import useToast from '../../hooks/useToast';
import useModal from '../../hooks/useModal';

const ActionButton = styled.button`
  padding: 6px;
  margin: 0 3px;
  background: none;
  border: none;
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'edit':
        return '#10B981';
      case 'delete':
        return '#EF4444';
      default:
        return theme.textColor;
    }
  }};
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryColorHover};
  }
`;

const CategoryBadge = styled.span`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ category, theme }) => {
    switch (category) {
      case 'academic':
        return '#8B5CF6';
      case 'marketing':
        return '#10B981';
      case 'non-academic':
        return '#3B82F6';
      default:
        return theme.backgroundSecondary;
    }
  }};
  color: white;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 20px;
  padding: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.backgroundSecondary : theme.primaryColor};
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const SubServicesList = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.backgroundSecondary};
`;

const SubServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const itemsPerPage = 10;
  const toast = useToast();
  const modal = useModal();

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAll({
        page: currentPage,
        limit: 10
      });
      setServices(response.data.services);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  }, [currentPage, toast]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleSort = (key, direction) => {
    // Implement sorting logic
  };

  const handleFilter = (searchTerm) => {
    // Implement filtering logic
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const serviceData = Object.fromEntries(formData.entries());

    try {
      if (modalMode === 'create') {
        await serviceService.create(serviceData);
        toast.success('Service created successfully');
      } else {
        await serviceService.update(selectedService._id, serviceData);
        toast.success('Service updated successfully');
      }

      setShowModal(false);
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    }
  };

  const handleDelete = async (id) => {
    modal.confirm({
      title: 'Delete Service',
      message: 'Are you sure you want to delete this service?',
      onConfirm: async () => {
        try {
          await serviceService.delete(id);
          toast.success('Service deleted successfully');
          fetchServices();
        } catch (error) {
          toast.error('Failed to delete service');
        }
      }
    });
  };

  const handleEdit = (service) => {
    modal.custom('editService', {
      title: 'Edit Service',
      service,
      onSubmit: async (updatedService) => {
        try {
          await serviceService.update(service._id, updatedService);
          toast.success('Service updated successfully');
          fetchServices();
        } catch (error) {
          toast.error('Failed to update service');
        }
      }
    });
  };

  const handleCreate = () => {
    modal.custom('createService', {
      title: 'Create Service',
      onSubmit: async (newService) => {
        try {
          await serviceService.create(newService);
          toast.success('Service created successfully');
          fetchServices();
        } catch (error) {
          toast.error('Failed to create service');
        }
      }
    });
  };

  const handleAddSubService = async (serviceId, subServiceData) => {
    try {
      await serviceService.addSubService(serviceId, subServiceData);
      toast.success('Sub-service added successfully');
      fetchServices();
    } catch (error) {
      console.error('Error adding sub-service:', error);
      toast.error('Failed to add sub-service');
    }
  };

  const handleUpdateSubService = async (serviceId, subServiceId, subServiceData) => {
    try {
      await serviceService.updateSubService(serviceId, subServiceId, subServiceData);
      toast.success('Sub-service updated successfully');
      fetchServices();
    } catch (error) {
      console.error('Error updating sub-service:', error);
      toast.error('Failed to update sub-service');
    }
  };

  const handleDeleteSubService = async (serviceId, subServiceId) => {
    if (!window.confirm('Are you sure you want to delete this sub-service?')) {
      return;
    }

    try {
      await serviceService.deleteSubService(serviceId, subServiceId);
      toast.success('Sub-service deleted successfully');
      fetchServices();
    } catch (error) {
      console.error('Error deleting sub-service:', error);
      toast.error('Failed to delete sub-service');
    }
  };

  const toggleRow = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      sortable: true
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => <CategoryBadge category={value}>{value}</CategoryBadge>
    },
    {
      key: 'subServices',
      label: 'Sub-services',
      render: (value) => value.length
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, service) => (
        <>
          <ActionButton onClick={() => toggleRow(service._id)}>
            {expandedRows.has(service._id) ? <FaChevronUp /> : <FaChevronDown />}
          </ActionButton>
          <ActionButton
            variant="edit"
            onClick={() => {
              setSelectedService(service);
              setModalMode('edit');
              setShowModal(true);
            }}
          >
            <FaEdit />
          </ActionButton>
          <ActionButton variant="delete" onClick={() => handleDelete(service._id)}>
            <FaTrash />
          </ActionButton>
        </>
      )
    }
  ];

  const renderExpandedRow = (service) => (
    <SubServicesList>
      {service.subServices.map((subService, index) => (
        <SubServiceItem key={index}>
          <div>
            <strong>{subService.title}</strong>
            <p>{subService.description}</p>
          </div>
          <div>
            <ActionButton
              variant="edit"
              onClick={() => {
                setSelectedService({ ...service, editingSubService: index });
                setModalMode('edit');
                setShowModal(true);
              }}
            >
              <FaEdit />
            </ActionButton>
            <ActionButton
              variant="delete"
              onClick={() => {
                const newSubServices = [...service.subServices];
                newSubServices.splice(index, 1);
                handleSubmit({
                  preventDefault: () => {},
                  target: {
                    entries: () => [['subServices', JSON.stringify(newSubServices)]]
                  }
                });
              }}
            >
              <FaTrash />
            </ActionButton>
          </div>
        </SubServiceItem>
      ))}
    </SubServicesList>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CreateButton
        onClick={handleCreate}
      >
        <FaPlus /> Add New Service
      </CreateButton>

      <DataTable
        title="Service Management"
        columns={columns}
        data={services}
        onSort={handleSort}
        onFilter={handleFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        loading={loading}
        expandedRows={expandedRows}
        renderExpandedRow={renderExpandedRow}
      />

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{modalMode === 'create' ? 'Create Service' : 'Edit Service'}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  defaultValue={selectedService?.title || ''}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Category</Label>
                <Select
                  name="category"
                  defaultValue={selectedService?.category || 'academic'}
                  required
                >
                  <option value="academic">Academic Content</option>
                  <option value="marketing">Marketing Content</option>
                  <option value="non-academic">Non-Academic Content</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  defaultValue={selectedService?.description || ''}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Icon</Label>
                <Input
                  type="text"
                  name="icon"
                  defaultValue={selectedService?.icon || ''}
                  placeholder="Font Awesome icon name (e.g., 'book', 'pen')"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Sub-services</Label>
                {selectedService?.subServices?.map((subService, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <Input
                      type="text"
                      name={`subServices[${index}].title`}
                      defaultValue={subService.title}
                      placeholder="Sub-service title"
                      required
                    />
                    <TextArea
                      name={`subServices[${index}].description`}
                      defaultValue={subService.description}
                      placeholder="Sub-service description"
                      required
                      style={{ marginTop: '5px' }}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    const newService = { ...selectedService };
                    newService.subServices = [
                      ...(newService.subServices || []),
                      { title: '', description: '' }
                    ];
                    setSelectedService(newService);
                  }}
                >
                  Add Sub-service
                </Button>
              </FormGroup>

              <Button type="submit">
                {modalMode === 'create' ? 'Create Service' : 'Save Changes'}
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ServiceManagement;
