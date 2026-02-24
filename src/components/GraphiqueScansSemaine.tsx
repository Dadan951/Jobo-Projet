"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraphiqueScansSemaine({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} axisLine={false} />
        <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} />
        <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px' }} />
        {/* IMPORTANT : On utilise "valeur" ici */}
        <Bar dataKey="valeur" fill="#0EA5E9" radius={[4, 4, 0, 0]} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}