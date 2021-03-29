<template>
  <v-card elevation="4">
    <v-img
      :aspect-ratio="16/9"
      width="100%"
      :src="activity.imgUrls[0]"
    ></v-img>
    <v-card-title class="title">
      <span>{{ activity.name }}</span>
      <div>
        <v-rating dense size="12" color="yellow" :value="activity.rating" readonly/>
      </div>
    </v-card-title>
    <v-card-subtitle>{{ activity.name }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: ["activity"]
};
</script>

<style scoped>
.v-card {
  background-color: white;
  margin-bottom: 20px;
}

.title {
  display: flex;
  justify-content: space-between;
}
</style>    