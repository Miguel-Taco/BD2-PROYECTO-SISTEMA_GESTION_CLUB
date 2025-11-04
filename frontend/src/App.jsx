import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GestionFutbolistas from './pages/GestionFutbolistas';
import GestionTecnicos from './pages/GestionTecnicos';
import Reportes from './pages/Reportes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="futbolistas" element={<GestionFutbolistas />} />
          <Route path="tecnicos" element={<GestionTecnicos />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;