<template>
<div>
    <v-card elevation='4'>
        <v-card-title class='justify-center'>{{ item.title }} </v-card-title>
        <v-card-subtitle> {{ item.type }} </v-card-subtitle>
        <v-card-text> <a href=item.link> Check it out! </a> </v-card-text>
    </v-card>
</div>
</template>

<script>
export default {
  name: "DayCard",
  props: ["item"],

};
</script>

<style lang="scss" scoped>

.v-card-title {
    justify-content: center;
}

.v-card {
    background-color: white;
    justify-content: center;
}
</style>    