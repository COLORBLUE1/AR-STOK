import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './assets/routes/App'
import { CarritoProvider } from './assets/provider/CarritoProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </StrictMode>,
)
