<template>
<div>
  <!-- <v-card width="300px" height="70"> -->
    
  <div>
    <v-hover
      v-slot:default="{hover}"
      close-delay="50"
    >
      <v-card style="width: 400px; height: 40px" :elevation="hover ? 12 : 3">
        <input style="padding-left: 10px; width: 400px; height: 40px" 
        id="map" 
        type="text"
        v-model="locationSearch" 
        @keypress="enterSubmit($event)">
          <vuetify-google-autocomplete
          id="map"
          refer="places"
          placeholder="Where do you want to go?"
          v-on:placechanged="getAddressData"
          types="establishment"
          >
          </vuetify-google-autocomplete>
      </v-card>
    </v-hover>

      <!-- <button class="searchButton" href="#">
          <i class="fa fa-home"></i>
      </button> -->
  </div>

  <!-- </v-card> -->
</div>

</template>

<script>
import store from "../../store/store";
import { CHANGE_CURRENT_SEARCH } from "../../store/mutation-types";

/* eslint-disable no-console */
export default {

  data: () => ({ locationSearch: "" }),
  
  mounted() { 
    this.locationSearch = store.state.currentSearch;
  },

  methods: {
    enterSubmit: function($event) {
      if ($event.charCode == 13) {
        this.submit();
      }
    },
    getAddressData: function (addressData) {
      store.commit(CHANGE_CURRENT_SEARCH, { newSearchString: addressData.name });
    },
    submit() {
      // this.$v.$touch();
    }
  },

  computed: {
    currentSearch() { return store.state.currentSearch }
  },

  watch: {
    currentSearch() { this.locationSearch = this.currentSearch }
  }
}
</script>

<style scoped>

</style>