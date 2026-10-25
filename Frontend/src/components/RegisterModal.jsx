import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function RegisterModal({ onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }

    if (password.length < 6) {
      addToast('Password must be at least 6 characters', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);
      addToast('Registration successful! Please sign in.', 'success');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      onSwitchToLogin();
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button 
          className="auth-modal__close"
          onClick={onClose}
          aria-label="Close"
          disabled={isLoading}
        >
          ×
        </button>

        <div className="auth-modal__header">
          <h2 className="auth-modal__title">Join Us</h2>
          <p className="auth-modal__subtitle">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-modal__form">
          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              className="form-input form-input--modal"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password" className="form-label">
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              className="form-input form-input--modal"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="form-input form-input--modal"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-modal"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-modal__footer">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="link-button link-button--accent"
              onClick={onSwitchToLogin}
              disabled={isLoading}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
