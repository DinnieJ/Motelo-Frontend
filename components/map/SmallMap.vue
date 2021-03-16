<template>
  <gmap-map
<<<<<<< HEAD
=======
    ref="mapRef"
>>>>>>> add map in detail room page
    style="width: auto; height: 100%; min-height: 30vh"
    :center="center"
    :zoom="zoom"
    :options="mapOptions"
  >
<<<<<<< HEAD
    <gmap-circle
      :center="center"
      :radius="circleRadius"
      :options="circleOptions"
    ></gmap-circle>
=======
>>>>>>> add map in detail room page
    <gmap-marker :position="center"></gmap-marker>
  </gmap-map>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DefaultMapZoom } from '~/constants/app.constant'

@Component<SmallMap>({
  name: 'SmallMap',
  // eslint-disable-next-line no-undef
})
export default class SmallMap extends Vue {
<<<<<<< HEAD
  @Prop() readonly center!: any
=======
  @Prop({ required: true }) readonly center!: any
>>>>>>> add map in detail room page
  private zoom: number = DefaultMapZoom
  private mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    disableDefaultUi: false,
  }
<<<<<<< HEAD

  private circleRadius: number = 1000 // meter(s)
  private circleOptions: any = {
    fillColor: 'red',
    fillOpacity: 0.2,
    strokeWeight: 2,
    strokeColor: '#999',
    draggable: false,
    editable: false,
    clickable: true,
  }
  private searchRadius: number = this.circleRadius
  public getCircleByRadius() {
    this.circleRadius = this.searchRadius
  }
=======
>>>>>>> add map in detail room page
}
</script>
