<template>
  <v-app id="inspire">
    <!-- Navigation "< sm" -->
    <v-bottom-navigation
      v-if="isMobile()"
      fixed
      class="primary d-block"
      min-height="51px"
      height="auto"
    >
      <div :class="`nav__menu ${drawer ? 'active' : ''}`">
        <v-row class="ma-0">
          <template v-for="link in links">
            <v-col
              cols="6"
              sm="4"
              :key="link.code"
              class="pa-1"
              v-if="link.roles.includes(role)"
            >
              <v-btn
                x-small
                :to="link.to"
                plain
                block
                color="white"
                @click="drawer = false"
              >
                <v-layout column>
                  <v-icon class="mb-2"> {{ `mdi-${link.icon}` }} </v-icon>
                  <span>
                    {{ link.text }}
                  </span>
                </v-layout>
              </v-btn>
            </v-col>
          </template>
          <template v-if="user">
            <v-col cols="6" sm="4" class="pa-1">
              <v-btn
                x-small
                :to="getPersonalLink()"
                plain
                block
                color="white"
                @click="drawer = false"
              >
                <v-layout column>
                  <v-icon class="mb-2"> mdi-account </v-icon>
                  <span>
                    {{ user.name }}
                  </span>
                </v-layout>
              </v-btn>
            </v-col>
            <v-col cols="6" sm="4" class="pa-1">
              <v-btn x-small plain block color="white" @click="clickLogout">
                <v-layout column>
                  <v-icon class="mb-2"> mdi-logout </v-icon>
                  <span> Đăng xuất </span>
                </v-layout>
              </v-btn>
            </v-col>
          </template>
        </v-row>
      </div>

      <v-layout align-center justify-space-between class="nav__toolbar">
        <nuxt-link :to="getHomeLink()">
          <v-img
            :lazy-src="loadingImg"
            src="/imgs/logo.png"
            max-width="110"
            contain
            class="ml-6"
          />
        </nuxt-link>

        <div class="d-flex">
          <v-btn color="white" icon @click="drawer = !drawer">
            <v-icon color="white"> mdi-clipboard-arrow-up </v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-bottom-navigation>

    <!-- Navigation ">= sm" -->
    <v-app-bar v-if="!isMobile()" max-height="60px" class="primary">
      <v-container
        class="py-0 fill-height d-flex justify-space-between align-center"
      >
        <nuxt-link :to="getHomeLink()">
          <v-img
            :lazy-src="loadingImg"
            src="/imgs/logo.png"
            max-width="137"
            contain
          />
        </nuxt-link>

        <div class="d-flex">
          <template v-for="link in links">
            <div :key="link.code">
              <v-btn
                v-if="link.roles.includes(role)"
                color="white"
                x-small
                plain
                :to="link.to"
              >
                <v-icon dark class="mr-2"> {{ `mdi-${link.icon}` }} </v-icon>
                {{ link.text }}
              </v-btn>
            </div>
          </template>

          <template v-if="user">
            <div>
              <v-btn plain color="white" x-small :to="getPersonalLink()">
                <v-icon dark class="mr-2"> mdi-account </v-icon>
                {{ user.name }}
              </v-btn>
            </div>
            <div>
              <v-btn plain color="white" x-small @click="clickLogout">
                <v-icon dark class="mr-2"> mdi-logout </v-icon>
                Đăng xuất
              </v-btn>
            </div>
          </template>
        </div>
      </v-container>
    </v-app-bar>

    <snackbar />

    <v-main class="main">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NavLink } from '@/constants/app.interface'
import { NAV_LINKS, ROLE, LOADING_IMG } from '@/constants/app.constant'
import AccountBar from '@/components/account/AccountBar.vue'
import AccountCard from '@/components/account/AccountCard.vue'
import Snackbar from '@/components/common/Snackbar.vue'
import { mapGetters } from 'vuex'
import { Getter, DispatchAction } from '@/constants/app.vuex'
import { setToken } from '@/repositories/BaseRepository'

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
      role: Getter.ROLE,
      token: Getter.TOKEN
    }),
  },
  created() {
    const context: any = this
    if (context.token) {
      setToken(context.token)
    }
  },
})
export default class Default extends Vue {
  private links: NavLink[] = NAV_LINKS
  private drawer: boolean = false
  $notify: any

  private loadingImg: string = LOADING_IMG

  public isMobile(): boolean {
    return this.$vuetify.breakpoint.smAndDown
  }

  public getPersonalLink(): string {
    const context: any = this
    switch (context.role) {
      case ROLE.TENANT:
        return '/personal'
      case ROLE.OWNER:
        return '/owner/home'
      default:
        return '/'
    }
  }

  public getHomeLink(): string {
    const context: any = this
    switch (context.role) {
      case ROLE.TENANT:
        return '/'
      case ROLE.OWNER:
        return '/owner/home'
      default:
        return '/'
    }
  }

  public async clickLogout(e: Event) {
    this.drawer = false
    const logout = await this.$store.dispatch(DispatchAction.LOGOUT)
    this.$router.push('/login')
  }
}
</script>
