import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchOrder } from '../services/api';
import { Order } from '../types/order';

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useQuery<Order, Error>({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId!),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading order: {error.message}
      </Alert>
    );
  }

  if (!order) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        Order not found
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Order Details</Typography>
        <Button onClick={() => navigate('/')} variant="outlined">
          Back to Orders
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box display="flex" flexWrap="wrap" sx={{ mx: -1.5 }}>
        <Box width={{ xs: '100%', sm: '50%' }} p={1.5}>
          <Typography variant="subtitle1" color="text.secondary">
            Order ID
          </Typography>
          <Typography variant="body1" gutterBottom>
            {order.orderId}
          </Typography>
        </Box>
        <Box width={{ xs: '100%', sm: '50%' }} p={1.5}>
          <Typography variant="subtitle1" color="text.secondary">
            Customer Name
          </Typography>
          <Typography variant="body1" gutterBottom>
            {order.customerName}
          </Typography>
        </Box>
        <Box width={{ xs: '100%', sm: '50%' }} p={1.5}>
          <Typography variant="subtitle1" color="text.secondary">
            Amount
          </Typography>
          <Typography variant="body1" gutterBottom>
            ${order.amount.toFixed(2)}
          </Typography>
        </Box>
        <Box width={{ xs: '100%', sm: '50%' }} p={1.5}>
          <Typography variant="subtitle1" color="text.secondary">
            Status
          </Typography>
          <Typography variant="body1" gutterBottom>
            {order.status}
          </Typography>
        </Box>
        <Box width={{ xs: '100%', sm: '50%' }} p={1.5}>
          <Typography variant="subtitle1" color="text.secondary">
            Order Date
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(order.orderDate).toLocaleString()}
          </Typography>
        </Box>
        {order.invoiceUrl && (
          <Box width="100%" p={1.5}>
            <Typography variant="subtitle1" color="text.secondary">
              Invoice
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.open(order.invoiceUrl, '_blank')}
              sx={{ mt: 1 }}
            >
              Download Invoice
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default OrderDetails; 