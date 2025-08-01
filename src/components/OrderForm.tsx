import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../services/api';
import { Order } from '../types/order';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const createOrderMutation = useMutation({
    mutationFn: (formData: FormData) => createOrder(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate('/');
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const orderData: Partial<Order> = {
      customerName: formData.get('customerName') as string,
      amount: parseFloat(formData.get('amount') as string),
      status: 'PENDING',
    };

    const submitFormData = new FormData();
    submitFormData.append('order', new Blob([JSON.stringify(orderData)], { type: 'application/json' }));

    const invoiceFile = formData.get('invoice') as File;
    if (invoiceFile && invoiceFile.size > 0) {
      submitFormData.append('invoice', invoiceFile);
    }

    createOrderMutation.mutate(submitFormData);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create New Order
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            required
            name="customerName"
            label="Customer Name"
            fullWidth
          />
          <TextField
            required
            name="amount"
            label="Amount"
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            fullWidth
          />
          <TextField
            name="invoice"
            type="file"
            inputProps={{ accept: 'application/pdf' }}
            fullWidth
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              type="button"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createOrderMutation.isPending}
            >
              {createOrderMutation.isPending ? 'Creating...' : 'Create Order'}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default OrderForm; 