<template>
  <div class="mt-6 pa-3">
    <div>
      <v-layout>
        <h1 >
          <v-icon class="mx-3" size="32" color="warning" dark>
            mdi-information
          </v-icon>
          <span>Mô tả thêm</span>
        </h1>
      </v-layout>
      <v-divider />
    </div>
    <div class="pa-4">
      <p v-for="(line, index) in description.split('\n')" :key="index">
        {{ line }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component<RoomDescriptionSection>({
  name: 'RoomDescriptionSection',
  // eslint-disable-next-line no-undef,
})
export default class RoomDescriptionSection extends Vue {
  @Prop({ type: String }) readonly description!: String
}
</script>
