<template>
<v-hover
  v-slot:default="{hover}"
  close-delay="50"
>
  <v-card height="220" width="370" :loading="loading" :elevation="hover ? 12 : 5">
    <v-img
      gradient="to top right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)"
      class="white--text align-end"
      :src="place.photoUrl"
      height="220px"
      width="350px">

        <v-card-title 
          style="max-width:370px">
            <span class="text-truncate" >
                {{ place.name }}
            </span>
        </v-card-title>

        <v-card-subtitle 
          class="white--text font-weight-light text-uppercase"> 
            {{place.category}} 
        </v-card-subtitle>

    </v-img>

    <v-fade-transition>
        <v-overlay
          v-if="hover"
          absolute
          color="#036358"
        >
          <v-btn>Search Location</v-btn>
        </v-overlay>
    </v-fade-transition>
  </v-card>
</v-hover>
</template>

<script>
export default {
  data() {
    return {
      hover: true
    }
  },
  props : ['place', 'loading']
}
</script>

<style scoped>
</style>