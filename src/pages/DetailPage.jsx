import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab } from 'react-bootstrap';
import {
  ArrowLeft, MapPin, Star, Heart, Sparkles, Leaf, Film,
  Info, Droplets, SunMedium, Thermometer, ShieldCheck, Share2
} from 'lucide-react';
import ListOfOrchidsData from '../data/ListOfOrchids';

const DetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('profile');
  const storeOrchids = useSelector((state) => state.orchids.items);
  const orchid = (storeOrchids && storeOrchids.length > 0 ? storeOrchids : ListOfOrchidsData).find(
    (item) => String(item.id) === String(id)
  );

  if (!orchid) {
    return (
      <main className="detail-page-container py-5">
        <Container>
          <Card className="detail-not-found-card text-center p-5 border-0 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
            <Card.Body>
              <div className="empty-icon fs-1 mb-3">🌸</div>
              <h2 className="mb-2">Orchid Not Located</h2>
              <p className="text-secondary mb-4">
                The botanical specimen record for ID #{id} could not be found in our curated database.
              </p>
              <Button as={Link} to="/" className="btn-brand-primary">
                <ArrowLeft size={16} className="me-2" /> Back to Collection
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </main>
    );
  }

  const {
    name,
    rating,
    isSpecial,
    isNatural,
    image,
    color,
    numberOfLike,
    origin,
    category,
    clip
  } = orchid;

  const handleImageError = (e) => {
    e.currentTarget.src = "https://barritaorchids.com/cdn/shop/products/Cf592_1024x1024.jpg";
  };

  return (
    <main className="detail-page-container py-4 py-lg-5">
      <Container>
        {/* Navigation Breadcrumb & Back Action */}
        <div className="detail-nav-bar d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <Button as={Link} to="/" variant="outline-primary" className="btn-back">
            <ArrowLeft size={16} className="me-2" /> Back to Collection
          </Button>

          <nav aria-label="breadcrumb" className="detail-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator mx-2">/</span>
            <Link to="/natural">{category}</Link>
            <span className="breadcrumb-separator mx-2">/</span>
            <span className="breadcrumb-current text-primary fw-semibold">{name}</span>
          </nav>
        </div>

        {/* Top Summary Card (2 Columns: Image & Primary Info) */}
        <Card className="detail-hero-card border-0 shadow-sm mb-4 overflow-hidden">
          <Card.Body className="p-0">
            <Row className="g-0 align-items-stretch">
              {/* Media Column */}
              <Col lg={5} className="detail-media-column position-relative">
                <div className="detail-image-box h-100">
                  <img
                    src={image}
                    alt={name}
                    className="detail-main-image w-100 h-100 object-fit-cover"
                    onError={handleImageError}
                  />
                  <div className="detail-floating-badges position-absolute top-0 start-0 m-3 d-flex flex-column gap-2">
                    {isSpecial && (
                      <Badge className="badge badge-special py-2 px-3">
                        <Sparkles size={13} className="me-1" /> Special Edition
                      </Badge>
                    )}
                    {isNatural && (
                      <Badge className="badge badge-natural py-2 px-3">
                        <Leaf size={13} className="me-1" /> Wild Natural
                      </Badge>
                    )}
                  </div>
                </div>
              </Col>

              {/* Information Column */}
              <Col lg={7} className="p-4 p-md-5 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="detail-category-tag">{category}</span>
                    <span className="text-secondary small fw-medium">Specimen #{id}</span>
                  </div>

                  <h1 className="detail-title mb-2">{name}</h1>
                  <p className="detail-classification text-secondary mb-4">
                    {isNatural
                      ? 'Botanical Wild Species — Naturally evolved in undisturbed ecosystems'
                      : 'Cultivated Hybrid Specimen — Selectively bred for superior floral exhibition'}
                  </p>

                  <div className="detail-quick-stats d-flex flex-wrap gap-3 mb-4">
                    <div className="detail-stat-pill">
                      <Star size={18} fill="#F59E0B" color="#F59E0B" className="me-1" />
                      <strong>{rating}</strong> / 5.0 Rating
                    </div>
                    <div className="detail-stat-pill likes">
                      <Heart size={18} fill="#EF4444" color="#EF4444" className="me-1" />
                      <strong>{numberOfLike.toLocaleString()}</strong> Likes
                    </div>
                    <div className="detail-stat-pill">
                      <MapPin size={18} className="text-primary me-1" />
                      <span>{origin}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-action-buttons d-flex gap-2 flex-wrap">
                  {clip && (
                    <Button
                      variant="primary"
                      className="btn-brand-primary"
                      onClick={() => setActiveTab('video')}
                    >
                      <Film size={16} className="me-2" /> Watch Video Showcase
                    </Button>
                  )}
                  <Button
                    variant="outline-secondary"
                    onClick={() => setActiveTab('care')}
                  >
                    <Info size={16} className="me-2" /> Care Guidelines
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Detailed Information Tabs (React-Bootstrap Tabs & Tab) */}
        <Card className="detail-tabs-card border-0 shadow-sm">
          <Card.Body className="p-4 p-md-5">
            <Tabs
              id="orchid-detail-tabs"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k || 'profile')}
              className="detail-custom-tabs mb-4"
            >
              {/* Tab 1: Botanical Profile */}
              <Tab eventKey="profile" title="Botanical Profile">
                <div className="tab-pane-content pt-3">
                  <h3 className="tab-section-heading mb-3">Morphological & Botanical Specifications</h3>
                  <p className="text-secondary mb-4">
                    Scientific and taxonomic profile recorded under the OrchidHaven botanical herbarium standards.
                  </p>

                  <Row className="g-3">
                    <Col sm={6} md={3}>
                      <Card className="p-3 border h-100 detail-info-box">
                        <small className="text-secondary d-block mb-1">Native Provenance</small>
                        <div className="fw-semibold d-flex align-items-center">
                          <MapPin size={16} className="text-primary me-2 flex-shrink-0" />
                          <span>{origin}</span>
                        </div>
                      </Card>
                    </Col>

                    <Col sm={6} md={3}>
                      <Card className="p-3 border h-100 detail-info-box">
                        <small className="text-secondary d-block mb-1">Floral Coloration</small>
                        <div className="fw-semibold d-flex align-items-center">
                          <span
                            className="color-dot me-2 flex-shrink-0"
                            style={{
                              backgroundColor: color.toLowerCase() === 'white' ? '#e2e8f0' : color.toLowerCase()
                            }}
                          />
                          <span>{color}</span>
                        </div>
                      </Card>
                    </Col>

                    <Col sm={6} md={3}>
                      <Card className="p-3 border h-100 detail-info-box">
                        <small className="text-secondary d-block mb-1">Taxonomic Genus</small>
                        <div className="fw-semibold d-flex align-items-center">
                          <Leaf size={16} className="text-success me-2 flex-shrink-0" />
                          <span>{category}</span>
                        </div>
                      </Card>
                    </Col>

                    <Col sm={6} md={3}>
                      <Card className="p-3 border h-100 detail-info-box">
                        <small className="text-secondary d-block mb-1">Ecological Origin</small>
                        <div className="fw-semibold d-flex align-items-center">
                          <ShieldCheck size={16} className="text-info me-2 flex-shrink-0" />
                          <span>{isNatural ? 'Wild Natural' : 'Cultivated Hybrid'}</span>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Tab>

              {/* Tab 2: Cultivation & Care Guidelines */}
              <Tab eventKey="care" title="Care Guidelines">
                <div className="tab-pane-content pt-3">
                  <h3 className="tab-section-heading mb-3">Horticultural Maintenance Protocol</h3>
                  <p className="text-secondary mb-4">
                    Recommendations from our greenhouse curators to ensure healthy vegetative development and regular flowering.
                  </p>

                  <Row className="g-4">
                    <Col md={6}>
                      <Card className="care-card-item p-3 border-0 h-100">
                        <div className="d-flex align-items-start gap-3">
                          <div className="care-icon-box text-warning p-2 rounded">
                            <SunMedium size={24} />
                          </div>
                          <div>
                            <h5 className="mb-1">Solar Exposure & Light</h5>
                            <p className="text-secondary mb-0 small">
                              Thrives in 65% to 75% filtered daylight. Avoid exposure to intense direct midday sun which may burn leaves.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Col>

                    <Col md={6}>
                      <Card className="care-card-item p-3 border-0 h-100">
                        <div className="d-flex align-items-start gap-3">
                          <div className="care-icon-box text-info p-2 rounded">
                            <Droplets size={24} />
                          </div>
                          <div>
                            <h5 className="mb-1">Hydration & Irrigation</h5>
                            <p className="text-secondary mb-0 small">
                              Water thoroughly every 5 to 7 days in summer, reducing to 10 days in winter. Roots must drain freely.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Col>

                    <Col md={6}>
                      <Card className="care-card-item p-3 border-0 h-100">
                        <div className="d-flex align-items-start gap-3">
                          <div className="care-icon-box text-danger p-2 rounded">
                            <Thermometer size={24} />
                          </div>
                          <div>
                            <h5 className="mb-1">Temperature & Airflow</h5>
                            <p className="text-secondary mb-0 small">
                              Optimal diurnal range is 20°C - 30°C with moderate night cooling (16°C - 18°C) to stimulate blossom buds.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Col>

                    <Col md={6}>
                      <Card className="care-card-item p-3 border-0 h-100">
                        <div className="d-flex align-items-start gap-3">
                          <div className="care-icon-box text-success p-2 rounded">
                            <Leaf size={24} />
                          </div>
                          <div>
                            <h5 className="mb-1">Substrate & Nutrition</h5>
                            <p className="text-secondary mb-0 small">
                              Coarse pine bark chips blended with charcoal and perlite. Feed with balanced 20-20-20 orchid fertilizer monthly.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Tab>

              {/* Tab 3: Botanical Video Showcase (clip) */}
              {clip && (
                <Tab eventKey="video" title="Video Showcase">
                  <div className="tab-pane-content pt-3">
                    <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                      <h3 className="tab-section-heading mb-0">
                        <Film size={20} className="me-2 text-danger" />
                        Live Botanical Video Presentation
                      </h3>
                      <Badge bg="dark" className="p-2">Embedded Video Presentation</Badge>
                    </div>
                    <p className="text-secondary mb-4">
                      High-definition footage illustrating the floral posture, petal geometry, and blooming behavior of {name}.
                    </p>

                    <div className="detail-video-container shadow-sm rounded overflow-hidden">
                      <iframe
                        src={clip}
                        title={`${name} botanical presentation`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-100"
                        style={{ aspectRatio: '16/9', border: 'none' }}
                      />
                    </div>
                  </div>
                </Tab>
              )}

              {/* Tab 4: Conservation & Community */}
              <Tab eventKey="community" title="Conservation & Community">
                <div className="tab-pane-content pt-3">
                  <h3 className="tab-section-heading mb-3">Sanctuary Conservation Grade</h3>
                  <p className="text-secondary mb-4">
                    OrchidHaven actively maintains seedbanks and tissue cultures to ensure this lineage thrives for generations.
                  </p>

                  <Row className="g-4 align-items-center">
                    <Col md={6}>
                      <div className="p-4 border rounded conservation-box">
                        <h5 className="d-flex align-items-center mb-3">
                          <ShieldCheck size={20} className="text-primary me-2" />
                          Conservation Registry
                        </h5>
                        <p className="small text-secondary mb-2">
                          <strong>Specimen Status:</strong> {isNatural ? 'Vulnerable Wild Population' : 'Curated Horticultural Variety'}
                        </p>
                        <p className="small text-secondary mb-2">
                          <strong>Sanctuary Registry ID:</strong> ORC-2024-{id.padStart(4, '0')}
                        </p>
                        <p className="small text-secondary mb-0">
                          <strong>Seedbank Viability:</strong> Verified 98% germination rate in vitro.
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 border rounded conservation-box text-center">
                        <Heart size={36} fill="#EF4444" color="#EF4444" className="mb-2" />
                        <h4 className="mb-1">{numberOfLike.toLocaleString()} Community Endorsements</h4>
                        <p className="small text-secondary mb-3">
                          Orchid lovers around the globe have saved this specimen to their favorites.
                        </p>
                        <Button variant="outline-primary" size="sm" as={Link} to="/contact">
                          <Share2 size={14} className="me-1" /> Inquire About Propagation
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default DetailPage;
