<template>
  <v-layout column align-center>
    <v-avatar color="brown">
      <span class="white--text headline">{{ user.initials }}</span>
    </v-avatar>
    <h3>{{ user.fullName }}</h3>
    <p class="caption mt-1">
      {{ user.email }}
    </p>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// eslint-disable-next-line no-use-before-define
@Component<AccountCard>({
  name: 'AccountCard',
  // eslint-disable-next-line no-undef
  components: {},
})
export default class AccountCard extends Vue {
  private user: object = {
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
  }
}
</script>
