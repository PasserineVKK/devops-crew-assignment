import { Modal } from 'react-bootstrap';
import { MapPin, Heart, Star, Sparkles, Leaf, Film } from 'lucide-react';

const OrchidModal = ({ orchid, show, onHide }) => {
  if (!orchid) return null;

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

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="orchid-detail-modal"
    >
      <Modal.Header closeButton className="modal-header-custom">
        <div className="modal-title-wrap">
          <Modal.Title as="h4" className="modal-orchid-title">
            {name}
          </Modal.Title>
          <span className="modal-category-badge">{category}</span>
        </div>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <div className="modal-grid">
          <div className="modal-media-col">
            <div className="modal-image-wrap">
              <img src={image} alt={name} className="modal-image" />
              <div className="modal-badges">
                {isSpecial && (
                  <span className="badge badge-special">
                    <Sparkles size={12} className="me-1" /> Special
                  </span>
                )}
                {isNatural && (
                  <span className="badge badge-natural">
                    <Leaf size={12} className="me-1" /> Natural
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="modal-info-col">
            <div className="modal-stats-row">
              <div className="modal-stat-pill">
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span>{rating} / 5</span>
              </div>
              <div className="modal-stat-pill likes">
                <Heart size={16} fill="#EF4444" color="#EF4444" />
                <span>{numberOfLike.toLocaleString()} likes</span>
              </div>
            </div>

            <div className="modal-details-list">
              <div className="modal-detail-item">
                <span className="detail-label">Origin:</span>
                <span className="detail-value">
                  <MapPin size={14} className="me-1" /> {origin}
                </span>
              </div>
              <div className="modal-detail-item">
                <span className="detail-label">Color:</span>
                <span className="detail-value">
                  <span
                    className="color-dot me-2"
                    style={{
                      backgroundColor: color.toLowerCase() === 'white' ? '#e2e8f0' : color.toLowerCase()
                    }}
                  />
                  {color}
                </span>
              </div>
              <div className="modal-detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{category}</span>
              </div>
              <div className="modal-detail-item">
                <span className="detail-label">Classification:</span>
                <span className="detail-value">
                  {isNatural ? 'Wild Natural Species' : 'Cultivated Hybrid'}
                </span>
              </div>
            </div>

            {clip && (
              <div className="modal-video-section">
                <h6 className="video-section-title">
                  <Film size={15} className="me-1" /> Video Showcase
                </h6>
                <div className="modal-video-wrap">
                  <iframe
                    src={clip}
                    title={`${name} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="modal-footer-custom">
        <button type="button" className="btn-modal-close" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrchidModal;
