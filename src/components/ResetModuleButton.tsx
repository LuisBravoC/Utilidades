import { IconButton, Tooltip } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { clearModuleStorage } from '../hooks/storageUtils';
import React from 'react';

interface ResetModuleButtonProps {
  storageKey: string;
  defaultState: any;
  setState: (v: any) => void;
  label?: string;
}

/**
 * Botón reutilizable para restablecer el estado de un módulo y limpiar su localStorage.
 * @param storageKey Clave usada en useLocalStorage
 * @param defaultState Estado por defecto del módulo
 * @param setState Setter del hook useLocalStorage
 * @param label Texto opcional del botón
 */
export function ResetModuleButton({ storageKey, defaultState, setState, label = 'Restablecer módulo' }: ResetModuleButtonProps) {
  return (
    <Tooltip title={label} placement="top">
      <IconButton
        color="secondary"
        size="small"
        onClick={() => {
          clearModuleStorage(storageKey);
          setState(defaultState);
        }}
      >
        <RestartAltIcon />
      </IconButton>
    </Tooltip>
  );
}
