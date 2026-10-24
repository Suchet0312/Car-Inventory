import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <svg className="navbar-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            <rect x="3" y="6" width="18" height="12" strokeWidth={2} />
          </svg>
          <span className="navbar-title">Car Dealership</span>
        </div>
        
        <div className="navbar-actions">
          <span className="navbar-user">
            {user?.sub && (
              <>
                <span className="user-email">{user.sub}</span>
                {isAdmin && <span className="badge badge-admin">Admin</span>}
              </>
            )}
          </span>
          <button onClick={logout} className="btn btn-secondary">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
