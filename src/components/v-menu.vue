<template>
  <v-layout style="margin-bottom: 64px">
    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <router-link to="/">
        <v-app-bar-title>Title</v-app-bar-title>
      </router-link>

      <v-spacer></v-spacer>
      <SearchComponent />
      <router-link to="/cart">
        <v-btn icon>
          <v-badge :content="cart.length" color="error">
            <v-icon>mdi mdi-cart-variant</v-icon>
          </v-badge>
        </v-btn>
      </router-link>
      <router-link to="/favorites">
        <v-btn icon>
          <v-badge :content="favorites.length" color="error">
            <v-icon>mdi mdi-heart-outline</v-icon>
          </v-badge>
        </v-btn>
      </router-link>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </v-layout>
  <v-spacer></v-spacer>
</template>

<script>
import { mapGetters } from "vuex";
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  components: {
    SearchComponent,
  },
  computed: {
    ...mapGetters(["getCart", "getFavorites"]),
    cart() {
      return this.getCart;
    },
    favorites() {
      return this.getFavorites;
    },
  },
};
</script>

<style></style>
