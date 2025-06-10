<template>
  <div class="mt-6 pa-3">
    <div>
        <h1 >
          <v-icon class="mb-3" size="32" color="info" dark left>
            mdi-lock-check
          </v-icon>
          <span> An toàn </span>
        </h1>
      <v-divider />
    </div>
    <v-row class="mt-3 pl-5 pr-5">
      <v-col v-for="item in security" :key="item.code" cols="6" md="3">
        <h3 class="font-weight-light">
          <span class="mr-2">
            <v-icon size="32">{{ `mdi-${item.icon}` }}</v-icon>
          </span>
          <span>{{ item.text }}</span>
        </h3>
      </v-col>
      <v-col cols="12" sm="6">
        <h3 class="font-weight-light">
          <span class="mr-2">
            <v-icon size="32">mdi-door-closed-lock</v-icon>
          </span>
          <span>{{
            `Giờ mở cổng: ${open_time.open}h - ${open_time.close}h`
          }}</span>
        </h3>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TextIcon } from '@/constants/app.interface'

@Component<SafetySection>({
  name: 'SafetySection',
  // eslint-disable-next-line no-undef
})
export default class SafetySection extends Vue {
  @Prop({ type: Array }) readonly security!: TextIcon[]
  @Prop({ type: Object }) readonly open_time!: Object
}
</script>
