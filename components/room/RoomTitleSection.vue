<template>
  <v-row>
    <v-col cols="10">
      <h1 class="display-1">{{ title }}</h1>
      <v-breadcrumbs :items="breadcrumbs">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-col>
    <v-col cols="2">
      <v-layout justify-end>
        <room-favor-btn
          class="mr-4"
          :clickFavor="clickFavor"
          :favorite.sync="asyncFavorite"
        />
      </v-layout>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { BreadcrumbLink } from '@/constants/app.interface'
import RoomFavorBtn from './RoomFavorBtn.vue'

@Component<RoomTitleSection>({
  name: 'RoomTitleSection',
  // eslint-disable-next-line no-undef
  components: {
    RoomFavorBtn,
  },
})
export default class RoomTitleSection extends Vue {
  @Prop({ type: Array }) readonly breadcrumbs!: BreadcrumbLink[]
  @Prop({ type: String }) readonly title!: string
  @Prop({ type: Function }) readonly clickFavor!: Function
  @PropSync('favorite') asyncFavorite!: boolean
}
</script>

