

import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton, ThemeProvider, createTheme, Button } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Home from './modules/Home';
import UnitConverter from './modules/UnitConverter';
import CurrencyConverter from './modules/CurrencyConverter';
import { MonetizationOn, SquareFoot } from '@mui/icons-material';


const drawerWidth = 240;

const defaultMenuItems = [
  { id: 'home', text: 'Inicio', icon: <HomeIcon />, path: '/' },
  { id: 'unit', text: 'Conversor de Unidades', icon: <SquareFoot />, path: '/conversor' },
  { id: 'currency', text: 'Conversor de Monedas', icon: <MonetizationOn />, path: '/monedas' },
  //{ id: 'example', text: 'Nueva Herramienta', icon: <Build />, path: '/nueva' },
  // Agrega aquí más herramientas
];
// Tipos para los props
type MenuItemType = {
  id: string;
  text: string;
  icon: JSX.Element;
  path: string;
};

interface SortableListItemProps {
  item: MenuItemType;
  selected: boolean;
  onClick: () => void;
  reorderMode: boolean;
}

function SortableListItem({ item, selected, onClick, reorderMode }: SortableListItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, disabled: !reorderMode });
  return (
    <ListItem
      disablePadding
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 999 : 'auto',
        userSelect: 'none',
        background: isDragging ? 'rgba(96,165,250,0.10)' : undefined,
      }}
      {...attributes}
    >
      {reorderMode && (
        <span
          {...listeners}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'grab',
            marginRight: 4,
            color: isDragging ? '#2563eb' : '#aaa',
            opacity: 0.7,
          }}
          tabIndex={-1}
          aria-label="Mover"
        >
          <DragIndicatorIcon fontSize="small" />
        </span>
      )}
      <ListItemButton
        component={Link}
        to={item.path}
        onClick={onClick}
        selected={selected}
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
  );
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
  const [reorderMode, setReorderMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('menuOrder');
    if (saved) {
      try {
        const ids: string[] = JSON.parse(saved);
        // reconstruir el orden y agregar nuevos items al final
        const ordered = ids
          .map((id) => defaultMenuItems.find((item) => item.id === id))
          .filter(Boolean) as typeof defaultMenuItems;
        const missing = defaultMenuItems.filter(
          (item) => !ordered.some((o) => o.id === item.id)
        );
        return [...ordered, ...missing];
      } catch {
        return defaultMenuItems;
      }
    }
    return defaultMenuItems;
  });

  useEffect(() => {
    localStorage.setItem('menuOrder', JSON.stringify(menuItems.map((item) => item.id)));
  }, [menuItems]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { delay: 0, tolerance: 5 } }));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = menuItems.findIndex((i: MenuItemType) => i.id === active.id);
      const newIndex = menuItems.findIndex((i: MenuItemType) => i.id === over.id);
      setMenuItems((items: MenuItemType[]) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const drawer = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={menuItems.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <List sx={{ flex: 1 }}>
            {menuItems.map((item) => (
              <SortableListItem
                key={item.id}
                item={item}
                selected={window.location.hash.endsWith(item.path)}
                onClick={() => setMobileOpen(false)}
                reorderMode={reorderMode}
              />
            ))}
          </List>
        </SortableContext>
      </DndContext>
      <Box sx={{ p: 2, mt: 'auto', display: 'flex', justifyContent: 'center' }}>
        <Button
          variant={reorderMode ? 'contained' : 'outlined'}
          color={reorderMode ? 'primary' : 'inherit'}
          startIcon={<DragIndicatorIcon />}
          onClick={() => setReorderMode((v) => !v)}
          sx={{
            fontWeight: 700,
            borderRadius: 3,
            boxShadow: reorderMode ? 3 : 0,
            background: reorderMode ? 'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)' : undefined,
            color: reorderMode ? '#fff' : 'text.primary',
            '&:hover': {
              background: reorderMode ? 'linear-gradient(90deg, #1e40af 60%, #60a5fa 100%)' : undefined,
            },
            transition: 'all 0.2s',
          }}
        >
          {reorderMode ? 'Modo reordenar' : 'Reordenar menú'}
        </Button>
      </Box>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ mt: 0.5, zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 2 }}>
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
                {/* <Route path="/nueva" element={<ExampleTool />} /> */}
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
