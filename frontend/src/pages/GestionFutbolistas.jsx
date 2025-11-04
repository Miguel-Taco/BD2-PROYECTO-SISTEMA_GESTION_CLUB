import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { BotonAccion } from '../components/ui';
import { getPosicionNombre, getClubNombre, getPaisNombre, calcularEdad } from '../utils/helpers';
import { useData } from '../context/DataContext';

// ¡Importamos los nuevos modales!
import ModalFutbolista from '../components/ModalFutbolista';
import ModalConfirmar from '../components/ModalConfirmar';

const FORM_DATA_INICIAL = {
  nombre: '',
  apellido: '',
  fecha_nacimiento: '',
  valor_mercado: '',
  id_pais: '',
  id_posicion: '',
  id_club: '',
};

export default function GestionFutbolistas() {
  const { futbolistas, setFutbolistas } = useData();

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
      setFormData({ ...futbolista });
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'ADD') {
      const nuevoFutbolista = {
        id_futbolista: Date.now(),
        ...formData,
        valor_mercado: parseFloat(formData.valor_mercado),
      };
      setFutbolistas([...futbolistas, nuevoFutbolista]);
    } else if (modalMode === 'EDIT') {
      setFutbolistas(futbolistas.map(f => 
        f.id_futbolista === currentFutbolista.id_futbolista 
        ? { ...f, ...formData, valor_mercado: parseFloat(formData.valor_mercado) } 
        : f
      ));
    }
    cerrarModalForm();
  };
  
  // Lógica de eliminación actualizada
  const abrirModalConfirmar = (id_futbolista) => {
    setIdParaEliminar(id_futbolista);
    setIsConfirmModalOpen(true);
  };

  const cerrarModalConfirmar = () => {
    setIdParaEliminar(null);
    setIsConfirmModalOpen(false);
  };

  const handleEliminarConfirmado = () => {
    setFutbolistas(futbolistas.filter(f => f.id_futbolista !== idParaEliminar));
    cerrarModalConfirmar();
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
              <tr key={f.id_futbolista}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{f.nombre} {f.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getPaisNombre(f.id_pais)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getPosicionNombre(f.id_posicion)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getClubNombre(f.id_club)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calcularEdad(f.fecha_nacimiento)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{f.valor_mercado.toLocaleString('es-ES')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <BotonAccion 
                    onClick={() => abrirModalForm('EDIT', f)}
                    icon={<Edit size={16} />}
                    colorClass="hover:bg-yellow-100 text-yellow-600"
                  />
                  <BotonAccion 
                    onClick={() => abrirModalConfirmar(f.id_futbolista)} // <-- Llama al modal de confirmar
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