<template>
  <v-container fluid>
    <v-layout d-flex column justify-center align-center class="login__layout">
      <login-form />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginForm from '@/components/account/LoginForm.vue'

// eslint-disable-next-line no-use-before-define
@Component<Login>({
  name: 'Login',
  // eslint-disable-next-line no-undef
  components: {
    LoginForm,
  },
  // eslint-disable-next-line no-undef
  layout: 'empty',
})
export default class Login extends Vue {
}
</script>