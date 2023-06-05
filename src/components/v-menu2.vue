<template>
  <div class="section__menu">
    <div class="section__menu__content _container">
      <div class="nav-menu">
        <!--// Menu container -->
        <div class="hamburger-menu-body">
          <router-link to="/">
            <div class="nav-menu__logoMobile">
              <img src="../assets/logo.png" alt="" />
            </div>
          </router-link>
          <div
            class="hamburger-menu"
            @click="showMenu()"
            :class="this.showMobileMenu ? 'humClicked' : ''"
          >
            <div class="bar-top"></div>
            <div class="bar-middle"></div>
            <div class="bar-bottom"></div>
          </div>
        </div>
        <!--Hamburger icon with click method-->
        <div
          class="nav-content"
          :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'"
        >
          <!--// Menu content-->
          <router-link to="/">
            <div class="nav-menu__logoDesktop">
              <img src="../assets/logo.png" alt="" />
            </div>
          </router-link>

          <div class="section__menu__items">
            <SearchComponent />
            <router-link to="/favorites">
              <v-btn icon>
                <v-badge :content="favorites.length" color="error">
                  <v-icon>mdi mdi-heart-outline</v-icon>
                </v-badge>
              </v-btn>
            </router-link>
            <router-link to="/cart">
              <v-btn icon>
                <v-badge :content="cart.length" color="error">
                  <v-icon>mdi mdi-cart-variant</v-icon>
                </v-badge>
              </v-btn>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchComponent from "@/components/SearchComponent.vue";
export default {
  components: {
    SearchComponent,
  },
  data() {
    return {
      showMobileMenu: false,
    };
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
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
};
</script>
