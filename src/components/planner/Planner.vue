<template>
  <div class="main" v-bind:style="{ 'background-image': 'url(' + currentImage + ')' }">
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
      currentImage: 'https://images.unsplash.com/photo-1483304528321-0674f0040030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' ,
      images: [
        "https://images.unsplash.com/photo-1483304528321-0674f0040030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "https://images.unsplash.com/photo-1532973497172-04b34d604825?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1641&q=80",
        "https://images.unsplash.com/photo-1521086248378-5fe2b23c8b23?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
        "https://images.unsplash.com/photo-1541669257754-60eaba3ad41d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80",
      ]
    };
  },
  created () {
    this.startCycle();
  },
  methods: {
    startCycle() {
      this.cycle = setInterval(() => {
        this.currentImage = this.images[this.index];
        this.index = this.index + 1;
        if (this.index == this.images.length) {
          this.index =  0;
        }
        }, 15000);

    },
  }
}
</script>

<style>
h1 {
  padding-top: 20px;
  padding-bottom: 0px;
  text-align: center;
}

.main {
  /* height: 100vh; */
  background-size: cover;
}
</style>