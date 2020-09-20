import axios from '../config/axios';


const getProducts = (page, size) => {
  return axios.get(`/products?page=${page}&size=${size}`);
}

const getProduct = id => {
  return axios.get(`/products/${id}`);
}

const removeProduct = (productId) => {
  return axios.delete(`/products/${productId}`);
}

const saveProduct = (data) => {
  return axios.post(`/products`, data);
}


const updateProduct = (id, data) => {
  return axios.put(`/products/${id}`, data);
}

export default {
  getProducts,
  getProduct,
  removeProduct,
  saveProduct,
  updateProduct
}