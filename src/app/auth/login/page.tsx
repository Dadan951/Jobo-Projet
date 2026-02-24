"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. On simule la connexion dans le navigateur
    localStorage.setItem("isLoggedIn", "true");
    // 2. On sauvegarde l'email tapé par l'utilisateur
    localStorage.setItem("userEmail", email);
    
    // 3. On redirige vers le dashboard
    router.push('/dashboards');
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

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Adresse Email</label>
            <div className="relative">
              {/* L'icône mail optionnelle si tu veux la rajouter, sinon on garde ton design : */}
              <input 
                type="email" 
                value={email} // <-- ICI : on relie l'input au state
                onChange={(e) => setEmail(e.target.value)} // <-- ICI : on met à jour le state quand on tape
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
              className={styles.input} 
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Se connecter <ArrowRight size={18} className="inline ml-2" />
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-slate-500">
          Pas encore d'accès ? <span className="text-blue-400 cursor-pointer font-bold">Contactez l'admin</span>
        </p>
      </div>
    </div>
  );
}