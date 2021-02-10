<template>
  <v-container fluid>
    <register-form />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RegisterForm from '@/components/account/RegisterForm.vue'

// eslint-disable-next-line no-use-before-define
@Component<Register>({
  name: 'Register',
  // eslint-disable-next-line no-undef
  components: {
    RegisterForm,
  },
  // eslint-disable-next-line no-undef
  layout: 'empty',
})
export default class Register extends Vue {
}
</script>
