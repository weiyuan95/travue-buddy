<template>
  <v-card elevation="4">
    <v-img
      :aspect-ratio="16/9"
      width="100%"
      :src="activity.imgUrls[0]"
    ></v-img>
    <v-card-title>{{ activity.name }}</v-card-title>
    <v-card-subtitle>{{ activity.type }}</v-card-subtitle>
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
</style>    