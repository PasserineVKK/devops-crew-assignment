import { useState } from 'react';
import { useSelector } from 'react-redux';
import ListOfOrchidsData from '../../data/ListOfOrchids';
import Orchids from './Orchids';
import OrchidModal from './OrchidModal';

const OrchidsContainer = ({ filter = 'all' }) => {
  const storeOrchids = useSelector((state) => state.orchids.items);
  const orchids = storeOrchids && storeOrchids.length > 0 ? storeOrchids : ListOfOrchidsData;
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const filteredOrchids = orchids.filter((item) => {
    if (filter === 'natural') return Boolean(item.isNatural);
    if (filter === 'special') return Boolean(item.isSpecial);
    return true;
  });

  return (
    <main className="orchids-container-wrapper">
      <Orchids
        orchids={filteredOrchids}
        filter={filter}
        onSelectOrchid={setSelectedOrchid}
      />

      <OrchidModal
        orchid={selectedOrchid}
        show={Boolean(selectedOrchid)}
        onHide={() => setSelectedOrchid(null)}
      />
    </main>
  );
};

export default OrchidsContainer;
