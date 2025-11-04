import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { BotonAccion } from '../components/ui';
import { getClubNombre, getPaisNombre, calcularEdad } from '../utils/helpers';
import { useData } from '../context/DataContext';

// ¡Importamos los nuevos modales!
import ModalTecnico from '../components/ModalTecnico';
import ModalConfirmar from '../components/ModalConfirmar';

const FORM_DATA_INICIAL = {
  nombre: '',
  apellido: '',
  fecha_nacimiento: '',
  rol: '',
  id_pais: '',
  id_club: '',
};

export default function GestionTecnicos() {
  const { tecnicos, setTecnicos } = useData();

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
      setFormData({ ...tecnico });
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'ADD') {
      const nuevoTecnico = {
        id_tecnico: Date.now(),
        ...formData,
      };
      setTecnicos([...tecnicos, nuevoTecnico]);
    } else if (modalMode === 'EDIT') {
      setTecnicos(tecnicos.map(t => 
        t.id_tecnico === currentTecnico.id_tecnico 
        ? { ...t, ...formData } 
        : t
      ));
    }
    cerrarModalForm();
  };

  // Lógica de eliminación actualizada
  const abrirModalConfirmar = (id_tecnico) => {
    setIdParaEliminar(id_tecnico);
    setIsConfirmModalOpen(true);
  };

  const cerrarModalConfirmar = () => {
    setIdParaEliminar(null);
    setIsConfirmModalOpen(false);
  };

  const handleEliminarConfirmado = () => {
    setTecnicos(tecnicos.filter(t => t.id_tecnico !== idParaEliminar));
    cerrarModalConfirmar();
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
              <tr key={t.id_tecnico}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.nombre} {t.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getPaisNombre(t.id_pais)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getClubNombre(t.id_club)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.rol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calcularEdad(t.fecha_nacimiento)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <BotonAccion 
                    onClick={() => abrirModalForm('EDIT', t)}
                    icon={<Edit size={16} />}
                    colorClass="hover:bg-yellow-100 text-yellow-600"
                  />
                  <BotonAccion 
                    onClick={() => abrirModalConfirmar(t.id_tecnico)}
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