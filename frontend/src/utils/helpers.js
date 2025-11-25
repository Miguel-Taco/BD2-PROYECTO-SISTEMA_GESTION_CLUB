// --- Funciones de Ayuda (Helpers) ---

// Formatea fecha de YYYY-MM-DD a DD/MM/YYYY
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const dateOnly = dateString.split('T')[0]; // Maneja formato ISO
  const [year, month, day] = dateOnly.split('-');
  return `${day}/${month}/${year}`;
};

// Calcula la edad
export const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return 'N/A';
  const hoy = new Date();
  const fechaOnly = fechaNacimiento.split('T')[0]; // Maneja formato ISO
  const cumple = new Date(fechaOnly);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
    edad--;
  }
  return edad;
};