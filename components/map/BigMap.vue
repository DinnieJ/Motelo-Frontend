<template>
  <section>
    <!-- minh họa thôi -->
    <div v-for="i in 3" :key="i">
      <v-img lazy-src="/imgs/map_minh_hoa.png" class="rounded" max-height="100%" />
    </div>
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
