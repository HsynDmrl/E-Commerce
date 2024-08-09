import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class PurchaseService {
    completePurchase(userId) {
        return axiosInstance.post(`/purchase/complete/${userId}`);
    }
}

export default new PurchaseService();
