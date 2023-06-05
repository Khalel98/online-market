
<template>
  <div class="search-container">
    <input type="text" v-model="searchQuery" placeholder="Поиск..." @keyup.enter="runSearch" />
    <button @click="runSearch">
      <v-icon>mdi-magnify</v-icon>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    runSearch() {
      this.$router.push({ name: 'Home', query: { search: this.searchQuery } });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container{
  display: flex;
  margin: 30px;
  input{
    border:1px solid #aaaaaa;
    padding: 0px 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  button{
    width: 30px;
    height: 30px;
    background: black;
    color: #aaaaaa;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}

</style>