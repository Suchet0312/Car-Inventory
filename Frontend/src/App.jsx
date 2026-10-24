import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import './App.css';

function App() {
  const [view, setView] = useState('login');
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <>
      {view === 'login' && (
        <LoginPage onNavigateToRegister={() => setView('register')} />
      )}
      {view === 'register' && (
        <RegisterPage onNavigateToLogin={() => setView('login')} />
      )}
    </>
  );
}

export default App;
