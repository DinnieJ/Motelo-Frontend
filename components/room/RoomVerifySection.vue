<template>
  <v-card rounded="lg" class="pa-2">
    <v-layout>
      <v-icon class="mr-4" size="48" color="primary" dark>
        mdi-shield-home
      </v-icon>
      <h1 class="subtitle-1">
        Cộng tác viên của
        <span class="primary--text"> Motelo </span> đích thân đi xác thực về
        chất lượng phòng và độ tin cậy của chủ phòng.
      </h1>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component<RoomVerifySection>({
  name: 'RoomVerifySection',
  // eslint-disable-next-line no-undef
})
export default class RoomVerifySection extends Vue {
}
</script>
