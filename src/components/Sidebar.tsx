"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  User, 
  Settings, 
  LogOut, 
  Scissors, 
  Gem, 
  Shirt, 
  Pipette 
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Vue d'ensemble", path: "/dashboards", icon: LayoutDashboard },
    { name: "Coutellerie", path: "/dashboards/dashboard-coutellerie", icon: Scissors },
    { name: "Luxe", path: "/dashboards/dashboard-luxe", icon: Gem },
    { name: "Textile", path: "/dashboards/dashboard-textile", icon: Shirt },
    { name: "Verre", path: "/dashboards/dashboard-verre", icon: Pipette },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0b0f1a]/80 backdrop-blur-md border-r border-white/5">
      {/* SECTION LOGO */}
      <div className="p-8">
        {/* On change le href ici pour pointer vers "/" */}
        <Link href="/" className="group">
          <h1 className="text-xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors">
            JOBO<span className="text-blue-500">.</span>ANALYTICS
          </h1>
          <div className="h-1 w-0 group-hover:w-full bg-blue-500 transition-all duration-300 shadow-[0_0_10px_#3b82f6]" />
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-4">Dashboards</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <Link 
          href="/dashboards/profil" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            pathname === "/dashboards/profil" ? "bg-blue-600/10 text-blue-400" : "text-slate-400 hover:bg-white/5"
          }`}
        >
          <User size={18} />
          <span className="text-sm font-medium">Mon Profil</span>
        </Link>
        <Link 
          href="/auth/login"
          className="flex items-center gap-3 px-4 py-3 text-rose-400/70 hover:bg-rose-500/10 rounded-xl transition-all mt-4"
        >
          {/* LE BOUTON DÉCONNEXION CORRIGÉ EST ICI 👇 */}
        <Link 
          href="/auth/login"
          onClick={() => {
            // On vide totalement la mémoire du navigateur au clic
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("userEmail");
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("userEmail");
          }}
          className="flex items-center gap-3 px-4 py-3 text-rose-400/70 hover:bg-rose-500/10 rounded-xl transition-all mt-4"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Déconnexion</span>
        </Link>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;