import { useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Sparkles, Leaf, PlusCircle, Check } from 'lucide-react';

// Yup schema for validating orchid botanical data
const orchidValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Orchid name must be at least 3 characters')
    .max(80, 'Orchid name cannot exceed 80 characters')
    .required('Orchid botanical name is required'),
  rating: Yup.number()
    .typeError('Rating must be a valid number')
    .min(1, 'Rating minimum is 1.0')
    .max(5, 'Rating maximum is 5.0')
    .required('Rating is required'),
  image: Yup.string()
    .trim()
    .required('Image path or URL is required'),
  origin: Yup.string()
    .trim()
    .min(2, 'Origin country must be at least 2 characters')
    .required('Native origin country is required'),
  category: Yup.string()
    .trim()
    .required('Botanical genus category is required'),
  color: Yup.string()
    .trim()
    .required('Primary blossom color is required'),
  numberOfLike: Yup.number()
    .typeError('Likes count must be an integer')
    .min(0, 'Likes count cannot be negative')
    .required('Number of likes is required'),
  clip: Yup.string()
    .trim()
    .url('Must be a valid URL (e.g. https://www.youtube.com/embed/...)')
    .nullable(),
  isSpecial: Yup.boolean(),
  isNatural: Yup.boolean(),
});

const OrchidFormModal = ({ show, onHide, orchid, onSubmit }) => {
  const isEditing = Boolean(orchid && orchid.id);

  const initialValues = {
    name: orchid?.name || '',
    rating: orchid?.rating ?? 5,
    image: orchid?.image || '',
    origin: orchid?.origin || '',
    category: orchid?.category || '',
    color: orchid?.color || '',
    numberOfLike: orchid?.numberOfLike ?? 0,
    clip: orchid?.clip || '',
    isSpecial: Boolean(orchid?.isSpecial),
    isNatural: Boolean(orchid?.isNatural),
  };

  const formik = useFormik({
    initialValues,
    validationSchema: orchidValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await onSubmit(values);
        resetForm();
        onHide();
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { resetForm } = formik;

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show, resetForm]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="orchid-form-modal">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title as="h5" className="d-flex align-items-center gap-2">
          {isEditing ? (
            <>
              <Sparkles size={18} className="text-warning" />
              <span>Modify Orchid Specimen #{orchid.id}</span>
            </>
          ) : (
            <>
              <PlusCircle size={18} className="text-primary" />
              <span>Register New Botanical Specimen</span>
            </>
          )}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body className="modal-body-custom p-4">
          <Row className="g-3">
            {/* Orchid Name */}
            <Col md={8}>
              <Form.Group controlId="orchid-form-name">
                <Form.Label className="fw-semibold">Orchid Botanical Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="e.g. Taichung Beauty"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Genus / Category */}
            <Col md={4}>
              <Form.Group controlId="orchid-form-category">
                <Form.Label className="fw-semibold">Genus / Category *</Form.Label>
                <Form.Select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.category && Boolean(formik.errors.category)}
                >
                  <option value="">Select genus...</option>
                  <option value="Cattleya">Cattleya</option>
                  <option value="Phalaenopsis">Phalaenopsis</option>
                  <option value="Vanda">Vanda</option>
                  <option value="Oncidium">Oncidium</option>
                  <option value="Paphiopedilum">Paphiopedilum</option>
                  <option value="Dendrobium">Dendrobium</option>
                  <option value="Epidendrum">Epidendrum</option>
                  <option value="Brassavola">Brassavola</option>
                  <option value="Cymbidium">Cymbidium</option>
                  <option value="Zygopetalum">Zygopetalum</option>
                  <option value="Miltonia">Miltonia</option>
                  <option value="Renanthera">Renanthera</option>
                  <option value="Habenaria">Habenaria</option>
                  <option value="Coelogyne">Coelogyne</option>
                  <option value="Vanilla">Vanilla</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Image URL */}
            <Col md={12}>
              <Form.Group controlId="orchid-form-image">
                <Form.Label className="fw-semibold">Image URL or Local Path *</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="e.g. /images/orchid-1.jpg or https://..."
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.image && Boolean(formik.errors.image)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.image}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Origin & Color */}
            <Col md={6}>
              <Form.Group controlId="orchid-form-origin">
                <Form.Label className="fw-semibold">Native Origin Country *</Form.Label>
                <Form.Control
                  type="text"
                  name="origin"
                  placeholder="e.g. Vietnam, Taiwan, Brazil"
                  value={formik.values.origin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.origin && Boolean(formik.errors.origin)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.origin}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="orchid-form-color">
                <Form.Label className="fw-semibold">Primary Color *</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  placeholder="e.g. Pink, White, Yellow, Blue"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.color && Boolean(formik.errors.color)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.color}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Rating & Likes */}
            <Col md={6}>
              <Form.Group controlId="orchid-form-rating">
                <Form.Label className="fw-semibold">Rating (1.0 - 5.0) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  name="rating"
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.rating && Boolean(formik.errors.rating)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.rating}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="orchid-form-likes">
                <Form.Label className="fw-semibold">Community Likes Counter *</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  name="numberOfLike"
                  value={formik.values.numberOfLike}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.numberOfLike && Boolean(formik.errors.numberOfLike)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.numberOfLike}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Video Clip */}
            <Col md={12}>
              <Form.Group controlId="orchid-form-clip">
                <Form.Label className="fw-semibold">YouTube Embed Clip URL</Form.Label>
                <Form.Control
                  type="text"
                  name="clip"
                  placeholder="https://www.youtube.com/embed/..."
                  value={formik.values.clip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.clip && Boolean(formik.errors.clip)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.clip}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Checkboxes: isSpecial, isNatural */}
            <Col md={6}>
              <Form.Check
                type="checkbox"
                id="orchid-form-special"
                name="isSpecial"
                label={
                  <span className="d-flex align-items-center gap-1">
                    <Sparkles size={14} className="text-warning" />
                    <strong>Special Edition Orchid</strong>
                  </span>
                }
                checked={formik.values.isSpecial}
                onChange={formik.handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Check
                type="checkbox"
                id="orchid-form-natural"
                name="isNatural"
                label={
                  <span className="d-flex align-items-center gap-1">
                    <Leaf size={14} className="text-success" />
                    <strong>Wild Natural Botanical Species</strong>
                  </span>
                }
                checked={formik.values.isNatural}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={onHide} disabled={formik.isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="btn-brand-primary"
            disabled={formik.isSubmitting}
          >
            <Check size={16} className="me-1" />
            <span>{isEditing ? 'Save Changes' : 'Register Orchid'}</span>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OrchidFormModal;
