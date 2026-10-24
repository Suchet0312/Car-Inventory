import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function VehicleCard({ vehicle, onPurchase, onEdit, onDelete, onRestock }) {
  const { isAdmin } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      await onPurchase(vehicle.id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestock = async () => {
    const quantity = prompt('Enter quantity to restock:', '10');
    if (quantity && Number(quantity) > 0) {
      setIsProcessing(true);
      try {
        await onRestock(vehicle.id, Number(quantity));
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`)) {
      setIsProcessing(true);
      try {
        await onDelete(vehicle.id);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const isOutOfStock = vehicle.quantity === 0;

  return (
    <div className={`vehicle-card ${isOutOfStock ? 'vehicle-card--out-of-stock' : ''}`}>
      <div className="vehicle-card__header">
        <h3 className="vehicle-card__title">
          {vehicle.make} {vehicle.model}
        </h3>
        <span className="vehicle-card__category">{vehicle.category}</span>
      </div>

      <div className="vehicle-card__body">
        <div className="vehicle-card__price">
          ${vehicle.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        <div className="vehicle-card__stock">
          <span className={`stock-badge ${isOutOfStock ? 'stock-badge--empty' : ''}`}>
            {isOutOfStock ? 'Out of Stock' : `${vehicle.quantity} in stock`}
          </span>
        </div>
      </div>

      <div className="vehicle-card__actions">
        {!isAdmin && (
          <button
            className="btn btn-primary btn-full"
            onClick={handlePurchase}
            disabled={isOutOfStock || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Purchase'}
          </button>
        )}
        
        {isAdmin && (
          <>
            <button
              className="btn btn-secondary"
              onClick={() => onEdit(vehicle)}
              disabled={isProcessing}
            >
              Edit
            </button>
            <button
              className="btn btn-success"
              onClick={handleRestock}
              disabled={isProcessing}
            >
              Restock
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isProcessing}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
