<template>
  <v-icon class="room__favor" size="32" color="secondary" dark>
    mdi-heart-plus-outline
  </v-icon>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<RoomFavorBtn>({
  name: 'RoomFavorBtn',
  // eslint-disable-next-line no-undef
})
export default class RoomFavorBtn extends Vue {
}
</script>

<style lang="scss">
.room {
  &__favor {
    cursor: pointer;
  }
}
</style>
