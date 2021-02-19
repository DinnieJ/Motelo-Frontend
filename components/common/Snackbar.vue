<template>
  <v-snackbar 
  v-model="show" 
  :color="color" 
  :timeout="timeout" 
  max-height="150"
  top>
    {{ message }}
          <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="show = false"
          width="10"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { MutationState } from '@/constants/app.vuex'

@Component<Snackbar>({
  name: 'Snackbar',

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === MutationState.SHOW_SNACKBAR 
        && state.snackbar.message
        && state.snackbar.color ) {
        this.show = false
        this.message = state.snackbar.message
        this.color = state.snackbar.color
        this.show = true
      }
    })
  },
})
export default class Snackbar extends Vue {
  private message: string = ''
  private color: string = ''
  private show: boolean = false
  private timeout: number = 3000
}
</script>