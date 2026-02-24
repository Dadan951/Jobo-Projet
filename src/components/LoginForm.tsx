"use client";

// Il manquait ces trois lignes fondamentales !
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa"; 

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Reset error
    const username = email;
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) throw new Error("Invalid credentials");
      
      const data = await response.json();
      const sector = data.user.sector;
      
      const redirectMap: { [key: string]: string } = {
        textile: "/dashboards/dashboard-textile",
        verre: "/dashboards/dashboard-verre",
        luxe: "/dashboards/dashboard-luxe",
        coutellerie: "/dashboards/dashboard-coutellerie",
      };
      router.push(redirectMap[sector] || "/");
      
    } catch (error) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
      <p className="text-slate-400 mb-8">Connectez-vous à votre compte Jobo Analytics.</p>

      {/* Bouton Google (Visuel uniquement pour l'instant) */}
      <button type="button" className="w-full flex items-center justify-center gap-3 bg-white py-3 px-4 rounded-lg font-medium text-black hover:bg-slate-100 transition-colors mb-6">
        <FaGoogle className="text-lg" />
        Continuer avec Google
      </button>

      {/* Séparateur "OU" */}
      <div className="relative flex items-center py-2 mb-6">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink mx-4 text-slate-500 text-sm">OU</span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Adresse Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Style "Arctic" : fond très foncé, sans bordure par défaut
            className="block w-full h-12 px-4 rounded-lg bg-[#161616] text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            placeholder="nom@entreprise.com"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Mot de passe
            </label>
            <Link href="#" className="text-sm text-sky-400 hover:text-sky-300">
              Mot de passe oublié ?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full h-12 px-4 rounded-lg bg-[#161616] text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          // Bouton bleu cyan style "Arctic"
          className="w-full py-3 px-4 rounded-lg font-bold text-black bg-sky-400 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-sky-400 transition-all duration-300"
        >
          Se connecter
        </button>
      </form>

      <p className="mt-8 text-center text-slate-400 text-sm">
        Vous n'avez pas de compte ?{" "}
        <Link href="/auth/register" className="text-sky-400 hover:text-sky-300 font-medium">
          S'inscrire
        </Link>
      </p>
    </div>
  );
}