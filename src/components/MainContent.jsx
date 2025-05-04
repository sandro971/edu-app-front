// src/components/MainContent.js
import React, { useState, useEffect, useRef } from 'react'; // Supprimer useCallback ici si non utilisé localement
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

// Importer les composants enfants directs
import ExerciseContent from './ExerciseContent';
import InputBar from './InputBar'; // Utilise maintenant InputBar

// Importer le hook pour accéder au contexte
import { useExerciseContext } from '../context/ExerciseContext';

const FADE_DURATION = 1000; // Durée de la transition

const MainContent = () => {
  // --- Obtenir les valeurs et fonctions depuis le Contexte ---
  const {
    currentView,          // La vue actuelle demandée par l'utilisateur ('home', 'video', 'exercise')
    currentExercise,      // L'objet exercice actuel
    handleAnswerSubmit,   // La fonction à appeler quand une réponse d'exercice est soumise
    showSuccessOverlay,   // Booléen indiquant si l'overlay de succès doit être visible (affecte le disabled)
    inputError            // Booléen indiquant si la dernière réponse était incorrecte (pour effet visuel)
  } = useExerciseContext();

  // --- États locaux pour gérer la transition visuelle ---
  // Ces états permettent d'afficher l'ancien contenu pendant qu'il disparaît
  // et le nouveau pendant qu'il apparaît.
  const [isContentVisible, setIsContentVisible] = useState(true); // Contrôle la propriété 'in' de Fade
  const [renderedView, setRenderedView] = useState(currentView); // La vue réellement affichée
  const [renderedExercise, setRenderedExercise] = useState(currentExercise); // L'exercice réellement affiché
  const isInitialMount = useRef(true); // Pour éviter l'animation au premier rendu

  // --- Effet de Bord pour synchroniser l'état local avec le contexte et gérer la transition ---
  useEffect(() => {
    // Ignorer le premier rendu pour éviter une transition initiale
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // S'assurer que l'état local correspond bien au contexte au départ
      setRenderedView(currentView);
      setRenderedExercise(currentExercise);
      return;
    }

    // Détecter si la vue demandée (contexte) a changé par rapport à la vue affichée (état local)
    const hasViewChanged = renderedView !== currentView;
    // Détecter si l'exercice a changé PENDANT que la vue est 'exercise'
    const hasExerciseChanged = currentView === 'exercise' && renderedView === 'exercise' && currentExercise?.id !== renderedExercise?.id;

    // Si un changement pertinent a eu lieu, démarrer la transition
    if (hasViewChanged || hasExerciseChanged) {
      setIsContentVisible(false); // Démarre le fondu sortant de l'ancien contenu

      // Programmer la mise à jour du contenu et le fondu entrant après la durée de transition
      const timer = setTimeout(() => {
        setRenderedView(currentView);         // Met à jour la vue à afficher avec celle du contexte
        setRenderedExercise(currentExercise); // Met à jour l'exercice à afficher
        setIsContentVisible(true);          // Démarre le fondu entrant du nouveau contenu
      }, FADE_DURATION);

      // Nettoyage : annuler le timer si le composant est démonté ou si les dépendances changent à nouveau
      return () => clearTimeout(timer);
    } else {
      // Si seul l'exercice change mais qu'on n'était pas dans la vue exercice,
      // mettre à jour directement l'exercice local pour le prochain rendu 'exercise'
      // (ce cas est moins critique avec la logique actuelle mais reste une sécurité)
       if (currentView === 'exercise' && currentExercise?.id !== renderedExercise?.id) {
           setRenderedExercise(currentExercise);
       }
    }
    // Dépendances : surveiller les changements dans la vue et l'exercice du contexte,
    // ainsi que les états locaux `renderedView` et `renderedExercise` pour comparer.
  }, [currentView, currentExercise, renderedView, renderedExercise?.id]);

  // --- Fonction pour choisir le contenu à rendre (basé sur l'état local `renderedView`) ---
  const renderContent = () => {
    switch (renderedView) {
      case 'exercise':
        if (!renderedExercise) return <Typography>Chargement...</Typography>;
        // Passe les détails de l'exercice (stocké localement pour la transition)
        return <ExerciseContent key={renderedExercise.id} instructions={renderedExercise.instructions} questionLatex={renderedExercise.questionLatex} hint={renderedExercise.hint} />;
      case 'video':
        return <Typography variant="h4">Zone pour le Cours Vidéo</Typography>;
      case 'home':
      default:
        return <Typography variant="h4">Bienvenue !</Typography>;
    }
  };

  // --- Rendu JSX ---
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative', height: '100vh' }}>
      {/* Zone principale d'affichage du contenu */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3, pb: 0, position: 'relative', height: '100%' }}>
        <Fade in={isContentVisible} timeout={FADE_DURATION} style={{ height: '100%' }}>
          {/* Div requis comme enfant unique de Fade */}
          <div>{renderContent()}</div>
        </Fade>
      </Box>

      {/* Barre de saisie flottante pour les exercices (conditionnelle) */}
      {/* Affichée si la vue demandée (du contexte) est 'exercise' ET qu'un exercice existe */}
      {currentView === 'exercise' && currentExercise && (
        <Paper
          elevation={3}
          sx={{
            // position: 'absolute', bottom: 16, left: 16, right: 16,
            margin: 2,
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
            // Style conditionnel basé sur le contexte et l'état local de transition
            opacity: showSuccessOverlay || !isContentVisible ? 0.5 : 1,
            pointerEvents: showSuccessOverlay || !isContentVisible ? 'none' : 'auto',
            transition: 'opacity 0.3s ease-in-out, border-color 0.3s ease-in-out',
            border: inputError ? '2px solid' : '2px solid transparent',
            borderColor: inputError ? 'error.main' : 'transparent',
            animation: inputError ? 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both' : 'none',
          }}
        >
          {/* Utilise le composant InputBar réutilisable */}
          <InputBar
            onSubmit={handleAnswerSubmit} // Passe la fonction du contexte
            placeholder={isContentVisible ? "Ta réponse ici ou utilise le micro..." : "Chargement..."}
            // Désactivé si l'overlay de succès est visible OU si le contenu principal est en transition
            disabled={showSuccessOverlay || !isContentVisible}
          />
        </Paper>
      )}
    </Box>
  );
};

export default MainContent;