"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, LogIn, ArrowRight, Sparkles, 
  Activity, Shield, Zap, BarChart3, Hexagon 
} from 'lucide-react';

export default function Acceuil() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    if (authStatus === "true") {
      setIsConnected(true);
    }
  }, []);

  const handleProtectedNavigation = (destination: string) => {
    const authStatus = localStorage.getItem("isLoggedIn");
    if (authStatus === "true") {
      router.push('/dashboards');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 overflow-hidden relative font-sans">
      
      {/* EFFETS DE LUMIÈRE EN ARRIÈRE-PLAN */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
        
        {/* HERO SECTION : 2 Colonnes */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          
          {/* Colonne Gauche : Texte */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              Nouveau système de tracking
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter">
              Explorez l'industrie <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                par la donnée.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Une plateforme analytique qui vous permet de suivre en temps réel les tendances et le comportement des jeunes concernant les métiers de l'artisanat grâce à notre application mobile JOBO.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => handleProtectedNavigation('/dashboards')}
                className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1"
              >
                {isConnected ? <><LayoutDashboard size={20} /> Accéder au Dashboard</> : <><LogIn size={20} /> Se connecter</>}
              </button>
            </div>
          </div>

          {/* Colonne Droite : Visuel "Tape à l'œil" (Faux Dashboard flottant) */}
          <div className="flex-1 relative w-full max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-[3rem] transform rotate-3 scale-105 blur-lg"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aperçu Live</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><Activity size={24} /></div>
                  <div>
                    <div className="text-sm text-slate-400">Flux de Scans (Live)</div>
                    <div className="text-2xl font-black text-white">+ 2,490</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl"><BarChart3 size={24} /></div>
                  <div>
                    <div className="text-sm text-slate-400">Taux d'engagement</div>
                    <div className="text-2xl font-black text-white">84.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION GRILLE DE CARTES (Fonctionnalités) */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">L'Écosystème <span className="text-blue-500">JOBO</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Plongez dans l'univers de l'artisanat industriel et découvrez des objets fascinants fabriqués par des passionnés.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {/* Carte 1 */}
          <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Hexagon size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Captures d'Objets</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Identifiez les objets industriels et obtenez des données précises sur leur fabrication et les matériaux utilisés.</p>
          </div>

          {/* Carte 2 */}
          <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Métiers & Artisans</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Découvrez l'histoire, les compétences et les parcours des ouvriers qui se cachent derrière chaque produit.</p>
          </div>

          {/* Carte 3 */}
          <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Données Sécurisées</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Une architecture robuste pour analyser les tendances d'engagement avec des rapports exportables en un clic.</p>
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="relative bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20 rounded-[3rem] p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-4xl font-black text-white mb-6 relative z-10 tracking-tight">Prêt à explorer les données ?</h2>
          <button 
            onClick={() => handleProtectedNavigation('/dashboards')}
            className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-2xl font-black uppercase tracking-widest transition-all"
          >
            {isConnected ? "Ouvrir l'interface" : "Démarrer maintenant"} <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}