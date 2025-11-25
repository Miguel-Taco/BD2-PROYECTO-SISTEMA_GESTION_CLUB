import React from 'react';
import Modal from './Modal';
import { InputConIcono, SelectConIcono } from './ui';
import { useData } from '../context/DataContext';
import { Flag, CalendarDays, UserCheck, Briefcase, DollarSign } from 'lucide-react';

export default function ModalTecnico(
  { isVisible, onClose, mode, formData, handleChange, handleSubmit }
) {
  const { catalogos } = useData();

  if (!isVisible) return null;
  
  return (
    <Modal 
      isVisible={isVisible} 
      onClose={onClose} 
      title={mode === 'ADD' ? 'Agregar Miembro' : 'Editar Miembro'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputConIcono 
            icon={<UserCheck size={16} />}
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <InputConIcono 
            icon={<UserCheck size={16} />}
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <InputConIcono 
          icon={<CalendarDays size={16} />}
          type="date"
          name="fecha_nacimiento"
          placeholder="Fecha de Nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />
        <SelectConIcono
          icon={<Flag size={16} />}
          name="id_pais"
          value={formData.id_pais}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar País</option>
          {catalogos.paises.map(p => (
            <option key={p.ID_PAIS} value={p.ID_PAIS}>
              {p.NOMBRE_PAIS}
            </option>
          ))}
        </SelectConIcono>
        <SelectConIcono
          icon={<Briefcase size={16} />}
          name="id_rol"
          value={formData.id_rol}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Rol</option>
          {catalogos.roles && catalogos.roles.map(r => (
            <option key={r.ID_ROL} value={r.ID_ROL}>
              {r.NOMBRE_ROL}
            </option>
          ))}
        </SelectConIcono>
        <InputConIcono 
          icon={<DollarSign size={16} />}
          type="number"
          name="salario_mensual"
          placeholder="Salario Mensual"
          value={formData.salario_mensual}
          onChange={handleChange}
          required
          step="0.01"
        />
        <InputConIcono 
          icon={<CalendarDays size={16} />}
          type="date"
          name="fecha_vencimiento_contrato"
          placeholder="Fecha Vencimiento Contrato (opcional)"
          value={formData.fecha_vencimiento_contrato}
          onChange={handleChange}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {mode === 'ADD' ? 'Guardar' : 'Actualizar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}