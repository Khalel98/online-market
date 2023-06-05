<template>
  <div class="section__home__item">
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="align-end text-white"
        height="200"
        :src="product.images[0]"
        cover
      >
      </v-img>
      <v-card-subtitle class="pt-4">
        {{ product.title }}
      </v-card-subtitle>
      <v-card-subtitle class="pt-4"> {{ product.price }}$ </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          size="small"
          @click="addToFavorites(product)"
          color="surface-variant"
          variant="text"
          icon="mdi mdi-heart"
        ></v-btn>
        <v-btn
          size="small"
          @click="addProductToCart(product)"
          color="surface-variant"
          variant="text"
          icon="mdi mdi-cart"
        ></v-btn>

        <v-dialog transition="dialog-top-transition" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-share-variant"
              v-bind="props"
            ></v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <div class="dialog__card">
              <div class="dialog__card__title">
                {{ product.title }}
              </div>

              <div class="main-img">
                <img class="main-img-src" :src="product.images[0]" />
              </div>
              <div class="images">
                <div v-for="image in filteredImages" :key="image.id">
                  <img
                    :src="image"
                    height="90"
                    width="90"
                    @click="getImg(image)"
                  />
                </div>
              </div>
              <div class="dialog__card__brand">
                {{ product.brand }}
              </div>
              <div class="dialog__card__category">
                {{ product.category }}
              </div>
              <div class="dialog__card__description">
                {{ product.description }}
              </div>
              <div class="dialog__card__rating">
                <v-rating
                  v-model="product.rating"
                  bg-color="orange-lighten-1"
                  color="blue"
                  hover
                  half-increments
                ></v-rating>
                <div class="dialog__card__price">
                  Price:
                  <span class="strikethrough">{{ product.price }}$</span>
                  <span>
                    {{
                      Math.ceil(
                        product.price -
                          product.price * (product.discountPercentage * 0.01)
                      )
                    }}$</span
                  >
                </div>
              </div>

              <v-btn variant="text" @click="isActive.value = false"
                >Close</v-btn
              >
            </div>
          </template>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredImages() {
      return this.product.images.slice(0, 4);
    },
  },
  methods: {
    addProductToCart(product) {
      this.$emit("add-to-cart", product);
    },
    addToFavorites(product) {
      this.$emit("add-to-favorites", product);
    },
    getImg(ele) {
      let mainImg = document.querySelector(".main-img-src");
      mainImg.src = ele;
    },
  },
};
</script>

<style lang="scss">
.dialog__card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  background: white;
  text-align: left;
  &__title {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  &__brand {
    width: 100%;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
  }
  &__category {
    margin-top: 0px;
    width: 100%;
    font-size: 16px;
    font-weight: 500;
  }
  &__description {
    margin-top: 10px;
    width: 100%;
  }
  &__rating {
    width: 100%;
  }
  &__price {
    font-size: 14px;
    font-weight: 500;
    .strikethrough {
      position: relative;
    }
    .strikethrough:before {
      position: absolute;
      content: "";
      left: 0;
      top: 50%;
      right: 0;
      border-top: 2px solid #dd0031 !important;
      border-color: inherit;

      -webkit-transform: rotate(-5deg);
      -moz-transform: rotate(-5deg);
      -ms-transform: rotate(-5deg);
      -o-transform: rotate(-5deg);
      transform: rotate(-5deg);
    }
    span {
      font-size: 18px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
}
.main-img {
  display: flex;
  width: 360px;
  height: 250px;
  overflow: hidden;
  perspective: 600px;
  img {
    object-fit: cover;
  }
}
.images {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  img {
    cursor: pointer;
  }
}
.main-img-span {
  display: block;
  width: 60px;
  height: 250px;
  background-position: center;
  background-size: cover;
}
.effect {
  animation: move 0.6s forwards;
}
@keyframes move {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
