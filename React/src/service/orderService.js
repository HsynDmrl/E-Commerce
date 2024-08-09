
import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class OrderService {
    getOrderList(userId) {
        return axiosInstance.get(`/order/list/${userId}`);
    }

    getOrderDetailList(orderId) {
        return axiosInstance.get(`/order/listdetail/${orderId}`);
    }
}

export default new OrderService();
