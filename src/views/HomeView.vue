<template>
  <div class="section__home">
    <div class="section__home__content _container">
      <div class="section__title">Product List:</div>
      <v-select
        v-model="selectedCategory"
        :items="categories"
        label="Select Category"
        clearable
        variant="outlined"
        @change="filterProductsByCategory"
      ></v-select>

      <v-select
        v-model="selectedBrand"
        :items="brands"
        label="Select Brand"
        clearable
        variant="outlined"
        @change="filterProductsByBrand"
      ></v-select>

      <div class="section__home__price">
        <div class="section__home__price__item">
          <v-text-field
            id="min-price"
            v-model.number="currentMinPrice"
            @input="filterProductsByPrice"
            label="Min Price"
            variant="outlined"
          ></v-text-field>
        </div>

        <div class="section__home__price__item">
          <v-text-field
            id="max-price"
            v-model.number="currentMaxPrice"
            @input="filterProductsByPrice"
            label="Max Price"
            variant="outlined"
          ></v-text-field>
        </div>
      </div>

      <div class="section__row">
        <vProduct
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addProductToCart"
          @add-to-favorites="addToFavorites"
        ></vProduct>
      </div>

      <div
        class="section__home__pagination"
        v-if="displayedProducts.length > 0"
      >
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="changePage"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import vProduct from "@/components/v-product.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    vProduct,
  },
  computed: {
    ...mapGetters(["getAllProducts"]),
    filteredProducts() {
      let filtered = [];
      const allProducts = this.getAllProducts;
      if (allProducts && allProducts.products) {
        filtered = allProducts.products;

        if (
          this.selectedCategory &&
          this.selectedCategory !== "All Categories"
        ) {
          filtered = filtered.filter(
            (product) => product.category === this.selectedCategory
          );
        }

        if (this.selectedBrand && this.selectedBrand !== "All Brands") {
          filtered = filtered.filter(
            (product) => product.brand === this.selectedBrand
          );
        }

        if (this.searchQuery) {
          const searchQuery = this.searchQuery.toLowerCase();
          filtered = filtered.filter((product) =>
            product.title.toLowerCase().includes(searchQuery)
          );
        }
      }
      return filtered;
    },
    categories() {
      const uniqueCategories = new Set();
      const allProducts = this.getAllProducts;
      if (allProducts && allProducts.products) {
        allProducts.products.forEach((product) => {
          uniqueCategories.add(product.category);
        });
      }
      return ["All Categories", ...Array.from(uniqueCategories)];
    },
    brands() {
      const uniqueBrands = new Set();
      const allProducts = this.getAllProducts;
      if (allProducts && allProducts.products) {
        allProducts.products.forEach((product) => {
          uniqueBrands.add(product.brand);
        });
      }
      return ["All Brands", ...Array.from(uniqueBrands)];
    },
    totalPages() {
      return Math.ceil(
        this.filteredByPriceProducts.length / this.productsPerPage
      );
    },
    displayedProducts() {
      const startIndex = (this.currentPage - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;
      return this.filteredByPriceProducts.slice(startIndex, endIndex);
    },
    filteredByPriceProducts() {
      let filtered = this.filteredProducts;

      if (this.currentMinPrice !== null && this.currentMaxPrice !== null) {
        filtered = filtered.filter(
          (product) =>
            product.price >= this.currentMinPrice &&
            product.price <= this.currentMaxPrice
        );
      }

      return filtered;
    },
  },
  data() {
    return {
      selectedCategory: "All Categories",
      selectedBrand: "All Brands",
      currentPage: 1,
      productsPerPage: 8,
      searchQuery: "",
      currentMinPrice: null,
      currentMaxPrice: null,
    };
  },
  methods: {
    ...mapActions(["fetchProducts", "addToCart", "addToFavorites"]),
    addProductToCart(product) {
      this.addToCart(product);
    },
    filterProductsByCategory() {
      this.currentPage = 1;
    },
    filterProductsByBrand() {
      this.currentPage = 1;
    },
    filterProductsByPrice() {
      this.currentPage = 1;
    },
    changePage(page) {
      this.currentPage = page;
    },
    navigateToHomePage() {
      this.$router.push({ name: "Home", query: { search: this.searchQuery } });
    },
  },
  watch: {
    selectedCategory() {
      this.currentPage = 1;
    },
    selectedBrand() {
      this.currentPage = 1;
    },
    "$route.query.search"(newSearchQuery) {
      this.searchQuery = newSearchQuery || "";
      this.currentPage = 1;
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
