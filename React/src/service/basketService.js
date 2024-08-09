import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class BasketService {
    addBasketItem(basketItem) {
        return axiosInstance.post('/basket/add', basketItem);
    }

    getBasketItems(userId) {
        return axiosInstance.get(`/basket/get/${userId}`);
    }

    decreaseItemQuantity(basketItemId) {
        return axiosInstance.put(`/basket/decrease/${basketItemId}`);
    }

    increaseItemQuantity(basketItemId) {
        return axiosInstance.put(`/basket/increase/${basketItemId}`);
    }

    deleteBasketItem(basketItemId) {
        return axiosInstance.delete(`/basket/delete/${basketItemId}`);
    }

    clearBasket(userId) {
        return axiosInstance.delete(`/basket/clear/${userId}`);
    }
}

export default new BasketService();
