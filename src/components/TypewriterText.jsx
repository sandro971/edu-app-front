// src/components/TypewriterText.js
import React from 'react';
import useTypewriter from '../hooks/useTypewriter';

const TypewriterText = ({ text, speed = 30 }) => { // Vitesse par défaut un peu plus rapide
  const displayedText = useTypewriter(text, speed);

  return <>{displayedText}</>; // Affiche le texte en cours d'écriture
};

export default TypewriterText;