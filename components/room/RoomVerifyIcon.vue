<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-icon size="32" color="primary" dark v-bind="attrs" v-on="on">
        mdi-shield-home
      </v-icon>
    </template>
    <span>Được kiểm chứng</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<RoomVerifyIcon>({
  name: 'RoomVerifyIcon',
  // eslint-disable-next-line no-undef
})
export default class RoomVerifyIcon extends Vue {
}
</script>
