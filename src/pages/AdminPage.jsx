import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Badge, Card, Modal, Alert, Form, InputGroup, Row, Col } from 'react-bootstrap';
import {
  Plus, Edit, Trash2, Search, Sparkles, Leaf, Star,
  Heart, ShieldAlert, CheckCircle2, AlertCircle, LogIn, Filter
} from 'lucide-react';
import { createOrchid, updateOrchid, deleteOrchid, clearStatus } from '../redux/slices/orchidSlice';
import { loginSuccess } from '../redux/slices/authSlice';
import OrchidFormModal from '../components/orchids/OrchidFormModal';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { items: orchids, loading, error, successMessage } = useSelector((state) => state.orchids);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [orchidToDelete, setOrchidToDelete] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredOrchids = useMemo(() => {
    return orchids.filter((orchid) => {
      const matchesSearch =
        orchid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orchid.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orchid.category.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterCategory === 'natural') return matchesSearch && orchid.isNatural;
      if (filterCategory === 'special') return matchesSearch && orchid.isSpecial;
      if (filterCategory !== 'all') return matchesSearch && orchid.category === filterCategory;

      return matchesSearch;
    });
  }, [orchids, searchTerm, filterCategory]);

  const handleOpenAdd = () => {
    setSelectedOrchid(null);
    setShowFormModal(true);
  };

  const handleOpenEdit = (orchid) => {
    setSelectedOrchid(orchid);
    setShowFormModal(true);
  };

  const handleFormSubmit = async (values) => {
    if (selectedOrchid && selectedOrchid.id) {
      await dispatch(updateOrchid({ id: selectedOrchid.id, data: values })).unwrap();
    } else {
      await dispatch(createOrchid(values)).unwrap();
    }
  };

  const handleConfirmDelete = async () => {
    if (orchidToDelete) {
      await dispatch(deleteOrchid(orchidToDelete.id)).unwrap();
      setOrchidToDelete(null);
    }
  };

  const handleQuickDemoLogin = () => {
    dispatch(
      loginSuccess({
        id: 'curator-admin-demo',
        name: 'Curator Administrator',
        email: 'curator.admin@orchidhaven.vn',
        picture: null,
      })
    );
  };

  // If user is not authenticated, show sign-in prompt
  if (!isAuthenticated) {
    return (
      <main className="admin-page-container py-5">
        <Container>
          <Card className="auth-guard-card text-center p-5 border-0 shadow-sm mx-auto" style={{ maxWidth: '640px' }}>
            <Card.Body>
              <div className="auth-guard-icon mb-3 text-warning">
                <ShieldAlert size={48} className="mx-auto" />
              </div>
              <h2 className="mb-2">Botanical Curator Authentication Required</h2>
              <p className="text-secondary mb-4">
                To access the CRUD Management System (Add, Edit, and Delete orchid records),
                you must authenticate as a Curator Admin.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Button
                  className="btn-brand-primary"
                  onClick={handleQuickDemoLogin}
                >
                  <LogIn size={16} className="me-2" /> Authenticate as Curator Admin
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </main>
    );
  }

  return (
    <main className="admin-page-container py-4 py-lg-5">
      <Container>
        {/* Header with Title and Add Button */}
        <div className="admin-header-row d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2">
              <h1 className="admin-page-title mb-0">Orchid Botanical Management</h1>
              <Badge bg="success" className="py-2 px-3">
                Curator Mode: {user?.name}
              </Badge>
            </div>
            <p className="text-secondary mb-0 small mt-1">
              Live MockAPI synchronization & Redux Toolkit state administration.
            </p>
          </div>

          <Button className="btn-brand-primary d-flex align-items-center" onClick={handleOpenAdd}>
            <Plus size={18} className="me-1" />
            <span>Add Orchid Specimen</span>
          </Button>
        </div>

        {/* Status Alerts */}
        {successMessage && (
          <Alert
            variant="success"
            dismissible
            onClose={() => dispatch(clearStatus())}
            className="d-flex align-items-center mb-4 shadow-sm border-0"
          >
            <CheckCircle2 size={20} className="me-2 text-success flex-shrink-0" />
            <span className="flex-grow-1">{successMessage}</span>
          </Alert>
        )}

        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => dispatch(clearStatus())}
            className="d-flex align-items-center mb-4 shadow-sm border-0"
          >
            <AlertCircle size={20} className="me-2 text-danger flex-shrink-0" />
            <span className="flex-grow-1">{error}</span>
          </Alert>
        )}

        {/* Filter and Search Bar */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-3">
            <Row className="g-3 align-items-center">
              <Col md={7}>
                <InputGroup>
                  <InputGroup.Text className="bg-transparent border-end-0">
                    <Search size={16} className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by orchid name, genus category, or native country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0 ps-0"
                  />
                </InputGroup>
              </Col>

              <Col md={5}>
                <InputGroup>
                  <InputGroup.Text className="bg-transparent">
                    <Filter size={16} className="text-secondary me-1" /> Category
                  </InputGroup.Text>
                  <Form.Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Botanical Families</option>
                    <option value="natural">Wild Natural Only (isNatural)</option>
                    <option value="special">Special Editions Only (isSpecial)</option>
                    <option value="Cattleya">Cattleya</option>
                    <option value="Phalaenopsis">Phalaenopsis</option>
                    <option value="Vanda">Vanda</option>
                    <option value="Oncidium">Oncidium</option>
                    <option value="Paphiopedilum">Paphiopedilum</option>
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Orchids Table */}
        <Card className="border-0 shadow-sm overflow-hidden admin-table-card">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0 admin-orchids-table">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '70px' }}>ID</th>
                  <th>Specimen</th>
                  <th>Taxonomy & Origin</th>
                  <th>Color</th>
                  <th>Rating & Likes</th>
                  <th>Classification</th>
                  <th className="text-end" style={{ width: '130px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-secondary">
                      Synchronizing with botanical API server...
                    </td>
                  </tr>
                )}

                {!loading && filteredOrchids.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-secondary">
                      No matching orchid specimens found.
                    </td>
                  </tr>
                )}

                {!loading &&
                  filteredOrchids.map((orchid) => (
                    <tr key={orchid.id}>
                      <td className="fw-bold text-secondary">#{orchid.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={orchid.image}
                            alt={orchid.name}
                            className="rounded admin-thumb-img"
                            style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://barritaorchids.com/cdn/shop/products/Cf592_1024x1024.jpg';
                            }}
                          />
                          <div>
                            <div className="fw-bold orchid-table-title">{orchid.name}</div>
                            <small className="text-secondary">{orchid.category}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{orchid.origin}</div>
                        <small className="text-secondary">Family: {orchid.category}</small>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <span
                            className="color-dot"
                            style={{
                              backgroundColor:
                                orchid.color.toLowerCase() === 'white'
                                  ? '#e2e8f0'
                                  : orchid.color.toLowerCase(),
                            }}
                          />
                          <span>{orchid.color}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="d-flex align-items-center text-warning fw-semibold">
                            <Star size={14} fill="#F59E0B" className="me-1" />
                            {orchid.rating}
                          </span>
                          <span className="text-secondary">/</span>
                          <span className="d-flex align-items-center text-danger small">
                            <Heart size={14} fill="#EF4444" className="me-1" />
                            {orchid.numberOfLike}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {orchid.isSpecial && (
                            <Badge className="badge badge-special">
                              <Sparkles size={11} className="me-1" /> Special
                            </Badge>
                          )}
                          {orchid.isNatural && (
                            <Badge className="badge badge-natural">
                              <Leaf size={11} className="me-1" /> Natural
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="btn-action-edit"
                            title="Edit Specimen"
                            onClick={() => handleOpenEdit(orchid)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="btn-action-delete"
                            title="Delete Specimen"
                            onClick={() => setOrchidToDelete(orchid)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Card>

        {/* Modal Add / Edit with Formik & Yup */}
        <OrchidFormModal
          show={showFormModal}
          onHide={() => setShowFormModal(false)}
          orchid={selectedOrchid}
          onSubmit={handleFormSubmit}
        />

        {/* Modal Delete Confirmation */}
        <Modal
          show={Boolean(orchidToDelete)}
          onHide={() => setOrchidToDelete(null)}
          centered
          className="admin-delete-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5" className="text-danger d-flex align-items-center gap-2">
              <Trash2 size={20} />
              <span>Confirm Specimen Removal</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <p className="mb-3">
              Are you sure you wish to delete this orchid specimen from the botanical registry?
            </p>
            {orchidToDelete && (
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded border">
                <img
                  src={orchidToDelete.image}
                  alt={orchidToDelete.name}
                  style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                  className="rounded"
                />
                <div>
                  <h6 className="mb-0">{orchidToDelete.name}</h6>
                  <small className="text-secondary">
                    #{orchidToDelete.id} • {orchidToDelete.category} • {orchidToDelete.origin}
                  </small>
                </div>
              </div>
            )}
            <p className="text-danger small mt-3 mb-0">
              This action cannot be undone once synchronized with the database.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOrchidToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
};

export default AdminPage;
