import { create } from "zustand";
import { OrderApiRepository } from "../../infrastructure/OrderApiRepository";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { OrderCreateRequest, OrderState, OrderUpdateRequest } from "../../domain/entities/OrderEntity";
import { orderReducer } from "../reducers/orderReducer";

const repository: OrderRepository = new OrderApiRepository();

export const useOrderStore = create<
OrderState & OrderRepository
>((set) => ({
  orders: [],
  orderDetails: [],
  isLoading: false,
  error: null,

  getOrderById: async (id: string) => {
    set((state) => orderReducer(state, { type: "ORDER_REQUEST" }));
    try {
      const result = await repository.getOrderById(id);
      if (result.success && result.data) {
        set((state) =>
          orderReducer(state, { type: "ORDER_DETAIL_SUCCESS", payload: result.data })
        );
        return result;
      } else {
        set((state) =>
          orderReducer(state, { type: "ORDER_FAILURE", payload: result.error })
        );
        return result;
      }
    } catch (error) {
      set((state) =>
        orderReducer(state, {
          type: "ORDER_FAILURE",
          payload: "An unexpected error occurred",
        })
      );
      return { success: false, error: "An unexpected error occurred" };
    }
  },

  getAllOrders: async () => { 
        set((state) => orderReducer(state, { type: "ORDER_REQUEST" }));
        try {
          const result = await repository.getAllOrders();
          if (result.success && result.data) {
            set((state) =>
              orderReducer(state, { type: "ORDER_SUCCESS", payload: result.data })
            );
            return result;
          } else {
            set((state) =>
              orderReducer(state, { type: "ORDER_FAILURE", payload: result.error })
            );
            return result;
          }
        } catch (error) {
          set((state) =>
            orderReducer(state, {
              type: "ORDER_FAILURE",
              payload: "An unexpected error occurred",
            })
          );
          return { success: false, error: "An unexpected error occurred" };
          }
  },

  createOrder: async (order: OrderCreateRequest) => { 
    set((state) => orderReducer(state, { type: "ORDER_REQUEST" }));
    try {
      const result = await repository.createOrder(order);
      if (result.success && result.data) {
        set((state) =>
          orderReducer(state, { type: "ORDER_SUCCESS" })
        );
        return result;
      } else {
        set((state) =>
          orderReducer(state, { type: "ORDER_FAILURE", payload: result.error })
        );
        return result;
      }
    } catch (error) {
      set((state) =>
        orderReducer(state, {
          type: "ORDER_FAILURE",
          payload: "An unexpected error occurred",
        })
      );
      return { success: false, error: "An unexpected error occurred" };
      }
  },

updateOrder: async (order: OrderUpdateRequest) => { 
  set((state) => orderReducer(state, { type: "ORDER_REQUEST" }));
  try {
    const result = await repository.updateOrder(order);
    if (result.success && result.data) {
      set((state) =>
        orderReducer(state, { type: "ORDER_SUCCESS" })
      );
      return result;
    } else {
      set((state) =>
        orderReducer(state, { type: "ORDER_FAILURE", payload: result.error })
      );
      return result;
    }
  } catch (error) {
    set((state) =>
      orderReducer(state, {
        type: "ORDER_FAILURE",
        payload: "An unexpected error occurred",
      })
    );
    return { success: false, error: "An unexpected error occurred" };
    }
},

deleteOrder: async (id: string) => { 
  set((state) => orderReducer(state, { type: "ORDER_REQUEST" }));
  try {
    const result = await repository.deleteOrder(id);
    if (result.success && result.data) {
      set((state) =>
        orderReducer(state, { type: "ORDER_SUCCESS" })
      );
      return result;
    } else {
      set((state) =>
        orderReducer(state, { type: "ORDER_FAILURE", payload: result.error })
      );
      return result;
    }
  } catch (error) {
    set((state) =>
      orderReducer(state, {
        type: "ORDER_FAILURE",
        payload: "An unexpected error occurred",
      })
    );
    return { success: false, error: "An unexpected error occurred" };
    }
}
}));
