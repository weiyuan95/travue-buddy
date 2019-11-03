<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app color="theme">
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
    </v-navigation-drawer>

    <v-app-bar app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Wanderlust</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>Login</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-footer app class="px-2 py-0">
      <span>&copy; 2019</span>
      <v-spacer></v-spacer>
      <v-switch :label="`Dark Theme`" v-model="goDark"></v-switch>
    </v-footer>
  </v-app>
</template>

<script>

import { routes } from './routes.js';

export default {
  name: "App",
  data: () => ({
    drawer: false,
    goDark: false,
    test: null,
    routes
  }),
  watch: {
    goDark: function(newVal, oldVal) {
      this.$vuetify.theme.dark = newVal;
      oldVal;
    }
  }
};
</script>
