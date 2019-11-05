<template>
  <div>
    <h1>Planner</h1>
    <v-container>
      <v-row justify="space-around">
        <v-col v-for="(items, dayNum) in days" v-bind:key="dayNum">
          <draggable>
            <Days :dayNum="dayNum" :items="items" />
          </draggable>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Days from './Days.vue';
export default {
  components: { Days, draggable },
  data() {
    return { 
      days: {
        1: [
          {
            id: 1,
            title: 'Kuta Beach Club',
            type: 'Place of Interest',
            link: 'https://youtube.com'
          },
          {
            id: 2,
            title: 'Seminyak Night Street',
            type: 'Place of Interest',
            link: 'https://youtube.com'
          }
        ],
        2: [
          {
            id: 1,
            title: 'Kuta Legion Hotel',
            type: 'Accomodation',
            link: 'https://kutahotel.com'
          },
          {
            id: 2,
            title: 'Seminyak High Hopes Hotel',
            type: 'Accomodation',
            link: 'https://highhopeshotel.com'
          }
        ],
        3: []
      },
      // numDays: 3,
      // items: [
      //   {
      //     id: 1,
      //     title: "Seminyak Beach",
      //     rating: 4.0,
      //     costPerDay: 150 // usd
      //   },
      //   {
      //     id: 2,
      //     title: "Kutah Beach",
      //     rating: 4.5,
      //     costPerDay: 50 // usd
      //   }
      // ]
    };
  },
  methods: {
    eachDay() {
      
    }
  },
};
</script>

<style>
</style>