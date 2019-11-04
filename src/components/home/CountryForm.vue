<template>
  <v-col>
    <v-card class="pa-3 pb-1" light>
      <v-form class="px-7" @submit="submit()" light>
        <v-row>
          <v-text-field
            v-model="destination"
            :error-messages="destinationErrors"
            label="I want to go to..."
            class="pt-0"
            @input="$v.destination.$touch()"
            @blur="$v.destination.$touch()"
          ></v-text-field>
        </v-row>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import router from "../../routes";

export default {
  data: () => ({
    destination: ""
  }),

  validations: {
    destination: { required }
  },

  computed: {
    destinationErrors() {
      const errors = [];
      if (!this.$v.destination.$dirty) {
        return errors;
      }
      !this.$v.destination.required &&
        errors.push("Please enter your destination");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
      router.push("dashboard");
    }
  }
};
</script>

<style scoped>
</style>