import { Box, Paper } from '@mui/material';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  sx?: any;
}

export default function GlassCard({ children, sx }: GlassCardProps) {
  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 3, sm: 5 },
        maxWidth: { xs: 400, sm: 600 },
        minWidth: { sm: 420 },
        mx: 'auto',
        borderRadius: 5,
        boxShadow: '0 8px 90px 0 rgba(31,38,135,0.18)',
        //border: '1.5px solid rgba(80,180,255,0.18)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}
