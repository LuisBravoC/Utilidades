import { useState } from 'react';
import { Box, TextField, MenuItem, Typography, Paper } from '@mui/material';

const units = [
  { label: 'Metros', value: 1 },
  { label: 'Centímetros', value: 100 },
  { label: 'Milímetros', value: 1000 },
  { label: 'Pulgadas', value: 39.3701 },
  { label: 'Pies', value: 3.28084 },
];

export default function UnitConverter() {
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(100);
  const [value, setValue] = useState(1);
  const [result, setResult] = useState(1);

  const handleConvert = (val: number, from: number, to: number) => {
    setResult((val * to) / from);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Conversor de Unidades</Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Valor"
          type="number"
          value={value}
          onChange={e => {
            const v = Number(e.target.value);
            setValue(v);
            handleConvert(v, from, to);
          }}
          fullWidth
        />
      </Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          select
          label="De"
          value={from}
          onChange={e => {
            const v = Number(e.target.value);
            setFrom(v);
            handleConvert(value, v, to);
          }}
          fullWidth
        >
          {units.map(u => (
            <MenuItem key={u.label} value={u.value}>{u.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="A"
          value={to}
          onChange={e => {
            const v = Number(e.target.value);
            setTo(v);
            handleConvert(value, from, v);
          }}
          fullWidth
        >
          {units.map(u => (
            <MenuItem key={u.label} value={u.value}>{u.label}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Typography variant="subtitle1">Resultado: {result}</Typography>
    </Paper>
  );
}
