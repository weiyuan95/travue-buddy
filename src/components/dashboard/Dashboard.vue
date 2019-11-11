<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="7">
          <MediaContainer :imgUrls="imgUrls" :ytVideoURLs="ytVideoURLs" />
        </v-col>

        <v-col cols="5">
          <MapCard :searchCoordinates="searchCoordinates" :markers="markers" />
        </v-col>
      </v-row>

      <v-row style="max-height: 600px">
        <v-col style="max-height: inherit;">
          <v-row v-resize="updateStatsToDisplay">
            <v-col
              style="max-height: inherit"
              v-for="stat in statsToDisplay"
              :key="stat.id"
              class="pt-0"
            >
              <StatCard :loading="statCardComponentLoading" v-bind:stat="stat" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <ReviewsCard :loading="reviewsComponentLoading" :reviews="reviews" />
            </v-col>
          </v-row>
        </v-col>

        <v-col style="max-height: inherit">
          <NewsCard :loading="newsComponentLoading" :newsArticles="newsArticles" />
        </v-col>
      </v-row>

      <v-row>
        <v-row style="width: 100%" class="pl-4">
          <v-col>
            <h1>Nearby Places</h1>
          </v-col>
        </v-row>
        <v-row class="pl-4">
          <v-col
            :cols="Math.floor(12/nearbyPlaces.length)"
            v-for="(place, i) in nearbyPlaces"
            :key="i"
          >
            <LocationCard
              v-on:click.native="changeCurrentSearch($event, place.name)"
              v-bind:place="place"
              :loading="nearByComponentLoading"
            ></LocationCard>
          </v-col>
        </v-row>
      </v-row>
      <v-btn @click="addLocationToBucketList" color="#ff0266" dark large bottom right fab fixed>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-snackbar class="font-weight-bold" color="secondary" top v-model="snackbar" :timeout="2000">
        Added to bucket list!
        <v-btn color="accent" @click="snackbar = false">X</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import store from "../../store/store";
import { BUCKET_ADD_LOCATION } from "../../store/mutation-types";
import { getAllNews } from "../../api";
import { getCountryCode } from "../../api";
import { getPlacesDetails } from "../../api";
import { getPhotos } from "../../api";
import { getVideos } from "../../api";
import { getNearbyPlaces } from "../../api";
import { CHANGE_CURRENT_SEARCH } from "../../store/mutation-types";
import { getWeather } from "../../api";

import StatCard from "./StatCard.vue";
import NewsCard from "./NewsCard.vue";
import ReviewsCard from "./ReviewsCard.vue";
import LocationCard from "./LocationCard.vue";
import MediaContainer from "./MediaContainer.vue";
import MapCard from "./MapCard.vue";

