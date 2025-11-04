import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserCog, BarChart3, Building } from 'lucide-react';

// --- Componente: Item de Navegación con React Router ---
const NavItem = ({ to, label, icon }) => {
  const activeClass = 'bg-blue-600 text-white';
  const inactiveClass = 'text-gray-300 hover:bg-gray-700 hover:text-white';

  return (
    <NavLink
      to={to}
      end // 'end' es importante para que el Dashboard (ruta "/") no esté siempre activo
      className={({ isActive }) =>
        `flex items-center w-full px-4 py-3 text-sm font-medium 
         rounded-lg transition-all duration-200 
         ${isActive ? activeClass : inactiveClass}`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
};

// --- Componente: Barra Lateral (Navegación) ---
export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <div className="flex items-center mb-6 px-2">
        <Building size={32} className="text-blue-400 mr-3" />
        <span className="text-xl font-bold">ClubManager</span>
      </div>
      <div className="flex flex-col space-y-2">
        <NavItem
          to="/"
          label="Dashboard"
          icon={<LayoutDashboard size={20} />}
        />
        <NavItem
          to="/futbolistas"
          label="Futbolistas"
          icon={<Users size={20} />}
        />
        <NavItem
          to="/tecnicos"
          label="Cuerpo Técnico"
          icon={<UserCog size={20} />}
        />
        <NavItem
          to="/reportes"
          label="Reportes"
          icon={<BarChart3 size={20} />}
        />
      </div>
    </nav>
  );
};