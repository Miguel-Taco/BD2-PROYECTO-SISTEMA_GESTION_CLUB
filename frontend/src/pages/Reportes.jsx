import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';

const BASE_URL = 'http://localhost:3001';

// Función para aplicar estilos al riesgo (solo para Reporte 6)
const obtenerClaseRiesgo = (estado) => {
    if (!estado) return 'text-gray-600'; 
    if (estado.includes('PELIGRO INMINENTE')) {
        return 'text-red-700 font-bold bg-red-100 p-1 rounded-sm'; 
    } else if (estado.includes('RIESGO MEDIO')) {
        return 'text-yellow-700 font-bold bg-yellow-100 p-1 rounded-sm'; 
    } else if (estado.includes('BLINDADO')) {
        return 'text-green-700 font-bold bg-green-100 p-1 rounded-sm'; 
    }
    return 'text-gray-600';
};

// Lista de los 10 reportes (Asumo que la Masa Salarial (R1) usará la ruta compleja /1/masa-salarial)
const listaReportes = [
    { id: 1, nombre: 'Reporte de Masa Salarial Total', ruta: '/api/reportes/1/masa-salarial' }, // Ruta del R1
    { id: 2, nombre: 'Reporte de Valor de Mercado del Plantel' },
    { id: 3, nombre: 'Reporte de ROI de Fichajes' },
    { id: 4, nombre: 'Reporte de Distribución de Edad' },
    { id: 5, nombre: 'Reporte de Próximos Vencimientos de Contrato' },
    { id: 6, nombre: 'Reporte de Riesgo de Fuga', ruta: '/api/reportes/6/riesgo-fuga' },
    { id: 7, nombre: 'Reporte de Bajas y Disponibilidad', ruta: '/api/reportes/7/bajas-disponibilidad' },
    { id: 8, nombre: 'Reporte de Control de Extranjeros', ruta: '/api/reportes/8/control-extranjeros' },
    { id: 9, nombre: 'Reporte de Balance Cantera vs. Fichajes', ruta: '/api/reportes/9/balance-cantera' },
    { id: 10, nombre: 'Reporte: Gestión de Préstamos ', ruta: '/api/reportes/10/jugadores-cedidos' },
];


export default function Reportes() {
    const [reporteActivo, setReporteActivo] = useState(null);
    const [datosReporte, setDatosReporte] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [apiData, setApiData] = useState(null); // Contiene el objeto JSON completo

    const handleEjecutarReporte = async (reporte) => {
        if (!reporte.ruta) return;

        setCargando(true);
        setReporteActivo(reporte);
        setDatosReporte([]);
        setApiData(null);

        try {
            const response = await fetch(`${BASE_URL}${reporte.ruta}`);
            
            if (!response.ok) {
                throw new Error(`Error al conectar con la API, estado: ${response.status}`);
            }

            const data = await response.json();
            setApiData(data); // 1. Guardamos el objeto completo

            let dataFinal = [];
            
            // Lógica compleja para Masa Salarial (R1) - Devuelve data.detalle
            if (reporte.id === 1 && data.detalle) { 
                dataFinal = [
                    ...data.detalle.jugadores,
                    ...data.detalle.tecnicos
                ];
            // Lógica simple para R6, R7(nuevo), R8, R9, R10 - Devuelve data.data
            } else if (data.data) {
                dataFinal = data.data;
            }

            setDatosReporte(dataFinal);
            
        } catch (error) {
            console.error('Error al obtener el reporte:', error);
            setDatosReporte([]); 
            setApiData(null);
        } finally {
            setCargando(false);
        }
    };

    // Lógica para el Resumen del R6
    const resumenRiesgo = React.useMemo(() => {
        if (reporteActivo?.id !== 6 || !datosReporte.length) return null;
        const totalJugadores = datosReporte.length;
        const enPeligro = datosReporte.filter(r => r.estado_de_riesgo.includes('PELIGRO INMINENTE')).length;
        const blindados = datosReporte.filter(r => r.estado_de_riesgo.includes('BLINDADO')).length;
        return { totalJugadores, enPeligro, blindados };
    }, [datosReporte, reporteActivo]);


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Reportes Estratégicos del Club</h1>
            
            <div className="flex gap-6">
                {/* ... (Panel de selección) ... */}
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
                                    disabled={cargando || !r.ruta} // Deshabilita si no tiene ruta
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm
                                        ${reporteActivo?.id === r.id 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                        }
                                        ${cargando || !r.ruta ? 'opacity-50 cursor-not-allowed' : ''}
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
                    {/* ... (Estados cargando y no activo) ... */}
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
                            
                            {/* R1: MASA SALARIAL TOTAL (Antiguo R7) */}
                            {reporteActivo.id === 1 && apiData?.gran_total_soles && (
                                <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 text-xl font-bold">
                                    GRAN TOTAL MENSUAL: S/. {apiData.gran_total_soles.toLocaleString('es-ES')}
                                </div>
                            )}

                            {/* R7: BAJAS Y DISPONIBILIDAD */}
                            {reporteActivo.id === 7 && apiData?.total_bajas > 0 && (
                                <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-800">
                                    <p className="font-bold text-lg">⚠️ ALERTA DE BAJAS:</p>
                                    <p>Hay un total de {apiData.total_bajas} jugadores no disponibles (lesión/suspensión).</p> 
                                </div>
                            )}
                            
                            {/* R8: CONTROL DE EXTRANJEROS */}
                            {reporteActivo.id === 8 && apiData && (
                                <div className="mb-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-800">
                                    <p className="font-bold">Estado del Cupo:</p>
                                    <p>{apiData.estado_semaforo}</p> 
                                </div>
                            )}

                            {/* R6: RIESGO DE FUGA (Resumen Ejecutivo) */}
                            {reporteActivo.id === 6 && resumenRiesgo && (
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                                        <p className="text-sm font-medium text-gray-500">Jugadores Analizados</p>
                                        <p className="text-2xl font-bold text-gray-800">{resumenRiesgo.totalJugadores}</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg shadow">
                                        <p className="text-sm font-medium text-green-700">Jugadores Blindados</p>
                                        <p className="text-2xl font-bold text-green-600">{resumenRiesgo.blindados}</p>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-lg shadow">
                                        <p className="text-sm font-medium text-red-700">En Peligro Crítico</p>
                                        <p className="text-2xl font-bold text-red-600">{resumenRiesgo.enPeligro}</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* TABLA DE DETALLE (cuerpo principal) */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {Object.keys(datosReporte[0]).map(key => (
                                                <th 
                                                    key={key}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    {key.replace(/_/g, ' ')} {/* Formato de encabezados */}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {datosReporte.map((fila, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                {Object.values(fila).map((valor, i) => {
                                                    // Buscamos la clave para aplicar el estilo condicional (R6)
                                                    const keys = Object.keys(datosReporte[0]);
                                                    const esColumnaRiesgo = reporteActivo.id === 6 && keys[i] === 'estado_de_riesgo';

                                                    return (
                                                        <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {esColumnaRiesgo ? (
                                                                <span className={obtenerClaseRiesgo(valor)}>
                                                                    {valor}
                                                                </span>
                                                            ) : (
                                                                // Lógica de formato de números
                                                                typeof valor === 'number' && valor > 1000 
                                                                    ? valor.toLocaleString('es-ES') 
                                                                    : valor
                                                            )}
                                                        </td>
                                                    );
                                                })}
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