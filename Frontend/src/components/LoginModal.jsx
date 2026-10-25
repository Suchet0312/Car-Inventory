import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function LoginModal({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      addToast('Login successful!', 'success');
      onClose();
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
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
          <h2 className="auth-modal__title">Welcome Back</h2>
          <p className="auth-modal__subtitle">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-modal__form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input form-input--modal"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
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
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-modal__footer">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="link-button link-button--accent"
              onClick={onSwitchToRegister}
              disabled={isLoading}
            >
              Create one now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
