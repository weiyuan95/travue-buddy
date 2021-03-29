<template>
  <v-card elevation="5">
    <v-skeleton-loader :loading="loading" type="card" >
      <v-carousel hide-delimiters hide-delimiter-background>
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
</style>