// --- Datos Mock (Simulación de tu Base de Datos Oracle) ---

export const mockPaises = [
  { id_pais: 1, nombre_pais: 'Perú' },
  { id_pais: 2, nombre_pais: 'Italia' },
  { id_pais: 3, nombre_pais: 'Uruguay' },
  { id_pais: 4, nombre_pais: 'Argentina' },
];

export const mockPosiciones = [
  { id_posicion: 1, nombre_posicion: 'Delantero' },
  { id_posicion: 2, nombre_posicion: 'Mediocampista' },
  { id_posicion: 3, nombre_posicion: 'Defensa' },
  { id_posicion: 4, nombre_posicion: 'Arquero' },
];

export const mockClubes = [
  { id_club: 1, nombre_club: 'Universitario' },
  { id_club: 2, nombre_club: 'Alianza Lima' },
  { id_club: 3, nombre_club: 'Sporting Cristal' },
  { id_club: 4, nombre_club: 'AC Milan' },
];

export const mockFutbolistasIniciales = [
  {
    id_futbolista: 1,
    id_pais: 1,
    id_posicion: 1,
    id_club: 1,
    nombre: 'Edison',
    apellido: 'Flores',
    fecha_nacimiento: '1994-05-14',
    valor_mercado: 1800000,
  },
  {
    id_futbolista: 2,
    id_pais: 3,
    id_posicion: 2,
    id_club: 2,
    nombre: 'Sebastián',
    apellido: 'Rodríguez',
    fecha_nacimiento: '1992-08-16',
    valor_mercado: 900000,
  },
];

export const mockTecnicosIniciales = [
  {
    id_tecnico: 1,
    id_pais: 4,
    nombre: 'Fabián',
    apellido: 'Bustos',
    fecha_nacimiento: '1969-03-28',
    rol: 'Director Técnico',
    id_club: 1,
  },
  {
    id_tecnico: 2,
    id_pais: 1,
    id_club: 2,
    nombre: 'Guillermo',
    apellido: 'Salas',
    fecha_nacimiento: '1974-04-21',
    rol: 'Asistente Técnico',
  },
];