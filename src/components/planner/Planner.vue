<template>
  <div class="main">
    <h1>Planner</h1>
    <v-container>
      <v-row>
        <v-col v-for="(items, dayNum) in days" v-bind:key="dayNum">
          <Days :dayNum="dayNum" :items="items" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import draggable from 'vuedraggable';
import Days from "./Days.vue";
export default {
  components: { Days },
  data() {
    return {
      days: {
        1: [
          {
            id: 1,
            title: "Kuta Beach Club",
            type: "Place of Interest",
            link: "https://youtube.com"
          },
          {
            id: 2,
            title: "Seminyak Night Street",
            type: "Place of Interest",
            link: "https://youtube.com"
          }
        ],
        2: [
          {
            id: 1,
            title: "Kuta Legion Hotel",
            type: "Accomodation",
            link: "https://kutahotel.com"
          },
          {
            id: 2,
            title: "Seminyak High Hopes Hotel",
            type: "Accomodation",
            link: "https://highhopeshotel.com"
          }
        ],
        3: []
      },
      cycle: null,
      index: 0,
    };
  },
  methods: {
  }
}
</script>

<style scoped>
h1 {
  padding-top: 20px;
  padding-bottom: 0px;
  text-align: center;
}

.main {
  height: 100vh;
  
  background-image: url("https://images.unsplash.com/photo-1521086248378-5fe2b23c8b23?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80");
  background-size: cover;
}
</style>