export default {
  name: "Dashboard",
  components: {
    StatCard,
    NewsCard,
    ReviewsCard,
    LocationCard,
    MediaContainer,
    MapCard
  },
  data() {
    return {
      snackbar: false,

      nearByComponentLoading: true,
      newsComponentLoading: true,
      reviewsComponentLoading: true,
      imgCarouselComponentLoading: true,
      vidFeatureComponentLoading: true,
      statCardComponentLoading: true,

      // Location data
      locationName: "",
      searchCoordinates: {
        lat: 0,
        lng: 0
      },
      markers: [
        {
          lat: 1.3408906,
          lng: 103.7724171
        }
      ],
      imgUrls: [],
      ytVideoURLs: [],
      newsArticles: [],
      reviews: [],
      safetyRating: [],
      nearbyPlaces: [
        {
          name: "Kuta Beach",
          imgUrl: "https://i.imgur.com/jdd4qZS.jpg"
        },
        {
          name: "Sentosa",
          imgUrl: "https://i.imgur.com/jdd4qZS.jpg"
        },
        {
          name: "Effiel Tower",
          imgUrl: "https://i.imgur.com/jdd4qZS.jpg"
        },
        {
          name: "Effiel Tower",
          imgUrl: "https://i.imgur.com/jdd4qZS.jpg"
        },
        {
          name: "Effiel Tower",
          imgUrl: "https://i.imgur.com/jdd4qZS.jpg"
        },
        {
          name: "Effiel Tower",
          imgUrl: "https://i.imgur.com/jdd4qZS.jpg"
        }
      ],

      // stats data to be repopulated with data from VueX
      stats: [
        {
          safetyRating: {
            id: "safetyRating",
            subtitle: "Lower is Safer",
            title: "Safety Rating",
            value: 1,
            icon: "mdi-alert",
            color: "red lighten-2"
          }
        },
        {
          rating: {
            id: "rating",
            subtitle: "Against 5",
            title: "Average Review",
            value: 4.5,
            icon: "mdi-message-draw",
            color: "indigo darken-1"
          }
        },
        {
          weather: {
            id: "weather",
            title: "Cloudy",
            subtitle: "Weather",
            value: "36.7°C", // usd,
            iconUrl: "http://openweathermap.org/img/wn/10d@2x.png",
            color: "amber darken-3"
          }
        }
      ],
      // populated by updateStatsToDisplay based on window width
      statsToDisplay: {}
    };
  },

  methods: {
    updateStatsToDisplay() {
      let newStatsToDisplay = {};
      let windowWidth = window.innerWidth;
      // adjust the number of stats to show here
      let numOfStatsToShow = windowWidth >= 1750 ? 3 : 2;
      for (let i = 0; i < numOfStatsToShow; i++) {
        newStatsToDisplay = Object.assign(this.stats[i], newStatsToDisplay);
      }
      this.statsToDisplay = newStatsToDisplay;
    },
    changeCurrentSearch: function(event, value) {
      store.commit(CHANGE_CURRENT_SEARCH, { newSearchString: value });
    },

    addLocationToBucketList() {
      this.snackbar = true;
      let location = {
        name: this.locationName || this.currentSearch,
        rating: this.stats[1].rating.value,
        safety: this.stats[0].safetyRating.value,
        weather: this.stats[2].weather.value,
        imgUrls: this.imgUrls,
        ytVideoURLs: this.ytVideoURLs,
        reviews: this.reviews,
        news: this.newsArticles,
        coordinates: {...this.searchCoordinates}
      };
      store.commit(BUCKET_ADD_LOCATION, { location });
    },

    updateData(places) {
      this.searchCoordinates.lat = places.location.lat;
      this.searchCoordinates.lng = places.location.lng;
      this.markers[0].lat = places.location.lat;
      this.markers[0].lng = places.location.lng;
      this.places = places;
      this.reviews = places.reviews;
      this.reviewsComponentLoading = false;
      this.stats[1].rating.value = Math.round(places.rating * 10) / 10;

      getWeather(places.location.lat, places.location.lng).then(
        weatherDetails => {
          this.stats[2].weather.value = weatherDetails.temperature,
          this.stats[2].weather.iconUrl = weatherDetails.iconUrl,
          this.stats[2].weather.title = weatherDetails.description
        }
      );

      getCountryCode(places.location.lat, places.location.lng).then(
        safetyRating => {
          this.stats[0].safetyRating.value = safetyRating.safetyRating;
          this.statCardComponentLoading = false;
        }
      );

      getNearbyPlaces(places.location.lat, places.location.lng)
        .then(nearbyPlaces => (this.nearbyPlaces = nearbyPlaces))
        .then(() => (this.nearByComponentLoading = false));
    }
  },

  computed: {
    currentSearch() {
      return store.state.currentSearch;
    }
  },

  watch: {
    currentSearch() {
      this.nearByComponentLoading = true;
      this.newsComponentLoading = true;
      this.imgCarouselComponentLoading = true;
      this.reviewsComponentLoading = true;
      this.vidFeatureComponentLoading = true;
      this.statCardComponentLoading = true;

      getAllNews({ keyword: this.currentSearch })
        .then(articles => (this.newsArticles = articles))
        .then(() => (this.newsComponentLoading = false));

      getPhotos({ keyword: this.currentSearch })
        .then(imgUrls => (this.imgUrls = imgUrls))
        .then(() => (this.imgCarouselComponentLoading = false));

      getVideos({ keyword: this.currentSearch })
        .then(ytVideoURLs => (this.ytVideoURLs = ytVideoURLs))
        .then(() => (this.vidFeatureComponentLoading = false));

      getPlacesDetails({ keyword: this.currentSearch }).then(places =>
        this.updateData(places)
      );
    }
  },
  mounted() {
    this.updateStatsToDisplay();
  }
};
</script>

<style>
</style>