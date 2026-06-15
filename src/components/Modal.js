export const Modal = ({ personaje, onClose }) => {
  if (!personaje) {
    return null;
  }

  const getSpeciesColor = (species) => {
    switch (species.toLowerCase()) {
      case 'human':
        return '#F5531D';
      case 'alien':
        return '#ff9800';
      case 'robot':
        return '#2196f3';
      case 'humanoid':
        return '#9c27b0';
      case 'animal':
        return '#E3F500';
      default:
        return '#e0e0e0';
    }
  };

  const getGenderColor = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'female':
        return '#ff69b4';
      case 'male':
        return '#1e90ff';
      case 'genderless':
        return '#9e9e9e';
      default:
        return '#777';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return '#2ecc71';
      case 'dead':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">&times;</button>
        <img className="modal-img" src={personaje.image} alt={personaje.name} />
        <h2>{personaje.name}</h2>
        <div className="info-container">
          <div className="info-row">
            <div className="info-item">
              <p>Estado</p>
              <strong style={{ backgroundColor: getStatusColor(personaje.status) }}>
                {personaje.status || 'Desconocido'}
              </strong>
            </div>
            <div className="info-item">
              <p>Género</p>
              <strong style={{ backgroundColor: getGenderColor(personaje.gender) }}>
                {personaje.gender || 'Desconocido'}
              </strong>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <p>Especie</p>
              <strong style={{ backgroundColor: getSpeciesColor(personaje.species) }}>
                {personaje.species || 'Desconocida'}
              </strong>
            </div>
            <div className="info-item">
              <p>Origen</p>
              <strong style={{ backgroundColor: '#6c757d' }}>
                {personaje.origin?.name || 'Desconocido'}
              </strong>
            </div>
          </div>
        </div>
        <p className="location-info"><strong>Última ubicación conocida:</strong> <span>{personaje.location?.name || 'Desconocida'}</span></p>
      </div>
    </div>
  );
};
