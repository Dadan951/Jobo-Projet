"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function GraphiqueRegion({ data, color = "#4F46E5" }: { data: any[], color?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} margin={{ left: 40 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" hide />
        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} interval={0} />
        <Tooltip cursor={{ fill: '#F3F4F6' }} />
        <Bar dataKey="valeur" fill={color} radius={[0, 4, 4, 0]} barSize={20}>
           {/* Petite astuce pour varier les couleurs si besoin */}
           {data.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={color} />
           ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}