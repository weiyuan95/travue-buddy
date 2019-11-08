<template>
  <div>
    <v-container class='board'>
      <h2>Day {{ dayNum }} 🌴</h2>
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
export default {
  name: "DayList",
  props: ["items", "dayNum"],
  components: { ActivityCard, draggable },
  data() {
    return {
      isDragging: false,
      activities: [],
    };
  },

  mounted() {
    this.items.forEach(item => this.activities.push(item));
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