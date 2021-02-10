<template>
  <v-container>
    <room-detail-container />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RoomDetailContainer from '@/components/room/RoomDetailContainer.vue'

// eslint-disable-next-line no-use-before-define
@Component<DetailRequest>({
  name: 'DetailRequest',
  components: {
    RoomDetailContainer,
  },
})
export default class DetailRequest extends Vue {
}
</script>
