<template>
  <v-container>
    <suggest-form />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SuggestForm from '@/components/guest/SuggestForm.vue'

// eslint-disable-next-line no-use-before-define
@Component<Suggest>({
  name: 'Suggest',
  // eslint-disable-next-line no-undef
  components: {
    SuggestForm,
  },
  layout: 'empty',
})
export default class Suggest extends Vue {
}
</script>

