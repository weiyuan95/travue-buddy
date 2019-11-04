<template>
  <v-card class="main-wrapper" elevation="5">
    <v-skeleton-loader style="height: 100%;" :loading="loading" type="card" >
      <v-carousel height="100%" hide-delimiters>
        <v-carousel-item
          v-for="(imgString, i) in imgStrings"
          :key="i"
          :src="imgString"
        ></v-carousel-item>
      </v-carousel>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  props: ['imgStrings', 'loading']
}
</script>

<style scoped>

.main-wrapper {
  height: 400px; 
  overflow: scroll;
}

</style>