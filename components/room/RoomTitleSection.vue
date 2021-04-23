<template>
  <v-row class="pa-5">
    <v-col cols="10">
      <h1 class="text-h5">{{ title }}</h1>
    </v-col>
    <v-col cols="2">
      <v-layout :column="forOwner" justify-end align-end class="pa-1">
        <room-favor-btn
          v-if="isTenant"
          class="mr-4"
          :clickFavor="clickFavor"
          :favorite.sync="asyncFavorite"
          roomDetail
        />
        <v-btn
          v-if="forOwner"
          fab
          small
          class="mb-2"
          color="info"
          :to="`/owner/requests/${roomId}/edit`"
        >
          <v-icon dark> mdi-cog </v-icon>
        </v-btn>
        <v-btn v-if="forOwner" fab small color="warning" @click="clickDelete">
          <v-icon dark> mdi-trash-can-outline </v-icon>
        </v-btn>
      </v-layout>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { BreadcrumbLink } from '@/constants/app.interface'
import RoomFavorBtn from './RoomFavorBtn.vue'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

@Component<RoomTitleSection>({
  name: 'RoomTitleSection',
  // eslint-disable-next-line no-undef
  components: {
    RoomFavorBtn,
  },

  computed: {
    ...mapGetters({
      role: Getter.ROLE,
      isTenant: Getter.IS_TENANT,
    }),
  },
})
export default class RoomTitleSection extends Vue {
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

