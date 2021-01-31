<template>
  <v-app id="inspire">
    <v-toolbar max-height="60px" dense flat light class="d-md-none">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img src="/imgs/logo.png" max-width="137" class="mr-10" />
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      left
      light
      fixed
      class="pa-4 d-md-none"
    >
      <div>
        <v-img src="/imgs/logo.png" max-width="137" class="mr-10" />
      </div>
      <div v-for="link in links" :key="link.code">
        <v-btn text color="primary" :to="link.to" block>
          {{ link.text }}
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar max-height="60px" dense flat light class="d-none d-md-block">
      <v-container class="py-0 fill-height">
        <v-img src="/imgs/logo.png" max-width="137" class="mr-10" />

        <v-spacer></v-spacer>
        <div v-for="link in links" :key="link.code">
          <v-btn x-small text color="primary" :to="link.to">
            {{ link.text }}
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NavLink } from '@/constants/app.interface'
import { NAV_LINKS } from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<Default>({})
export default class Default extends Vue {
  private links: NavLink[] = NAV_LINKS
  private drawer: boolean = false
}
</script>

<style lang="scss">
.post {
  &__card {
    cursor: pointer;
  }

  &__price {
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
}
</style>
