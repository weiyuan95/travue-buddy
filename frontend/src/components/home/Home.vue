<template>
    <!-- we should figure out how to prefetch the image, it's 3mb -->
    <v-container class="home-container" fluid>
        <v-row
            class="mt-12 text-center display-3 white-text-header font-weight-black"
            sm="6"
            :align="center"
            :justify="center"
        >
            <v-col>TraVue</v-col>
        </v-row>
        <v-row
            class="text-center headline font-weight-bold white-text"
            sm="6"
            :align="center"
            :justify="center"
            ><v-col>Travel Information made Easy.</v-col></v-row
        >
        <v-row :align="center" :justify="center">
            <v-col><SearchBar /></v-col>
        </v-row>
    </v-container>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
    components: {
        SearchBar,
    },
};
</script>

<style scoped>
.home-container {
    background-image: url("../../assets/bg_images/img_1.jpg");
    height: 100vh;
    background-size: cover;
}

.white-text-header {
    color: white;
    text-shadow: 2px 1px 1px #6f6f6f;
}

.white-text {
    color: white;
    text-shadow: 1px 1px #828282;
}
</style>
