import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { UserProvider } from './Components/Auth/userProvider.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
