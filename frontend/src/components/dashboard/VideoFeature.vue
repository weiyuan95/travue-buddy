<template>
  <v-card elevation="5">
    <v-skeleton-loader :loading="loading" type="card" >
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(link, i) in ytLinks"
          :key="i"
        >
          <v-skeleton-loader style="height:100%" :loading="loading" type="card" >
            <iframe style="height: 100%; width: 100%" :src="link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
          </v-skeleton-loader>
        </v-carousel-item>
      </v-carousel>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  props: ['ytLinks', 'loading']
}
</script>

<style scoped>
</style>