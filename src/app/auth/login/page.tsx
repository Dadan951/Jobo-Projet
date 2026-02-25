"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // <-- NOUVEAU : Ajout de l'état pour le mot de passe
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // 1. On appelle l'API backend pour générer le "vrai" Token de sécurité (le Cookie)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // L'API de tes camarades attend "username" et "password"
        body: JSON.stringify({ username: email, password: password }), 
      });

      // Si le backend refuse (mauvais mot de passe)
      if (!response.ok) {
        throw new Error("Identifiants incorrects");
      }

      // 2. Si le backend accepte, on met à jour l'affichage visuel (Navbar, Accueil)
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", email);
      
      // 3. On redirige vers le hub des dashboards
      router.push('/dashboards');
      
    } catch (err) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/20">
            <Lock className="text-blue-500" size={28} />
          </div>
        </div>
        
        <h1 className={styles.title}>Connexion</h1>
        <p className={styles.subtitle}>Accédez à votre console JOBO Analytics</p>

        {/* NOUVEAU : Affichage d'un message d'erreur rouge si on se trompe */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 p-3 rounded-xl mb-6 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Adresse Email</label>
            <div className="relative">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={styles.input} 
                placeholder="nom@entreprise.fr"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Mot de passe</label>
            <input 
              type="password" 
              value={password} // <-- On relie le champ au state
              onChange={(e) => setPassword(e.target.value)} // <-- On met à jour
              className={styles.input} 
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Se connecter <ArrowRight size={18} className="inline ml-2" />
          </button>
        </form>

        <div className="text-center mt-8 space-y-2">
          <p className="text-xs text-slate-500">Pas encore d'accès ? <span className="text-blue-400 cursor-pointer font-bold">Contactez l'admin</span></p>
        </div>
      </div>
    </div>
  );
}