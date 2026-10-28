import OrchidCard from './OrchidCard';

const Orchids = ({ orchids, filter = 'all', onSelectOrchid }) => {
  const getHeaderTitle = () => {
    if (filter === 'natural') return 'Natural Botanical Species';
    if (filter === 'special') return 'Special Orchid Editions';
    return 'Discover Exotic Orchids';
  };

  if (!orchids || orchids.length === 0) {
    return (
      <div className="orchids-empty">
        <div className="empty-icon">🌸</div>
        <h3>No Orchids Available</h3>
        <p>No orchid entries found for this category.</p>
      </div>
    );
  }

  return (
    <section className="orchids-section" id="orchids-collection">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2 className="section-title">{getHeaderTitle()}</h2>
          <div className="title-divider"></div>
        </div>
      </div>

      <div className="orchids-grid">
        {orchids.map((orchid) => (
          <OrchidCard
            key={orchid.id}
            orchid={orchid}
            onSelect={onSelectOrchid}
          />
        ))}
      </div>
    </section>
  );
};

export default Orchids;
