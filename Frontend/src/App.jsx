import { useAuth } from './context/AuthContext';
import { HeroLanding } from './components/HeroLanding';
import { Dashboard } from './components/Dashboard';
import './App.css';

function App() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return <HeroLanding />;
}

export default App;
