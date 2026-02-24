"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

/**
 * Layout principal pour la section Dashboards
 * Ce fichier définit la structure globale : Sidebar à gauche, Contenu à droite.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0b0f1a] overflow-hidden">
      {/* SIDEBAR FIXE 
          On utilise 'fixed' pour qu'elle reste en place pendant le scroll du contenu.
      */}
      <aside className="w-64 fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </aside>

      {/* ZONE DE CONTENU PRINCIPALE 
          On ajoute un 'ml-64' (margin-left) pour ne pas être caché par la Sidebar.
      */}
      <main className="flex-1 ml-64 min-h-screen relative">
        {/* Effet de halo lumineux en arrière-plan pour le look futuriste */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Le contenu des pages (dashboard-coutellerie, etc.) s'affiche ici */}
        <div className="relative z-10 p-4">
          {children}
        </div>
      </main>

      <style jsx global>{`
        /* Personnalisation de la scrollbar pour le contenu principal */
        main::-webkit-scrollbar {
          width: 8px;
        }
        main::-webkit-scrollbar-track {
          background: #0b0f1a;
        }
        main::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
          border: 2px solid #0b0f1a;
        }
        main::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}