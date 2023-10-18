import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';



// Crea un root utilizando createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza el componente en el root
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);