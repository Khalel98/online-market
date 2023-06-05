
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
    cart: [],
    favorites: [],
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    ADD_TO_CART(state, product) {
      const cartProduct = state.cart.find((item) => item.id === product.id);
      if (cartProduct) {
        cartProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    INCREASE_QUANTITY(state, productId) {
      const cartProduct = state.cart.find((item) => item.id === productId);
      if (cartProduct) {
        cartProduct.quantity++;
      }
    },
    DECREASE_QUANTITY(state, productId) {
      const cartProduct = state.cart.find((item) => item.id === productId);
      if (cartProduct && cartProduct.quantity > 1) {
        cartProduct.quantity--;
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter((product) => product.id !== productId);
    },
    ADD_TO_FAVORITES(state, product) {
      const favoriteProduct = state.favorites.find((item) => item.id === product.id);
      if (!favoriteProduct) {
        state.favorites.push(product);
      }
    },
    REMOVE_FROM_FAVORITES(state, productId) {
      state.favorites = state.favorites.filter((product) => product.id !== productId);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    increaseQuantity({ commit }, productId) {
      commit('INCREASE_QUANTITY', productId);
    },
    decreaseQuantity({ commit }, productId) {
      commit('DECREASE_QUANTITY', productId);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    addToFavorites({ commit }, product) {
      commit('ADD_TO_FAVORITES', product);
    },
    removeFromFavorites({ commit }, productId) {
      commit('REMOVE_FROM_FAVORITES', productId);
    },
  },
  getters: {
    getAllProducts: (state) => {
      return state.products;
    },
    getCart: (state) => {
      return state.cart;
    },
    getFavorites: (state) => {
      return state.favorites;
    },
  },
});

export default store;
