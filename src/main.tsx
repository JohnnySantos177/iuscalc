import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import App from './App';
import './index.css';
import { initAnalytics } from '@/lib/analytics';

initAnalytics();
// import { CompartilharDialog } from "@/components/calculadora/CompartilharDialog";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <CompartilharDialog
          open={open}
          onClose={() => setOpen(false)}
          onSelect={handleSelect}
        /> */}
        {/* <button onClick={() => setOpen(true)}>Compartilhar</button> */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
