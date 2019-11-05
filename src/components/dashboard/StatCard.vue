<template>
  <div>
      <v-card width="240" height="120" elevation="5" :loading="loading">
          <v-icon :color = "stat.color" size = "60" class="statIcon">
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
  </div>
</template>

<script>
export default {
    name: 'StatCard',
    props: ["stat", 'loading']
}
</script>

<style>
  h5 {
    font-size: 20px;
  }

  .statValue {
    position: absolute;
    font-size: 30px;
    top: 60px;
    right: 0;
    padding-right: 15px;
    padding-top: 15px;
    /* color: navy; */
  }

  .statTitle {
    position: absolute;
    top: 20px;
    right: 0;
    padding: 15px;
  }

  .statSub {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
  }

  .statIcon {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 20%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>