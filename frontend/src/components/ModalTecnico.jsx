import React from 'react';
import Modal from './Modal';
import { InputConIcono, SelectConIcono } from './ui';
import { mockPaises } from '../data/mockData';

const mockRoles = [
  { id_rol: 1, nombre_rol: 'Director Técnico' },
  { id_rol: 2, nombre_rol: 'Entrenador Asistente' },
  { id_rol: 3, nombre_rol: 'Preparador Físico' },
  { id_rol: 4, nombre_rol: 'Analista' },
  { id_rol: 5, nombre_rol: 'Médico' },
  { id_rol: 6, nombre_rol: 'Fisioterapeuta' },
];
import { Flag, FileText, CalendarDays, UserCheck, DollarSign, Briefcase } from 'lucide-react';

export default function ModalTecnico(
  { isVisible, onClose, mode, formData, handleChange, handleSubmit }
) {
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
            name="nombres"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          <InputConIcono 
            icon={<UserCheck size={16} />}
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={formData.apellidos}
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
          {mockPaises.map(p => <option key={p.id_pais} value={p.id_pais}>{p.nombre_pais}</option>)}
        </SelectConIcono>
        <SelectConIcono
          icon={<Briefcase size={16} />}
          name="id_rol"
          value={formData.id_rol}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Rol</option>
          {mockRoles.map(r => <option key={r.id_rol} value={r.id_rol}>{r.nombre_rol}</option>)}
        </SelectConIcono>
        <InputConIcono 
          icon={<DollarSign size={16} />}
          type="number"
          name="salario_mensual"
          placeholder="Salario Mensual (PEN)"
          value={formData.salario_mensual}
          onChange={handleChange}
          required
        />
        <InputConIcono 
          icon={<CalendarDays size={16} />}
          type="date"
          name="fecha_vencimiento_contrato"
          placeholder="Fecha de Vencimiento del Contrato"
          value={formData.fecha_vencimiento_contrato}
          onChange={handleChange}
          required
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