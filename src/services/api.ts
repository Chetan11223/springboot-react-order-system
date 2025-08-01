import axios from 'axios';
import { Order } from '../types/order';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders');
  return response.data;
};

export const fetchOrder = async (orderId: string): Promise<Order> => {
  const response = await api.get<Order>(`/orders/${orderId}`);
  return response.data;
};

export const createOrder = async (orderData: FormData): Promise<Order> => {
  const response = await api.post<Order>('/orders', orderData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateOrder = async (orderId: string, order: Partial<Order>): Promise<Order> => {
  const response = await api.put<Order>(`/orders/${orderId}`, order);
  return response.data;
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  await api.delete(`/orders/${orderId}`);
};

export const getInvoiceUrl = async (orderId: string): Promise<string> => {
  const response = await api.get<string>(`/orders/${orderId}/invoice`);
  return response.data;
}; 