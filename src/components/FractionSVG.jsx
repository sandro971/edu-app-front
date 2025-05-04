import React from 'react';

// Simple composant pour afficher une fraction en SVG
// Ajustez les tailles/positions si nécessaire
const FractionSVG = ({ numerator, denominator }) => {
  const padding = 5;
  const fontSize = 16;
  const lineHeight = fontSize * 1.2;
  const numText = String(numerator);
  const denText = String(denominator);
  const maxLength = Math.max(numText.length, denText.length);
  const svgWidth = maxLength * fontSize * 0.6 + 2 * padding; // Estimation de la largeur
  const svgHeight = lineHeight * 2 + padding;
  const lineWidth = svgWidth - 2 * padding;
  const lineY = lineHeight + padding / 2;

  return (
    <svg width={svgWidth} height={svgHeight} style={{ verticalAlign: 'middle', margin: '0 4px' }}>
      {/* Numérateur */}
      <text
        x={svgWidth / 2}
        y={lineHeight - 2} // Légèrement au-dessus de la ligne
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="mathematical" // Alignement vertical
      >
        {numText}
      </text>

      {/* Ligne de fraction */}
      <line
        x1={padding}
        y1={lineY}
        x2={padding + lineWidth}
        y2={lineY}
        stroke="black"
        strokeWidth="1.5"
      />

      {/* Dénominateur */}
      <text
        x={svgWidth / 2}
        y={lineHeight + fontSize + padding / 2 - 2} // En dessous de la ligne
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="mathematical" // Alignement vertical
      >
        {denText}
      </text>
    </svg>
  );
};

export default FractionSVG;