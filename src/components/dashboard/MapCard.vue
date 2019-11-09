<template>
<div>
  <v-card>
    <GmapMap
      :center="{
          lat:currentSearch.lat, 
          lng:currentSearch.lng
        }"
      :zoom="18"
      map-type-id="terrain"
      style="width: 1000px; height: 500px"
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
  </v-card>
</div>
</template>
<script>
import {gmapApi} from 'vue2-google-maps'
export default {
  data() {
    return {
      currentSearch: {
        lat: 1.3408906,
        lng: 103.7724171
      },
      markers: [
        {
          lat: 1.3408906,
          lng: 103.7724171
        },
        {
          lat: 1.340903,
          lng: 103.7735483
        }
      ]
    }
  },
  computed: {
    google: gmapApi
  }
}
</script>