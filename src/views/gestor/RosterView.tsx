// src/views/gestor/RosterView.tsx
import React from 'react';

export default function RosterView({ students }) {
  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Lista de Atletas</h2>
      <ul className="space-y-2">
        {students.map((s) => (
          <li key={s.id} className="bg-[#14141c]/30 p-2 rounded">
            {s.name} - {s.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
