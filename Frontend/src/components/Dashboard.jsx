import { useState, useEffect, useCallback } from 'react';
import { vehicleAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Navbar } from './Navbar';
import { SearchFilters } from './SearchFilters';
import { VehicleCard } from './VehicleCard';
import { VehicleModal } from './VehicleModal';

export function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const { isAdmin } = useAuth();
  const { addToast } = useToast();

  const loadVehicles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await vehicleAPI.list();
      setVehicles(data);
      setIsSearching(false);
    } catch (err) {
      setError(err.message || 'Failed to load vehicles');
      addToast('Failed to load vehicles', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const handleSearch = async (filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await vehicleAPI.search(filters);
      setVehicles(data);
      setIsSearching(true);
      addToast(`Found ${data.length} vehicle(s)`, 'info');
    } catch (err) {
      setError(err.message || 'Search failed');
      addToast('Search failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    loadVehicles();
  };

  const handlePurchase = async (vehicleId) => {
    try {
      await vehicleAPI.purchase(vehicleId, 1);
      addToast('Vehicle purchased successfully!', 'success');
      loadVehicles();
    } catch (err) {
      addToast(err.message || 'Purchase failed', 'error');
    }
  };

  const handleRestock = async (vehicleId, quantity) => {
    try {
      await vehicleAPI.restock(vehicleId, quantity);
      addToast(`Restocked ${quantity} unit(s) successfully!`, 'success');
      loadVehicles();
    } catch (err) {
      addToast(err.message || 'Restock failed', 'error');
    }
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleDelete = async (vehicleId) => {
    try {
      await vehicleAPI.delete(vehicleId);
      addToast('Vehicle deleted successfully', 'success');
      loadVehicles();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    }
  };

  const handleAddNew = () => {
    setSelectedVehicle(null);
    setIsModalOpen(true);
  };

  const handleSaveVehicle = async (vehicleData) => {
    try {
      if (selectedVehicle?.id) {
        await vehicleAPI.update(selectedVehicle.id, vehicleData);
        addToast('Vehicle updated successfully', 'success');
      } else {
        await vehicleAPI.create(vehicleData);
        addToast('Vehicle added successfully', 'success');
      }
      loadVehicles();
    } catch (err) {
      throw new Error(err.message || 'Failed to save vehicle');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Vehicle Inventory</h1>
            {isAdmin && (
              <button className="btn btn-primary" onClick={handleAddNew}>
                + Add Vehicle
              </button>
            )}
          </div>

          <SearchFilters onSearch={handleSearch} onReset={handleReset} />

          {error && (
            <div className="alert alert-error" role="alert">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading vehicles...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
              </svg>
              <h2>No vehicles found</h2>
              <p>
                {isSearching
                  ? 'Try adjusting your search filters'
                  : isAdmin
                  ? 'Add your first vehicle to get started'
                  : 'Check back later for available vehicles'}
              </p>
            </div>
          ) : (
            <div className="vehicles-grid">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onPurchase={handlePurchase}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onRestock={handleRestock}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={handleCloseModal}
          onSave={handleSaveVehicle}
        />
      )}
    </div>
  );
}
