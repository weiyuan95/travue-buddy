<template>
    <div>
        <!-- <v-card width="300px" height="70"> -->

        <div class="container">
            <div class="searchBox">
                <!-- <input class="searchInput" id="map" type="text" v-model="destination" @keypress="enterSubmit($event)"> -->
                <vuetify-google-autocomplete
                    id="map"
                    refer="places"
                    placeholder="Enter a Place of Interest"
                    v-on:placechanged="getAddressData"
                    types="establishment"
                >
                </vuetify-google-autocomplete>

                <!-- <button class="searchButton" href="#">
          <i class="fa fa-home"></i>
      </button> -->
            </div>

            <div>
                <v-btn
                    class="searchButton"
                    @click="submit"
                    :error-messages="destinationErrors"
                >
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </div>
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
        destination: "",
    }),

    validations: {
        destination: { required },
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
        },
    },

    methods: {
        enterSubmit: function($event) {
            if ($event.charCode == 13) {
                this.submit();
            }
        },
        getAddressData: function(addressData) {
            this.address = addressData;
            this.destination = addressData.name;
        },
        submit() {
            this.$v.$touch();
            router.push("dashboard").then(() =>
                store.commit(CHANGE_CURRENT_SEARCH, {
                    newSearchString: this.destination,
                })
            );
        },
    },
};
</script>

<style scoped>
body {
    background-image: linear-gradient(to right, #cb2d3e, #ef473a);
}

.container {
    display: flex;
    flex-direction: row;
    background: white;
    align-items: center;
    border-radius: 50px;
    padding: 5px 0px 5px 0px;
    justify-content: space-evenly;
    max-width: 700px;
}

.searchBox {
    /* background: white; */
    width: 500px;
    transition: 0.4s;
}

.searchButton {
    /* border-radius: 100%; */
    /* background: #2f3640; */
}

.searchInput {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-top: 15px;
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: #2f3640 !important;
    transition: 800s;
    line-height: 40px;
    width: 0px;
    align-items: stretch;
    font-size: 30px;
}
</style>
