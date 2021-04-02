<template>
  <v-footer dark padless>
    <v-card flat class="primary lighten-1 white--text text-center" width="100%">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon.link" class="mx-4 white--text" :href="icon.link" icon>
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>FPT University</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<Footer>({
    name: 'Footer'
})

export default class Footer extends Vue {
    private icons: any = [
        { link: 'https://www.facebook.com/DaihocFPTHaNoi', icon: 'mdi-facebook' },
        { link: 'http://hanoi.fpt.edu.vn/', icon: 'mdi-earth' },
        { link: 'mailto:tuyensinh.hanoi@fpt.edu.vn', icon: 'mdi-email' }
    ]
}
</script>