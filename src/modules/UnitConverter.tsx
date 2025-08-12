import { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Typography, IconButton, Tooltip, Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import GlassCard from '../components/GlassCard';
import GlassBox from '../components/GlassBox';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ResetModuleButton } from '../components/ResetModuleButton';
import { HeaderWithReset } from '../components/HeaderWithReset';

const units = [
  { label: 'Kilómetros', short: 'km', value: 0.001 },
  { label: 'Metros', short: 'm', value: 1 },
  { label: 'Centímetros', short: 'cm', value: 100 },
  { label: 'Milímetros', short: 'mm', value: 1000 },
  { label: 'Micrómetros', short: 'µm', value: 1_000_000 },
  { label: 'Nanómetros', short: 'nm', value: 1_000_000_000 },
  { label: 'Pulgadas', short: 'in', value: 39.3701 },
  { label: 'Pies', short: 'ft', value: 3.28084 },
  { label: 'Yardas', short: 'yd', value: 1.09361 },
  { label: 'Millas', short: 'mi', value: 0.000621371 },
  { label: 'Millas náuticas', short: 'nmi', value: 0.000539957 },
];

export default function UnitConverter() {
  const defaultState = { from: 1, to: 100, value: 1 };
  const storageKey = 'unitConverterState';
  const [state, setState] = useLocalStorage(storageKey, defaultState);
  const { from, to, value } = state;
  const [result, setResult] = useState(0);

  const handleConvert = (val: number, from: number, to: number) => {
    setResult((val * to) / from);
  };

  useEffect(() => {
    handleConvert(value, from, to);
  }, [value, from, to]);

  return (
    <GlassCard sx={{ mt: { xs: 2, sm: 0 } }}>
      <HeaderWithReset
                title="Conversor de Unidades"
                resetButton={<ResetModuleButton storageKey={storageKey} defaultState={defaultState} setState={setState} />}
      />
      <Box display="flex" gap={2} mb={3} width="100%" alignItems="center">
        <TextField
          label="Valor"
          type="number"
          value={value}
          onChange={e => {
            const v = Number(e.target.value);
            setState(s => ({ ...s, value: v }));
          }}
          fullWidth
          size="medium"
        />
      </Box>
      <Box display="flex" gap={2} mb={3} width="100%" alignItems="center">
        <TextField
          select
          label="De"
          value={from}
          onChange={e => {
            const v = Number(e.target.value);
            setState(s => ({ ...s, from: v }));
          }}
          fullWidth
          size="medium"
        >
          {units.map(u => (
            <MenuItem key={u.label} value={u.value}>{u.label}</MenuItem>
          ))}
        </TextField>
        <Tooltip title="Intercambiar unidades">
          <IconButton
            color="primary"
            sx={{ mx: 0.1, my: { xs: 2, sm: 0 } }}
            onClick={() => {
              setState(s => ({ ...s, from: s.to, to: s.from }));
            }}
            size="large"
          >
            <SwapHorizIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <TextField
          select
          label="A"
          value={to}
          onChange={e => {
            const v = Number(e.target.value);
            setState(s => ({ ...s, to: v }));
          }}
          fullWidth
          size="medium"
        >
          {units.map(u => (
            <MenuItem key={u.label} value={u.value}>{u.label}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <GlassBox>
          <Typography variant="subtitle2" sx={{ color: 'secondary.light', mb: 1, fontWeight: 500, letterSpacing: 1 }}>
            Resultado
          </Typography>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
            {result} {units.find(u => u.value === to)?.short.toUpperCase()}
          </Typography>
        </GlassBox>
      </Box>
    </GlassCard>
  );
}
