import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext(null);

const API_URL = '/api';

export function DataProvider({ children }) {
  const [futbolistas, setFutbolistas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [catalogos, setCatalogos] = useState({ paises: [], posiciones: [], clubes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [futbolistasRes, tecnicosRes, catalogosRes] = await Promise.all([
        fetch(`${API_URL}/futbolistas`),
        fetch(`${API_URL}/tecnicos`),
        fetch(`${API_URL}/catalogos`)
      ]);

      if (!futbolistasRes.ok || !tecnicosRes.ok || !catalogosRes.ok) {
        throw new Error('Error al cargar datos');
      }

      const futbolistasData = await futbolistasRes.json();
      const tecnicosData = await tecnicosRes.json();
      const catalogosData = await catalogosRes.json();

      setFutbolistas(futbolistasData);
      setTecnicos(tecnicosData);
      setCatalogos(catalogosData);
      setError(null);
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Funciones para futbolistas
  const addFutbolista = async (futbolistaData) => {
    try {
      const response = await fetch(`${API_URL}/futbolistas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(futbolistaData)
      });
      if (!response.ok) throw new Error('Error al crear futbolista');
      await loadInitialData(); // Recargar datos
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  const updateFutbolista = async (id, futbolistaData) => {
    try {
      const response = await fetch(`${API_URL}/futbolistas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(futbolistaData)
      });
      if (!response.ok) throw new Error('Error al actualizar futbolista');
      await loadInitialData(); // Recargar datos
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  const deleteFutbolista = async (id) => {
    try {
      const response = await fetch(`${API_URL}/futbolistas/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar futbolista');
      await loadInitialData(); // Recargar datos
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  // Funciones para técnicos
  const addTecnico = async (tecnicoData) => {
    try {
      const response = await fetch(`${API_URL}/tecnicos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tecnicoData)
      });
      if (!response.ok) throw new Error('Error al crear técnico');
      await loadInitialData(); // Recargar datos
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  const updateTecnico = async (id, tecnicoData) => {
    try {
      const response = await fetch(`${API_URL}/tecnicos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tecnicoData)
      });
      if (!response.ok) throw new Error('Error al actualizar técnico');
      await loadInitialData(); // Recargar datos
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  const deleteTecnico = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tecnicos/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar técnico');
      await loadInitialData(); // Recargar datos
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  const value = {
    futbolistas,
    tecnicos,
    catalogos,
    loading,
    error,
    addFutbolista,
    updateFutbolista,
    deleteFutbolista,
    addTecnico,
    updateTecnico,
    deleteTecnico,
    refreshData: loadInitialData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};