import axiosInstance from "../core/utils/interceptors/axiosInterceptors";

class ProductService {
    getAllProducts() {
        return axiosInstance.get('/product/getall');
    }

    getProductById(productId) {
        return axiosInstance.get(`/product/getbyid/${productId}`);
    }

    addProduct(product) {
        return axiosInstance.post('/product/add', product);
    }

    updateProduct(productId, product) {
        return axiosInstance.put(`/product/update/${productId}`, product);
    }

    deleteProduct(productId) {
        return axiosInstance.delete(`/product/delete/${productId}`);
    }

    existsById(productId) {
        return axiosInstance.get(`/product/exists_by_id/${productId}`);
    }

    filterAndSort(filterData) {
        return axiosInstance.post('/product/filter_and_sort', filterData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getProductPrice(productId) {
        return axiosInstance.get(`/product/get_product_price/${productId}`);
    }
}

export default new ProductService();
