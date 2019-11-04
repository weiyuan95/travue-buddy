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
          <ImageCarousel :loading="false" :imgStrings="imgUrls"/>
        </v-col>
        <v-col cols="6">
          <VideoFeature :loading="false" :link="ytVideoURL"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <NewsCard :loading="false" :newsArticles="newsArticles" />
        </v-col>
        <v-col cols="6">
          <ReviewsCard :loading="false" :reviews="reviews" />
        </v-col>
      </v-row>
      <v-btn @click="addLocationToBucketList" color="green" dark large absolute bottom right fab>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import store from "../../store/store";
import { 
  BUCKET_ADD_LOCATION,
  SET_LAST_LOCATION_NAME,
  SET_LAST_LOCATION_IMG_URLS,
  SET_LAST_LOCATION_YT_VID_URL,
  SET_LAST_LOCATION_NEWS_ARTICLES,
  SET_LAST_LOCATION_REVIEWS,
} from '../../store/mutation-types';

import { getAllNews } from "../../api";

import StatCard from "./StatCard.vue";
import ImageCarousel from "./ImageCarousel.vue";
import VideoFeature from "./VideoFeature.vue";
import NewsCard from "./NewsCard.vue";
import ReviewsCard from "./ReviewsCard.vue";

export default {
  name: "Dashboard",
  components: { StatCard, NewsCard, ImageCarousel, VideoFeature, ReviewsCard },
  created() { alert ('created' )},
  mounted() { alert ('mounted' )},
  data() {
    return {

      // Location data
      // locationName: '',
      // imgUrls: ['https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAADmRc5FAuJjjZ4cZO8S7u44EtZDiv_FmJ91D-TD9Kdy7JZMC7cTXhyNf8PN1UeZnThMDsPik2hRF15ZBVttJoOlDc2cOpx5ACm-twHrUBMS35JDNJ0wQBDcSkQIBSHqqeEhBtvTNW-S8YzI2GsTz1tEluGhRS53Gkm92_Phmhd_DEe-dXjgTzuQ&key=AIzaSyBLMsG90Og6RJhX8yvZ-YLuLXhOiKVgrGI'],
      // ytVideoURL: 'https://www.youtube.com/embed/xniDjNQtqyg',
      // newsArticles: [],
      // reviews: [],
      
      // stats data to be repopulated with data from VueX
      stats: [
        {
          id: "costPerDay",
          title: "Average Cost",
          subtitle: "Daily",
          value: 150, // usd,
          icon: "mdi-currency-usd",
          color: "amber darken-3"
        },
        {
          id: "safetyRating",
          subtitle: "Against 3",
          title: "Safety Rating",
          value: 1,
          icon: "mdi-alert",
          color: "red lighten-2"
        },
        {
          id: "rating",
          subtitle: "Against 5",
          title: "Review Rating",
          value: 4.5,
          icon: "mdi-message-draw",
          color: "indigo darken-1"
        },
        {
          id: "accomodationCost",
          subtitle: "Daily (USD)",
          title: "Accom Cost",
          value: 45, // per night
          icon: "mdi-home",
          color: "cyan darken-1"
        },
        {
          id: "timeSpent",
          subtitle: "Average Hours",
          title: "Time Spent",
          value: 1, // per hours
          icon: "mdi-timer",
          color: "grey darken-1"
        }
      ]
    }
  },

  methods: {
    addLocationToBucketList() {
      let location = {
        name:       this.locationName || 'new Location', 
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
    }
  },

  computed: {
    currentSearch() { return store.state.currentSearch; },
    locationName() { return store.state.lastLocationName ;},
    imgUrls() { return store.state.lastLocationImgUrls ;},
    ytVideoURL() { return store.state.lastLocationYtVideoURL ;},
    newsArticles() { return store.state.lastLocationNewsArticles ;},
    reviews() { return store.state.lastLocationReviews ;},
  },
  
  watch: {
    currentSearch() {

      store.commit(SET_LAST_LOCATION_NAME, { lastLocationName: this.currentSearch });

      // getAllImages()
      setTimeout(() => {
        store.commit(SET_LAST_LOCATION_IMG_URLS, { lastLocationImgUrls: ['https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAADmRc5FAuJjjZ4cZO8S7u44EtZDiv_FmJ91D-TD9Kdy7JZMC7cTXhyNf8PN1UeZnThMDsPik2hRF15ZBVttJoOlDc2cOpx5ACm-twHrUBMS35JDNJ0wQBDcSkQIBSHqqeEhBtvTNW-S8YzI2GsTz1tEluGhRS53Gkm92_Phmhd_DEe-dXjgTzuQ&key=AIzaSyBLMsG90Og6RJhX8yvZ-YLuLXhOiKVgrGI'] })
        // this.imgCarouselComponentLoading = false
      }, 500);
      
      // getAllReviews()
      setTimeout(() => {
        store.commit(SET_LAST_LOCATION_REVIEWS, { lastLocationReviews: [
          {
            "author_name": "ChunKiat Ong",
            "author_url": "https://www.google.com/maps/contrib/107867612598539418830/reviews",
            "language": "en",
            "profile_photo_url": "https://lh4.ggpht.com/-i1t_u2bipG4/AAAAAAAAAAI/AAAAAAAAAAA/T3uKSMWTRwM/s128-c0x00000000-cc-rp-mo/photo.jpg",
            "rating": 5,
            "relative_time_description": "a month ago",
            "text": "Love the food and coffee! Lookout for the pull beef burger (Chef’s special)! Coupled with the home-made bread, its one of the better burgers i have had. Like the breakfast platter where i am able to mix and match. Particularly impress that they are willing to ‘customise’ my breakfast platter to have e scrambled eggs well done and unsalted. (For my 20mths old son, and together with the sourdough bread, makes a good breakfast for him!) Only goes to show that everything is prepared after order. Lastly, the cheesecake is a must try!",
            "time": 1570107041
          },
          {
            "author_name": "Lyn Chong",
            "author_url": "https://www.google.com/maps/contrib/109544318011085924786/reviews",
            "language": "en",
            "profile_photo_url": "https://lh4.ggpht.com/-T4pwkqc_1L4/AAAAAAAAAAI/AAAAAAAAAAA/5jsVsWjTAd4/s128-c0x00000000-cc-rp-mo/photo.jpg",
            "rating": 3,
            "relative_time_description": "a week ago",
            "text": "The Rose Tea Cake is brilliantly light and fragrant! Delicious.",
            "time": 1572072705
          }
        ] })
        // this.reviewsComponentLoading = false
      }, 500);

      // getVidURL()
      setTimeout(() => {
        store.commit(SET_LAST_LOCATION_YT_VID_URL, { lastLocationYtVideoURL: "https://www.youtube.com/embed/xniDjNQtqyg" })
        // this.vidFeatureComponentLoading = false
      }, 500);

      getAllNews({ keyword: this.currentSearch })
      .then(articles => {
        store.commit(SET_LAST_LOCATION_NEWS_ARTICLES, { lastLocationNewsArticles: articles });
      })
      // .then(() => this.newsComponentLoading = false);
    }
  }
}
</script>

<style>

</style>