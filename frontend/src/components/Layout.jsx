import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet /> {/* Aquí se renderizarán tus páginas (Dashboard, Futbolistas, etc.) */}
      </main>
    </div>
  );
}