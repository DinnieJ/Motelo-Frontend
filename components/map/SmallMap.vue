<template>
  <gmap-map
    ref="mapRef"
    style="width: auto; height: 100%; min-height: 30vh"
    :center="center"
    :zoom="zoom"
    :options="mapOptions"
  >
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
  @Prop({ required: true }) readonly center!: any
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
}
</script>
