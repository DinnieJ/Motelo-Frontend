<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="brown" size="32">
          <v-icon dark> mdi-account-circle </v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-card light>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <account-card></account-card>

          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text> Cá nhân </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text> Đăng xuất </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AccountCard from './AccountCard.vue'

// eslint-disable-next-line no-use-before-define
@Component<AccountBar>({
  name: 'AccountBar',
  // eslint-disable-next-line no-undef
  components: {
    AccountCard,
  },
})
export default class AccountBar extends Vue {
  [x: string]: any
  private user: object = {
    initials: 'JD',
    fullName: 'John Doe',
    email: 'john.doe@doe.com',
  }
}
</script>
