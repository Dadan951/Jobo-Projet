"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GraphiqueAge({ data, color = "#10B981" }: { data: any[], color?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip />
        <Area type="monotone" dataKey="valeur" stroke={color} fill={color} fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}