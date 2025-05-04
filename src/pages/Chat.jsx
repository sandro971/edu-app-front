// src/App.js
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

// Importer les composants Structurels
import NavigationMenu from '../components/NavigationMenu';
import MainContent from '../components/MainContent';
import Chatbot from '../components/Chatbot';
import SuccessOverlay from '../components/SuccessOverlay';
import ChatToggleButton from '../components/ChatToggleButton';

// Importer les fournisseurs de contexte
import { ChatbotProvider } from '../context/ChatbotContext';
import { ExerciseProvider } from '../context/ExerciseContext'; // ExerciseProvider DANS ChatbotProvider

function App() {
  return (
    // Le ChatbotProvider englobe tout car ExerciseProvider en dépend
    <ChatbotProvider>
      {/* ExerciseProvider est à l'intérieur */}
      <ExerciseProvider>
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          <CssBaseline />

          {/* Les composants utiliseront le hook approprié pour accéder au contexte */}
          <NavigationMenu />      {/* useExerciseContext */}
          <MainContent />         {/* useExerciseContext */}
          <SuccessOverlay />      {/* useExerciseContext */}
          <Chatbot />             {/* useChatbotContext */}
          <ChatToggleButton />    {/* useChatbotContext */}

        </Box>
      </ExerciseProvider>
    </ChatbotProvider>
  );
}

export default App;