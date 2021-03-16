<template>
  <v-form @submit="clickNext">
    <h2 class="text-center">Các tiện ích của nhà trọ</h2>
    <v-row>
      <v-col
        cols="6"
        sm="4"
        v-for="amenitie in amenities"
        :key="amenitie.id"
      >
        <v-layout align-center>
          <v-checkbox
            v-model="amenitiesChosen"
            :value="amenitie.id"
          ></v-checkbox>
          <v-flex class="filter__content">
            <span>
              <v-icon>{{ `mdi-${amenitie.icon}` }}</v-icon>
            </span>
            <span>{{ amenitie.text }}</span>
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>

    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { TextIcon } from '@/constants/app.interface'
import { AMEENITIES } from '@/constants/app.constant'
import { DispatchAction } from '~/constants/app.vuex'

@Component<InnAmeenitiesForm>({
  name: 'InnAmeenitiesForm',

  created() {
    this.amenitiesChosen = []
  }
  // eslint-disable-next-line no-undef
})
export default class InnAmeenitiesForm extends Vue {
  private amenities: TextIcon[] = AMEENITIES
  private amenitiesChosen: number[] = []

  @Emit('next')
  clickNext(event: Event): string {
    event.preventDefault()
    this.$store.dispatch(DispatchAction.ADD_INN_FEATURES, this.amenitiesChosen.sort())
    return 'demo'
  }

  @Emit('back')
  clickBack(event: Event) {
    event.preventDefault()
  }
}
</script>
