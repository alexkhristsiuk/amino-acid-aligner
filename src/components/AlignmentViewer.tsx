import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../colors';

interface Props {
  seq1: string;
  seq2: string;
}

export const AlignmentViewer: React.FC<Props> = ({ seq1, seq2 }) => {
  return (
    <Box mt={2}>
      <Box display="flex" flexWrap="wrap" gap={0.1} mb={1}>
        {seq1.split('').map((ch, i) => (
          <Box
            key={i}
            sx={{
              width: '30px',
              height: '30px',
              p: 0.5,
              backgroundColor: COLORS[ch] || "#FFFFFF",
              borderRadius: '4px',
              textAlign: 'center',
              fontFamily: 'monospace',
            }}
          >
            {ch}
          </Box>
        ))}
      </Box>
      <Box display="flex" flexWrap="wrap" gap={0.1}>
        {seq2.split('').map((ch, i) => {
          const isDiff = ch !== seq1[i];
          const bg = isDiff ? COLORS[ch] || "#FFFFFF" : "transparent";
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
                fontFamily: 'monospace',
              }}
            >
              {ch}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};