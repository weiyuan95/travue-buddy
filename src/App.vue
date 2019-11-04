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
        <v-list>
        </v-list>
        <v-switch class="pl-3 mt-auto" :label="`Dark Theme Toggle`" v-model="goDark"></v-switch>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar color="transparent" min-width="100vw" absolute flat dense>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="isNotHomePage">
        <v-text-field
            label="Solo"
            @change="changeCurrentSearch"
            single-line
            solo
        ></v-text-field>
      </v-toolbar-items>
    </v-toolbar>

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

import { routes } from './routes.js';
import router from './routes.js'
import store from "./store/store";
import { CHANGE_CURRENT_SEARCH } from "./store/mutation-types";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    goDark: false,
    test: null,
    routes,
    router
  }),
  methods: {
    changeCurrentSearch: function(value) {
      console.log('changed', value);
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
      return this.router.currentRoute.path !== "/"
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
      width: 0px;  /* Remove scrollbar space */
      background: transparent;  /* Optional: just make scrollbar invisible */
  }
  /* Optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
      background: #FF0000;
  }
/* styles to hide the scrollbar */
</style>
