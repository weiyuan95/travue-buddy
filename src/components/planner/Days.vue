<template>
  <div>
      <v-card>
        <v-card-title><h3>Day {{ dayNum }}🌴</h3></v-card-title>
        <v-card-text>
            <div>
        <draggable class="list-group" tag='v-card'>
          <transition-group type="transition">
            <day-card v-for="item in items" :item="item" v-bind:key="item.id" />
          </transition-group>
        </draggable>
            </div>
        </v-card-text>
      </v-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import DayCard from "./DayCard.vue";
export default {
  name: "Days",
  props: ["items", "dayNum"],
  components: { DayCard, draggable }
};
</script>

<style lang="scss" scoped>
.v-card-title {
    text-align: center

}

.v-card {
    background-color: rgb(212, 208, 208);
    align-content: space-around;
}
</style>