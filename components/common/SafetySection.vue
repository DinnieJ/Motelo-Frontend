<template>
  <v-card rounded="lg" class="mt-12 pa-3">
    <div>
      <v-layout>
        <v-icon class="mx-3" size="32" color="info" dark>
          mdi-lock-check
        </v-icon>
        <h1 class="post__title">An toàn</h1>
      </v-layout>
      <v-divider />
    </div>
    <v-row class="mt-6"> 
      <v-col cols="6" md="3">
        <h3 class="font-weight-light">
          <span class="mr-2">
            <v-icon size="32">mdi-cctv</v-icon>
          </span>
          <span>Camera</span>
        </h3>
      </v-col>
      <v-col cols="6" md="3">
        <h3 class="font-weight-light">
          <span class="mr-2">
            <v-icon size="32">mdi-fingerprint</v-icon>
          </span>
          <span>Khóa vân tay</span>
        </h3>
      </v-col>
      <v-col cols="6" md="3">
        <h3 class="font-weight-light">
          <span class="mr-2">
            <v-icon size="32">mdi-shield-account</v-icon>
          </span>
          <span>Người bảo vệ</span>
        </h3>
      </v-col>
      <v-col cols="6" md="3">
        <h3 class="font-weight-light">
          <span class="mr-2">
            <v-icon size="32">mdi-door-closed-lock</v-icon>
          </span>
          <span>Giờ mở cổng: 5h - 23h</span>
        </h3>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TextIcon } from '@/constants/app.interface'

@Component<SafetySection>({
  name: 'SafetySection',
  // eslint-disable-next-line no-undef
})
export default class SafetySection extends Vue {

}
</script>
