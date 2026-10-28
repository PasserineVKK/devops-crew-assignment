import { Flower2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-info">
            <div className="footer-brand">
              <span className="footer-logo">
                <Flower2 size={24} />
              </span>
              <span className="footer-brand-name">OrchidHaven</span>
            </div>
            <p className="footer-desc">
              Dedicated botanical collection showcasing extraordinary natural and hybrid orchids from across the globe.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} OrchidHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
