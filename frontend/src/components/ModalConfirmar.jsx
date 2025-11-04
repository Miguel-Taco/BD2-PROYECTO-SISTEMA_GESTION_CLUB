import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal'; // Reutilizamos el modal base

export default function ModalConfirmar({ isVisible, onClose, onConfirm, title, message }) {
  if (!isVisible) return null;

  return (
    <Modal isVisible={isVisible} onClose={onClose} title={title}>
      <div className="flex items-center mb-4">
        <AlertTriangle size={40} className="text-red-500 mr-3" />
        <p>{message}</p>
      </div>
      <div className="flex justify-end space-x-3">
        <button 
          type="button" 
          onClick={onClose} 
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button 
          type="button" 
          onClick={onConfirm} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Confirmar Eliminación
        </button>
      </div>
    </Modal>
  );
}