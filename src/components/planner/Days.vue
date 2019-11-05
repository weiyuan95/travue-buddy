<template>
  <div>
      <v-card>
        <v-card-title><h3>Day {{ dayNum }}🌴</h3></v-card-title>
        <draggable class="list-group">
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <day-card v-for="item in items" :item="item" v-bind:key="item.id" />
            <!-- need to place the DayCard component with a v-for -->
          </transition-group>
        </draggable>
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