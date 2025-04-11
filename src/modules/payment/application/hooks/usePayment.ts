import { useState } from 'react';
import { PaymentEntity } from '../../domain/entities/PaymentEntity';
import { PaymentRepository } from '../../domain/repositories/PaymentRepository';

// In a real app, this would be injected
const repository: PaymentRepository

export const usePayment = () => {
  const [items, setItems] = useState<PaymentEntity[]>([]);

  return {
    items,
  };
}; 