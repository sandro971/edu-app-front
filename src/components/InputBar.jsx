// src/components/InputBar.jsx
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import MicrophoneButton from './MicrophoneButton'; // Le bouton gérant SpeechRecognition

const InputBar = ({
  onSubmit,
  placeholder,
  disabled = false, // Désactivation externe (overlay, transition, AI typing)
}) => {
  const [inputValue, setInputValue] = useState('');

  // Mise à jour de l'état local lors de la saisie
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Mise à jour de l'état local depuis le micro
  const handleTranscriptReceived = useCallback((transcript) => {
    setInputValue(transcript);
  }, []);

  // Gestion de la soumission
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !disabled) { // Vérifier aussi disabled ici
      onSubmit(trimmedValue); // Appeler la fonction du parent
      setInputValue('');      // Vider le champ local
    }
  };

  return (
    // Utilisation d'un Grid container directement comme racine logique
    // Le parent (MainContent/Chatbot) fournira le conteneur visuel (Paper, Box) et le style
    <Grid
        component="form" // Le Grid peut être un formulaire
        onSubmit={handleSubmit}
        container
        spacing={1}
        alignItems="center"
        wrap="nowrap"
        sx={{ p: 1 }} // Ajouter un peu de padding interne par défaut
    >
      {/* Colonne Microphone */}
      <Grid item xs="auto">
        <MicrophoneButton
          onTranscriptReceived={handleTranscriptReceived}
          // Le bouton micro est désactivé uniquement par la prop externe
          disabled={disabled}
        />
      </Grid>

      {/* Colonne Input */}
      <Grid item flexGrow={1}>
        <TextField
          fullWidth
          variant="standard"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          InputProps={{ disableUnderline: true }}
          autoComplete="off"
          // Le champ est désactivé par la prop externe
          disabled={disabled}
        />
      </Grid>

      {/* Colonne Bouton Envoyer */}
      <Grid item xs="auto">
        <IconButton
          type="submit"
          color="primary"
          aria-label="Envoyer"
          // Désactivé par la prop externe OU si le champ est vide
          disabled={disabled || !inputValue.trim()}
        >
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

InputBar.propTypes = {
  /** Fonction appelée avec le texte soumis */
  onSubmit: PropTypes.func.isRequired,
  /** Texte indicatif du champ de saisie */
  placeholder: PropTypes.string,
  /** Désactive toute la barre */
  disabled: PropTypes.bool,
};

InputBar.defaultProps = {
  placeholder: 'Saisissez votre texte...',
  disabled: false,
};

export default InputBar;