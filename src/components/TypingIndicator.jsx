// src/components/TypingIndicator.js
import React from 'react';
import Box from '@mui/material/Box';
import './TypingIndicator.css'; // Fichier CSS pour l'animation

const TypingIndicator = () => {
  return (
    <Box className="typing-indicator" sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      <span></span>
      <span></span>
      <span></span>
    </Box>
  );
};

export default TypingIndicator;