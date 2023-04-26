<script setup lang="ts">
import { ref, type Ref } from "vue";
import RollOptions from "./components/RollOptions.vue";
import DiceSelector from "./components/DiceSelector.vue";
import { roll } from "./api/diceApi";
import type { DiceGroup } from "./models/dice";

const advanced = ref(false);
const diceGroups: Ref<DiceGroup[]> = ref([]);
const rollOptions = ref();
const rollResult = ref("");
const rollDetails = ref("");

const onRollDice = () => {
  roll(diceGroups.value[0], advanced.value).then((result) => {
    if (advanced.value) {
      rollResult.value = result.split("\n")[0].split(" = ")[1];
      rollDetails.value = result;
    } else {
      rollResult.value = result;
    }
  });
};
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
    <v-container class=".w-auto">
      <v-row no-gutters class=".w-auto">
        <v-col sm="6">
          <v-card title="Action" class="ma-2 pa-2">
            <template #actions>
              <v-btn prepend-icon="mdi-dice-5" @click="onRollDice">Roll!</v-btn>
              <v-btn prepend-icon="mdi-close-circle-outline">Clear</v-btn>
            </template>
          </v-card>
          <RollOptions
            ref="rollOptions"
            v-model:advanced="advanced"
          ></RollOptions>
          <DiceSelector ref="diceSelector" v-model="diceGroups"></DiceSelector>
        </v-col>
        <v-col sm="6">
          <v-card title="Result" class="ma-2 pa-2">
            <v-text-field v-model="rollResult" readonly class="monospaced" />
          </v-card>
          <v-card v-if="advanced" title="Roll details" class="ma-2 pa-2">
            <v-textarea
              v-model="rollDetails"
              readonly
              auto-grow
              label="Roll details"
              class="monospaced"
            />
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

.monospaced {
  font-family: "Fira Code", monospace;
  font-size: 0.6em;
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
