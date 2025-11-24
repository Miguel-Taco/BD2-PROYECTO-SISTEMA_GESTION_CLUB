import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';

const BASE_URL = 'http://localhost:3001';

// Lista de los 10 reportes
const listaReportes = [
  { id: 1, nombre: 'Reporte de Plantel Completo' },
  { id: 2, nombre: 'Reporte de Cuerpo Técnico Completo' },
  { id: 3, nombre: 'Reporte de Futbolistas por Posición' },
  { id: 4, nombre: 'Reporte de Próximas Vencimientos de Contrato' },
  { id: 5, nombre: 'Reporte de Promedio de Edad del Plantel' },
  { id: 6, nombre: 'Reporte de Riesgo de Fuga', ruta: '/api/reportes/6/riesgo-fuga' },
  { id: 7, nombre: 'Reporte de Proyección Planilla', ruta: '/api/reportes/7/proyeccion-planilla' },
  { id: 8, nombre: 'Reporte de Control de Extranjeros', ruta: '/api/reportes/8/control-extranjeros' },
  { id: 9, nombre: 'Reporte de Balance Cantera vs. Fichajes' },
  { id: 10, nombre: 'Reporte de ROI de Fichajes' },
];

// Mock de lo que devolvería un SYS_REFCURSOR
const mockReporteData = [
  { 'Jugador': 'Paolo Guerrero', 'Posición': 'Delantero', 'Salario Anual': 500000 },
  { 'Jugador': 'Gianluca Lapadula', 'Posición': 'Delantero', 'Salario Anual': 1200000 },
];

export default function Reportes() {
  const [reporteActivo, setReporteActivo] = useState(null);
  const [datosReporte, setDatosReporte] = useState([]);
  const [cargando, setCargando] = useState(false);

  // AÑADE ESTE NUEVO ESTADO:
  const [apiData, setApiData] = useState(null);

  const handleEjecutarReporte = async (reporte) => {
    if (!reporte.ruta) return; // Evitar llamadas si la ruta no existe

    setCargando(true);
    setReporteActivo(reporte);
    setDatosReporte([]);

    try {
      const response = await fetch(`${BASE_URL}${reporte.ruta}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // AÑADE ESTA LÍNEA CLAVE:
      setApiData(data); // Guarda el objeto completo (incluyendo el semáforo)

      // 💡 Lógica crucial: Extraer los datos del campo 'data' o 'detalle'
      let dataFinal = [];
      
      if (data.data) {
          // Aplica para Reportes 6, 8, 9, 10
          dataFinal = data.data;
      } else if (data.detalle) {
          // Aplica para Reporte 7 (Planilla), que devuelve un objeto con sub-arrays (jugadores, tecnicos)
          // Por simplicidad inicial, unimos los dos arrays para mostrarlos en una sola tabla:
          dataFinal = [
              ...data.detalle.jugadores,
              ...data.detalle.tecnicos
          ];
      }

      setDatosReporte(dataFinal);
      
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
      // Podrías establecer un estado de error aquí
      setDatosReporte([]); 
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reportes Estratégicos del Club</h1>
      
      <div className="flex gap-6">
        {/* Panel de selección de reportes */}
        <div className="w-80 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText size={20} className="mr-2 text-blue-600" />
            Seleccione un Reporte
          </h3>
          <ul className="space-y-2">
            {listaReportes.map(r => (
              <li key={r.id}>
                <button 
                  onClick={() => handleEjecutarReporte(r)}
                  disabled={cargando}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm
                    ${reporteActivo?.id === r.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }
                    ${cargando ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {r.nombre}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Área de visualización del reporte */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {!reporteActivo && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <FileText size={64} className="mb-4" />
              <p className="text-lg">Seleccione un reporte de la lista para visualizar los datos</p>
            </div>
          )}
          
          {cargando && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 size={48} className="animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Cargando datos del reporte...</p>
            </div>
          )}
          
          {datosReporte.length > 0 && !cargando && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{reporteActivo.nombre}</h2>
              {/* REPORTE 7: Muestra el total salarial si es el reporte activo */}
              {reporteActivo.id === 7 && apiData && (
                <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 text-xl font-bold">
                  GRAN TOTAL MENSUAL: S/. {apiData.gran_total_soles.toLocaleString('es-ES')}
                </div>
              )}
              {/* REPORTE 8: Muestra el estado del semáforo si es el reporte activo */}
              {reporteActivo.id === 8 && apiData && (
                <div className="mb-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-800">
                  <p className="font-bold">Estado del Cupo:</p>
                  {/* Accede a la propiedad del semáforo del objeto completo */}
                  <p>{apiData.estado_semaforo}</p> 
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(datosReporte[0]).map(key => (
                        <th 
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {datosReporte.map((fila, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.values(fila).map((valor, i) => (
                          <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {typeof valor === 'number' && valor > 1000 
                              ? valor.toLocaleString('es-ES') 
                              : valor
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}