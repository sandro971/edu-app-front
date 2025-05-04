// src/components/RobotAvatar.js
import React from 'react';
import Avatar from '@mui/material/Avatar';
import { SvgIcon } from '@mui/material';
import robot from '../assets/robot.svg';

// Icône simple de robot (Source: par exemple, Material Icons ou un SVG custom)
// Adaptez le `viewBox` et le `path` à votre SVG spécifique si vous en utilisez un autre.
const RobotIcon = (props) => (
  <img src={robot} alt="Robot" />
);


const RobotAvatar = () => {
  return (
    // Utilisation de l'Avatar MUI pour un style cohérent (cercle, taille)
    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
      <RobotIcon sx={{ color: 'white' }}/>
    </Avatar>
  );
};

export default RobotAvatar;