<template>
  <v-carousel cycle height="auto">
    <v-carousel-item v-for="i in 5" :key="i">
      <v-img src="/imgs/anh_room.jpg" class="rounded" aspect-ratio="1.77" />
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<ImagesSlide>({
  name: 'ImagesSlide',
  // eslint-disable-next-line no-undef
})
export default class ImagesSlide extends Vue {
}
</script>

