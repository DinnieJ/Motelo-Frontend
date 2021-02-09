<template>
  <v-container>
    <v-row class="mt-6">
      <v-col cols="12" lg="9" class="pr-3">
        <inn-profile />
      </v-col>
      <v-col cols="12" lg="3">
        <account-profile />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AccountProfile from '@/components/account/AccountProfile.vue'
import InnProfile from '@/components/inn/InnProfile.vue'

// eslint-disable-next-line no-use-before-define
@Component<OwnerHome>({
  name: 'OwnerHome',
  // eslint-disable-next-line no-undef
  layout: 'inhouse',
  components: {
    AccountProfile,
    InnProfile,
  },
})
export default class OwnerHome extends Vue {}
</script>
