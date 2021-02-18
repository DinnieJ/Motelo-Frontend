<template>
  <v-form @submit="clickNext">
    <v-card class="mb-12" color="grey lighten-1" height="200px">
        Address
    </v-card>

    <v-btn color="primary" type="submit"> Hoàn thành </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component<AddressForm>({
  name: 'AddressForm',
  // eslint-disable-next-line no-undef
})
export default class AddressForm extends Vue {
  @Emit('next')
  clickNext(event: Event): string {
    event.preventDefault()
    return 'demo'
  }

  @Emit('back')
  clickBack(event: Event) {
    event.preventDefault()
  }
}
</script>
