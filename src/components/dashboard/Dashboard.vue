<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
            <v-row
              :align="alignment"
              :justify="justify"
            >
            <StatCard class="pa-3" v-for="stat in stats" :key="stat.id" v-bind:stat="stat"/>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <ImageCarousel :imgStrings="['https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAADmRc5FAuJjjZ4cZO8S7u44EtZDiv_FmJ91D-TD9Kdy7JZMC7cTXhyNf8PN1UeZnThMDsPik2hRF15ZBVttJoOlDc2cOpx5ACm-twHrUBMS35JDNJ0wQBDcSkQIBSHqqeEhBtvTNW-S8YzI2GsTz1tEluGhRS53Gkm92_Phmhd_DEe-dXjgTzuQ&key=AIzaSyBLMsG90Og6RJhX8yvZ-YLuLXhOiKVgrGI']"/>
        </v-col>
        <v-col cols="6">
          <VideoFeature :link="'https://www.youtube.com/embed/xniDjNQtqyg'"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <NewsCard :newsArticles="newsArticles" />
        </v-col>
        <v-col cols="6">
          <h1>Reviews</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import store from "../../store/store";
import { getAllNews } from "../../api";
import StatCard from "./StatCard.vue";
import NewsCard from "./NewsCard.vue";
import ImageCarousel from "./ImageCarousel.vue";
import VideoFeature from "./VideoFeature.vue";

export default {
  name: "Dashboard",
  components: { StatCard, NewsCard, ImageCarousel, VideoFeature },
  data() {
    return {
      newsArticles: [],
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
  computed: {
    currentSearch() { return store.state.currentSearch; }
  },
  watch: {
    currentSearch() {
      getAllNews({ keyword: this.currentSearch })
      .then(articles => this.newsArticles = articles); 
    }
  }
}
</script>

<style>

</style>