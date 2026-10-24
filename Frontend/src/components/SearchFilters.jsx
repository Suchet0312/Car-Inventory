import { useState } from 'react';

export function SearchFilters({ onSearch, onReset }) {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    category: '',
    min_price: '',
    max_price: '',
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const emptyFilters = {
      make: '',
      model: '',
      category: '',
      min_price: '',
      max_price: '',
    };
    setFilters(emptyFilters);
    onReset();
  };

  return (
    <div className="search-filters">
      <form onSubmit={handleSubmit} className="filters-form">
        <div className="filters-grid">
          <div className="form-group">
            <label htmlFor="make" className="form-label">Make</label>
            <input
              id="make"
              type="text"
              className="form-input"
              placeholder="e.g. Toyota"
              value={filters.make}
              onChange={(e) => handleChange('make', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="model" className="form-label">Model</label>
            <input
              id="model"
              type="text"
              className="form-input"
              placeholder="e.g. Camry"
              value={filters.model}
              onChange={(e) => handleChange('model', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              id="category"
              type="text"
              className="form-input"
              placeholder="e.g. Sedan"
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="min_price" className="form-label">Min Price</label>
            <input
              id="min_price"
              type="number"
              className="form-input"
              placeholder="0"
              min="0"
              step="0.01"
              value={filters.min_price}
              onChange={(e) => handleChange('min_price', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="max_price" className="form-label">Max Price</label>
            <input
              id="max_price"
              type="number"
              className="form-input"
              placeholder="100000"
              min="0"
              step="0.01"
              value={filters.max_price}
              onChange={(e) => handleChange('max_price', e.target.value)}
            />
          </div>
        </div>

        <div className="filters-actions">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
