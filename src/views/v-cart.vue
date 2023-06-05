<template>
  <div class="section__cart">
    <div class="section__cart__content _container">
      <h2 class="section__title">Cart</h2>
      <div class="section__cart__items">
        <div
          class="section__cart__item"
          v-for="product in cart"
          :key="product.id"
        >
          <div class="section__cart__item__img">
            <img :src="product.images[0]" :alt="product.title" />
          </div>
          <div class="section__cart__item__title">{{ product.title }}</div>
          <div class="section__cart__quantity">
            <button
              class="section__cart__quantity__action"
              @click="increaseProductQuantity(product.id)"
            >
              +
            </button>
            <div class="section__cart__quantity__number">
              {{ product.quantity }}
            </div>
            <button
              class="section__cart__quantity__action"
              @click="decreaseProductQuantity(product.id)"
            >
              -
            </button>
          </div>
          <button @click="removeProductFromCart(product.id)">
            <v-icon> mdi mdi-delete</v-icon>
          </button>
        </div>
      </div>
      <div class="section__cart__total">
        <p>Total Price: {{ getTotalPrice() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getCart"]),
    cart() {
      return this.getCart;
    },
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity", "removeFromCart"]),
    increaseProductQuantity(productId) {
      this.increaseQuantity(productId);
    },
    decreaseProductQuantity(productId) {
      this.decreaseQuantity(productId);
    },
    removeProductFromCart(productId) {
      this.removeFromCart(productId);
    },
    getTotalPrice() {
      return this.cart.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },
  },
};
</script>
