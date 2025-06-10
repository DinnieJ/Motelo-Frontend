<template>
  <v-layout v-if="user" column align-center>
    <v-avatar color="brown">
      <v-icon dark> mdi-account-circle </v-icon>
    </v-avatar>
    <h3>{{ user.name }}</h3>
    <p class="caption mt-1">
      {{ user.email || '' }}
    </p>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

// eslint-disable-next-line no-use-before-define
@Component<AccountCard>({
  name: 'AccountCard',
  // eslint-disable-next-line no-undef
  components: {},
  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },
})
export default class AccountCard extends Vue {}
</script>
