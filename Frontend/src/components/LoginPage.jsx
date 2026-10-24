import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function LoginPage({ onNavigateToRegister }) {
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
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="link-button"
                onClick={onNavigateToRegister}
                disabled={isLoading}
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
