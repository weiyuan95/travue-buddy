<template>
  <v-tabs
    background-color="primary"
    :icons-and-text="icons"
  >
    <v-tab v-for="mediaComponent in mediaComponents" :key="mediaComponent.name">
      {{ mediaComponent.name }}
    </v-tab>

    <v-tab-item v-for="mediaComponent in mediaComponents" :key="mediaComponent.name">
      <v-card flat tile>
        <keep-alive>
          <component :is="mediaComponent.component"></component>
        </keep-alive>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import ImageCarousel from "./ImageCarousel.vue";
import VideoFeature from "./VideoFeature.vue";

export default {
  data() {
    return {
      mediaComponents: [
        {
          name: "Video",
          component: VideoFeature
        },
        {
          name: "Gallery",
          component: ImageCarousel
        }
      ]
    };
  }
};
</script>

<style>
</style>