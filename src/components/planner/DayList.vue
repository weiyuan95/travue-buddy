<template>
  <div>
    <v-container class='board'>
      <v-row justify="center">
        <v-col cols="7">
          <h2>Day {{ dayNum }}</h2>
        </v-col>
        <v-col cols="2">
          <v-dialog
          v-model="dialog"
          width="1000px">
          <template v-slot:activator=" { on }">
            <v-btn
              color="blue darken-2"
              dark
              v-on="on">
              Plot
            </v-btn>
          </template>
          <PlotMap v-if="markers && markers.length > 0" :markers="markers"/>
          </v-dialog>
        </v-col>
      </v-row>
      <v-divider style='padding:10px;' ></v-divider>
      <draggable
        v-model="activities"
        tag="activity-card"
        group="events"

        @start="isDragging=true"
        @end="isDragging=false"
        :empty-insert-threshold="200"
      >
        <!-- <transition-group type="transition"> -->
        <activity-card v-for="activity in activities" :activity="activity" :key="activity.id" />
        <!-- </transition-group> -->
      </draggable>
    </v-container>
    <!-- <div>{{ items }}</div> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ActivityCard from "./ActivityCard.vue";
import PlotMap from "./PlotMap.vue";

export default {
  name: "DayList",
  props: ["dayNum"],
  components: { ActivityCard, draggable, PlotMap },
  data() {
    return {
      dialog: false,
      isDragging: false,
      activities: [],
    };
  },
  computed: {
      markers() {
        return this.activities && this.activities.map(activity => ({ lat: activity.coordinates.lat, lng: activity.coordinates.lng }))
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}

.board {
  background-color: rgb(238, 238, 238, 0.9);
  /* opacity: 0.8; */
  align-content: space-between;
  min-height: 100px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 1px #676767;
}

</style>