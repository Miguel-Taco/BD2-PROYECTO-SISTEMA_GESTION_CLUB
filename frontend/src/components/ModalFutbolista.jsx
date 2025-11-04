import React from 'react';
import Modal from './Modal';
import { InputConIcono, SelectConIcono } from './ui';
import { mockPaises, mockPosiciones, mockClubes } from '../data/mockData';
import { 
  DollarSign, Flag, ShieldCheck, Building, CalendarDays, UserCheck 
} from 'lucide-react';

export default function ModalFutbolista(
  { isVisible, onClose, mode, formData, handleChange, handleSubmit }
) {
  if (!isVisible) return null;

  return (
    <Modal 
      isVisible={isVisible} 
      onClose={onClose} 
      title={mode === 'ADD' ? 'Agregar Futbolista' : 'Editar Futbolista'}
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
        <InputConIcono 
          icon={<DollarSign size={16} />}
          type="number"
          name="valor_mercado"
          placeholder="Valor de Mercado (EUR)"
          value={formData.valor_mercado}
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
          icon={<ShieldCheck size={16} />}
          name="id_posicion"
          value={formData.id_posicion}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Posición</option>
          {mockPosiciones.map(p => <option key={p.id_posicion} value={p.id_posicion}>{p.nombre_posicion}</option>)}
        </SelectConIcono>
        <SelectConIcono
          icon={<Building size={16} />}
          name="id_club"
          value={formData.id_club}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Club</option>
          {mockClubes.map(c => <option key={c.id_club} value={c.id_club}>{c.nombre_club}</option>)}
        </SelectConIcono>

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