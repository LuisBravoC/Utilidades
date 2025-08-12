# Utilidades Web

Proyecto web modular con Vite + React + TypeScript + Material-UI (MUI) + React Router.

## Estructura
- Menú lateral responsivo
- Cada herramienta es un módulo/página
- Fácil de expandir

## Scripts
- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila para producción
- `npm run preview` — Previsualiza la build

## Stack
- Vite
- React
- TypeScript
- Material-UI (MUI)
- React Router

## Expansión
Agrega nuevas utilidades creando un nuevo componente y añadiéndolo al menú y rutas.
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
