import React from 'react';
import Modal from './Modal';
import { InputConIcono, SelectConIcono } from './ui';
import { useData } from '../context/DataContext';
import { 
  DollarSign, Flag, ShieldCheck, Building, CalendarDays, UserCheck
} from 'lucide-react';

export default function ModalFutbolista(
  { isVisible, onClose, mode, formData, handleChange, handleSubmit }
) {
  const { catalogos } = useData();

  if (!isVisible) return null;

  return (
    <Modal 
      isVisible={isVisible} 
      onClose={onClose} 
      title={mode === 'ADD' ? 'Agregar Futbolista' : 'Editar Futbolista'}
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-2">
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
        
        <div className="grid grid-cols-2 gap-4">
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
            icon={<ShieldCheck size={16} />}
            name="id_posicion"
            value={formData.id_posicion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Posición</option>
            {catalogos.posiciones.map(p => (
              <option key={p.ID_POSICION} value={p.ID_POSICION}>
                {p.NOMBRE_POSICION}
              </option>
            ))}
          </SelectConIcono>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectConIcono
            icon={<Flag size={16} />}
            name="es_extranjero"
            value={formData.es_extranjero}
            onChange={handleChange}
            required
          >
            <option value="">¿Es Extranjero?</option>
            <option value="S">Sí</option>
            <option value="N">No</option>
          </SelectConIcono>
          <SelectConIcono
            icon={<UserCheck size={16} />}
            name="es_canterano"
            value={formData.es_canterano}
            onChange={handleChange}
            required
          >
            <option value="">¿Es Canterano?</option>
            <option value="S">Sí</option>
            <option value="N">No</option>
          </SelectConIcono>
        </div>

        <InputConIcono 
          icon={<Building size={16} />}
          type="text"
          name="club_formacion"
          placeholder="Club de Formación"
          value={formData.club_formacion}
          onChange={handleChange}
        />

        <SelectConIcono
          icon={<UserCheck size={16} />}
          name="situacion_actual"
          value={formData.situacion_actual}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Situación Actual</option>
          <option value="Activo">Activo</option>
          <option value="Cedido_Saliente">Cedido Saliente</option>
          <option value="Prestamo_Entrante">Préstamo Entrante</option>
          <option value="Baja">Baja</option>
        </SelectConIcono>

        <InputConIcono 
          icon={<UserCheck size={16} />}
          type="text"
          name="detalle_baja"
          placeholder="Detalle de Baja (opcional)"
          value={formData.detalle_baja}
          onChange={handleChange}
        />

        <InputConIcono 
          icon={<CalendarDays size={16} />}
          type="date"
          name="fecha_retorno_estimada"
          placeholder="Fecha de Retorno Estimada"
          value={formData.fecha_retorno_estimada}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputConIcono 
            icon={<DollarSign size={16} />}
            type="number"
            name="valor_mercado"
            placeholder="Valor de Mercado (EUR)"
            value={formData.valor_mercado}
            onChange={handleChange}
            required
            step="0.01"
          />
          <InputConIcono 
            icon={<DollarSign size={16} />}
            type="number"
            name="costo_fichaje"
            placeholder="Costo de Fichaje (EUR)"
            value={formData.costo_fichaje}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>

        <SelectConIcono
          icon={<UserCheck size={16} />}
          name="estado_medico"
          value={formData.estado_medico}
          onChange={handleChange}
          required
        >
          <option value="">Estado Médico</option>
          <option value="A">Activo</option>
          <option value="L">Lesionado</option>
          <option value="S">Suspendido</option>
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