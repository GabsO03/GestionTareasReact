import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './componentes/Context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  //Aquí está el authprovider para poder usar el loggeado
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
