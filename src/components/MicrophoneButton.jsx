// src/components/MicrophoneButton.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const isSpeechRecognitionSupported = !!SpeechRecognition;

const MicrophoneButton = ({
  onTranscriptReceived,
  disabled = false,
  language = 'fr-FR',
  activeColor = 'primary',
  inactiveColor = 'inherit',
  ...props
}) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const buttonRef = useRef(null);

  // --- Logique SpeechRecognition (initialisation/callbacks) ---
  useEffect(() => {
    // Cet effet s'exécute au montage et si language ou onTranscriptReceived changent.
    // Il ne doit PAS dépendre de isListening.
    if (!isSpeechRecognitionSupported) return;

    console.log("Effect: Initializing/Re-initializing SpeechRecognition instance...");
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = language;
    recognition.interimResults = false;
    recognitionRef.current = recognition; // Stocker l'instance

    // --- Définition des callbacks ---
    // Ces fonctions sont définies à l'intérieur de l'effet.
    // Elles auront accès à 'setIsListening' et 'onTranscriptReceived' via la clôture.

    recognition.onresult = (event) => {
      console.log("Callback: onresult triggered");
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      onTranscriptReceived(transcript); // Utilise la prop de la clôture
      console.log("Callback: Setting isListening to false in onresult");
      setIsListening(false); // Utilise setIsListening de la clôture
    };

    recognition.onerror = (event) => {
      console.error('Callback: Erreur Speech Recognition:', event.error);
      console.log("Callback: Setting isListening to false in onerror");
      setIsListening(false); // Utilise setIsListening de la clôture
    };

    recognition.onend = () => {
      console.log("Callback: onend triggered");
      // N'a plus besoin de vérifier 'isListening' ici car si onend est appelé,
      // l'écoute est terminée. On met juste à jour l'état.
      // Cependant, vérifier la ref peut éviter une erreur si le nettoyage a déjà eu lieu.
      if(recognitionRef.current) {
          console.log("Callback: Setting isListening to false in onend");
          setIsListening(false); // Utilise setIsListening de la clôture
      } else {
          console.log("Callback: onend triggered but recognitionRef is null (already cleaned up?)");
      }
    };

    // Nettoyage
    return () => {
      console.log("Effect Cleanup: Cleaning up SpeechRecognition instance...");
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
    // UNIQUEMENT language et onTranscriptReceived comme dépendances
  }, [language, onTranscriptReceived]);


  // --- Début/Fin de l'écoute ---
  const handlePress = useCallback(() => {
    // Vérifier si l'instance existe avant de démarrer
    if (!isSpeechRecognitionSupported || !recognitionRef.current || isListening) {
        console.log("handlePress ignored:", { isSupported: isSpeechRecognitionSupported, hasRef: !!recognitionRef.current, isListening });
        return;
    }
    try {
      console.log("handlePress: Starting recognition...");
      setIsListening(true); // <- Met à jour l'état, ce qui déclenche le re-render
      recognitionRef.current.start();
    } catch (error) {
      console.error("MicrophoneButton: Erreur au démarrage:", error);
      setIsListening(false); // Reset si erreur
    }
  }, [isListening]); // Dépend de l'état isListening pour éviter double démarrage

  const handleRelease = useCallback(() => {
    // Vérifier si l'instance existe et si on écoute
    if (!isSpeechRecognitionSupported || !recognitionRef.current || !isListening) {
         console.log("handleRelease ignored:", { isSupported: isSpeechRecognitionSupported, hasRef: !!recognitionRef.current, isListening });
        return;
    }
    console.log("handleRelease: Stopping recognition...");
    recognitionRef.current.stop(); // Déclenchera onend (ou onresult/onerror)
    // Ne pas mettre setIsListening(false) ici
  }, [isListening]); // Dépend de isListening


  // --- EFFET POUR GÉRER LE CLIC EXTÉRIEUR ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Vérifier si l'instance existe et si on écoute avant d'arrêter
        if (isListening && recognitionRef.current) {
            console.log("handleClickOutside: Stopping recognition...");
            recognitionRef.current.stop(); // Déclenchera onend
        }
      }
    };

    if (isListening) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isListening]); // Cet effet dépend *correctement* de isListening


  // --- Rendu JSX (avec la correction de couleur via sx si besoin) ---
  const listeningColor = (theme) => theme.palette[activeColor]?.main || theme.palette.primary.main;
  const notListeningColor = (theme) => theme.palette.action.active;

   if (!isSpeechRecognitionSupported) {
    return null;
  }

  return (
    <IconButton
      ref={buttonRef}
      color={isListening ? activeColor : 'inherit'} // Garder pour sémantique/ripple
      aria-label={isListening ? "Arrêter l'écoute" : "Activer la saisie vocale"}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
      disabled={disabled} // Seulement désactivation externe
      sx={{ // Forcer la couleur de l'icône
          color: isListening ? listeningColor : notListeningColor,
          transition: (theme) => theme.transitions.create('color', {
              duration: theme.transitions.duration.short,
          }),
      }}
      {...props}
    >
      <MicIcon />
    </IconButton>
  );
};


MicrophoneButton.propTypes = {
    onTranscriptReceived: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    language: PropTypes.string,
    activeColor: PropTypes.oneOf(['inherit', 'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    inactiveColor: PropTypes.oneOf(['inherit', 'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
};

export default MicrophoneButton;