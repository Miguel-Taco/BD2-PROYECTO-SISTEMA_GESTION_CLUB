import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { BotonAccion } from '../components/ui';
import { calcularEdad } from '../utils/helpers';
import { useData } from '../context/DataContext';

// ¡Importamos los nuevos modales!
import ModalTecnico from '../components/ModalTecnico';
import ModalConfirmar from '../components/ModalConfirmar';

const FORM_DATA_INICIAL = {
  nombre: '',
  apellido: '',
  fecha_nacimiento: '',
  id_rol: '',
  id_pais: '',
  salario_mensual: '',
  fecha_vencimiento_contrato: ''
};

export default function GestionTecnicos() {
  const { tecnicos, addTecnico, updateTecnico, deleteTecnico, loading } = useData();

  // Estado para el modal de Add/Edit
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('ADD');
  const [currentTecnico, setCurrentTecnico] = useState(null);
  const [formData, setFormData] = useState(FORM_DATA_INICIAL);

  // Estado para el modal de Confirmar
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [idParaEliminar, setIdParaEliminar] = useState(null);

  const abrirModalForm = (mode, tecnico = null) => {
    setModalMode(mode);
    if (mode === 'EDIT' && tecnico) {
      setCurrentTecnico(tecnico);
      // Mapear los datos de Oracle (mayúsculas) a formData (minúsculas)
      setFormData({
        nombre: tecnico.NOMBRES,
        apellido: tecnico.APELLIDOS,
        fecha_nacimiento: tecnico.FECHA_NACIMIENTO?.split('T')[0] || tecnico.FECHA_NACIMIENTO,
        id_rol: tecnico.ID_ROL,
        id_pais: tecnico.ID_PAIS,
        salario_mensual: tecnico.SALARIO_MENSUAL || '',
        fecha_vencimiento_contrato: tecnico.FECHA_VENCIMIENTO_CONTRATO?.split('T')[0] || ''
      });
    } else {
      setCurrentTecnico(null);
      setFormData(FORM_DATA_INICIAL);
    }
    setIsFormModalOpen(true);
  };

  const cerrarModalForm = () => {
    setIsFormModalOpen(false);
    setCurrentTecnico(null);
    setFormData(FORM_DATA_INICIAL);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tecnicoData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        fecha_nacimiento: formData.fecha_nacimiento,
        id_rol: parseInt(formData.id_rol),
        id_pais: parseInt(formData.id_pais),
        salario_mensual: parseFloat(formData.salario_mensual),
        fecha_vencimiento_contrato: formData.fecha_vencimiento_contrato || null
      };

      if (modalMode === 'ADD') {
        await addTecnico(tecnicoData);
      } else if (modalMode === 'EDIT') {
        await updateTecnico(currentTecnico.ID_TECNICO, tecnicoData);
      }
      cerrarModalForm();
    } catch (error) {
      console.error('Error al guardar técnico:', error);
      alert('Error al guardar el técnico');
    }
  };

  const abrirModalConfirmar = (id_tecnico) => {
    setIdParaEliminar(id_tecnico);
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
      await deleteTecnico(idParaEliminar);
      cerrarModalConfirmar();
    } catch (error) {
      console.error('Error al eliminar técnico:', error);
      alert('Error al eliminar el técnico');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Cuerpo Técnico</h1>
        <button
          onClick={() => abrirModalForm('ADD')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Agregar Miembro
        </button>
      </div>

      {/* Tabla de Técnicos (sin cambios) */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tecnicos.map(t => (
              <tr key={t.ID_TECNICO}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.NOMBRES} {t.APELLIDOS}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.NOMBRE_PAIS || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.ROL || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calcularEdad(t.FECHA_NACIMIENTO)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <BotonAccion 
                    onClick={() => abrirModalForm('EDIT', t)}
                    icon={<Edit size={16} />}
                    colorClass="hover:bg-yellow-100 text-yellow-600"
                  />
                  <BotonAccion 
                    onClick={() => abrirModalConfirmar(t.ID_TECNICO)}
                    icon={<Trash2 size={16} />}
                    colorClass="hover:bg-red-100 text-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Renderizamos los modales */}
      <ModalTecnico
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
        message="¿Estás seguro de que deseas eliminar a este miembro del cuerpo técnico?"
      />
    </div>
  );
};