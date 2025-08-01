import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderDetails from './components/OrderDetails';
import Navigation from './components/Navigation';
import { Container } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navigation />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<OrderList />} />
              <Route path="/orders/new" element={<OrderForm />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
