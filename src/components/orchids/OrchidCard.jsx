import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Sparkles, Leaf, MapPin, Star, Heart, Eye } from 'lucide-react';

const OrchidCard = ({ orchid, onSelect }) => {
  const {
    id,
    name,
    rating,
    isSpecial,
    isNatural,
    image,
    color,
    numberOfLike,
    origin,
    category
  } = orchid;

  const handleImageError = (e) => {
    e.currentTarget.src = "https://barritaorchids.com/cdn/shop/products/Cf592_1024x1024.jpg";
  };

  return (
    <Card className={`orchid-card ${isSpecial ? 'card-special' : ''}`}>
      <div className="card-media">
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          className="orchid-image"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="card-badges">
          {isSpecial && (
            <span className="badge badge-special" title="Special Orchid Edition">
              <Sparkles size={12} className="badge-icon" />
              Special
            </span>
          )}
          {isNatural && (
            <span className="badge badge-natural" title="Wild / Naturally Grown">
              <Leaf size={12} className="badge-icon" />
              Natural
            </span>
          )}
        </div>
        <span className="category-tag">{category}</span>
      </div>

      <Card.Body className="card-body">
        <div className="card-meta">
          <span className="origin-label">
            <MapPin size={14} className="meta-icon" /> {origin}
          </span>
          <span className="color-indicator" title={`Color: ${color}`}>
            <span
              className="color-dot"
              style={{
                backgroundColor: color.toLowerCase() === 'white' ? '#e2e8f0' : color.toLowerCase()
              }}
            />
            {color}
          </span>
        </div>

        <Card.Title as="h3" className="orchid-name" title={name}>
          {name}
        </Card.Title>

        <div className="card-rating-row">
          <div className="stars-container" aria-label={`Rating: ${rating} out of 5 stars`}>
            <span className="rating-number">{rating}</span>
            <Star size={16} className="star-icon filled" fill="#F59E0B" color="#F59E0B" />
          </div>

          <div className="likes-counter" title={`${numberOfLike} likes`}>
            <Heart size={14} className="heart-icon" fill="#EF4444" color="#EF4444" />
            <span className="likes-count">{numberOfLike.toLocaleString()}</span>
          </div>
        </div>

        <div className="card-actions">
          {onSelect && (
            <button
              type="button"
              className="btn-quick-preview"
              title="Quick modal preview"
              onClick={() => onSelect(orchid)}
            >
              <Eye size={16} />
            </button>
          )}
          <Link
            to={`/detail/${id}`}
            className="btn-detail"
            id={`btn-detail-${id}`}
          >
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrchidCard;
