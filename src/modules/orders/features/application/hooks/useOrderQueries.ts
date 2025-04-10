import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderApiRepository } from '../../infrastructure/OrderApiRepository';
import { 
  OrderCreateRequest, 
  OrderUpdateRequest, 
  ResponseOrder 
} from '../../domain/entities/OrderEntity';

// Instancia singleton del repositorio
const orderRepository = new OrderApiRepository();

// Claves para las queries
export const orderKeys = {
  all: ['orders'] as const,
  details: (id: string) => [...orderKeys.all, id] as const,
};

// Hook para obtener todas las órdenes
export function useGetOrders() {
  return useQuery<ResponseOrder, Error>({
    queryKey: orderKeys.all,
    queryFn: () => orderRepository.getAllOrders(),
  });
}

// Hook para obtener una orden por ID
export function useGetOrderById(id: string) {
  return useQuery<ResponseOrder, Error>({
    queryKey: orderKeys.details(id),
    queryFn: () => orderRepository.getOrderById(id),
    enabled: !!id, // Solo se ejecuta si hay un ID
  });
}

// Hook para crear una orden
export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseOrder, Error, OrderCreateRequest>({
    mutationFn: (order) => orderRepository.createOrder(order),
    onSuccess: () => {
      // Invalida la caché de todas las órdenes para forzar una recarga
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}

// Hook para actualizar una orden
export function useUpdateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseOrder, Error, OrderUpdateRequest>({
    mutationFn: (order) => orderRepository.updateOrder(order),
    onSuccess: (_, variables) => {
      // Invalida tanto la lista completa como los detalles de la orden específica
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: orderKeys.details(variables.id) });
      }
    },
  });
}

// Hook para eliminar una orden
export function useDeleteOrder() {
  const queryClient = useQueryClient();
  
  return useMutation<ResponseOrder, Error, string>({
    mutationFn: (id) => orderRepository.deleteOrder(id),
    onSuccess: (_, id) => {
      // Invalida la caché de todas las órdenes
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      // Elimina la caché de la orden específica
      queryClient.removeQueries({ queryKey: orderKeys.details(id) });
    },
  });
}
