"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Bac', value: 400 },
  { name: 'Bac +2', value: 300 },
  { name: 'Bac +5', value: 300 },
  { name: 'Sans Bac', value: 100 },
];

// Palette de couleurs froides (Bleu ciel, Bleu océan, Bleu foncé, Gris bleuté)
const COLORS = ['#0ea5e9', '#3b82f6', '#1e40af', '#64748b'];

export default function GraphiqueNiveauEtudes() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={60} // C'est ça qui fait l'effet anneau (Donut)
          outerRadius={80}
          paddingAngle={5} // Espace entre les morceaux
          dataKey="value"
          stroke="none" // Enlève la bordure blanche autour des parts
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#0a0a0a', 
            borderColor: '#334155', 
            borderRadius: '8px', 
            color: '#f8fafc' 
          }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend 
          iconType="circle" 
          wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} 
        />
      </PieChart>
    </ResponsiveContainer>
  );
}