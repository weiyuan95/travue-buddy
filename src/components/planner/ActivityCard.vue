<template>
    <v-card elevation='4'>
        <v-card-title>{{ activity.name }} </v-card-title>
        <v-card-subtitle> {{ activity.type }} </v-card-subtitle>
        <v-img :aspect-ratio="16/9" max-width='350' src='https://images.unsplash.com/photo-1447501614729-24781f73c2f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2560&q=80'> </v-img>
        <v-card-text> 
            This is a beautiful place! <br>
            <a href=activity.link> Check it out!</a> 
            </v-card-text>
    </v-card>

</template>

<script>
export default {
  props: ["activity"],

};
</script>

<style scoped>

.v-card {
    background-color: white;
    margin-bottom: 20px;
}

</style>    