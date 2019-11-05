<template>
  <div>
    <h1>Planner</h1>
    <v-container>
      <v-row justify="space-around">
        
        <v-col v-for='day in numDays' v-bind:key='day'>
          <draggable>
          <Days :dayNum='day' :items='items' />
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
      numDays: 3,
      items: [
        {
          id: 1,
          title: "Seminyak Beach",
          rating: 4.0,
          costPerDay: 150 // usd
        },
        {
          id: 2,
          title: "Kutah Beach",
          rating: 4.5,
          costPerDay: 50 // usd
        }
      ]
    };
  }
};
</script>

<style>

</style>