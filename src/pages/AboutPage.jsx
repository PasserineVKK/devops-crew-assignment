import { useState } from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Accordion, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Flower2, Sparkles, Leaf, Award, Users, Globe, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const LegacyAboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <main className="about-page-container">
      {/* Hero Header */}
      <section className="about-hero-section">
        <Container>
          <div className="about-hero-content text-center">
            <div className="about-hero-icon mb-3">
              <Flower2 size={42} />
            </div>
            <h1 className="about-page-title">About OrchidHaven Sanctuary</h1>
            <div className="title-divider mx-auto"></div>
            <p className="about-page-subtitle mx-auto">
              A botanical preserve dedicated to documenting, safeguarding, and celebrating
              the delicate beauty of rare native species and award-winning cultivated orchids.
            </p>
          </div>
        </Container>
      </section>

      {/* Tabs Section: Mission, Sanctuary Highlights, Curators */}
      <section className="about-tabs-section py-5">
        <Container>
          <Tabs
            id="about-sanctuary-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'mission')}
            className="about-custom-tabs mb-4 justify-content-center"
          >
            <Tab eventKey="mission" title="Our Botanical Mission">
              <Card className="about-tab-card shadow-sm border-0">
                <Card.Body className="p-4 p-md-5">
                  <Row className="align-items-center g-4">
                    <Col lg={6}>
                      <div className="tab-image-box">
                        <img
                          src="/images/orchid-2.jpg"
                          alt="Botanical Mission at OrchidHaven"
                          className="img-fluid rounded about-image"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <span className="badge badge-natural mb-2">
                        <Leaf size={14} className="me-1" /> Biodiversity Stewardship
                      </span>
                      <h2 className="about-section-heading">Protecting Botanical Wonders</h2>
                      <p className="text-secondary mb-3">
                        Founded along the pristine coastal slopes of the Son Tra peninsula,
                        OrchidHaven unites botanical conservationists, researchers, and flora
                        enthusiasts in a shared mission: to preserve endangered wild orchid
                        varieties while promoting ethical horticulture.
                      </p>
                      <ul className="about-feature-list list-unstyled mb-4">
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle2 size={18} className="text-success me-2 flex-shrink-0" />
                          <span>Strict documentation of wild natural habitats and pollination cycles.</span>
                        </li>
                        <li className="d-flex align-items-center mb-2">
                          <CheckCircle2 size={18} className="text-success me-2 flex-shrink-0" />
                          <span>100% peat-free, organic substrate propagation to safeguard forest ecology.</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <CheckCircle2 size={18} className="text-success me-2 flex-shrink-0" />
                          <span>Educational workshops empowering garden enthusiasts worldwide.</span>
                        </li>
                      </ul>
                      <Button as={Link} to="/natural" className="btn-brand-primary">
                        <span>Explore Natural Orchids</span>
                        <ArrowRight size={16} className="ms-2" />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="highlights" title="Sanctuary Milestones">
              <Card className="about-tab-card shadow-sm border-0">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="about-section-heading text-center mb-4">Milestones & Conservation Impact</h2>
                  <Row className="g-4">
                    <Col md={6} lg={3}>
                      <div className="about-stat-card text-center p-4">
                        <div className="about-stat-icon mb-3 text-primary">
                          <Leaf size={32} />
                        </div>
                        <h3 className="about-stat-number">16+</h3>
                        <p className="about-stat-label">Rare Species Curated</p>
                        <small className="text-secondary">Documented across 10 botanical families</small>
                      </div>
                    </Col>
                    <Col md={6} lg={3}>
                      <div className="about-stat-card text-center p-4">
                        <div className="about-stat-icon mb-3 text-success">
                          <Globe size={32} />
                        </div>
                        <h3 className="about-stat-number">10+</h3>
                        <p className="about-stat-label">Countries of Origin</p>
                        <small className="text-secondary">Specimens from Asia, Americas & Australia</small>
                      </div>
                    </Col>
                    <Col md={6} lg={3}>
                      <div className="about-stat-card text-center p-4">
                        <div className="about-stat-icon mb-3 text-warning">
                          <Award size={32} />
                        </div>
                        <h3 className="about-stat-number">12</h3>
                        <p className="about-stat-label">Botanical Honors</p>
                        <small className="text-secondary">International Orchid Congress recognitions</small>
                      </div>
                    </Col>
                    <Col md={6} lg={3}>
                      <div className="about-stat-card text-center p-4">
                        <div className="about-stat-icon mb-3 text-info">
                          <Users size={32} />
                        </div>
                        <h3 className="about-stat-number">50K+</h3>
                        <p className="about-stat-label">Annual Guests</p>
                        <small className="text-secondary">Visitors inspired by living plant heritage</small>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="team" title="Curator & Botanical Team">
              <Card className="about-tab-card shadow-sm border-0">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="about-section-heading text-center mb-2">Dedicated Botanical Curators</h2>
                  <p className="text-center text-secondary mb-4 mx-auto" style={{ maxWidth: '640px' }}>
                    Our interdisciplinary team blends decades of in-situ field research with state-of-the-art
                    glasshouse microclimate management.
                  </p>
                  <Row className="g-4">
                    <Col md={4}>
                      <div className="curator-card p-3 text-center">
                        <img
                          src="/images/orchid-1.jpg"
                          alt="Chief Botanist"
                          className="curator-avatar rounded-circle mb-3 mx-auto"
                        />
                        <h4 className="curator-name">Dr. Linh Nguyen</h4>
                        <span className="badge badge-special mb-2">Lead Orchidologist</span>
                        <p className="curator-bio small text-secondary">
                          Specializing in native Indochina Paphiopedilum and Vanda genetics for over 18 years.
                        </p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="curator-card p-3 text-center">
                        <img
                          src="/images/orchid-8.jpg"
                          alt="Horticulture Specialist"
                          className="curator-avatar rounded-circle mb-3 mx-auto"
                        />
                        <h4 className="curator-name">Arthur Vance</h4>
                        <Badge bg="secondary" className="mb-2">Microclimate Lead</Badge>
                        <p className="curator-bio small text-secondary">
                          Designer of automated ecological misting and spectrum lighting systems for delicate hybrids.
                        </p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="curator-card p-3 text-center">
                        <img
                          src="/images/orchid-14.jpg"
                          alt="Preservation Officer"
                          className="curator-avatar rounded-circle mb-3 mx-auto"
                        />
                        <h4 className="curator-name">Mei Takahashi</h4>
                        <span className="badge badge-natural mb-2">Tissue Culture Pioneer</span>
                        <p className="curator-bio small text-secondary">
                          Spearheading non-destructive seed germination programs for vulnerable cloud-forest orchids.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Container>
      </section>

      {/* Accordion Section: Botanical FAQs */}
      <section className="about-faq-section py-5">
        <Container>
          <div className="text-center mb-5">
            <span className="badge badge-special mb-2">
              <Sparkles size={14} className="me-1" /> Frequently Asked Questions
            </span>
            <h2 className="about-section-heading">Botanical Knowledge Base</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              Common inquiries regarding orchid classification, cultivation practices, and sanctuary stewardship.
            </p>
          </div>

          <Row className="justify-content-center">
            <Col lg={9}>
              <Accordion defaultActiveKey="0" className="about-accordion shadow-sm">
                <Accordion.Item eventKey="0" className="mb-3 border rounded overflow-hidden">
                  <Accordion.Header>
                    <span className="faq-question-title">
                      1. How does OrchidHaven identify and verify wild natural orchids (<code>isNatural</code>)?
                    </span>
                  </Accordion.Header>
                  <Accordion.Body className="faq-answer-body">
                    Wild natural species are botanical specimens verified by herbarium records and native habitat surveys.
                    Unlike cultivated hybrids developed through artificial cross-pollination, natural orchids retain their
                    original ancestral genotypes adapted specifically to wild ecosystems like rainforest canopies or limestone cliffs.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" className="mb-3 border rounded overflow-hidden">
                  <Accordion.Header>
                    <span className="faq-question-title">
                      2. What defines a specimen as a "Special Edition" orchid (<code>isSpecial</code>)?
                    </span>
                  </Accordion.Header>
                  <Accordion.Body className="faq-answer-body">
                    A specimen receives the "Special Edition" designation when it exhibits exceptional botanical traits:
                    award-winning blossom symmetry, unique chromatic pigmentations (such as pure blue Vandas or deep chocolate Oncidiums),
                    or historical status in international botanical exhibitions.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2" className="mb-3 border rounded overflow-hidden">
                  <Accordion.Header>
                    <span className="faq-question-title">
                      3. Can visitors purchase seedlings or attend cultivation seminars?
                    </span>
                  </Accordion.Header>
                  <Accordion.Body className="faq-answer-body">
                    Yes. We host weekly weekend workshops on substrate blending, root hydration monitoring, and seasonal repotting.
                    Certified propagated seedlings raised ethically from tissue culture are available at the Sanctuary Botanical Shop.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3" className="mb-3 border rounded overflow-hidden">
                  <Accordion.Header>
                    <span className="faq-question-title">
                      4. What are the essential guidelines for watering and ambient sunlight?
                    </span>
                  </Accordion.Header>
                  <Accordion.Body className="faq-answer-body">
                    Most tropical epiphytes thrive with bright, indirect sunlight and watering intervals of 5 to 7 days.
                    Ensure the potting medium allows complete drainage; orchid roots require ambient aeration to avoid fungal root distress.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4" className="mb-3 border rounded overflow-hidden">
                  <Accordion.Header>
                    <span className="faq-question-title">
                      5. How can gardeners and students contribute to orchid conservation?
                    </span>
                  </Accordion.Header>
                  <Accordion.Body className="faq-answer-body">
                    Enthusiasts can support species survival by purchasing exclusively laboratory-propagated plants rather than wild-harvested specimens,
                    participating in community botany projects, and reporting wild blossom sightings responsibly.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sanctuary Contact CTA Banner */}
      <section className="about-cta-section py-5 text-center">
        <Container>
          <Card className="about-cta-card p-4 p-md-5 border-0">
            <Card.Body>
              <div className="about-cta-badge mb-2">
                <ShieldCheck size={20} className="me-1 text-primary" />
                <span>Plan Your Botanical Visit</span>
              </div>
              <h2 className="about-cta-title mb-3">Immerse Yourself in the Orchid World</h2>
              <p className="about-cta-desc mx-auto mb-4 text-secondary" style={{ maxWidth: '620px' }}>
                Plan your tour to our coastal Da Nang nursery or reach out to our team of botanical specialists
                for tailored care recommendations.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button as={Link} to="/contact" className="btn-brand-primary">
                  <span>Contact Our Botanists</span>
                  <ArrowRight size={16} className="ms-2" />
                </Button>
                <Button as={Link} to="/" variant="outline-secondary">
                  <span>Browse Full Collection</span>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </main>
  );
};

