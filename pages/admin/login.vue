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
                outline
                label="Tên"
                type="text"
                name="name"
                v-model="username"
              ></v-text-field>
              <v-text-field
                outline
                hide-details
                label="Password"
                type="password"
                name="password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <v-spacer></v-spacer>
            <v-btn color="primary" :large="$vuetify.breakpoint.smAndUp">
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


// eslint-disable-next-line no-use-before-define
@Component<AdminLogin>({
  name: 'AdminLogin',
  layout: 'empty',
})
export default class AdminLogin extends Vue {
    public username: string = ''
    public password: string = ''
}
</script>