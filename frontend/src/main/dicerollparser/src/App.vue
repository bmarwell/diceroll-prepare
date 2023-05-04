<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import RollOptions from "./components/RollOptions.vue";
import DiceSelector from "./components/DiceSelector.vue";
import { roll, serializeDice } from "./api/diceApi";
import type { DiceGroup } from "./models/dice";

const advanced = ref(false);
const diceGroups: Ref<DiceGroup[]> = ref([]);
const rollOptions = ref();
const diceSelector = ref();
const rollInput = ref("");
const rollResult = ref("");
const rollDetails = ref("");

const onRollDice = () => {
  if (diceGroups.value.length == 0) {
    return;
  }

  roll(diceGroups.value[0], advanced.value).then((result) => {
    if (advanced.value) {
      rollResult.value = result.split("\n")[0].split(" = ")[1];
      rollDetails.value = result;
    } else {
      rollResult.value = result;
    }
  });
};

function updateInput(newDiceGroup: DiceGroup[]) {
  if (!newDiceGroup || newDiceGroup.length <= 0) {
    rollInput.value = "";
  }

  rollInput.value = serializeDice(newDiceGroup[0]);
}

const copyToClipBoard = (textToCopy: string) => {
  navigator.clipboard.writeText(textToCopy);
};

const clearForms = () => {
  advanced.value = false;
  diceSelector.value.reset();
  rollResult.value = "";
  rollDetails.value = "";
};

const dice = [
  "dice-1",
  "dice-1-outline",
  "dice-2",
  "dice-2-outline",
  "dice-3",
  "dice-3-outline",
  "dice-4",
  "dice-4-outline",
  "dice-5",
  "dice-5-outline",
  "dice-6",
  "dice-6-outline",
  "dice-d4",
  "dice-d4-outline",
  "dice-d6",
  "dice-d6-outline",
  "dice-d8",
  "dice-d8-outline",
  "dice-d10",
  "dice-d10-outline",
  "dice-d12",
  "dice-d12-outline",
  "dice-d20",
  "dice-d20-outline",
  "dice-multiple",
  "dice-multiple-outline",
];

const getIcon = (): string => {
  const idx = Math.floor(Math.random() * dice.length);
  return dice[idx];
};

onMounted(() => {
  updateInput(diceGroups.value);
});
</script>

<template>
  <header>
    <h1>
      <v-icon>{{ `mdi-${getIcon()}` }}</v-icon> Dice roll parser
    </h1>
  </header>

  <main>
    <v-container class="">
      <v-row no-gutters class="">
        <v-col md="6" cols="12">
          <v-card title="Action" class="ma-2 pa-2">
            <template #actions>
              <v-btn prepend-icon="mdi-dice-5" @click="onRollDice">Roll!</v-btn>
              <v-btn prepend-icon="mdi-close-circle-outline" @click="clearForms"
                >Clear</v-btn
              >
            </template>
          </v-card>
          <RollOptions
            ref="rollOptions"
            v-model:advanced="advanced"
          ></RollOptions>
          <DiceSelector
            ref="diceSelector"
            v-model="diceGroups"
            @change="updateInput(diceGroups)"
          ></DiceSelector>
        </v-col>
        <v-col md="6" cols="12">
          <v-card title="Input" class="ma-2 pa-2">
            <v-text-field v-model="rollInput" readonly class="monospaced">
              <template #append-inner>
                <v-icon
                  v-show="rollResult.length > 0"
                  icon="mdi-content-copy"
                  @click="copyToClipBoard(rollResult)"
                />
              </template>
            </v-text-field>
          </v-card>
          <v-card title="Result" class="ma-2 pa-2">
            <v-text-field v-model="rollResult" readonly class="monospaced">
              <template #append-inner>
                <v-icon
                  v-show="rollResult.length > 0"
                  icon="mdi-content-copy"
                  @click="copyToClipBoard(rollResult)"
                />
              </template>
            </v-text-field>
          </v-card>
          <v-card v-if="advanced" title="Roll details" class="ma-2 pa-2">
            <v-textarea
              v-model="rollDetails"
              readonly
              auto-grow
              label="Roll details"
              class="monospaced"
            >
              <template #append-inner>
                <v-icon
                  v-show="rollDetails.length > 0"
                  icon="mdi-content-copy"
                  @click="copyToClipBoard(rollDetails)"
                />
              </template>
            </v-textarea>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  place-items: center;
}

.monospaced {
  font-family: "Fira Code", monospace;
  font-size: 0.6em;
}

header h1 {
  display: block;
  margin: 1rem auto 1rem;
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    display: block;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  h1 {
    margin: 0 2rem 0 0;
    text-align: center;
  }

  header h1 {
    display: block;
    flex-wrap: wrap;
  }
}
</style>
