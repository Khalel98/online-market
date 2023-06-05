<template>
  <div class="section__favorites">
    <div class="section__favorites__content _container">
      <h3 class="section__title">Favorite Products:</h3>
      <div class="section__favorites__items">
        <div
          class="section__favorites__item"
          v-for="favorite in favorites"
          :key="favorite.id"
        >
          <div class="section__favorites__item__img">
            <img :src="favorite.images[0]" :alt="favorite.title" />
          </div>
          <div class="section__favorites__item__title">
            {{ favorite.title }}
          </div>

          <div class="section__favorites__item__action">
            <button @click="removeFromFavorites(favorite.id)">
              <v-icon> mdi mdi-delete</v-icon>
            </button>
            <button @click="addProductToCart(favorite)">
              <v-icon> mdi mdi-cart</v-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getFavorites"]),
    favorites() {
      return this.getFavorites;
    },
  },
  methods: {
    ...mapActions(["removeFromFavorites", "addToCart"]),
    addProductToCart(product) {
      this.addToCart(product);
    },
  },
};
</script>
