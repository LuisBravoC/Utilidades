import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Box, TextField, MenuItem, Typography, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { ResetModuleButton } from '../components/ResetModuleButton';
import GlassCard from '../components/GlassCard';
import GlassBox from '../components/GlassBox';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { HeaderWithReset } from '../components/HeaderWithReset';


const CurrencyConverter: React.FC = () => {
  const defaultState = { amount: 1, from: 'USD', to: 'MXN' };
  const storageKey = 'currencyConverterState';
  const [state, setState] = useLocalStorage(storageKey, defaultState);
  const { amount, from, to } = state;
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<{ code: string; name: string }[]>([]);
  const [currenciesLoading, setCurrenciesLoading] = useState(true);

    // Fetch supported currencies once
    useEffect(() => {
      setCurrenciesLoading(true);
      fetch('https://api.frankfurter.app/currencies')
        .then(res => res.json())
        .then(data => {
    const arr = Object.entries(data).map(([code, name]) => ({ code, name: name as string }));
    setCurrencies(arr);
          setCurrenciesLoading(false);
        })
        .catch(() => setCurrenciesLoading(false));
    }, []);

    // Fetch rates when 'from' changes
    useEffect(() => {
      setLoading(true);
      fetch(`https://api.frankfurter.app/latest?from=${from}`)
        .then(res => res.json())
        .then(data => {
          setRates(data.rates);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [from]);

    // Calculate result
    useEffect(() => {
      if (rates && to in rates) {
        setResult((amount * rates[to]).toFixed(4));
      } else if (from === to) {
        setResult(amount.toString());
      } else {
        setResult('');
      }
    }, [amount, from, to, rates]);

    return (
      <GlassCard>
        <HeaderWithReset
          title="Conversor de Monedas"
          resetButton={<ResetModuleButton storageKey={storageKey} defaultState={defaultState} setState={setState} />}
        />
        <Box display="flex" gap={2} mb={3} width="100%">
          <TextField
            label="Cantidad"
            type="number"
            value={amount}
            onChange={e => setState(s => ({ ...s, amount: Number(e.target.value) }))}
            fullWidth
            size="medium"
          />
        </Box>
        <Box display="flex" gap={2} mb={3} width="100%" alignItems="center">
          <TextField
            select
            label="De"
            value={from}
            onChange={e => setState(s => ({ ...s, from: e.target.value }))}
            fullWidth
            size="medium"
            disabled={currenciesLoading}
          >
            {currenciesLoading ? (
              <MenuItem value="" disabled>Cargando...</MenuItem>
            ) : (
              currencies.map(c => (
                <MenuItem key={c.code} value={c.code}>{c.name} ({c.code})</MenuItem>
              ))
            )}
          </TextField>
          <Tooltip title="Intercambiar monedas">
            <IconButton
              color="primary"
              sx={{ mx: 1, my: { xs: 2, sm: 0 } }}
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
            onChange={e => setState(s => ({ ...s, to: e.target.value }))}
            fullWidth
            size="medium"
            disabled={currenciesLoading}
          >
            {currenciesLoading ? (
              <MenuItem value="" disabled>Cargando...</MenuItem>
            ) : (
              currencies.map(c => (
                <MenuItem key={c.code} value={c.code}>{c.name} ({c.code})</MenuItem>
              ))
            )}
          </TextField>
        </Box>
        <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <GlassBox>
            <Typography variant="subtitle2" sx={{ color: 'secondary.light', mb: 1, fontWeight: 500, letterSpacing: 1 }}>
              Resultado
            </Typography>
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                {result} {to}
              </Typography>
            )}
          </GlassBox>
        </Box>
      </GlassCard>
    );
  };

export default CurrencyConverter;
