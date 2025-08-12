import { Typography, Paper } from '@mui/material';

export default function Home() {
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, textAlign: 'center', background: 'rgba(35,41,54,0.85)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)', m: 0 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1 }}>
        Bienvenido a Utilidades Web
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Selecciona una herramienta del menú lateral para comenzar.
      </Typography>
      <Typography variant="body2" sx={{ color: 'secondary.light', mt: 2 }}>
        Plataforma modular y moderna para tus utilidades diarias.
      </Typography>
    </Paper>
  );
}
