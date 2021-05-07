<template>
  <v-container>
    <v-layout wrap>
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="4" light tag="section">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline">Đăng nhập cho Motelo Admin</h3>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                outline
                label="Tên"
                type="text"
                name="name"
              ></v-text-field>
              <v-text-field
                v-model="password"
                outline
                hide-details
                label="Password"
                type="password"
                name="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <v-spacer></v-spacer>
            <v-btn color="primary" :large="$vuetify.breakpoint.smAndUp" @click="handleSubmit">
              <v-icon left>mdi-lock</v-icon>
              Đăng nhập
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { setTokenCookie, setRoleCookie, removeTokenCookie, removeRoleCookie } from '@/utils/cookies'
import { AuthMutation } from '@/store/auth'
import { loginAdmin } from '@/utils/admin'

// eslint-disable-next-line no-use-before-define
@Component<AdminLogin>({
  name: 'AdminLogin',
  layout: 'empty',
})
export default class AdminLogin extends Vue {
    public username: string = ''
    public password: string = ''

    private handleSubmit() {

      const loginInfo = {
        username: this.username,
        password: this.password
      }

      const data = loginAdmin(loginInfo)

      this.$store.commit(`auth/${AuthMutation.SET_TOKEN}`, data.token)
      this.$store.commit(`auth/${AuthMutation.SET_USER}`, data.user)
      this.$store.commit(`auth/${AuthMutation.SET_ROLE}`, data.role)

      setTokenCookie(data.token);
      setRoleCookie(data.role);

      this.$router.push('/admin')
    } 
}
</script>