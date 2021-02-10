<template>
  <v-icon class="room__favor" size="32" color="secondary" dark @click="clickFavor">
    {{ favorite ? 'mdi-heart' : 'mdi-heart-plus-outline'}}
  </v-icon>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'vue-property-decorator'

@Component<RoomFavorBtn>({
  name: 'RoomFavorBtn',
  // eslint-disable-next-line no-undef
})
export default class RoomFavorBtn extends Vue {
  @VModel({ type: Boolean }) favorite!: boolean
  
  clickFavor() {
    this.favorite = !this.favorite
  }
}
</script>

