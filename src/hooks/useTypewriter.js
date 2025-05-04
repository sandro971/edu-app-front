// src/hooks/useTypewriter.js
import { useState, useEffect, useRef } from 'react';

const useTypewriter = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);
  const timeoutRef = useRef(null); // Pour stocker l'ID du timeout

  useEffect(() => {
    // Réinitialiser si le texte change
    index.current = 0;
    setDisplayedText('');

    // Fonction pour ajouter un caractère
    const typeCharacter = () => {
      if (index.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index.current));
        index.current++;
        // Planifier le prochain caractère
        timeoutRef.current = setTimeout(typeCharacter, speed);
      }
    };

    // Démarrer l'animation
    timeoutRef.current = setTimeout(typeCharacter, speed);

    // Nettoyage : annuler le timeout si le composant est démonté
    // ou si le texte/speed change avant la fin
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed]); // Se ré-exécute si text ou speed change

  return displayedText;
};

export default useTypewriter;