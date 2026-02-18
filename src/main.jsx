import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Tu archivo de 500 líneas
import './index.css' // <--- ¡ESTA LÍNEA ES VITAL!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)