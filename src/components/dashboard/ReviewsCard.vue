<template>
  <v-card style="height: 400px; padding: 10px 10px 10px 10px; overflow: scroll" elevation="5">
    <h1 style="padding: 15px 0px 0px 15px">Reviews</h1>
    <v-skeleton-loader :loading="loading" type="list-item-avatar-three-line" >
      <v-list v-if="reviews" three-line>
        <template v-for="(review, index) in reviews">
          <!-- <v-subheader v-if="review.title" :key="review.title" v-text="review.title"></v-subheader> -->
          <v-divider
            v-if="index > 0"
            :key="index"
          ></v-divider>

          <v-list-item :key="review.author_name">
            <v-list-item-avatar>
              <v-img :src="review.profile_photo_url"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <div style="display: flex; justify-content: space-between;">
                <v-list-item-title>{{review.author_name}}</v-list-item-title>
                <v-rating :value="review.rating" color="yellow accent-4" size="14" readonly/>
              </div>
              <v-list-item-subtitle v-html="review.text"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  props: ["reviews", "loading"]
};
</script>

<style scoped>
.review-title {
  font-weight: 400 !important; 
  color: teal !important
}
</style>