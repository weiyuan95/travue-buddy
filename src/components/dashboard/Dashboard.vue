<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
            <v-row
            >
            <StatCard class="pa-3" v-for="stat in stats" :key="stat.id" v-bind:stat="stat"/>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <ImageCarousel :loading="imgCarouselComponentLoading" :imgStrings="imgUrls"/>
        </v-col>
        <v-col cols="6">
          <VideoFeature :loading="vidFeatureComponentLoading" :link="ytVideoURL"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <NewsCard :loading="newsComponentLoading" :newsArticles="newsArticles" />
        </v-col>
        <v-col cols="6">
          <ReviewsCard :loading="reviewsComponentLoading" :reviews="reviews" />
        </v-col>
      </v-row>
      <v-btn @click="addLocationToBucketList" color="green" dark large bottom right fab fixed>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-snackbar color="green" top v-model="snackbar" :timeout="2000">
        Added to bucket list!
        <v-btn color="grey" @click="snackbar = false" > X </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import store from "../../store/store";
import { BUCKET_ADD_LOCATION } from '../../store/mutation-types';
import { getAllNews } from "../../api";
import { getCountryCode } from "../../api";
import { getPlacesDetails } from "../../api";

import StatCard from "./StatCard.vue";
import ImageCarousel from "./ImageCarousel.vue";
import VideoFeature from "./VideoFeature.vue";
import NewsCard from "./NewsCard.vue";
import ReviewsCard from "./ReviewsCard.vue";

export default {
  name: "Dashboard",
  components: { StatCard, NewsCard, ImageCarousel, VideoFeature, ReviewsCard },
  data() {
    return {

      snackbar: false,

      newsComponentLoading: true,
      reviewsComponentLoading: true,
      imgCarouselComponentLoading: true,
      vidFeatureComponentLoading: true,

      // Location data
      locationName: '',
      imgUrls: ['https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAADmRc5FAuJjjZ4cZO8S7u44EtZDiv_FmJ91D-TD9Kdy7JZMC7cTXhyNf8PN1UeZnThMDsPik2hRF15ZBVttJoOlDc2cOpx5ACm-twHrUBMS35JDNJ0wQBDcSkQIBSHqqeEhBtvTNW-S8YzI2GsTz1tEluGhRS53Gkm92_Phmhd_DEe-dXjgTzuQ&key=AIzaSyBLMsG90Og6RJhX8yvZ-YLuLXhOiKVgrGI'],
      ytVideoURL: 'https://www.youtube.com/embed/xniDjNQtqyg',
      newsArticles: [],
      reviews: [],
      safetyRating: [],
      places: [],
      
      // stats data to be repopulated with data from VueX
      stats: {
        "costPerDay": {
          id: "costPerDay",
          title: "Average Cost",
          subtitle: "Daily",
          value: 150, // usd,
          icon: "mdi-currency-usd",
          color: "amber darken-3"
        },
        "safetyRating": {
          id: "safetyRating",
          subtitle: "Against 5 (Lower Better)",
          title: "Safety Rating",
          value: 1,
          icon: "mdi-alert",
          color: "red lighten-2"
        },
         "rating": {
          id: "rating",
          subtitle: "Against 5",
          title: "Average Review",
          value: 4.5,
          icon: "mdi-message-draw",
          color: "indigo darken-1"
        },
        "accomodationCost": {
          id: "accomodationCost",
          subtitle: "Daily (USD)",
          title: "Accom Cost",
          value: 45, // per night
          icon: "mdi-home",
          color: "cyan darken-1"
        },
        "timeSpent": {
          id: "timeSpent",
          subtitle: "Average Hours",
          title: "Time Spent",
          value: 1, // per hours
          icon: "mdi-timer",
          color: "grey darken-1"
        }
      }
    }
  },

  methods: {
    addLocationToBucketList() {
      this.snackbar = true;
      let location = {
        name:       this.locationName || this.currentSearch,
        rating:     this.stats[2].value,
        safety:     this.stats[1].value,
        costAccoms: this.stats[3].value,
        dailyCost:  this.stats[0].value,
        timeSpent:  this.stats[4].value,
        imgUrls:    this.imgUrls,
        ytVideoURL: this.ytVideoURL,
        reviews:    this.reviews,
        news:       this.newsArticles
      }
      store.commit(BUCKET_ADD_LOCATION, { location });
    },
    
    updateData(places) {
      this.places = places;
      this.reviews = places.reviews;
      this.stats.rating.value = Math.round( places.rating * 10 ) / 10;

      getCountryCode(places.location.lat, places.location.lng)
      .then(safetyRating => this.stats.safetyRating.value = safetyRating.safetyRating);
    }
  },

  computed: {
    currentSearch() { return store.state.currentSearch; }
  },

  watch: {
    currentSearch() {

      this.newsComponentLoading = true;
      this.imgCarouselComponentLoading = true;
      this.reviewsComponentLoading = true;
      this.vidFeatureComponentLoading = true;

      // getAllImages()
      setTimeout(() => this.imgCarouselComponentLoading = false, 500);

      // getAllVids()
      setTimeout(() => this.vidFeatureComponentLoading = false, 500);

      getAllNews({ keyword: this.currentSearch })
      .then(articles => this.newsArticles = articles)
      .then(() => this.newsComponentLoading = false);

      getPlacesDetails({ keyword: this.currentSearch})
      .then(places => this.updateData(places))
      .then(() => this.reviewsComponentLoading = false);

    }
  }
}
</script>

<style>

</style>