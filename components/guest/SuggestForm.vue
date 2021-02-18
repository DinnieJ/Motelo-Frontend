<template>
  <v-card light>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Gợi ý</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text to="/"> bỏ qua </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-stepper v-model="e6" vertical class="home__step">
      <v-stepper-step editable :complete="e6 > 1" step="1">
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step editable :complete="e6 > 2" step="2">
        Configure analytics for this app
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step editable :complete="e6 > 3" step="3">
        Select an ad format and name ad unit
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step editable step="4">
        View setup instructions
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TextIcon } from '@/constants/app.interface'
import { AMEENITIES, GENDER, ROOM_TYPES } from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<SuggestForm>({
  name: 'SuggestForm',
  // eslint-disable-next-line no-undef
})
export default class SuggestForm extends Vue {
  private ameenities: TextIcon[] = AMEENITIES
  private gender: TextIcon = GENDER[0]
  private roomType: TextIcon = ROOM_TYPES[0]

  private e6: any = null
}
</script>
