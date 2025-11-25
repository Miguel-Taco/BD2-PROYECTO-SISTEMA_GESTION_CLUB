import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { BotonAccion } from '../components/ui';
import { calcularEdad } from '../utils/helpers';
import { useData } from '../context/DataContext';

// ¡Importamos los nuevos modales!
import ModalFutbolista from '../components/ModalFutbolista';
import ModalConfirmar from '../components/ModalConfirmar';

const FORM_DATA_INICIAL = {
  nombres: '',
  apellidos: '',
  fecha_nacimiento: '',
  id_pais: '',
  id_posicion: '',
  es_extranjero: '',
  es_canterano: '',
  club_formacion: '',
  situacion_actual: '',
  detalle_baja: '',
  fecha_retorno_estimada: '',
  valor_mercado: '',
  costo_fichaje: '',
  estado_medico: ''
};

export default function GestionFutbolistas() {
  const { futbolistas, addFutbolista, updateFutbolista, deleteFutbolista, loading } = useData();

  // Estado para el modal de Add/Edit
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('ADD');
  const [currentFutbolista, setCurrentFutbolista] = useState(null);
  const [formData, setFormData] = useState(FORM_DATA_INICIAL);

  // Estado para el modal de Confirmar
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [idParaEliminar, setIdParaEliminar] = useState(null);

  const abrirModalForm = (mode, futbolista = null) => {
    setModalMode(mode);
    if (mode === 'EDIT' && futbolista) {
      setCurrentFutbolista(futbolista);
      // Mapear los datos de Oracle (mayúsculas) a formData (minúsculas)
      setFormData({
        nombres: futbolista.NOMBRES,
        apellidos: futbolista.APELLIDOS,
        fecha_nacimiento: futbolista.FECHA_NACIMIENTO?.split('T')[0] || futbolista.FECHA_NACIMIENTO,
        id_pais: futbolista.ID_PAIS,
        id_posicion: futbolista.ID_POSICION,
        es_extranjero: futbolista.ES_EXTRANJERO || '',
        es_canterano: futbolista.ES_CANTERANO || '',
        club_formacion: futbolista.CLUB_FORMACION || '',
        situacion_actual: futbolista.SITUACION_ACTUAL || '',
        detalle_baja: futbolista.DETALLE_BAJA || '',
        fecha_retorno_estimada: futbolista.FECHA_RETORNO_ESTIMADA?.split('T')[0] || '',
        valor_mercado: futbolista.VALOR_MERCADO,
        costo_fichaje: futbolista.COSTO_FICHAJE || '',
        estado_medico: futbolista.ESTADO_MEDICO || ''
      });
    } else {
      setCurrentFutbolista(null);
      setFormData(FORM_DATA_INICIAL);
    }
    setIsFormModalOpen(true);
  };
  
  const cerrarModalForm = () => {
    setIsFormModalOpen(false);
    setCurrentFutbolista(null);
    setFormData(FORM_DATA_INICIAL);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const futbolistaData = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        fecha_nacimiento: formData.fecha_nacimiento,
        id_pais: parseInt(formData.id_pais),
        id_posicion: parseInt(formData.id_posicion),
        es_extranjero: formData.es_extranjero,
        es_canterano: formData.es_canterano,
        club_formacion: formData.club_formacion,
        situacion_actual: formData.situacion_actual,
        detalle_baja: formData.detalle_baja || null,
        fecha_retorno_estimada: formData.fecha_retorno_estimada || null,
        valor_mercado: parseFloat(formData.valor_mercado),
        costo_fichaje: parseFloat(formData.costo_fichaje),
        estado_medico: formData.estado_medico
      };

      if (modalMode === 'ADD') {
        await addFutbolista(futbolistaData);
      } else if (modalMode === 'EDIT') {
        await updateFutbolista(currentFutbolista.ID_FUTBOLISTA, futbolistaData);
      }
      cerrarModalForm();
    } catch (error) {
      console.error('Error al guardar futbolista:', error);
      alert('Error al guardar el futbolista');
    }
  };
  
  const abrirModalConfirmar = (id_futbolista) => {
    setIdParaEliminar(id_futbolista);
    setIsConfirmModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  const cerrarModalConfirmar = () => {
    setIdParaEliminar(null);
    setIsConfirmModalOpen(false);
  };

  const handleEliminarConfirmado = async () => {
    try {
      await deleteFutbolista(idParaEliminar);
      cerrarModalConfirmar();
    } catch (error) {
      console.error('Error al eliminar futbolista:', error);
      alert('Error al eliminar el futbolista');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Futbolistas</h1>
        <button
          onClick={() => abrirModalForm('ADD')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Agregar Futbolista
        </button>
      </div>

      {/* Tabla de Futbolistas (sin cambios) */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posición</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor (EUR)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {futbolistas.map(f => (
              <tr key={f.ID_FUTBOLISTA}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{f.NOMBRES} {f.APELLIDOS}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{f.NOMBRE_PAIS || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{f.NOMBRE_POSICION || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calcularEdad(f.FECHA_NACIMIENTO)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Number(f.VALOR_MERCADO).toLocaleString('es-ES')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <BotonAccion 
                    onClick={() => abrirModalForm('EDIT', f)}
                    icon={<Edit size={16} />}
                    colorClass="hover:bg-yellow-100 text-yellow-600"
                  />
                  <BotonAccion 
                    onClick={() => abrirModalConfirmar(f.ID_FUTBOLISTA)}
                    icon={<Trash2 size={16} />}
                    colorClass="hover:bg-red-100 text-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Ahora solo renderizamos los componentes del modal y pasamos props */}
      <ModalFutbolista 
        isVisible={isFormModalOpen}
        onClose={cerrarModalForm}
        mode={modalMode}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <ModalConfirmar
        isVisible={isConfirmModalOpen}
        onClose={cerrarModalConfirmar}
        onConfirm={handleEliminarConfirmado}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este futbolista? Esta acción no se puede deshacer."
      />
    </div>
  );
};