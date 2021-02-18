<template>
  <section>
    <v-img src="/imgs/big-map.png" class="rounded" max-height="100%" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<BigMap>({
  name: 'BigMap',
  // eslint-disable-next-line no-undef
})
export default class BigMap extends Vue {}
</script>
