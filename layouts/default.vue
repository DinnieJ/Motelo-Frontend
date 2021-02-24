<template>
  <v-app id="inspire">
    <v-toolbar max-height="60px" dense flat light class="d-md-none">
      <v-layout justify-space-between>
        <v-img contain src="/imgs/logo.png" max-width="137" class="mr-10" />
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-layout>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      right
      light
      fixed
      class="pa-4 d-md-none"
    >
      <v-layout justify-center>
        <v-img src="/imgs/logo.png" max-width="137" class="mr-10" />
      </v-layout>
      <v-divider class="my-3"></v-divider>
      <account-card v-if="user"></account-card>
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
      <v-divider class="my-3"></v-divider>
      <div>
        <v-btn text color="primary" block> Cá nhân </v-btn>
        <v-btn text color="primary" block> Đăng xuất </v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar max-height="60px" dense flat light class="d-none d-md-block">
      <v-container class="py-0 fill-height">
        <v-img src="/imgs/logo.png" max-width="137" class="mr-10" />

        <v-spacer></v-spacer>
        <div v-for="link in links" :key="link.code">
          <v-btn
            v-if="link.roles.includes(role)"
            text
            color="primary"
            :to="link.to"
          >
            {{ link.text }}
          </v-btn>
        </div>
        <account-bar v-if="user"></account-bar>
      </v-container>
    </v-app-bar>

    <snackbar />

    <v-main class="grey lighten-3">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NavLink } from '@/constants/app.interface'
import { NAV_LINKS } from '@/constants/app.constant'
import AccountBar from '@/components/account/AccountBar.vue'
import AccountCard from '@/components/account/AccountCard.vue'
import Snackbar from '@/components/common/Snackbar.vue'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

// eslint-disable-next-line no-use-before-define
@Component<Default>({
  components: {
    AccountBar,
    AccountCard,
    Snackbar,
  },
  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },
})
export default class Default extends Vue {
  private links: NavLink[] = NAV_LINKS
  private drawer: boolean = false
  private role: string = 'Guest'
}
</script>
