<template>
  <div class="main">
    <v-container :class="bucket.length > 0 ? 'bucket-wrapper' : 'bucket-close'">
      <h1 v-if="bucket.length > 0" class="font">Bucket List</h1>
      <br>
      <draggable 
      v-model="bucket"
      tag="activity-card"
      group="events"
      ghost-class="ghost"
      @start="isDragging=true"
      @end="isDragging=false"
      :empty-insert-threshold="200"
      >
        <activity-card v-for="activity in bucket" :key="activity.name" :activity="activity" />
      </draggable>
    </v-container>
    <v-container class="day-list-wrapper">
      <h1 class="font">Planner</h1>
      <br>
      <v-row>
        <v-col v-for="dayNum in numDays" v-bind:key="dayNum">
          <day-list class="daylist" :dayNum="dayNum" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import DayList from "./DayList";
import ActivityCard from "./ActivityCard";
import store from "../../store/store";
export default {
  name: 'Planner',
  components: { DayList, ActivityCard, draggable },
  data() {
    return {
      isDragging: false,
      bucket: [],
      locationsInBucket: [],
    }
  },
  mounted() {
    this.vuexBucket.forEach(activity => {
      this.bucket.push(activity);
      this.locationsInBucket.push(activity.name);
    });
  },
  computed: {
    numDays() { return store.state.numDays || 5 },
    vuexBucket() { return store.state.bucket }
  },
  watch: {
    vuexBucket() {
      this.vuexBucket.forEach(activity => {
        if (!this.locationsInBucket.includes(activity.name)) { 
          this.locationsInBucket.push(activity.name);
          this.bucket.push(activity);
        }
      });
    }
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
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1521086248378-5fe2b23c8b23?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80");
  background-size: cover;
  overflow: scroll;
}

.font {
  text-transform: uppercase;
  letter-spacing: 10px;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.60);
}

.bucket-wrapper {
  width: 300px;
  max-width: 400px;
  margin: 0px 0px 0px 0px;
  background-color: rgba(255, 255, 255, 0.199);
  border-right: 3px solid rgba(89, 89, 89, 0.194);
  transition: 0.4s;
}

.bucket-close {
  width: 0px;
  padding: 0px;
  margin: 0px;
  visibility: hidden;
  transition: 0.4s;
}

.day-list-wrapper {
}

.ghost {
  color: red;
}

</style>