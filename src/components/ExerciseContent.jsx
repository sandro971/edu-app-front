// src/components/ExerciseContent.js
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MathJax } from "better-react-mathjax";
import { Grid } from '@mui/material';

// Recevoir les props : instructions, questionLatex, hint
const ExerciseContent = ({ instructions, questionLatex, hint }) => {

  return (
    <Grid container flexDirection="column" flexGrow={1} height="100%">
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Exercice : {instructions} {/* Utiliser les instructions */}
        </Typography>
      </Grid>
      {/* <Typography variant="body1" paragraph>
        {instructions} {/* Déplacé dans le titre pour cet exemple *}
      </Typography> */}

      {/* Afficher la question LaTeX */}
      <Grid item xs={12} sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', my: 3, minHeight: '40px' /* Pour éviter les sauts de layout */ }}>
           {/* Utiliser le mode display ($$) pour centrer */}
           <MathJax dynamic>{`$$${questionLatex} = ?$$`}</MathJax>
        </Typography>
      </Grid>

      {/* Afficher l'indice s'il existe */}
      <Grid item xs={12}>
      {hint && (
        <Typography variant="body2" color="text.secondary">
            (Indice : {hint})
        </Typography>
      )}
      </Grid>
    </Grid>
  );
};

export default ExerciseContent;