import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useExerciseContext } from '../context/ExerciseContext';

const NavigationMenu = () => {
  
  // Obtenir les valeurs/fonctions du contexte
  const { currentView, handleNavigate, handleSettingsClick } = useExerciseContext();
  
  return (
    <Box
      sx={{
        width: 80, // Largeur fixe pour les icônes
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <List component="nav" sx={{ flexGrow: 1 }}>
        <ListItemButton
          selected={currentView === 'home'}
          onClick={() => handleNavigate('home')}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}
          title="Accueil"
        >
          <ListItemIcon sx={{ minWidth: 0 }}>
            <HomeIcon />
          </ListItemIcon>
          {/* Optionnel: ajouter du texte si besoin */}
          {/* <ListItemText primary="Accueil" sx={{ fontSize: '0.7rem', textAlign: 'center', mt: 0.5 }} /> */}
        </ListItemButton>

        <ListItemButton
          selected={currentView === 'video'}
          onClick={() => handleNavigate('video')}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}
          title="Cours Vidéo"
        >
          <ListItemIcon sx={{ minWidth: 0 }}>
            <VideocamIcon />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton
          selected={currentView === 'exercise'}
          onClick={() => handleNavigate('exercise')}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}
          title="Exercices"
        >
          <ListItemIcon sx={{ minWidth: 0 }}>
            <AssignmentIcon />
          </ListItemIcon>
        </ListItemButton>
      </List>

      {/* Avatar/Settings en bas */}
      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center', py: 2 }}>
        <IconButton onClick={handleSettingsClick} title="Paramètres Utilisateur">
          <Avatar sx={{ width: 40, height: 40 }}>
            {/* Vous pouvez mettre une image ou les initiales */}
            E
          </Avatar>
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavigationMenu;