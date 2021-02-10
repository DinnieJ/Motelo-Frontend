<template>
  <v-form @submit="clickNext">
    <v-textarea
      class="text-h5"
      label="Miêu tả thêm"
    ></v-textarea>

    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component<RoomDescriptionForm>({
  name: 'RoomDescriptionForm',
  // eslint-disable-next-line no-undef
})
export default class RoomDescriptionForm extends Vue {
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
