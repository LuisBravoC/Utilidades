import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface GlassBoxProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export default function GlassBox({ children, sx }: GlassBoxProps) {
  return (
    <Box
      sx={{
        px: 5,
        py: 3,
        borderRadius: 4,
        background: 'rgba(80,180,255,0.18)',
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
        border: '1.5px solid rgba(80,180,255,0.25)',
        backdropFilter: 'blur(8px)',
        color: 'primary.contrastText',
        minWidth: 220,
        textAlign: 'center',
        fontWeight: 700,
        fontSize: { xs: 24, sm: 32 },
        letterSpacing: 1,
        transition: 'background 0.3s',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}