<template>
  <v-card class="main-wrapper" elevation="5">
    <iframe width="100%" height="100%" :src="link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
  </v-card>
</template>

<script>
export default {
  props: ['link']
}
</script>

<style scoped>

.main-wrapper {
  height: 400px; 
  overflow: scroll;
}

</style>