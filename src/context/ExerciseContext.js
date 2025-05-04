// src/context/ExerciseContext.js
import React, { createContext, useState, useCallback, useRef, useEffect, useMemo, useContext } from 'react';
// Importer le hook du contexte Chatbot pour l'utiliser ici
import { useChatbotContext } from './ChatbotContext';

// Définition des exercices
const exercisesData = [
  { id: 1, type: 'fraction-addition', instructions: 'Calcule la somme...', questionLatex: '\\frac{1}{4} + \\frac{3}{8}', correctAnswer: '5/8', hint: 'Dénominateur commun...' },
  { id: 2, type: 'fraction-subtraction', instructions: 'Calcule la différence...', questionLatex: '\\frac{5}{6} - \\frac{1}{3}', correctAnswer: '3/6', simplifiedAnswer: '1/2', hint: 'Dénominateur commun...' },
  { id: 3, type: 'multiplication', instructions: 'Effectue la multiplication...', questionLatex: '12 \\times 5', correctAnswer: '60', hint: 'Table de 5...' },
];

// Créer le contexte Exercice
const ExerciseContext = createContext(null);

// Créer le fournisseur de contexte Exercice
export const ExerciseProvider = ({ children }) => {
  // --- Consommer le contexte Chatbot ---
  // Doit être utilisé à l'intérieur d'un ChatbotProvider
  const { addMessage, setAiTypingStatus } = useChatbotContext();

  // --- State spécifique aux Exercices/Navigation ---
  const [currentView, setCurrentView] = useState('exercise');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [inputError, setInputError] = useState(false);

  // --- Refs spécifiques aux Exercices ---
  const exerciseAiResponseTimeoutRef = useRef(null); // Pour les réponses d'exercice
  const inputErrorTimeoutRef = useRef(null);

   // --- Données dérivées ---
   const currentExercise = useMemo(() => exercisesData[currentExerciseIndex], [currentExerciseIndex]);

  // --- Effet de nettoyage ---
  useEffect(() => {
    return () => {
      if (exerciseAiResponseTimeoutRef.current) clearTimeout(exerciseAiResponseTimeoutRef.current);
      if (inputErrorTimeoutRef.current) clearTimeout(inputErrorTimeoutRef.current);
    };
  }, []);

  // --- Fonctions de rappel (Callbacks) ---

  const handleNavigate = useCallback((view) => {
    console.log("ExerciseContext: handleNavigate to", view);
    setCurrentView(view);
    setShowSuccessOverlay(false);
    setInputError(false);
    if (exerciseAiResponseTimeoutRef.current) { clearTimeout(exerciseAiResponseTimeoutRef.current); exerciseAiResponseTimeoutRef.current = null; }
    if (inputErrorTimeoutRef.current) { clearTimeout(inputErrorTimeoutRef.current); inputErrorTimeoutRef.current = null; }
    // Utilise setAiTypingStatus du ChatbotContext
    setAiTypingStatus(false);
    // Utilise addMessage du ChatbotContext
    if (view !== 'exercise') { addMessage(`Ok, allons voir la section ${view}.`, 'ai'); }
    else { addMessage(`Retour aux exercices. Exercice ${currentExerciseIndex + 1}.`, 'ai'); }
  }, [addMessage, setAiTypingStatus, currentExerciseIndex]); // Dépend des fonctions du ChatbotContext

  const handleAnswerSubmit = useCallback((answer) => {
    if (!currentExercise) return;
    console.log("ExerciseContext: handleAnswerSubmit called");
    setInputError(false);
    if (inputErrorTimeoutRef.current) clearTimeout(inputErrorTimeoutRef.current);
    if (exerciseAiResponseTimeoutRef.current) clearTimeout(exerciseAiResponseTimeoutRef.current);
    setAiTypingStatus(false); // Utilise la fonction du ChatbotContext
    addMessage(answer, 'user'); // Utilise la fonction du ChatbotContext

    const cleanedAnswer = answer.replace(/\s+/g, '');
    let isCorrect = false;
    if (currentExercise.id === 2) { isCorrect = cleanedAnswer === currentExercise.correctAnswer || cleanedAnswer === currentExercise.simplifiedAnswer; }
    else { isCorrect = cleanedAnswer === currentExercise.correctAnswer; }

    if (isCorrect) {
      setShowSuccessOverlay(true);
      addMessage(`Excellent ! Bonne réponse pour l'exercice ${currentExerciseIndex + 1}.`, 'ai'); // Utilise addMessage
    } else {
      setInputError(true);
      inputErrorTimeoutRef.current = setTimeout(() => { setInputError(false); inputErrorTimeoutRef.current = null; }, 1000);
      setAiTypingStatus(true); // Utilise la fonction du ChatbotContext
      exerciseAiResponseTimeoutRef.current = setTimeout(() => {
        try {
          let aiResponse = `Ce n'est pas tout à fait ça. Reçue: "${answer}".`;
          if (currentExercise?.hint) aiResponse += ` Indice: ${currentExercise.hint}`;
          if (currentExercise?.questionLatex) aiResponse += ` Recalcule ${currentExercise.questionLatex}.`;
          setAiTypingStatus(false); // Utilise la fonction du ChatbotContext
          addMessage(aiResponse, 'ai'); // Utilise la fonction du ChatbotContext
           exerciseAiResponseTimeoutRef.current = null;
        } catch(error){ console.error(error); setAiTypingStatus(false); }
      }, 1500);
    }
  }, [currentExercise, addMessage, setAiTypingStatus, currentExerciseIndex]); // Dépendances

  const handleContinue = useCallback(() => {
    console.log("ExerciseContext: handleContinue called");
    setShowSuccessOverlay(false);
    setInputError(false);
    if (inputErrorTimeoutRef.current) clearTimeout(inputErrorTimeoutRef.current);
    if (exerciseAiResponseTimeoutRef.current) clearTimeout(exerciseAiResponseTimeoutRef.current);

    const nextIndex = currentExerciseIndex + 1;
    setAiTypingStatus(true); // Utilise la fonction du ChatbotContext
    exerciseAiResponseTimeoutRef.current = setTimeout(() => {
      setAiTypingStatus(false); // Utilise la fonction du ChatbotContext
      if (nextIndex < exercisesData.length) {
        setCurrentExerciseIndex(nextIndex);
        addMessage(`Super ! Exercice suivant (n°${nextIndex + 1}).`, 'ai'); // Utilise addMessage
      } else {
        addMessage('Félicitations, tu as terminé !', 'ai'); // Utilise addMessage
        setCurrentView('home');
      }
       exerciseAiResponseTimeoutRef.current = null;
    }, 800);
  }, [currentExerciseIndex, addMessage, setAiTypingStatus]); // Dépendances

  const handleSettingsClick = useCallback(() => {
    console.log("ExerciseContext: handleSettingsClick called");
    addMessage("Paramètres utilisateur (à implémenter).", "system"); // Utilise addMessage
  }, [addMessage]);

  // Valeur du contexte mémoïsée
  const contextValue = useMemo(() => ({
    // State
    currentView,
    currentExercise,
    showSuccessOverlay,
    inputError,
    // Handlers
    handleNavigate,
    handleAnswerSubmit,
    handleContinue,
    handleSettingsClick,
  }), [
    currentView, currentExercise, showSuccessOverlay, inputError,
    handleNavigate, handleAnswerSubmit, handleContinue, handleSettingsClick
  ]);

  return (
    <ExerciseContext.Provider value={contextValue}>
      {children}
    </ExerciseContext.Provider>
  );
};

// Hook personnalisé pour consommer le contexte Exercice
export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExerciseContext must be used within an ExerciseProvider');
  }
  return context;
};