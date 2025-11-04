import React from 'react';

// --- Componente: Input con Icono ---
export const InputConIcono = ({ icon, ...props }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// --- Componente: Select con Icono ---
export const SelectConIcono = ({ icon, children, ...props }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {icon}
      </span>
      <select
        {...props}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      >
        {children}
      </select>
    </div>
  );
};

// --- Componente: Botón de Acción (Editar/Eliminar) ---
export const BotonAccion = ({ onClick, icon, colorClass }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-colors duration-200 ${colorClass}`}
    >
      {icon}
    </button>
  );
};

// --- Componente: Tarjeta de Estadística (Dashboard) ---
export const TarjetaEstadistica = ({ titulo, valor, icono, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>
        {icono}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{titulo}</p>
        <p className="text-2xl font-semibold text-gray-900">{valor}</p>
      </div>
    </div>
  );
};