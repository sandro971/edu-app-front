// src/components/ChatToggleButton.jsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ChatIcon from '@mui/icons-material/Chat';
import { useChatbotContext } from '../context/ChatbotContext'; // Importer le hook
import { Box } from '@mui/material';

const ChatToggleButton = () => {
  // Obtenir les valeurs nécessaires depuis le contexte
  const { isChatOpen, unreadCount, handleToggleChat } = useChatbotContext();

  // Ne rien rendre si le chat est déjà ouvert
  if (isChatOpen) {
    return null;
  }

  return (
    <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}>
      <Badge
        badgeContent={unreadCount}
        color="error"
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <IconButton
          onClick={handleToggleChat} // Appelle la fonction du contexte
          sx={{
            backgroundColor: 'primary.main', color: 'white',
            '&:hover': { backgroundColor: 'primary.dark' }
          }}
          aria-label={`Ouvrir le chat (${unreadCount} nouveaux messages)`}
        >
          <ChatIcon />
        </IconButton>
      </Badge>
    </Box>
  );
};

export default ChatToggleButton;