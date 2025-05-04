// src/components/Chatbot.js
import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// Importer les composants enfants directs
import RobotAvatar from './RobotAvatar';
import TypingIndicator from './TypingIndicator';
import TypewriterText from './TypewriterText';
import InputBar from './InputBar'; // Utilise maintenant InputBar

// Importer le hook pour accéder au contexte
import { useChatbotContext } from '../context/ChatbotContext';
import { useExerciseContext } from '../context/ExerciseContext';

const Chatbot = () => {
  // --- Obtenir les valeurs et fonctions depuis le Contexte ---
  const {
    messages,             // La liste des messages à afficher
    isChatOpen,           // Booléen indiquant si le panneau est ouvert
    handleToggleChat,     // Fonction pour ouvrir/fermer le panneau
    isAiTyping,           // Booléen indiquant si l'IA est en train "d'écrire"
    handleChatMessageSubmit // La fonction à appeler quand un message est soumis depuis CET InputBar
  } = useChatbotContext();

  const {
    currentView,
  } = useExerciseContext();

  // Référence pour scroller automatiquement vers le bas
  const messagesEndRef = useRef(null);

  // --- Effet de Bord pour le scroll automatique ---
  useEffect(() => {
    // Scrolle vers le bas lorsque la liste de messages change ou que l'IA commence/arrête de taper
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]); // Dépendances : messages et isAiTyping

  // Le state et les handlers pour le champ de saisie sont maintenant dans InputBar

  // Ne rend rien si le chat n'est pas ouvert
  if (!isChatOpen) return null;

  // --- Rendu JSX ---
  return (
    <Box sx={{
      width: 320, height: '100vh', display: 'flex', flexDirection: 'column',
      borderLeft: 1, borderColor: 'divider', bgcolor: 'background.paper',
      transition: 'width 0.3s ease-in-out', overflow: 'hidden'
    }}>

      {/* En-tête du Chatbot */}
      <Paper square elevation={1} sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RobotAvatar />
          <Typography variant="h6">Assistant IA</Typography>
        </Box>
        {/* Bouton pour fermer (appelle la fonction du contexte) */}
        <IconButton onClick={handleToggleChat} aria-label="Fermer le chat">
          <CloseIcon />
        </IconButton>
      </Paper>
      <Divider sx={{ flexShrink: 0 }} />

      {/* Zone d'affichage des messages */}
      <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {/* Itération sur les messages du contexte */}
        {messages.map((msg) => (
          <ListItem key={msg.id} sx={{ py: 0.5, display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', mb: 1, gap: 1 }}>
            {/* Avatar seulement pour l'IA */}
            {msg.sender === 'ai' && <RobotAvatar />}
            <Box sx={{ maxWidth: '80%' }}>
              <Paper elevation={1} sx={{ p: 1, borderRadius: msg.sender === 'user' ? '10px 10px 0 10px' : '10px 10px 10px 0', bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.200', color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary', wordBreak: 'break-word', display: 'inline-block' }}>
                {/* Effet machine à écrire pour l'IA */}
                {msg.sender === 'ai' ? <TypewriterText text={msg.text} /> : <Typography variant="body2">{msg.text}</Typography>}
              </Paper>
            </Box>
          </ListItem>
        ))}

        {/* Indicateur de frappe de l'IA (conditionnel) */}
        {isAiTyping && (
          <ListItem sx={{ py: 0.5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <RobotAvatar />
            <TypingIndicator />
          </ListItem>
        )}

        {/* Élément vide pour aider au scroll vers le bas */}
        <div ref={messagesEndRef} />
      </List>

      {/* Barre de saisie conditionnelle (si PAS en mode exercice) */}
      {currentView !== 'exercise' && (
        <> {/* Fragment pour Divider + InputBar */}
          <Divider sx={{ flexShrink: 0 }} />
          {/* Utilise le composant InputBar réutilisable */}
          <InputBar
            onSubmit={handleChatMessageSubmit} // Passe la fonction du contexte pour le chat
            placeholder="Votre message..."
            disabled={isAiTyping} // Désactivé si l'IA est en train de répondre
            // sx={{ backgroundColor: 'background.default' }} // Style optionnel
          />
        </>
      )}
    </Box>
  );
};

export default Chatbot;