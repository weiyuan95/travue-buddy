<template>
  <v-tabs
    background-color="primary"
  >
    <v-tab key="images">
      Images
    </v-tab>
    <v-tab key="videos">
      Videos
    </v-tab>

    <v-tab-item key="images">
      <v-card flat tile>
        <keep-alive>
          <image-carousel :imgStrings="imgUrls" />
        </keep-alive>
      </v-card>
    </v-tab-item>
    <v-tab-item key="videos">
      <v-card flat tile>
        <keep-alive>
          <video-feature :ytLinks="ytVideoURLs" />
        </keep-alive>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import ImageCarousel from "./ImageCarousel.vue";
import VideoFeature from "./VideoFeature.vue";

export default {
  props: ['imgUrls', 'ytVideoURLs'],
  components: { ImageCarousel, VideoFeature },
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