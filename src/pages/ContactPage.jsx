import { Container } from 'react-bootstrap';
import { Mail, Phone } from 'lucide-react';

const ContactPage = () => (
  <main className="contact-page-container">
    <Container>
      <article className="contact-simple-page">
        <p className="about-story-kicker">Contact OrchidHaven</p>
        <h1 className="contact-page-title">Get in touch</h1>
        <div className="title-divider"></div>

        <div className="contact-simple-list">
          <a href="mailto:diechahien@gmail.com" className="contact-simple-item">
            <Mail size={24} aria-hidden="true" />
            <span>diechahien@gmail.com</span>
          </a>
          <a href="tel:0702946163" className="contact-simple-item">
            <Phone size={24} aria-hidden="true" />
            <span>0702946163</span>
          </a>
        </div>
      </article>
    </Container>
  </main>
);

export default ContactPage;
