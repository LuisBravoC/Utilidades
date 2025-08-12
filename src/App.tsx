

import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton, ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import Home from './modules/Home';
import UnitConverter from './modules/UnitConverter';
import CurrencyConverter from './modules/CurrencyConverter';
import { MonetizationOn, SquareFoot } from '@mui/icons-material';


const drawerWidth = 240;

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/' },
  { text: 'Conversor de Unidades', icon: <SquareFoot />, path: '/conversor' },
  { text: 'Conversor de Monedas', icon: <MonetizationOn />, path: '/monedas' },
  // Agrega aquí más herramientas
];

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2563eb', // azul sutil
    },
    secondary: {
      main: '#60a5fa', // azul claro
    },
    background: {
      default: '#181c24',
      paper: '#232936',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    h6: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(35,41,54,0.95)',
          color: '#fff',
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
          borderRadius: '0 18px 18px 0',
          borderRight: '1.5px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 10px',
          transition: 'background 0.2s',
          '&.Mui-selected, &.Mui-selected:hover': {
            background: 'rgba(96,165,250,0.18)',
            color: '#60a5fa',
          },
          '&:hover': {
            background: 'rgba(96,165,250,0.10)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(24,28,36,0.95)',
          boxShadow: '0 4px 24px 0 rgba(31,38,135,0.15)',
          borderBottom: '1.5px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          background: 'rgba(35,41,54,0.85)',
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                '&.Mui-selected, &.Mui-selected:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                },
                color: '#fff',
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 2 }}>
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Utilidades Web
              </Typography>
            </Toolbar>
          </AppBar>
          <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{
            flexGrow: 1,
            p: 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: 'background.default',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s',
          }}>
            <Box sx={{
              width: '100%',
              maxWidth: 900,
              px: { xs: 1, sm: 3 },
              boxSizing: 'border-box',
            }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/conversor" element={<UnitConverter />} />
                <Route path="/monedas" element={<CurrencyConverter />} />
                {/* Agrega más rutas aquí */}
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
