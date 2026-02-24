"use client";

import React, { useState, useRef, useMemo, useEffect } from 'react'; // Ajout de useEffect
import { useRouter } from 'next/navigation'; // Ajout de useRouter
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Download, Search, Package, MousePointer2, Users } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- DONNÉES SIMULÉES ---
const DONNEES = {
  semaine: {
    kpis: [
      { title: "Scans totaux", value: "1,234", evol: "+12%", icon: Search },
      { title: "Objets actifs", value: "56", evol: "Total", icon: Package },
      { title: "Nouveaux métiers", value: "12", evol: "+2", icon: MousePointer2 },
      { title: "Utilisateurs", value: "89", evol: "+5%", icon: Users },
    ],
    inscriptions: [ { name: 'Lun', valeur: 4 }, { name: 'Mar', valeur: 7 }, { name: 'Mer', valeur: 2 }, { name: 'Jeu', valeur: 10 }, { name: 'Ven', valeur: 6 }, { name: 'Sam', valeur: 3 }, { name: 'Dim', valeur: 1 } ],
    scans: [ { name: 'Lun', valeur: 120 }, { name: 'Mar', valeur: 200 }, { name: 'Mer', valeur: 150 }, { name: 'Jeu', valeur: 300 }, { name: 'Ven', valeur: 250 }, { name: 'Sam', valeur: 180 }, { name: 'Dim', valeur: 90 } ],
    etudes: [ { name: 'Sans Bac', value: 10 }, { name: 'Bac', value: 25 }, { name: 'Bac +2', value: 40 }, { name: 'Bac +5', value: 25 } ],
  },
  mois: {
    kpis: [
      { title: "Scans totaux", value: "5,890", evol: "+24%", icon: Search },
      { title: "Objets actifs", value: "60", evol: "Total", icon: Package },
      { title: "Nouveaux métiers", value: "14", evol: "+4", icon: MousePointer2 },
      { title: "Utilisateurs", value: "340", evol: "+15%", icon: Users },
    ],
    inscriptions: [ { name: 'Sem 1', valeur: 45 }, { name: 'Sem 2', valeur: 32 }, { name: 'Sem 3', valeur: 55 }, { name: 'Sem 4', valeur: 60 } ],
    scans: [ { name: 'Sem 1', valeur: 1200 }, { name: 'Sem 2', valeur: 1400 }, { name: 'Sem 3', valeur: 1100 }, { name: 'Sem 4', valeur: 2190 } ],
    etudes: [ { name: 'Sans Bac', value: 15 }, { name: 'Bac', value: 30 }, { name: 'Bac +2', value: 35 }, { name: 'Bac +5', value: 20 } ],
  },
  annee: {
    kpis: [
      { title: "Scans totaux", value: "42,100", evol: "+110%", icon: Search },
      { title: "Objets actifs", value: "120", evol: "Total", icon: Package },
      { title: "Nouveaux métiers", value: "25", evol: "+10", icon: MousePointer2 },
      { title: "Utilisateurs", value: "2,500", evol: "+80%", icon: Users },
    ],
    inscriptions: [ { name: 'Jan', valeur: 120 }, { name: 'Fév', valeur: 200 }, { name: 'Mar', valeur: 150 }, { name: 'Avr', valeur: 300 }, { name: 'Mai', valeur: 250 }, { name: 'Juin', valeur: 400 } ],
    scans: [ { name: 'Jan', valeur: 5000 }, { name: 'Fév', valeur: 7000 }, { name: 'Mar', valeur: 6000 }, { name: 'Avr', valeur: 8000 }, { name: 'Mai', valeur: 9000 }, { name: 'Juin', valeur: 11000 } ],
    etudes: [ { name: 'Sans Bac', value: 5 }, { name: 'Bac', value: 20 }, { name: 'Bac +2', value: 50 }, { name: 'Bac +5', value: 25 } ],
  }
};

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899'];

export default function DashboardCoutellerie() {
  const router = useRouter(); // Initialisation du router
  const [periode, setPeriode] = useState<'semaine' | 'mois' | 'annee'>('semaine');
  const [loading, setLoading] = useState(true); // Pour éviter le flash de contenu
  const dashboardRef = useRef<HTMLDivElement>(null);

  // --- LE GARDIEN DE SÉCURITÉ ---
  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    
    if (authStatus !== "true") {
      // Si pas connecté, redirection immédiate vers le login
      router.push('/auth/login');
    } else {
      setLoading(false); // L'utilisateur est connecté, on affiche le dashboard
    }
  }, [router]);

  const data = useMemo(() => DONNEES[periode], [periode]);

  const exportPDF = async () => {
    const element = dashboardRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#0b0f1a",
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`jobo-report-coutellerie-${periode}.pdf`);
    } catch (error) {
      console.error("Erreur export PDF:", error);
    }
  };

  // Si on est en train de vérifier la connexion, on affiche rien (ou un spinner)
  if (loading) return <div className="min-h-screen bg-[#0b0f1a]" />;

  return (
    <div ref={dashboardRef} className="min-h-screen p-8 text-slate-200 bg-[#0b0f1a]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent uppercase tracking-tight">
            Coutellerie <span className="text-slate-500 text-lg font-medium">| Analytics</span>
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium uppercase tracking-widest">Performance & Flux Métiers</p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/50 p-1.5 rounded-xl border border-white/5">
          {(['semaine', 'mois', 'annee'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriode(p)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                periode === p 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {p === 'annee' ? 'Année' : p}
            </button>
          ))}
          <button 
            onClick={exportPDF}
            className="ml-2 p-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg border border-blue-500/20 transition-all"
            title="Exporter Rapport PDF"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {data.kpis.map((kpi, idx) => (
          <div key={idx} className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">{kpi.title}</p>
                <h3 className="text-3xl font-bold mt-2 text-white group-hover:text-blue-400 transition-colors">{kpi.value}</h3>
              </div>
              <div className="p-3 bg-blue-500/5 rounded-xl text-blue-500 border border-blue-500/10">
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-blue-400 text-xs font-bold px-2 py-0.5 bg-blue-400/10 rounded-full">{kpi.evol}</span>
              <span className="text-slate-600 text-[10px] uppercase font-semibold">Vs période précédente</span>
            </div>
          </div>
        ))}
      </div>

      {/* GRAPHIQUES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" /> Évolution des Scans
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.scans}>
                <defs>
                  <linearGradient id="colorScan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="valeur" stroke="#3b82f6" strokeWidth={3} fill="url(#colorScan)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" /> Nouveaux Utilisateurs
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.inscriptions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Bar dataKey="valeur" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">Profil Académique des Utilisateurs</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.etudes} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" isAnimationActive={false}>
                  {data.etudes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}