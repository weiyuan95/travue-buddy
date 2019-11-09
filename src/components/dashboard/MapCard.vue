<template>
    <GmapMap
      :center="{
          lat:searchCoordinates.lat, 
          lng:searchCoordinates.lng
        }"
      :zoom="18"
      map-type-id="terrain"
      :style="{height: this.height,width: this.width}"
    >
      <GmapMarker ref="myMarger"
        v-for="(marker, i) in markers"
        :key="i"
        :position="google && new google.maps.LatLng(marker.lat, marker.lng)"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
      />
    </GmapMap>
</template>
<script>
import {gmapApi} from 'vue2-google-maps'
export default {
  data() {
    return {
      height: `500px`,
      width: "1000px"
    }
  },
  props: [ "searchCoordinates", "markers" ],
  computed: {
    google: gmapApi
  }
}
</script>