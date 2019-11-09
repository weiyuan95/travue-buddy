<template>
  <v-card
    class="mx-auto"
    color="#F9F9F9"
    max-width="370"
  >
     <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          Kuta Beach
        </v-list-item-title>
        <v-list-item-subtitle>
          Weather
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>


    <v-card-title style="padding: 0px; padding-left: 15px;">
      {{ weather.description }}
    </v-card-title>
     <v-card-text>
      <v-row align="center">
        <v-col class="display-3" cols="7">
          {{ weather.temp }}°C 
        </v-col>
        <v-col cols="5">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sun.png"
            alt="Sunny image"
            width="80"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>



  </v-card>
</template>

<script>
export default {
  data() {
    return {
      weather: {
        description: "Clear skies",
        temp: 36.7
      }
    }
  }
}
</script>

<style>

</style>