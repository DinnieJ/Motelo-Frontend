<template>
  <v-app dark>
    <v-btn color="primary" to="/" class="text-center"> Trang chủ </v-btn>
    <v-layout justify-center>
      <div v-if="error.statusCode === 404">
        <v-img lazy-src="/imgs/404-errrrr-page-11.jpg" contain />
      </div>
      <h1 v-else>
        <v-img lazy-src="/imgs/error.png" contain />
      </h1>
    </v-layout>
    

  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
