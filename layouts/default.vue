<template>
  <v-app id="inspire">
    <v-app-bar app light>
      <v-container class="py-0 fill-height">
        <div>
          <v-img
            src="./imgs/logo.svg"
            width="137"
            max-height="40"
            class="mr-10"
          />
        </div>

        <v-responsive max-width="520">
          <v-text-field
            dense
            outlined
            hide-details
            placeholder="Search"
            rounded
            append-icon="mdi-magnify"
            clearable
          ></v-text-field>
        </v-responsive>

        <v-spacer></v-spacer>

        <v-btn
          v-for="link in links"
          :key="link"
          :text="!link.active"
          color="primary"
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

@Component<Default>({})
export default class Default extends Vue {
  private links: NavLink[] = [
    {
      code: 'home',
      text: 'Trang chủ',
      active: true,
    },
    {
      code: 'list',
      text: 'Danh sách',
      active: false,
    },
    {
      code: 'map',
      text: 'Bản đồ',
      active: false,
    },
  ]
}
</script>
