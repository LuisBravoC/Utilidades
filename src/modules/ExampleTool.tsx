import GlassCard from '../components/GlassCard';
import { Typography } from '@mui/material';

export default function ExampleTool() {
  return (
    <GlassCard>
      <Typography variant="h4" gutterBottom>
        Nueva Herramienta
      </Typography>
      <Typography>
        ¡Esta es una plantilla para una nueva utilidad! Puedes empezar a construir aquí.
      </Typography>
    </GlassCard>
  );
}
