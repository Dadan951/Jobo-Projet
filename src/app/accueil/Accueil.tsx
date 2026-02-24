"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, LogIn, ArrowRight } from 'lucide-react';
import styles from './Accueil.module.css';

export default function Acceuil() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  // 1. On vérifie l'état au chargement pour l'affichage visuel du bouton
  useEffect(() => {
    const authStatus = localStorage.getItem("isLoggedIn");
    if (authStatus === "true") {
      setIsConnected(true);
    }
  }, []);

  // 2. Fonction de sécurité qui contrôle l'accès au clic
  const handleProtectedNavigation = (destination: string) => {
    const authStatus = localStorage.getItem("isLoggedIn");

    if (authStatus === "true") {
      router.push(destination);
    } else {
      // Si l'utilisateur n'est pas connecté, on l'envoie au login
      // même s'il a cliqué sur "Explorer le Dashboard"
      router.push('/auth/login');
    }
  };

  return (
    <div className={styles.acceuilContainer}>
      <Head>
        <title>Accueil - JOBO</title>
      </Head>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Bienvenue sur JOBO Analytics</h1>
        <p className={styles.heroDescription}>
          Un dashboard qui vous permet de suivre en temps réel les tendances et le comportement des jeunes concernant les métiers de l'industrie grâce à notre application mobile JOBO.
        </p>

        {/* Bouton Intelligent */}
        <button 
          onClick={() => handleProtectedNavigation('/dashboards/dashboard-coutellerie')}
          className={styles.heroButton}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}
        >
          {isConnected ? (
            <>
              <LayoutDashboard size={20} />
              Accéder au Dashboard
            </>
          ) : (
            <>
              <LogIn size={20} />
              Se connecter
            </>
          )}
        </button>
      </div>

      {/* About Section */}
      <div className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>Qu'est-ce que JOBO?</h2>
        <p className={styles.aboutDescription}>
          JOBO est une plateforme qui permet de capturer des objets industriels et d'obtenir des informations détaillées sur les artisans et les ouvriers qui les fabriquent.
          Découvrez l’histoire, les compétences et les métiers derrière chaque produit.
        </p>
      </div>

      {/* News Section */}
      <div className={styles.newsSection}>
        <h2 className={styles.sectionTitle}>Actualités</h2>
        <div className={styles.newsItem}>
          <h3 className={styles.newsTitle}>Nouveau partenariat avec des artisans locaux</h3>
          <p className={styles.newsDescription}>
            Nous avons élargi notre réseau pour inclure de nouveaux artisans locaux. Découvrez leurs créations uniques et leur savoir-faire.
          </p>
        </div>
        <div className={styles.newsItem}>
          <h3 className={styles.newsTitle}>Lancement de nouvelles fonctionnalités</h3>
          <p className={styles.newsDescription}>
            La nouvelle mise à jour de l'application permet une meilleure visualisation des objets industriels, ainsi qu'un accès facilité aux fiches métiers.
          </p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Prêt à explorer?</h2>
        <p className={styles.ctaDescription}>
          Plongez dans l'univers de l'artisanat industriel et découvrez des objets fascinants fabriqués par des artisans passionnés.
        </p>
        
        <button 
          onClick={() => handleProtectedNavigation('/dashboards/dashboard-coutellerie')}
          className={styles.ctaButton}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
        >
          {isConnected ? "Ouvrir mon interface" : "Commencer l'aventure"}
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}