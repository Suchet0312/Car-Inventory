import { useState, useEffect } from 'react';

export function VehicleModal({ vehicle, onClose, onSave }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || '',
        model: vehicle.model || '',
        category: vehicle.category || '',
        price: vehicle.price?.toString() || '',
        quantity: vehicle.quantity?.toString() || '',
      });
    }
  }, [vehicle]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.make || !formData.model || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    const price = parseFloat(formData.price);
    const quantity = parseInt(formData.quantity, 10);

    if (isNaN(price) || price < 0) {
      setError('Price must be a valid positive number');
      return;
    }

    if (isNaN(quantity) || quantity < 0) {
      setError('Quantity must be a valid positive integer');
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        ...formData,
        price,
        quantity,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save vehicle');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {vehicle?.id ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="alert alert-error" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="make" className="form-label required">
              Make
            </label>
            <input
              id="make"
              type="text"
              className="form-input"
              placeholder="e.g. Toyota"
              value={formData.make}
              onChange={(e) => handleChange('make', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="model" className="form-label required">
              Model
            </label>
            <input
              id="model"
              type="text"
              className="form-input"
              placeholder="e.g. Camry"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label required">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="form-input"
              placeholder="e.g. Sedan"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label required">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              className="form-input"
              placeholder="25000.00"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity" className="form-label required">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              className="form-input"
              placeholder="10"
              min="0"
              step="1"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
