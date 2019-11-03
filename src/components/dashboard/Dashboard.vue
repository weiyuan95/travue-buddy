<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
            <v-row
              :align="alignment"
              :justify="justify"
              style="height: 300px;"
            >
            <StatCard class="pa-3" v-for="stat in stats" :key="stat.id" v-bind:stat="stat"/>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StatCard from "./StatCard.vue"

export default {
  name: "Dashboard",
  components: {
    StatCard
  },
  data() {
    return {
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
  }
}
</script>

<style>

</style>