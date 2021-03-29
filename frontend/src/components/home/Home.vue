<template>
  <!-- we should figure out how to prefetch the image, it's 3mb -->
  <v-container class="home-container" fluid>
    <v-col class="offset-md-3 mt-12 text-center display-3 white-text-header font-weight-black" sm="6">TraVue</v-col>
    <v-col class="offset-md-3 text-center headline font-weight-bold white-text" sm="6">Travel Information made Easy.</v-col>
    <v-col class="offset-md-3" sm="6">
      <v-row align="center">
        <!-- <CountryForm /> -->
        <v-col class="offset-md-6">
          <SearchBar/>
        </v-col>
        
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
  components: {
    SearchBar
  }
};
</script>

<style scoped>
.home-container {
  background-image: url("../../assets/bg_images/img_1.jpg");
  height: 100vh;
  background-size: cover;
}

.white-text-header {
  color: white;
  text-shadow: 2px 1px 1px #6f6f6f;
}

.white-text {
  color: white;
  text-shadow: 1px 1px #828282;
}
</style>