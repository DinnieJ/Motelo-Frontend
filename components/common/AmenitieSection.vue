<template>
  <div class="mt-6 pa-5">
    <div>
        <h1>
          <v-icon class="mb-3" size="32" color="success" dark left>
            mdi-thumb-up
          </v-icon>
          <span>Tiện ích</span>
        </h1>
      <v-divider />
    </div>
    <v-row class="mt-6 pl-5 pr-5">
      <v-col cols="6" md="3" v-for="amenitie in amenities" :key="amenitie.code">
        <h3 class="font-weight-light">
          <span class="mr-2">
            <v-icon size="32">{{ `mdi-${amenitie.icon}` }}</v-icon>
          </span>
          <span>{{ amenitie.text }}</span>
        </h3>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TextIcon } from '@/constants/app.interface'

@Component<AmenitieSection>({
  name: 'AmenitieSection',
  // eslint-disable-next-line no-undef
})
export default class AmenitieSection extends Vue {
  @Prop({ type: Array }) readonly amenities!: TextIcon[]
}
</script>
