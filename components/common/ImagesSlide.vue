<template>
  <v-carousel cycle height="auto">
    <v-carousel-item v-for="(img, i) in imgs" :key="i">
      <v-img :lazy-src="loadingImg" :src="img" class="rounded" aspect-ratio="1.77" />
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LOADING_IMG } from '@/constants/app.constant'

@Component<ImagesSlide>({
  name: 'ImagesSlide',
  // eslint-disable-next-line no-undef
})
export default class ImagesSlide extends Vue {
  @Prop({ type: Array, required: true }) readonly imgs!: string[]
  private loadingImg: string = LOADING_IMG
}
</script>

