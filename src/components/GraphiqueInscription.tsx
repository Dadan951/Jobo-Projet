"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Voici les fausses données pour remplir le graphique
const data = [
  { name: 'Lun', utilisateurs: 4 },
  { name: 'Mar', utilisateurs: 7 },
  { name: 'Mer', utilisateurs: 2 },
  { name: 'Jeu', utilisateurs: 10 },
  { name: 'Ven', utilisateurs: 6 },
  { name: 'Sam', utilisateurs: 3 },
  { name: 'Dim', utilisateurs: 1 },
];

export default function GraphiqueInscription() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        {/* Grille horizontale très discrète */}
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        
        {/* Axes sans lignes noires, texte gris clair */}
        <XAxis 
          dataKey="name" 
          stroke="#64748b" 
          tick={{ fill: '#94a3b8', fontSize: 12 }} 
          tickLine={false} 
          axisLine={false} 
          dy={10}
        />
        <YAxis 
          stroke="#64748b" 
          tick={{ fill: '#94a3b8', fontSize: 12 }} 
          tickLine={false} 
          axisLine={false} 
        />
        
        {/* Bulle d'info au survol stylisée en mode Dark */}
        <Tooltip 
          cursor={{ fill: '#1e293b', opacity: 0.4 }}
          contentStyle={{ 
            backgroundColor: '#0a0a0a', 
            borderColor: '#334155', 
            borderRadius: '8px', 
            color: '#f8fafc',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
          }}
          itemStyle={{ color: '#38bdf8' }} // Couleur sky-400
        />
        
        {/* Les barres du graphique : un beau bleu ciel avec bords arrondis en haut */}
        <Bar dataKey="utilisateurs" fill="#38bdf8" radius={[6, 6, 0, 0]} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}