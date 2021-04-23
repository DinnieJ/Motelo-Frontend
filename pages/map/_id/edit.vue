<template>
  <v-container
    tag="section"
  >
    <v-layout class="d-flex column align-center pa-3">
      <h1 class="primary--text text-h3 text-center">Cập nhật tiện ích</h1>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component<EditUtility>({
    name: 'EditUtility'
})
export default class EditUtility extends Vue {

}
</script>