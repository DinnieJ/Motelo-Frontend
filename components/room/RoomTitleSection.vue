<template>
  <v-row>
    <v-col cols="10">
      <h1>{{ title }}</h1>
    </v-col>
    <v-col cols="2">
      <v-layout justify-end>
          <room-favor-btn
            v-if="!forOwner && loggedIn"
            class="mr-4"
            :clickFavor="clickFavor"
            :favorite.sync="asyncFavorite"
          />
        <v-btn
          v-if="forOwner"
          class="ml-5"
          outlined
          rounded
          color="info"
          :to="`/owner/requests/${roomId}/edit`"
          >Sửa</v-btn
        >
        <v-btn
          v-if="forOwner"
          class="ml-5"
          outlined
          rounded
          color="warning"
          @click="clickDelete"
          >Xóa</v-btn
        >
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
  @Prop({ type: Boolean, default: false }) readonly forOwner!: Function
  @Prop({ type: Function }) readonly clickDelete!: Function
  @Prop({ type: Number }) readonly roomId!: number

  get loggedIn(): boolean {
    return !!this.$store.state.auth.user
  }
}
</script>

