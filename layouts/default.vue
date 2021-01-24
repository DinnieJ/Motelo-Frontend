<template>
  <v-app id="inspire">
    <v-toolbar dense light class="d-md-none">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-none d-sm-block">
        <v-img
          src="./imgs/logo.svg"
          width="137"
          max-height="40"
          class="mr-10"
        />
      </div>
      <v-text-field
        dense
        outlined
        hide-details
        placeholder="Search"
        rounded
        append-icon="mdi-magnify"
        clearable
      ></v-text-field>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      left
      light
      fixed
      class="pa-4 d-md-none"
    >
      <div>
        <v-img
          src="./imgs/logo.svg"
          width="137"
          max-height="40"
          class="mr-10"
        />
      </div>
      <div v-for="link in links" :key="link.code">
        <v-btn text color="primary" :to="link.to" block>
          {{ link.text }}
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar light class="d-none d-md-block">
      <v-container class="py-0 fill-height">
        <div>
          <v-img
            src="./imgs/logo.svg"
            width="137"
            max-height="40"
            class="mr-10"
          />
        </div>

        <v-text-field
          dense
          outlined
          hide-details
          placeholder="Search"
          rounded
          append-icon="mdi-magnify"
          clearable
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn
          v-for="link in links"
          :key="link.code"
          text
          color="primary"
          :to="link.to"
        >
          {{ link.text }}
        </v-btn>
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
