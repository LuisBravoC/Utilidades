import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface HeaderWithResetProps {
  title: string;
  resetButton: ReactNode;
}

export function HeaderWithReset({ title, resetButton }: HeaderWithResetProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%" gap={1}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mr: 1, mb: 4 }}>
        {title}
      </Typography>
      <Box sx={{ mt: { xs: 0.5, sm: -2.7 } }}>
        {resetButton}
      </Box>
    </Box>
  );
}
