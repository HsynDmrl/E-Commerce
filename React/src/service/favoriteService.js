import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class FavoriteService {
    addFavorite(userId, productId) {
        return axiosInstance.post('/favorite/add', { userId, productId });
    }

    removeFavorite(userId, productId) {
        return axiosInstance.post('/favorite/remove', { userId, productId });
    }

    getFavoritesByUser(userId) {
        return axiosInstance.get(`/favorite/user/${userId}`);
    }

    getAllFavorites() {
        return axiosInstance.get('/favorite/getall');
    }
}

export default new FavoriteService();
