<template>
  <div class="owner">
    <div>
      <v-layout>
        <v-icon class="mx-3" size="32" color="primary" dark>
          mdi-book-account
        </v-icon>
        <h1 class="room__title">Chủ phòng</h1>
      </v-layout>
      <v-divider />
    </div>
    <div class="mt-2">
      <v-layout class="mb-4">
        <v-img src="/imgs/logo-name.png" max-width="32" max-height="32"></v-img>
        <p class="ml-6">{{ name }}</p>
      </v-layout>
      <v-layout class="mb-4" v-for="(phone, index) in phones" :key="index">
        <v-img
          src="/imgs/logo-phone.png"
          max-width="32"
          max-height="32"
        ></v-img>
        <p class="ml-6">{{ phone }}</p>
      </v-layout>
      <v-layout class="mb-4" v-if="facebook">
        <v-img
          src="/imgs/logo-facebook.png"
          max-width="32"
          max-height="32"
        ></v-img>
        <a
          class="ml-6"
          :href="facebook"
          target="_blank"
          rel="noopener noreferrer"
          >{{facebook}}</a
        >
      </v-layout>
      <v-layout class="mb-4" v-if="zalo">
        <v-img src="/imgs/logo-zalo.jpg" max-width="32" max-height="32"></v-img>
        <a
          class="ml-6"
          :href="zalo"
          target="_blank"
          rel="noopener noreferrer"
          >{{ zalo }}</a
        >
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component<RoomOwnerSection>({
  name: 'RoomOwnerSection',
  // eslint-disable-next-line no-undef
})
export default class RoomOwnerSection extends Vue {
  @Prop({type: String}) readonly name!: string
  @Prop({type: Array}) readonly phones!: string[]
  @Prop({type: String}) readonly facebook!: string
  @Prop({type: String}) readonly zalo!: string
}
</script>
