"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Shield, Calendar, MapPin, 
  Edit3, Camera, Bell, Lock, Smartphone,
  CheckCircle2, Hexagon
} from 'lucide-react';
import Image from 'next/image';

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false);

  // État contenant les données de l'utilisateur
  const [userData, setUserData] = useState({
    name: "Utilisateur Jobo",
    email: "contact@jobo-analytics.fr",
    role: "Administrateur Système",
    joinDate: "24 Février 2026",
    location: "Paris, France",
    avatar: "/user.png" 
  });

  // RÉCUPÉRATION DE L'EMAIL AU CHARGEMENT
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    
    if (storedEmail) {
      // On crée un pseudo avec la partie avant le @
      const namePart = storedEmail.split('@')[0];
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      
      // On met à jour l'état avec les vraies données
      setUserData(prevData => ({
        ...prevData,
        name: formattedName,
        email: storedEmail
      }));
    }
  }, []);

  // Fonction pour gérer la modification des champs
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-blue-500 shadow-[0_0_15px_#3b82f6] rounded-full"></div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-slate-500 bg-clip-text text-transparent uppercase tracking-tighter">
            Profil Utilisateur
          </h1>
          <p className="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.3em] mt-2 ml-1">
            Interface de contrôle du compte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLONNE GAUCHE (CARTE D'IDENTITÉ) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group backdrop-blur-xl">
              <div className="relative flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <div className="absolute inset-[-8px] rounded-full border border-blue-500/20 border-t-blue-500 animate-spin"></div>
                  <div className="relative w-full h-full rounded-full border-4 border-slate-900 overflow-hidden ring-1 ring-white/10">
                    <Image src={userData.avatar} alt="Avatar" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <button className="absolute bottom-2 right-2 p-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white shadow-2xl border border-white/20 transition-all z-10">
                    <Camera size={18} />
                  </button>
                </div>

                <h2 className="text-2xl font-black text-white tracking-tight text-center break-all">{userData.name}</h2>
                
                <div className="flex items-center gap-2 mt-2">
                  <Hexagon size={14} className="text-blue-500 fill-blue-500/20" />
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">{userData.role}</span>
                </div>

                <div className="w-full space-y-3 mt-8 pt-8 border-t border-white/5 text-sm text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><MapPin size={14} /> Localisation</span>
                    <span className="text-white font-medium text-xs">{userData.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><Calendar size={14} /> Inscription</span>
                    <span className="text-white font-medium text-xs">{userData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE (FORMULAIRES & OPTIONS) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. INFORMATIONS PERSONNELLES */}
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg"><User size={20} className="text-blue-500" /></div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Informations de Liaison</h3>
                </div>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    isEditing ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {isEditing ? <CheckCircle2 size={16} /> : <Edit3 size={16} />}
                  {isEditing ? "Enregistrer" : "Modifier"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identifiant Public</label>
                  <input 
                    type="text" 
                    name="name"
                    value={userData.name}
                    onChange={handleNameChange}
                    disabled={!isEditing}
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all disabled:opacity-40"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Système Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={userData.email}
                    onChange={handleNameChange}
                    disabled={!isEditing}
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            {/* 2. SÉCURITÉ ET PRÉFÉRENCES (RUBRIQUES REMISES EN PLACE) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* CARTE SÉCURITÉ */}
              <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 backdrop-blur-xl group hover:border-blue-500/20 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:scale-110 transition-transform">
                    <Shield size={24} />
                  </div>
                  <h4 className="font-bold text-white uppercase tracking-tighter">Sécurité Système</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <Lock size={16} className="text-slate-500" />
                      <span className="text-xs text-slate-300">Mot de passe</span>
                    </div>
                    <button className="text-[10px] font-black text-blue-400 uppercase hover:text-blue-300 transition-colors">Changer</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <Smartphone size={16} className="text-slate-500" />
                      <span className="text-xs text-slate-300">2FA (Mobile)</span>
                    </div>
                    <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative p-1 cursor-pointer">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARTE PRÉFÉRENCES / ALERTES */}
              <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 backdrop-blur-xl group hover:border-purple-500/20 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl group-hover:scale-110 transition-transform">
                    <Bell size={24} />
                  </div>
                  <h4 className="font-bold text-white uppercase tracking-tighter">Flux Alertes</h4>
                </div>
                <div className="space-y-4">
                   <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold">Abonnements rapports PDF</p>
                   <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-400">Hebdomadaire</span>
                      <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] text-purple-400">Temps Réel</span>
                   </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}