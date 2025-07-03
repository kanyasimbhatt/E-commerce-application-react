import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { UserProvider } from './Components/Auth/userProvider.tsx';
import App from './App.tsx';
import { FavoriteProvider } from './Components/Products/ProductInfo/FavoritesProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <Router>
    <UserProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </UserProvider>
  </Router>
);
