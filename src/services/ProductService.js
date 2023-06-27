/* eslint-disable no-console */
import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export default {
  getCartProducts() {
    return apiClient.get("/cart");
  },
  getProducts() {
    return apiClient.get("/products");
  },
  getProduct(id) {
    return apiClient.get("/products/" + id);
  },
  getProductByCategory(category) {
    return apiClient.get("/products?category=" + category);
  },
  getAllCategories() {
    var products = [];
    var categories = [];
    apiClient
      .get("/products")
      .then(response => {
        products.category = response.data;
        for (var i = 0; i < products.category.length; i++) {
          if (categories.indexOf(products.category[i].category) == -1) {
            categories.push(products.category[i].category);
          }
        }
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
    return categories;
  },
  postProduct(product) {
    return apiClient.post("/products", product);
  },
  postProductToCart(product) {
    return apiClient.post("/cart", product);
  },
  deleteProduct(product) {
    return apiClient.delete("/products/" + product.id);
  },
  deleteProductFromCart(product) {
    return apiClient.delete("/cart/" + product.id);
  },
  editProductFromCart(product) {
    return apiClient.put("/cart/" + product.id, {
      name: product.name,
      brand: product.brand,
      category: product.category,
      supplier: product.supplier,
      price: product.price,
      details: product.details,
      variants: product.variants,
      quantity: product.quantity
    });
  }
};
