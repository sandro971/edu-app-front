import React from 'react';
import Chat from '../pages/Chat';
import { MathJaxContext } from "better-react-mathjax"; // Importer le contexte
import { Route, Routes } from 'react-router-dom';

// Configuration de base pour MathJax
// Utilise l'entrée TeX et la sortie SVG
const config = {
  loader: { load: ["[tex]/html"] }, // Charge l'extension pour le rendu HTML/CSS (nécessaire pour certaines fonctionnalités)
                                  // Bien que nous visions SVG, cela peut aider pour la compatibilité
  tex: {
    packages: { "[+]": ["html"] }, // Charge le package html pour TeX
    inlineMath: [["$", "$"], ["\\(", "\\)"]], // Délimiteurs pour les maths en ligne
    displayMath: [["$$", "$$"], ["\\[", "\\]"]], // Délimiteurs pour les maths en affichage bloc
    processEscapes: true // Traite les échappements comme \$, etc.
  },
  svg: {
    fontCache: 'global' // Optimisation du cache des polices SVG
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"], // Balises à ignorer
    ignoreHtmlClass: "tex2jax_ignore", // Classe CSS pour ignorer des éléments
    processHtmlClass: "tex2jax_process" // Classe CSS pour forcer le traitement
  }
};


const AllRoutes = () => {
  return (
    <MathJaxContext version={3} config={config}>
      <Chat />
    </MathJaxContext>
  );
};

export default AllRoutes;