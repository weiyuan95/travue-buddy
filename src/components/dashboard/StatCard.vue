<template>
  <div>
      <v-card width="240" height="120" elevation="5">
        <v-row style="width: 100%; height:100%">
          <v-col style="padding: 20px 0px 0px 20px;" cols="4">
            <!-- <v-icon :color = "stat.color" size = "60" class="statIcon">
              {{ stat.icon }}
            </v-icon> -->
            <v-progress-circular
              :size="75"
              :width="5"
              :value="stat.value"
              :color="color || 'blue lighten-2'"
            >{{ stat.value }}</v-progress-circular>
          </v-col>

          <v-col cols="8">
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
          </v-col>
        </v-row>

      </v-card>
  </div>
</template>

<script>
export default {
    name: 'StatCard',
    props: ["stat", "color"]
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