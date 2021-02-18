<template>
  <v-container>
    <room-detail-container />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RoomDetailContainer from '@/components/room/RoomDetailContainer.vue'

// eslint-disable-next-line no-use-before-define
@Component<Detail>({
  name: 'Detail',
  components: {
    RoomDetailContainer,
  },
})
export default class Detail extends Vue {
}
</script>
