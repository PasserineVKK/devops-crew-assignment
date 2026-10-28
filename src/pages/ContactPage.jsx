import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page-container py-4 py-lg-5">
      <Container>
        {/* Header Section */}
        <section className="contact-header-section text-center mb-5">
          <h1 className="contact-page-title">Connect with OrchidHaven</h1>
          <div className="title-divider mx-auto"></div>
          <p className="contact-page-subtitle mx-auto text-secondary">
            Have questions about rare orchid preservation, cultivation, or nursery visits? Our botanical specialists are here to assist.
          </p>
        </section>

        {/* 4 Info Cards Grid using React-Bootstrap Row & Col */}
        <Row className="g-4 mb-5">
          <Col sm={6} lg={3}>
            <Card className="contact-info-card h-100 border-0 shadow-sm text-center p-3">
              <Card.Body className="p-2">
                <div className="contact-icon-bubble mx-auto mb-3">
                  <MapPin size={22} />
                </div>
                <h3 className="contact-card-title h5 mb-2">Sanctuary Address</h3>
                <p className="contact-card-text text-secondary small mb-0">
                  Orchid Haven Nursery, Son Tra Peninsula, Da Nang City, Vietnam
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6} lg={3}>
            <Card className="contact-info-card h-100 border-0 shadow-sm text-center p-3">
              <Card.Body className="p-2">
                <div className="contact-icon-bubble mx-auto mb-3">
                  <Phone size={22} />
                </div>
                <h3 className="contact-card-title h5 mb-2">Botanical Hotline</h3>
                <p className="contact-card-text text-secondary small mb-0">
                  +84 (0) 901 234 567<br />
                  Mon - Sat, 08:00 - 17:30
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6} lg={3}>
            <Card className="contact-info-card h-100 border-0 shadow-sm text-center p-3">
              <Card.Body className="p-2">
                <div className="contact-icon-bubble mx-auto mb-3">
                  <Mail size={22} />
                </div>
                <h3 className="contact-card-title h5 mb-2">Inquiry Email</h3>
                <p className="contact-card-text text-secondary small mb-0">
                  care@orchidhaven.vn<br />
                  support@orchidhaven.vn
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6} lg={3}>
            <Card className="contact-info-card h-100 border-0 shadow-sm text-center p-3">
              <Card.Body className="p-2">
                <div className="contact-icon-bubble mx-auto mb-3">
                  <Clock size={22} />
                </div>
                <h3 className="contact-card-title h5 mb-2">Visiting Hours</h3>
                <p className="contact-card-text text-secondary small mb-0">
                  Daily: 08:00 AM - 05:30 PM<br />
                  Open on public holidays
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Form and Map Grid using React-Bootstrap Row & Col */}
        <Row className="g-4 align-items-stretch">
          <Col lg={7}>
            <Card className="contact-form-wrapper h-100 border-0 shadow-sm p-4 p-md-5">
              <Card.Body className="p-0">
                <div className="d-flex align-items-center mb-2">
                  <MessageSquare size={22} className="text-primary me-2" />
                  <h2 className="form-section-title mb-0 h4">Send a Botanical Inquiry</h2>
                </div>
                <p className="form-section-subtitle text-secondary mb-4 small">
                  Fill in the details below and our botanists will respond within 24 hours.
                </p>

                {submitted ? (
                  <Alert variant="success" className="contact-success-alert p-4 text-center border-0 shadow-sm">
                    <CheckCircle2 size={40} className="success-icon mb-2 text-success mx-auto d-block" />
                    <Alert.Heading as="h4">Inquiry Received!</Alert.Heading>
                    <p className="mb-4">
                      Thank you, <strong>{formData.name || 'valued guest'}</strong>. Our botanical specialists have received your message and will reply to <em>{formData.email}</em> shortly.
                    </p>
                    <Button
                      variant="success"
                      className="btn-send-another"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                    >
                      Send Another Inquiry
                    </Button>
                  </Alert>
                ) : (
                  <Form onSubmit={handleSubmit} className="contact-form">
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Group controlId="contact-name">
                          <Form.Label className="form-label fw-medium">Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Elena Rostova"
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="contact-email">
                          <Form.Label className="form-label fw-medium">Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. elena@example.com"
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId="contact-subject" className="mb-3">
                      <Form.Label className="form-label fw-medium">Inquiry Topic</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Cattleya Orchid Cultivation Guidance"
                        className="form-input"
                      />
                    </Form.Group>

                    <Form.Group controlId="contact-message" className="mb-4">
                      <Form.Label className="form-label fw-medium">Message Content *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your inquiry or question regarding our orchids..."
                        className="form-textarea"
                      />
                    </Form.Group>

                    <Button type="submit" className="btn-brand-primary w-100 py-2">
                      <span>Dispatch Botanical Inquiry</span>
                      <Send size={16} className="ms-2" />
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card className="contact-map-wrapper h-100 border-0 shadow-sm p-4 p-md-5 d-flex flex-column">
              <Card.Body className="p-0 d-flex flex-column h-100">
                <div className="d-flex align-items-center mb-2">
                  <MapPin size={22} className="text-primary me-2" />
                  <h2 className="form-section-title mb-0 h4">Sanctuary Location</h2>
                </div>
                <p className="form-section-subtitle text-secondary mb-3 small">
                  Situated along the lush coastal terrain of Son Tra Peninsula, Da Nang.
                </p>

                <div className="map-frame-container rounded overflow-hidden flex-grow-1 shadow-sm" style={{ minHeight: '300px' }}>
                  <iframe
                    title="Orchid Haven Botanical Garden Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61349.64684535492!2d108.24354271810565!3d16.104276707323862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f22588c9d3%3A0x4a9d70233481e1d0!2sS%C6%A1n%20Tr%C3%A0%20Peninsula!5e0!3m2!1sen!2svn!4v1700000000000!5m2!1sen!2svn"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '280px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ContactPage;
