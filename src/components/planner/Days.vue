<template>
  <div>
    <v-container class='board'>
      <h2>Day {{ dayNum }} 🌴</h2>
      <v-divider style='padding:10px;' ></v-divider>
      <draggable
        v-model="items"
        tag="day-card"
        group="events"
        @start="isDragging=true"
        @end="isDragging=false"
        :empty-insert-threshold="200"
      >
        <!-- <transition-group type="transition"> -->
        <day-card v-for="item in items" :item="item" :key="item.id" />
        <!-- </transition-group> -->
      </draggable>
    </v-container>
    <!-- <div>{{ items }}</div> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import DayCard from "./DayCard.vue";
export default {
  name: "Days",
  props: ["items", "dayNum"],
  components: { DayCard, draggable },
  data() {
    return {
      isDragging: false
    };
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