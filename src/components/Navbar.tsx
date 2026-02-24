"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  // On masque la Navbar si l'utilisateur est dans le dashboard
  const isDashboard = pathname?.startsWith("/dashboards");

  if (isDashboard) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] glass-navbar border-b border-white/5 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* GAUCHE : LOGO + NOM DU SITE */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            {/* Utilisation de ton logo présent dans public/logo-jobo.png */}
            <Image 
              src="/logo-jobo.png" 
              alt="Logo Jobo" 
              fill 
              className="object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            JOBO<span className="text-blue-500">.</span>ANALYTICS
          </span>
        </Link>

        {/* DROITE : BOUTON SE CONNECTER */}
        <div className="flex items-center gap-6">
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 font-bold text-sm transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            <LogIn size={18} />
            Se connecter
          </Link>
        </div>
      </div>

      <style jsx>{`
        .glass-navbar {
          background: rgba(11, 15, 26, 0.7);
          backdrop-filter: blur(15px);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;