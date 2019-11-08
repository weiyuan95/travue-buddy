<template>
    <v-hover
      v-slot:default="{hover}"
      close-delay="50"
    >
      <v-card :elevation="hover ? 12 : 3" width="200" height="100" :loading="loading">
          <v-icon :color = "stat.color" size = "45" class="statIcon">
            {{ stat.icon }}
          </v-icon>

          <v-card-subtitle style="padding-bottom: 0px">
            <p class="statSub">{{ stat.subtitle }}</p>
          </v-card-subtitle>

          <v-card-title primary-title style="padding-top: 0px; padding-bottom: 0px">
              <div>
                  <h5 class="statTitle"> {{ stat.title }} </h5>
              </div>
          </v-card-title>

          <v-card-text>
            <p class="statValue" :color = "stat.color">{{ stat.value }}</p>
          </v-card-text>
        
      </v-card>
    </v-hover>
</template>

<script>
export default {
    name: 'StatCard',
    data() {
      return {
        hover: true
      }
    },
    props: ["stat", 'loading']
}
</script>

<style>
  h5 {
    font-size: 20px;
  }

  .statValue {
    position: absolute;
    font-size: 20px;
    top: 50px;
    right: 0;
    padding-right: 15px;
    padding-top: 15px;
    /* color: navy; */
  }

  .statTitle {
    position: absolute;
    top: 20px;
    font-size: 18px;
    right: 0;
    padding-top:15px;
    padding-right: 10px;
  }

  .statSub {
    position: absolute;
    font-size: 13px;
    top: 0;
    right: 0;
    padding: 15px;
  }

  .statIcon {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 15%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>