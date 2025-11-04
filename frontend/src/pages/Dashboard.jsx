import React from 'react';
import { Users, UserCog } from 'lucide-react';
import { TarjetaEstadistica } from '../components/ui';
import { useData } from '../context/DataContext'; // <-- ¡IMPORTANTE!

// --- Página: Dashboard ---
export default function Dashboard() {
  // Obtenemos los datos del contexto global
  const { futbolistas, tecnicos } = useData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TarjetaEstadistica 
          titulo="Total Futbolistas"
          valor={futbolistas.length}
          icono={<Users size={24} />}
          color="bg-blue-500"
        />
        <TarjetaEstadistica 
          titulo="Total Cuerpo Técnico"
          valor={tecnicos.length}
          icono={<UserCog size={24} />}
          color="bg-green-500"
        />
      </div>
    </div>
  );
};