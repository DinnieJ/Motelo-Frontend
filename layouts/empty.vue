<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// eslint-disable-next-line no-use-before-define
@Component<Empty>({})
export default class Empty extends Vue {}
</script>

<style lang="scss">
</style>
