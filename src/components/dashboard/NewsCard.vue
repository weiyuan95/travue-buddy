<template>
  <v-card style="height: 100%; padding: 5px; overflow: scroll" elevation="5">
    <h1 style="padding: 15px 0px 0px 15px">News</h1>
    <v-skeleton-loader :loading="loading" type="list-item-avatar-three-line" >

      <v-list v-if="newsArticles" three-line>
        <template v-for="(article, index) in newsArticles">
          <!-- <v-subheader v-if="article.title" :key="article.title" v-text="article.title"></v-subheader> -->
          <v-divider
            v-if="index > 0"
            :key="index"
          ></v-divider>

          <v-list-item :key="article.title">
            <v-list-item-avatar>
              <v-img :src="article.urlToImage"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="article.source"></v-list-item-title>
              <v-list-item-subtitle class="news-title" v-html="'<b>' + article.title + '</b>'"></v-list-item-subtitle>
              <v-list-item-subtitle v-html="article.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

    </v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  props: ["newsArticles", "loading"]
};
</script>

<style scoped>
.news-title {
  font-weight: 400 !important; 
  color: teal !important
}
</style>