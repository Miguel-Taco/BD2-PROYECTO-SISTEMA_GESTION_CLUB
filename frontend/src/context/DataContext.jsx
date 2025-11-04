import React, { createContext, useState, useContext } from 'react';
import { mockFutbolistasIniciales, mockTecnicosIniciales } from '../data/mockData';

// 1. Crear el Contexto
const DataContext = createContext(null);

// 2. Crear el Proveedor (Componente que contendrá el estado)
export function DataProvider({ children }) {
  const [futbolistas, setFutbolistas] = useState(mockFutbolistasIniciales);
  const [tecnicos, setTecnicos] = useState(mockTecnicosIniciales);

  const value = {
    futbolistas,
    setFutbolistas,
    tecnicos,
    setTecnicos
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// 3. Crear un Hook personalizado para consumir el contexto fácilmente
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};