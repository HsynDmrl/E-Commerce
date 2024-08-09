import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class HistoryService {
    generateHistoryCSV(userId) {
        return axiosInstance.get(`/history/generate/${userId}`);
    }

    getPurchaseHistoryByUser(userId) {
        return axiosInstance.get(`/history/get/${userId}`);
    }
}

export default new HistoryService();
