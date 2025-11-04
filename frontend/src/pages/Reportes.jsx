import React, { useState } from 'react';

// Lista de los 10 reportes
const listaReportes = [
  { id: 1, nombre: 'Reporte de Plantel Completo' },
  { id: 2, nombre: 'Reporte de Cuerpo Técnico Completo' },
  { id: 3, nombre: 'Reporte de Futbolistas por Posición' },
  { id: 4, nombre: 'Reporte de Próximas Vencimientos de Contrato' },
  { id: 5, nombre: 'Reporte de Promedio de Edad del Plantel' },
  { id: 6, nombre: 'Reporte de Conteo de Jugadores por Posición' },
  { id: 7, nombre: 'Reporte de Masa Salarial Total' },
  { id: 8, nombre: 'Reporte de Valor de Plantilla' },
  { id: 9, nombre: 'Reporte de Balance Cantera vs. Fichajes' },
  { id: 10, nombre: 'Reporte de ROI de Fichajes' },
];

// Mock de lo que devolvería un SYS_REFCURSOR
const mockReporteData = [
  { 'Jugador': 'Paolo Guerrero', 'Posición': 'Delantero', 'Salario Anual': 500000 },
  { 'Jugador': 'Gianluca Lapadula', 'Posición': 'Delantero', 'Salario Anual': 1200000 },
];

function Reportes() {
  const [reporteActivo, setReporteActivo] = useState(null);
  const [datosReporte, setDatosReporte] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleEjecutarReporte = (reporte) => {
    console.log('Ejecutando reporte:', reporte.nombre);
    setCargando(true);
    setReporteActivo(reporte);
    setDatosReporte([]);

    // 1. Aquí llamarías a tu procedimiento almacenado de reporte
    // (Ej: GET /api/reportes/1)
    
    // 2. Simulación de la respuesta (el SYS_REFCURSOR)
    setTimeout(() => {
      setDatosReporte(mockReporteData);
      setCargando(false);
    }, 1000); // Simula una carga de 1 segundo
  };

  return (
    <div>
      <h2>Reportes Estratégicos del Club</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '300px', borderRight: '1px solid #ccc', paddingRight: '1rem' }}>
          <h4>Seleccione un Reporte:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {listaReportes.map(r => (
              <li key={r.id} style={{ marginBottom: '10px' }}>
                <button 
                  onClick={() => handleEjecutarReporte(r)}
                  disabled={cargando}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  {r.nombre}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1, paddingLeft: '1rem' }}>
          {/* Área de visualización del reporte */}
          {!reporteActivo && <p>Seleccione un reporte de la lista para ver los datos.</p>}
          
          {cargando && <p>Cargando datos del reporte...</p>}
          
          {datosReporte.length > 0 && (
            <div>
              <h3>Resultados: {reporteActivo.nombre}</h3>
              <table border="1" width="100%">
                <thead>
                  <tr>
                    {/* Lee las cabeceras del primer objeto de datos */}
                    {Object.keys(datosReporte[0]).map(key => <th key={key}>{key}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {datosReporte.map((fila, index) => (
                    <tr key={index}>
                      {Object.values(fila).map((valor, i) => <td key={i}>{valor}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reportes;