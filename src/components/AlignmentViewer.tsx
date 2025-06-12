import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../colors';

interface Props {
  seq1: string;
  seq2: string;
}

export const AlignmentViewer: React.FC<Props> = ({ seq1, seq2 }) => {
  const renderLine = (s: string) => (
    <Box display="flex" flexWrap="wrap" gap={0.1} marginBottom={1}>
      {s.split('').map((ch, i) => {
        const bg = COLORS[ch] || "#FFFFFF";
        return (
          <Box
            key={i}
            sx={{
              width: '30px',
              height: '30px',
              p: 0.5,
              backgroundColor: bg,
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            {ch}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box mt={2}>
      {renderLine(seq1)}
      {renderLine(seq2)}
    </Box>
  );
};