// --- Funciones de Ayuda (Helpers) ---
import { mockPaises, mockPosiciones, mockClubes } from '../data/mockData';

// Formatea fecha de YYYY-MM-DD a DD/MM/YYYY
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

// Calcula la edad
export const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return 'N/A';
  const hoy = new Date();
  const cumple = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
    edad--;
  }
  return edad;
};

// --- Funciones para obtener nombres desde IDs (Simulación de JOINs) ---
export const getPaisNombre = (id_pais) => {
  const pais = mockPaises.find(p => p.id_pais === id_pais);
  return pais ? pais.nombre_pais : 'N/A';
};

export const getPosicionNombre = (id_posicion) => {
  const pos = mockPosiciones.find(p => p.id_posicion === id_posicion);
  return pos ? pos.nombre_posicion : 'N/A';
};

export const getClubNombre = (id_club) => {
  const club = mockClubes.find(c => c.id_club === id_club);
  return club ? club.nombre_club : 'N/A';
};