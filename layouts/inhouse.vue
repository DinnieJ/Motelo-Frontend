<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app class="pa-3">
      <account-card></account-card>
      <div v-for="link in links" :key="link.code">
        <v-btn
          v-if="link.roles.includes(role)"
          text
          color="primary"
          :to="link.to"
          block
        >
          {{ link.text }}
        </v-btn>
      </div>
      <div>
        <v-btn
          text
          color="primary"
          block
        >
          Đăng xuất
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-layout>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img contain src="/imgs/logo.png" max-width="137" class="ml-10" />
      </v-layout>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AccountCard from '@/components/account/AccountCard.vue'
import { NavLink } from '@/constants/app.interface'
import { NAV_LINKS } from '@/constants/app.constant'

@Component<InHouse>({
  name: 'InHouse',
  // eslint-disable-next-line no-
  components: {
    AccountCard,
  },
})
export default class InHouse extends Vue {
  private links: NavLink[] = NAV_LINKS
  private drawer: boolean = false
  private role: string = 'Owner'
}
</script>
