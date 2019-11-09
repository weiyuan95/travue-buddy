<template>
  <v-card :loading="loading">
    <v-container>
      <v-row align="center" class="py-0">
        <v-col>
          <v-icon class="pb-0 mb-0" :color="stat.color" size="85">{{ stat.icon }}</v-icon>
        </v-col>
        <v-col class="px-0 py-0" cols="7">
          <v-card-subtitle class="pb-0 pt-0 overline">
            <p>{{ stat.subtitle }}</p>
          </v-card-subtitle>

          <v-card-title class="pb-0 pt-0 mb-0 title">
            <h5>{{ stat.title }}</h5>
          </v-card-title>

          <v-card-text>
            <p :color="stat.color" class="headline">{{ stat.value }}</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "StatCard",
  data() {
    return {
      hover: true
    };
  },
  props: ["stat", "loading"]
};
</script>

<style scoped>
  .debug {
    border: 1px solid red;
  }
</style>