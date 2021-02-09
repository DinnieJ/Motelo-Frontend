<template>
  <v-img src="/imgs/map_minh_hoa.png" class="rounded" max-height="100%" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<SmallMap>({
  name: 'SmallMap',
  // eslint-disable-next-line no-undef
})
export default class SmallMap extends Vue {}
</script>
