import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class UserService { 
    getAllUsers() {
        return axiosInstance.get('/user');
    }

    login(username, password) {
        return axiosInstance.post('/user/login', { username, password });
    }

    changePassword(userId, oldPassword, newPassword) {
        return axiosInstance.post('/user/change-password', { userId, oldPassword, newPassword });
    }

    registerUser(username, password) {
        return axiosInstance.post('/user/register', { username, password });
    }
}

export default new UserService();
