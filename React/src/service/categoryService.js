import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class CategoryService {
    getAllCategories() {
        return axiosInstance.get('/category/getall');
    }

    getCategoryById(categoryId) {
        return axiosInstance.get(`/category/getbyid/${categoryId}`);
    }

    addCategory(category) {
        return axiosInstance.post('/category/add', category);
    }

    updateCategory(categoryId, category) {
        return axiosInstance.put(`/category/update/${categoryId}`, category);
    }

    deleteCategory(categoryId) {
        return axiosInstance.delete(`/category/delete/${categoryId}`);
    }
}

export default new CategoryService();
