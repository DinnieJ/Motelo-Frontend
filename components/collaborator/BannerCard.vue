<template>
  <v-card :to="`/banner/${banner.id}`" max-width="100%">
    <v-img
      :src="banner.image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="300"
    >
      <v-card-title v-text="banner.title"></v-card-title>
    </v-img>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component<BannerCard>({
  name: 'BannerCard',
})
export default class BannerCard extends Vue {
    @Prop({ required:true }) readonly banner!: any
}
</script>