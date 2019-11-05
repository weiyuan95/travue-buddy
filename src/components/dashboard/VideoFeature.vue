<template>
  <v-card class="main-wrapper" elevation="5">
    <v-skeleton-loader style="height: 100%;" :loading="loading" type="card" >
      <v-carousel height="100%" hide-delimiters>
        <v-carousel-item
          v-for="(link, i) in ytLinks"
          :key="i"
        >
          <v-skeleton-loader style="height: 100%;" :loading="loading" type="card" >
            <iframe width="100%" height="100%" :src="link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
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

.main-wrapper {
  height: 400px; 
  overflow: hidden;
  padding: 0px 0px 0px 0px;
}

</style>