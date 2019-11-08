<template>
<div>
  <!-- <v-card width="300px" height="70"> -->
    
  <div class="searchBox">
      <input class="searchInput" id="map" type="text" v-model="destination" @keypress="enterSubmit($event)">
        <vuetify-google-autocomplete
        id="map"
        refer="places"
        placeholder="Where do you want to go?"
        v-on:placechanged="getAddressData"
        types="establishment"
        >
        </vuetify-google-autocomplete>

      
      <v-btn style="width:70; height: 70px" class="searchButton"
      @click="submit"
      :error-messages="destinationErrors"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

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
import router from "../../routes";
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
      router.push("dashboard")
      .then(() => store.commit(CHANGE_CURRENT_SEARCH, { newSearchString: this.destination }))
    }
  }
}
</script>

<style scoped>
body {
    background-image: linear-gradient(to right , #cb2d3e , #ef473a);
}

.searchBox {
    position: absolute;
    top: 20%;
    left: 50%;
    transform:  translate(-50%,50%);
    background: white;
    height: 90px;
    border-radius: 50px;
    padding: 10px;
    transition: 0.4s;
}

.searchBox:hover {
  box-shadow: 1px 1px 20px 2px rgb(153, 253, 255);
  transition: 0.4s;
}

.searchBox:hover > .searchInput {
    width: 500px;
    padding: 0 6px;
    transition: 0.4s;
}

.searchBox:hover > .searchButton {
  background: white;
  color : #2f3640;
  transition: 0.4s;
}

.searchButton {
    color: white;
    float: right;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
}

.searchInput {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-top: 15px;
    border:none;
    background: none;
    outline:none;
    float:left;
    padding: 0;
    color: rgb(167, 167, 167) !important;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;
    align-items: stretch;
    font-size: 30px;
}

@media screen and (max-width: 620px) {
.searchBox:hover > .searchInput {
    width: 150px;
    padding: 0 6px;
}
}
</style>