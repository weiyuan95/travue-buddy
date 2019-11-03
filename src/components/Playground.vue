<template>
  <div>
    <h1>Playground</h1>
    
    <v-btn @click="addToBucketList"></v-btn>
    <hr>
    <div>
      <div v-for="location in bucketList" :key="location.name">
        {{ location.name }}
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";
import { BUCKET_ADD_LOCATION, BUCKET_REMOVE_LOCATION } from "../store/mutation-types";

export default {
  data() {
    return {
      bucketList: store.state.bucket
    }
  },
  methods: {
    addToBucketList() {
      let location = {
        rating: 5,
        safety: 5,
        costAccoms: 88.88,
        dailyCost: 48.88,
        timeSpent: 1,
        name: Math.round(Math.random() * 10) + "",
        imgUrls: [
          "https://www.littledayout.com/wp-content/uploads/10-merlion-park.jpg"
        ],
        reviews: [
          { title: "best place", description: "...", rating: 5 },
          { title: "bestest place", description: "...", rating: 5 },
          { title: "bester place", description: "...", rating: 5 }
        ],
        ytUrls: [{ title: "", url: "https://www.youtube.com/watch?v=xUhjFfFMo10" }],
        news: [
          {
            title: "Carbon emissions, PMDs, CPF and the Sentosa Merlion among issues to be discussed in Parliament",
            content: "SINGAPORE: Carbon emissions, the use of Personal Mobility Devices (PMDs) and issues to do with the Central Provident Fund (CPF) scheme will be discussed when Members of Parliament (MPs) meet in Parliament on Monday (Nov 4). Three Bills will also be introduced…",
            url: "https://www.channelnewsasia.com/news/singapore/parliament-mps-pmds-carbon-emissions-cpf-merlion-12055116",
            urlToImage: "https://cna-sg-res.cloudinary.com/image/upload/q_auto,f_auto/image/10794074/16x9/991/557/241be6781337407871f8034cd9ce35fc/eu/parliament-house-singapore--top-down-view.jpg"
          }
        ]
      };
      store.commit(BUCKET_ADD_LOCATION, { location });
    },
    removeFromBucketList(locationName) {
      store.commit(BUCKET_REMOVE_LOCATION, { locationName });
    }
  }
};
</script>

<style>
</style>