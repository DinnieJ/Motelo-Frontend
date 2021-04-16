<template>
  <v-form @submit="clickNext">
    <v-text-field label="Địa chỉ nhà trọ" v-model="innAddress">
      <v-icon slot="append" @click="searchAddress" color="primary">
        Tìm kiếm
      </v-icon>
    </v-text-field>
    <v-card
      class="mb-12"
      height="400px"
      style="border: 3px solid blue; position: relative"
    >
      <gmap-map
        ref="mapRef"
        :center="center"
        :zoom="zoom"
        style="width: auto; height: 100%"
        @click="setMapCenter"
      >
        <gmap-marker :position="center"></gmap-marker>
      </gmap-map>
    </v-card>
    <p v-show="!!innAddress">
      <i> Có phải bạn muốn tìm: </i>{{ suggestAddress }}
    </p>
    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { DispatchAction } from '~/constants/app.vuex'
import axios from 'axios'
import { DefaultMapZoom } from '~/constants/app.constant'
@Component<AddressForm>({
  name: 'AddressForm',
  // eslint-disable-next-line no-undef
})
export default class AddressForm extends Vue {
  private innAddress: string = ''
  private suggestAddress: string = ''
  private mapLocation: any = {}
  private center: any = { lat: 0, lng: 0 }
  private zoom: number = DefaultMapZoom

  async created() {
    const context = this
    context.getCurrentPosition()
  }

  public async getCurrentPosition() {
    const context = this
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        async function setMapCenterByGPS(position) {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          context.center = currentPosition
          await axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition.lat},${currentPosition.lng}&key=${process.env.MAP_API_KEY}`
            )
            .then((res) => {
              const address = res.data.results[0]
              context.innAddress =
                (address && address.formatted_address) || 'Trường đại học FPT'
            })
            .catch((err) => {
              console.log('get current address = ', err)
            })
        }
      , error => {
        console.log(error)
      }, {maximumAge: 0})
    }
  }

  @Emit('next')
  clickNext(event: Event) {
    event.preventDefault()
    this.$store.dispatch(DispatchAction.ADD_LOCATION_INFO, {
      address: this.innAddress,
      location: this.center,
    })
  }

  @Emit('back')
  clickBack(event: Event) {
    event.preventDefault()
  }

  public async searchAddress() {
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.innAddress}&key=${process.env.MAP_API_KEY}`
      )
      .then((res) => {
        this.mapLocation = res.data.results[0]
        this.center = this.mapLocation.geometry.location
        this.suggestAddress = this.mapLocation.formatted_address
      })
      .catch((err) => {
        console.log('search map err = ', err)
      })
  }

  public setMapCenter({ latLng }: any) {
    this.center = latLng
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>