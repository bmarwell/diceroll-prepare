<script setup lang="ts">
import { ref } from "vue";
import RollOptions from "./components/RollOptions.vue";
import { watch } from "vue";

const advanced = ref(false);
const rollOptions = ref();
watch(advanced, (newAdv) => console.log(newAdv));
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <main>
    <v-container class="bg-surface-variant .w-auto">
      <v-row no-gutters class=".w-auto">
        <v-col sm="6">
          <RollOptions
            ref="rollOptions"
            v-model:advanced="advanced"
          ></RollOptions>
        </v-col>
        <v-col sm="6">
          <v-card title="Result" class="ma-2 pa-2"> Test </v-card>
          <v-card v-if="advanced" title="Roll details" class="ma-2 pa-2">
            Details go here
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.full {
  width: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
