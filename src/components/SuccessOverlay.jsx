// src/components/SuccessOverlay.js
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import Fade from '@mui/material/Fade';

// Importer le hook pour accéder au contexte
import { useExerciseContext } from '../context/ExerciseContext';

// Options pour les particules (gardées ici pour la spécificité du composant)
const particlesOptions = { fpsLimit: 60, interactivity: { events: { onHover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 100, duration: 0.4 } } }, particles: { color: { value: ["#ffffff", "#FFD700", "#C0C0C0"] }, move: { direction: "none", enable: true, outModes: { default: "out" }, random: true, speed: 2, straight: false }, number: { density: { enable: true }, value: 50 }, opacity: { value: { min: 0.3, max: 0.8 }, animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false } }, shape: { type: ["circle", "star"], options: { star: { sides: 5 } } }, size: { value: { min: 1, max: 5 }, animation: { enable: true, speed: 3, minimumValue: 0.1, sync: false } } }, detectRetina: true };
const FADE_DURATION = 1000; // Durée de la transition Fade

const SuccessOverlay = () => {
   // --- Obtenir les valeurs et fonctions depuis le Contexte ---
  const {
      showSuccessOverlay, // Booléen indiquant si l'overlay doit être visible
      handleContinue      // Fonction à appeler lors du clic sur "Continuer"
  } = useExerciseContext();

  // --- État local pour l'initialisation des particules ---
  // Cet état est spécifique à ce composant et n'a pas besoin d'être dans le contexte
  const [init, setInit] = useState(false);

  // --- Effet de Bord pour initialiser le moteur de particules ---
  useEffect(() => {
    // Initialise tsparticles une seule fois au montage
    initParticlesEngine(async (engine) => {
      await loadFull(engine); // Charge toutes les fonctionnalités
    }).then(() => {
      setInit(true); // Marque comme initialisé
    });
  }, []); // Tableau de dépendances vide pour exécution unique

  // --- Rendu JSX ---
  return (
    // Utilise le composant Fade pour l'animation d'apparition/disparition
    // Contrôlé par showSuccessOverlay du contexte
    <Fade in={showSuccessOverlay} timeout={FADE_DURATION} unmountOnExit mountOnEnter>
      <Box sx={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fond semi-transparent
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 1400, // Au-dessus des autres éléments
        color: 'white', textAlign: 'center', p: 3,
      }}>
        {/* Contenu au premier plan */}
        <Box sx={{ position: 'relative', zIndex: 1401 }}> {/* zIndex pour être au-dessus des particules */}
          <CheckCircleOutlineIcon sx={{ fontSize: 100, color: 'success.light', mb: 2 }} />
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            Bien joué !
          </Typography>
          {/* Bouton Continuer qui appelle la fonction du contexte */}
          <Button variant="contained" color="success" size="large" onClick={handleContinue} sx={{ mt: 3, px: 5, py: 1.5, fontSize: '1.1rem' }}>
            Continuer
          </Button>
        </Box>

        {/* Particules en arrière-plan (rendues si initialisées) */}
        { init && <Particles
             id="tsparticles"
             options={particlesOptions}
             style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1400 }}
           />
         }
      </Box>
    </Fade>
  );
};

export default SuccessOverlay;