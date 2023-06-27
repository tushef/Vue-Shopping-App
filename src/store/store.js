/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import ProductService from "../services/ProductService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    categories: [],
    productsTotal: 0,
    cartTotal: 0
  },
  mutations: {
    ADD_PRODUCT(state, obj) {
      state.products.push(obj);
    },
    ADD_PRODUCT_TO_CART(state, obj) {
      state.cart.push(obj);
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCTS_TOTAL(state, productsTotal) {
      state.productsTotal = productsTotal;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    SET_CART_TOTAL(state, cartTotal) {
      state.cartTotal = cartTotal;
    },
    DELETE_PRODUCT_FROM_CART(state, id) {
      state.cart.splice(
        state.cart.indexOf(state.cart.find(product => product.id === id)),
        1
      );
    }
  },
  actions: {
    createProduct({ commit }, product) {
      return ProductService.postProduct(product).then(() => {
        commit("ADD_PRODUCT", product);
      });
    },
    addToCart({ commit, state }, product) {
      console.log(
        state.cart.find(element => element.id === product.id) != null
      );
      if (state.cart.find(element => element.id === product.id) != null) {
        var index = state.cart.indexOf(
          state.cart.find(element => element.id === product.id)
        );
        state.cart[index].quantity++;
        ProductService.editProductFromCart(state.cart[index]);
      } else {
        product.quantity = 1;
        ProductService.postProductToCart(product)
          .then(() => {
            commit("ADD_PRODUCT_TO_CART", product);
            commit("SET_CART_TOTAL", state.cartTotal++);
          })
          .catch(err => {
            console.log("Error", err);
          });
      }
    },
    fetchProducts({ commit }) {
      ProductService.getProducts().then(response => {
        commit("SET_PRODUCTS_TOTAL", parseInt(response.data.length));
        commit("SET_PRODUCTS", response.data);
      });
    },
    fetchProductsByCategory({ commit }, category) {
      ProductService.getProductByCategory(category).then(response => {
        commit("SET_PRODUCTS_TOTAL", parseInt(response.data.length));
        commit("SET_PRODUCTS", response.data);
      });
    },
    fetchCategories({ commit }) {
      commit("SET_CATEGORIES", ProductService.getAllCategories());
    },
    fetchCartProducts({ commit }) {
      ProductService.getCartProducts().then(response => {
        commit("SET_CART_TOTAL", response.data.length);
        commit("SET_CART", response.data);
      });
    },
    deleteProductInCart({ commit, state }, element) {
      element.quantity--;
      if (element.quantity == 0) {
        ProductService.deleteProductFromCart(element)
          .then(() => {
            commit("DELETE_PRODUCT_FROM_CART", element.id);
            commit("SET_CART_TOTAL", state.cart.length);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    },
    getProductsByPage: state =>
      function(perPage, page) {
        return state.products.slice(perPage * (page - 1), perPage * page);
      },
    getCartProductsByPage: state =>
      function(perPage, page) {
        return state.cart.slice(perPage * (page - 1), perPage * page);
      }
  }
});
