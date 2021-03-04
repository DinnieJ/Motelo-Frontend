<template>
<v-btn @click="clickFavor" rounded elevation="0" icon :loading="asyncLoadingFavorite">
  <v-icon class="room__favor" size="28" color="secondary" dark>
    {{ asyncFavorite ? 'mdi-heart' : 'mdi-heart-plus-outline'}}
  </v-icon>
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
  @Prop({ type: Function }) readonly clickFavor!: Function
}
</script>