const AboutPage = () => (
  <main className="about-page-container">
    <article className="about-story">
      <header className="about-story-opening">
        <Container>
          <div className="about-hero-content">
            <div className="about-hero-icon mb-3" aria-hidden="true"><Flower2 size={42} /></div>
            <p className="about-story-kicker">The story of a living collection</p>
            <h1 className="about-page-title">About OrchidHaven Sanctuary</h1>
            <p className="about-page-subtitle">
              Along the coastal slopes of Son Tra, a quiet garden keeps the story of rare orchids alive —
              one species, one careful record, and one new grower at a time.
            </p>
          </div>
        </Container>
      </header>

      <Container>
        <section className="about-story-chapter about-story-introduction">
          <Row className="align-items-center g-4 g-lg-5">
            <Col lg={6}>
              <img src="/images/orchid-2.jpg" alt="A rare orchid growing at OrchidHaven Sanctuary" className="about-story-image" />
            </Col>
            <Col lg={6}>
              <Badge className="badge-natural mb-3"><Leaf size={14} className="me-1" /> Biodiversity stewardship</Badge>
              <h2 className="about-section-heading">A sanctuary built around care</h2>
              <p>OrchidHaven began with a simple belief: protecting an orchid starts with understanding the forest that gave it life. Our sanctuary brings botanists, researchers, and plant lovers together to document rare native species, safeguard their habitats, and make responsible cultivation accessible.</p>
              <p>Every specimen has a story. We preserve that story through habitat notes, pollination records, ethical propagation, and patient daily care. The result is more than a collection of beautiful flowers; it is a living library of botanical knowledge.</p>
              <ul className="about-story-list">
                <li><CheckCircle2 size={18} /> Documenting wild habitats and pollination cycles.</li>
                <li><CheckCircle2 size={18} /> Using peat-free, organic propagation methods.</li>
                <li><CheckCircle2 size={18} /> Sharing practical conservation knowledge with growers.</li>
              </ul>
            </Col>
          </Row>
        </section>

        <section className="about-story-chapter about-impact-story">
          <div className="about-story-marker" aria-hidden="true"><Sparkles size={18} /></div>
          <p className="about-story-kicker">What the work has made possible</p>
          <h2 className="about-section-heading">A small garden with a wide reach</h2>
          <p>Conservation grows through consistency. Over the years, our work has connected species from forests, islands, and mountain valleys with people who want to care for them properly. These milestones are not trophies; they are reminders that careful stewardship can travel far beyond the sanctuary walls.</p>
          <Row className="about-story-facts g-3">
            <Col sm={6} lg={3}><div><Leaf size={24} /><strong>16+</strong><span>rare species curated</span></div></Col>
            <Col sm={6} lg={3}><div><Globe size={24} /><strong>10+</strong><span>countries of origin</span></div></Col>
            <Col sm={6} lg={3}><div><Award size={24} /><strong>12</strong><span>botanical honors</span></div></Col>
            <Col sm={6} lg={3}><div><Users size={24} /><strong>50K+</strong><span>annual guests</span></div></Col>
          </Row>
        </section>

        <section className="about-story-chapter about-team-story">
          <Row className="align-items-center g-4">
            <Col lg={5}>
              <p className="about-story-kicker">The people behind the leaves</p>
              <h2 className="about-section-heading">Knowledge is part of the collection</h2>
              <p>Our interdisciplinary team combines field research with the quiet precision of glasshouse care. Dr. Linh Nguyen studies native Indochina Paphiopedilum and Vanda genetics; Arthur Vance designs gentle microclimates for delicate hybrids; and Mei Takahashi leads non-destructive seed germination for cloud-forest orchids.</p>
              <p>Together, they make sure every lesson learned in the sanctuary can help a forest, a classroom, or a home garden flourish.</p>
            </Col>
            <Col lg={7}>
              <div className="about-team-images">
                <img src="/images/orchid-1.jpg" alt="Orchid cared for by the botanical team" />
                <img src="/images/orchid-8.jpg" alt="Orchid in the sanctuary collection" />
                <img src="/images/orchid-14.jpg" alt="Rare orchid preserved at OrchidHaven" />
              </div>
            </Col>
          </Row>
        </section>

        <section className="about-story-chapter about-knowledge-story">
          <p className="about-story-kicker">A few things visitors often ask</p>
          <h2 className="about-section-heading">Before you continue the story</h2>
          <div className="about-story-questions">
            <div><strong>How do you verify a natural orchid?</strong><p>We compare herbarium records with native habitat surveys. Natural species retain the ancestral traits shaped by their wild ecosystems.</p></div>
            <div><strong>What makes an orchid a Special Edition?</strong><p>It may have exceptional symmetry, unusual pigmentation, or a notable history in international botanical exhibitions.</p></div>
            <div><strong>How can visitors help conservation?</strong><p>Choose laboratory-propagated plants, join community botany projects, and report wild sightings responsibly instead of supporting wild harvesting.</p></div>
            <div><strong>Can I learn to care for orchids?</strong><p>Yes. Our weekend workshops cover substrate, root hydration, seasonal repotting, light, and watering.</p></div>
          </div>
        </section>

        <section className="about-story-ending text-center">
          <ShieldCheck size={28} className="text-primary mb-3" aria-hidden="true" />
          <p className="about-story-kicker">The next chapter can begin with you</p>
          <h2 className="about-cta-title">Come closer to the orchid world</h2>
          <p className="about-cta-desc mx-auto mb-4">Visit our coastal Da Nang nursery or speak with a botanical specialist for thoughtful care recommendations.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button as={Link} to="/contact" className="btn-brand-primary">Contact Our Botanists <ArrowRight size={16} className="ms-2" /></Button>
            <Button as={Link} to="/" variant="outline-secondary">Browse Full Collection</Button>
          </div>
        </section>
      </Container>
    </article>
  </main>
);

export default AboutPage;
