export interface Order {
  orderId: string;
  customerName: string;
  amount: number;
  orderDate: string;
  invoiceUrl?: string;
  status: string;
} 