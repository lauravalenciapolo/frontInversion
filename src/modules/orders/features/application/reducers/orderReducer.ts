import { OrderEvent, OrderState } from "../../domain/entities/OrderEntity";

export const orderReducer = (state: OrderState, event: OrderEvent): OrderState => {
  switch (event.type) {
    case "ORDER_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "ORDER_DETAIL_SUCCESS":
      return { ...state, isLoading: false, orderDetails: event.payload };
    case "ORDER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        orders: event.payload ? event.payload : state.orders,
        error: null,
      };
    case "ORDER_FAILURE":
      return {
        ...state,
        isLoading: false,
        orders: [],
        error: event.payload,
      };
    default:
      return state;
  }
};