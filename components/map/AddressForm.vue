<template>
  <v-form @submit="clickNext">
    <v-card class="mb-12" color="grey lighten-1" height="200px">
        Address
    </v-card>
    <v-input></v-input>
    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { DispatchAction } from '~/constants/app.vuex'

@Component<AddressForm>({
  name: 'AddressForm',
  // eslint-disable-next-line no-undef
})
export default class AddressForm extends Vue {
  
  @Emit('next')
  clickNext(event: Event) {
    event.preventDefault()
    this.$store.dispatch(DispatchAction.ADD_LOCATION_INFO, {
      address: 'Dai hoc FPT',
      location: '12.000023 52.223123'
    })
  }

  @Emit('back')
  clickBack(event: Event) {
    event.preventDefault()
  }
}
</script>
