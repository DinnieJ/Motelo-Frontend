<template>
<v-btn 
  :small="!roomDetail" 
  :color="btnColor" 
  :outlined="roomDetail && !asyncFavorite" 
  depressed 
  :fab="!roomDetail" 
  :rounded="roomDetail" 
  :loading="asyncLoadingFavorite" 
  :disabled="asyncLoadingFavorite" 
  @click="clickFavor"
>
  <v-icon class="room__favor" :color="iconColor" dark :left="roomDetail">
    {{ asyncFavorite ? 'mdi-heart' : 'mdi-heart-plus-outline'}}
  </v-icon>
  <span v-if="roomDetail">{{ !asyncFavorite ? 'Like' : 'Liked' }}</span>
</v-btn>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'

@Component<RoomFavorBtn>({
  name: 'RoomFavorBtn',
  // eslint-disable-next-line no-undef
})
export default class RoomFavorBtn extends Vue {
  @PropSync('favorite') asyncFavorite!: boolean
  @PropSync('loading') asyncLoadingFavorite!: boolean
  @Prop({ default: false, type: Boolean }) readonly roomDetail!: boolean
  @Prop({ type: Function }) readonly clickFavor!: Function

  get iconColor() {
    return this.asyncFavorite && this.roomDetail ? 'white' : 'secondary'
  }

  get btnColor() {
    return !this.roomDetail ? '' : 'secondary'
  }
}
</script>

