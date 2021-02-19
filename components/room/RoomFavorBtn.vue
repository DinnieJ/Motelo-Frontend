<template>
  <v-icon class="room__favor" size="32" color="secondary" dark @click="clickFavor">
    {{ asyncFavorite ? 'mdi-heart' : 'mdi-heart-plus-outline'}}
  </v-icon>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Prop } from 'vue-property-decorator'

@Component<RoomFavorBtn>({
  name: 'RoomFavorBtn',
  // eslint-disable-next-line no-undef
})
export default class RoomFavorBtn extends Vue {
  @PropSync('favorite') asyncFavorite!: boolean
  @Prop({ type: Function }) readonly clickFavor!: Function
}
</script>

