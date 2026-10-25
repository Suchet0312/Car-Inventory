import { useState } from 'react';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';

export function HeroLanding() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleOpenLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleCloseRegister = () => {
    setShowRegisterModal(false);
  };

  return (
    <>
      <div className={`hero-landing ${showLoginModal || showRegisterModal ? 'hero-landing--blurred' : ''}`}>
        {/* Video Background */}
        <div className="hero-landing__background">
          <video
            className="hero-landing__video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            {/* Fallback to image if video doesn't load */}
            <img 
              src="/hero-image.jpg" 
              alt="Luxury cars" 
              className="hero-landing__fallback-image"
            />
          </video>
          <div className="hero-landing__overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-landing__content">
          <div className="hero-landing__text">
            <h1 className="hero-landing__title">
              Premium Vehicle
              <span className="hero-landing__title-accent"> Inventory</span>
            </h1>
            <p className="hero-landing__subtitle">
              Discover excellence in automotive dealership management
            </p>
          </div>

          <div className="hero-landing__actions">
            <button 
              className="btn-hero btn-hero--primary"
              onClick={handleOpenLogin}
            >
              Sign In
            </button>
            <button 
              className="btn-hero btn-hero--secondary"
              onClick={handleSwitchToRegister}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={handleCloseLogin}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <RegisterModal
          onClose={handleCloseRegister}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </>
  );
}
