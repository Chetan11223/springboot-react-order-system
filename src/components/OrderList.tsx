import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { fetchOrders } from '../services/api';
import { Order } from '../types/order';

const OrderList: React.FC = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, error } = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <Typography>Loading orders...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading orders: {error.message}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={() => navigate(`/orders/${order.orderId}`)}
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  {order.invoiceUrl && (
                    <Tooltip title="Download Invoice">
                      <IconButton
                        onClick={() => window.open(order.invoiceUrl, '_blank')}
                        size="small"
                      >
                        <FileDownloadIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderList; 