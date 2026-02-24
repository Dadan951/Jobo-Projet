"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Scissors, Gem, Shirt, Pipette, 
  ArrowRight, Activity, Clock 
} from 'lucide-react';

export default function DashboardHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Administrateur"); // Par défaut

  // LE GARDIEN ET RÉCUPÉRATION DU NOM
  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    
    if (authStatus !== "true") {
      router.push('/auth/login');
    } else {
      // On récupère l'email sauvegardé lors du login
      const storedEmail = localStorage.getItem("userEmail");
      
      if (storedEmail) {
        // On coupe l'email au niveau du "@" pour récupérer la première partie
        const namePart = storedEmail.split('@')[0];
        // On met la première lettre en majuscule pour faire plus propre
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        setUserName(formattedName); // On met à jour le texte affiché
      }
      
      setLoading(false);
    }
  }, [router]);

  const sectors = [
    { name: "Coutellerie", icon: Scissors, path: "/dashboards/dashboard-coutellerie", color: "text-blue-500", bg: "bg-blue-500/10", border: "hover:border-blue-500/50" },
    { name: "Luxe", icon: Gem, path: "/dashboards/dashboard-luxe", color: "text-purple-500", bg: "bg-purple-500/10", border: "hover:border-purple-500/50" },
    { name: "Textile", icon: Shirt, path: "/dashboards/dashboard-textile", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "hover:border-emerald-500/50" },
    { name: "Verre", icon: Pipette, path: "/dashboards/dashboard-verre", color: "text-amber-500", bg: "bg-amber-500/10", border: "hover:border-amber-500/50" },
  ];

  if (loading) return <div className="min-h-screen bg-[#0b0f1a]" />;

  return (
    <div className="min-h-screen p-8 text-slate-200 bg-[#0b0f1a]">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER DE BIENVENUE */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Bonjour, <span className="text-blue-500">{userName}</span> 👋
          </h1>
          <p className="text-slate-400">Bienvenue sur votre centre de contrôle JOBO Analytics.</p>
        </div>

        {/* ACTIVITÉ RÉCENTE */}
        <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 mb-12 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold">État du réseau</h3>
              <p className="text-sm text-slate-400">Tous les systèmes sont opérationnels</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock size={16} /> Dernière synchronisation il y a quelques secondes
            </div>
          </div>
        </div>

        {/* GRILLES DE SÉLECTION */}
        <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 ml-2">Sélectionnez un secteur d'analyse</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector) => (
            <Link 
              href={sector.path} 
              key={sector.name}
              className={`group bg-slate-900/40 p-6 rounded-3xl border border-white/5 transition-all duration-300 hover:-translate-y-1 ${sector.border} backdrop-blur-md`}
            >
              <div className="flex justify-between items-start mb-12">
                <div className={`p-4 rounded-2xl ${sector.bg} ${sector.color} group-hover:scale-110 transition-transform`}>
                  <sector.icon size={28} />
                </div>
                <ArrowRight className="text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{sector.name}</h3>
              <p className="text-xs text-slate-500">Ouvrir le rapport détaillé</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}