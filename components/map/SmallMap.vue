<template>
  <gmap-map
    ref="mapRef"
    style="width: auto; height: 100%; min-height: 30vh"
    :center="center"
    :zoom="zoom"
    :options="mapOptions"
  >
    <gmap-circle
      :center="center"
      :radius="circleRadius"
      :options="circleOptions"
    ></gmap-circle>
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
  @Prop() readonly center!: any
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
}
</script>
