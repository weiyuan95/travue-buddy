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

    <v-app-bar app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Wanderlust</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-text-field
            label="Solo"
            @change="changeCurrentSearch"
            single-line
            solo
        ></v-text-field>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container fluid>
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
import store from "./store/store";
import { CHANGE_CURRENT_SEARCH } from "./store/mutation-types"; 

export default {
  name: "App",
  data: () => ({
    drawer: false,
    goDark: false,
    test: null,
    routes
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
  }
};
</script>
