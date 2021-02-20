<template>
  <v-card rounded="lg" class="mt-12 pa-3">
    <div>
      <v-layout>
        <v-icon class="mx-3" size="32" color="warning" dark>
          mdi-information
        </v-icon>
        <h1 class="room__title">Mô tả thêm</h1>
      </v-layout>
      <v-divider />
    </div>
    <div class="pa-4">
      <p v-for="(line, index) in description.split('\n')" :key="index">{{ line }}</p>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component<RoomDescriptionSection>({
  name: 'RoomDescriptionSection',
  // eslint-disable-next-line no-undef,
})
export default class RoomDescriptionSection extends Vue {
  @Prop({type: String}) readonly description!: String
}
</script>
