<template>
<div>
  <!-- <v-card width="300px" height="70"> -->
    
  <div>
    <v-hover
      v-slot:default="{hover}"
      close-delay="50"
    >
      <v-card style="width: 400px; height: 40px" :elevation="hover ? 12 : 3">
        <input style="width: 400px; height: 40px" id="map" type="text" v-model="destination" @keypress="enterSubmit($event)">
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
import { required } from "vuelidate/lib/validators";


export default {

  data: () => ({
      destination: ""
    }),

  validations: {
      destination: { required }
    },

  computed: {
    destinationErrors() {
      const errors = [];
      if (!this.$v.destination.$dirty) {
        return errors;
      }
      !this.$v.destination.required &&
        errors.push("Please enter your destination");
      return errors;
    }
  },

  methods: {
    enterSubmit: function($event) {
      if ($event.charCode == 13) {
        
        this.submit();
      }
    },
    getAddressData: function (addressData) {
      this.address = addressData;
      this.destination = addressData.name;
    },
    submit() {
      this.$v.$touch();
      store.commit(CHANGE_CURRENT_SEARCH, { newSearchString: this.destination });
    }
  }
}
</script>

<style scoped>

</style>