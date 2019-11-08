<template>
  <div>

    <v-container>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col
              :cols="Math.floor(12/Object.keys(stats).length)"
              v-for="stat in stats"
              :key="stat.id"
            >
              <StatCard :loading="statCardComponentLoading" v-bind:stat="stat" />
            </v-col>
          </v-row>
          <v-row>
            <NewsCard :loading="newsComponentLoading" :newsArticles="newsArticles" />
          </v-row>
        </v-col>
        <v-col cols="6">
          <ReviewsCard :loading="reviewsComponentLoading" :reviews="reviews" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
          <MediaContainer />
        </v-col>
        <v-col cols="4">
          <NewsCard :loading="newsComponentLoading" :newsArticles="newsArticles" />
        </v-col>
      </v-row>

      <h1>Nearby Places</h1>
      <v-row justify="center">
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

import StatCard from "./StatCard.vue";
import NewsCard from "./NewsCard.vue";
import ReviewsCard from "./ReviewsCard.vue";
import LocationCard from "./LocationCard.vue";
import MediaContainer from "./MediaContainer.vue";

export default {
  name: "Dashboard",
  components: { StatCard, NewsCard, ReviewsCard, LocationCard, MediaContainer },
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
      stats: {
        costPerDay: {
          id: "costPerDay",
          title: "Average Cost",
          subtitle: "Daily",
          value: 150, // usd,
          icon: "mdi-currency-usd",
          color: "amber darken-3"
        },
        safetyRating: {
          id: "safetyRating",
          subtitle: "Against 5 (Lower Better)",
          title: "Safety Rating",
          value: 1,
          icon: "mdi-alert",
          color: "red lighten-2"
        },
        rating: {
          id: "rating",
          subtitle: "Against 5",
          title: "Average Review",
          value: 4.5,
          icon: "mdi-message-draw",
          color: "indigo darken-1"
        }
      }
    };
  },

  methods: {
    changeCurrentSearch: function(event, value) {
      console.log("clicked man");
      store.commit(CHANGE_CURRENT_SEARCH, { newSearchString: value });
    },
    addLocationToBucketList() {
      this.snackbar = true;
      let location = {
        name: this.locationName || this.currentSearch,
        rating: this.stats[2].value,
        safety: this.stats[1].value,
        costAccoms: this.stats[3].value,
        dailyCost: this.stats[0].value,
        timeSpent: this.stats[4].value,
        imgUrls: this.imgUrls,
        ytVideoURL: this.ytVideoURL,
        reviews: this.reviews,
        news: this.newsArticles
      };
      store.commit(BUCKET_ADD_LOCATION, { location });
    },

    updateData(places) {
      this.places = places;
      this.reviews = places.reviews;
      this.stats.rating.value = Math.round(places.rating * 10) / 10;

      getCountryCode(places.location.lat, places.location.lng).then(
        safetyRating =>
          (this.stats.safetyRating.value = safetyRating.safetyRating)
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

      getPlacesDetails({ keyword: this.currentSearch })
        .then(places => this.updateData(places))
        .then(() => (this.reviewsComponentLoading = false))
        .then(() => (this.statCardComponentLoading = false));
    }
  }
};
</script>

<style>
</style>