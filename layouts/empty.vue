<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <snackbar/>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Snackbar from '@/components/common/Snackbar.vue'

// eslint-disable-next-line no-use-before-define
@Component<Empty>({
  name: 'Empty',
  components: {
    Snackbar
  }
})
export default class Empty extends Vue {}
</script>
