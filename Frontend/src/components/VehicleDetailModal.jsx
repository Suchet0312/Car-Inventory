import { useAuth } from '../context/AuthContext';

export function VehicleDetailModal({ vehicle, onClose, onPurchase, onEdit, onRestock, onDelete }) {
  const { isAdmin } = useAuth();

  if (!vehicle) return null;

  const imagePath = `/vehicles/${vehicle.make.toLowerCase()}-${vehicle.model.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  const isOutOfStock = vehicle.quantity === 0;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="vehicle-detail-overlay" onClick={handleOverlayClick}>
      <div className="vehicle-detail-modal">
        <button 
          className="vehicle-detail-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="vehicle-detail-modal__content">
          {/* Large Image */}
          <div className="vehicle-detail-modal__image-section">
            <img 
              src={imagePath}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="vehicle-detail-modal__image"
              onError={(e) => {
                e.target.src = '/vehicles/placeholder.jpg';
              }}
            />
          </div>

          {/* Vehicle Information */}
          <div className="vehicle-detail-modal__info-section">
            <div className="vehicle-detail-modal__header">
              <h2 className="vehicle-detail-modal__title">
                {vehicle.make} <span className="accent">{vehicle.model}</span>
              </h2>
              <span className="vehicle-detail-modal__category">{vehicle.category}</span>
            </div>

            <div className="vehicle-detail-modal__price-section">
              <div className="vehicle-detail-modal__price">
                ₹{vehicle.price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <div className="vehicle-detail-modal__stock">
                <span className={`stock-badge ${isOutOfStock ? 'stock-badge--empty' : 'stock-badge--large'}`}>
                  {isOutOfStock ? 'Out of Stock' : `${vehicle.quantity} Available`}
                </span>
              </div>
            </div>

            {/* Vehicle Details Grid */}
            <div className="vehicle-detail-modal__specs">
              <div className="spec-item">
                <span className="spec-label">Make</span>
                <span className="spec-value">{vehicle.make}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Model</span>
                <span className="spec-value">{vehicle.model}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Category</span>
                <span className="spec-value">{vehicle.category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Price</span>
                <span className="spec-value">₹{vehicle.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Stock</span>
                <span className="spec-value">{vehicle.quantity} units</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">ID</span>
                <span className="spec-value">#{vehicle.id}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="vehicle-detail-modal__actions">
              {!isAdmin && (
                <button
                  className="btn btn-primary btn-full btn-large"
                  onClick={() => {
                    onPurchase(vehicle.id);
                    onClose();
                  }}
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? 'Out of Stock' : 'Purchase Now'}
                </button>
              )}
              
              {isAdmin && (
                <>
                  <button
                    className="btn btn-secondary btn-large"
                    onClick={() => {
                      onEdit(vehicle);
                      onClose();
                    }}
                  >
                    Edit Vehicle
                  </button>
                  <button
                    className="btn btn-success btn-large"
                    onClick={() => {
                      onRestock(vehicle.id);
                      onClose();
                    }}
                  >
                    Restock
                  </button>
                  <button
                    className="btn btn-danger btn-large"
                    onClick={() => {
                      onDelete(vehicle.id);
                      onClose();
                    }}
                  >
                    Delete Vehicle
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
