import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';

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

export default function Reportes() {
  const [reporteActivo, setReporteActivo] = useState(null);
  const [datosReporte, setDatosReporte] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleEjecutarReporte = (reporte) => {
    console.log('Ejecutando reporte:', reporte.nombre);
    setCargando(true);
    setReporteActivo(reporte);
    setDatosReporte([]);

    // Simulación de llamada a API
    setTimeout(() => {
      setDatosReporte(mockReporteData);
      setCargando(false);
    }, 1000);
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