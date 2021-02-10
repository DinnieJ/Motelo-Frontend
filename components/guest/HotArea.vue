<template>
  <section>
    <v-layout justify-space-between class="my-5">
      <h1>Khu vực <span class="warning--text">HOT</span></h1>
    </v-layout>
    <v-row>
      <v-col cols="6" sm="4" lg="2" v-for="i in 6" :key="i" class="pa-4">
        <v-layout
          column
          justify-end
          align-center
          class="rounded-xl shadow home__area"
          :style="{ 'background-image': `url('/imgs/anh_room.jpg')` }"
        >
          <h2 class="white--text">{{ `thôn ${i}` }}</h2>
        </v-layout>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// eslint-disable-next-line no-use-before-define
@Component<HotArea>({
  name: 'HotArea',
})
export default class HotArea extends Vue {
}
</script>
