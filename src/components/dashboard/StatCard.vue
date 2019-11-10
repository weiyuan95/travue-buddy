<template>
  <v-card :loading="loading" elevation="5">
    <v-container >
      <v-row align="center" class="py-0 " >
        <v-col cols="5">
          <v-icon v-if="stat.icon" class="pl-5 pb-0 mb-0" :color="stat.color" size="90">
            {{ stat.icon }}
          </v-icon>
          <v-img
            v-if="stat.iconUrl"
            :src="stat.iconUrl"
            class="iconImg px-0"
            width=130
            max-width=200
          ></v-img>
        </v-col>
        <v-col class="px-0 py-0">
          <v-card-subtitle class="pb-0 pt-3 body-2">
            {{ stat.subtitle }}
          </v-card-subtitle>

          <v-card-title class="pb-0 pt-0 mb-0 title">
            <h5>{{ stat.title }}</h5>
          </v-card-title>

          <v-card-text>
            <p :color="stat.color" class="display-2">{{ stat.value }}</p>
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

  .iconImg {
    max-height: 100px;
    height: 90px;
    -webkit-filter: drop-shadow(3px 3px 3px #222);
    filter: drop-shadow(3px 3px 3px #222);
  }
</style>