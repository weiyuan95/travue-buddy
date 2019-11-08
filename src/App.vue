<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="theme"
      temporary
      style="display:flex;flex-direction:column;"
    >
      <v-layout column fill-height>
        <v-list dense>
          <!-- news cards should go here -->
          <v-list-item v-for="route in routes" :key="route.name" :to="route.path">
            <v-list-item-action>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer></v-spacer>
        <!-- empty v-list to push the switch component down  -->
        <v-list></v-list>
        <v-switch class="pl-3 mt-auto" :label="`Dark Theme Toggle`" v-model="goDark"></v-switch>
      </v-layout>
    </v-navigation-drawer>
    <v-app-bar
      :color="homePageColor"
      :app="isNotHomePage"
      :absolute="!isNotHomePage"
      elevate-on-scroll
    >
      <v-row align="center">
        <v-col>
          <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex align-end flex-column" style="padding-right:5px;">
          <v-toolbar-items v-if="isNotHomePage">
            <NavSearchBar/>
          </v-toolbar-items>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container fluid class="pa-0 ma-0">
        <keep-alive include="Dashboard">
          <router-view />
        </keep-alive>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-console */

import { routes } from "./routes.js";
import router from "./routes.js";
import store from "./store/store";
import { CHANGE_CURRENT_SEARCH } from "./store/mutation-types";
import NavSearchBar from "./components/home/NavSearchBar.vue";

export default {
  name: "App",
  components: {
    NavSearchBar
  },
  data: () => ({
    drawer: false,
    goDark: false,
    test: null,
    routes,
    router
  }),
  methods: {
    changeCurrentSearch: function(value) {
      store.commit(CHANGE_CURRENT_SEARCH, { newSearchString: value });
    }
  },
  watch: {
    goDark: function(newVal) {
      this.$vuetify.theme.dark = newVal;
    }
  },
  computed: {
    isNotHomePage: function() {
      return this.router.currentRoute.path !== "/";
    },
    homePageColor: function() {
      return this.isNotHomePage ? "primary" : "transparent";
    }
  }
};
</script>

<style>
/* styles to hide the scrollbar */
html {
  overflow: scroll;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
}
/* styles to hide the scrollbar */
</style>
