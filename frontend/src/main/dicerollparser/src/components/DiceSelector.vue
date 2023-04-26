<script setup lang="ts">
import { ref, type Ref } from "vue";
import { DefaultDiceGroup, type DiceGroup } from "../models/dice";
import DiceSelectorKeepOption from "./DiceSelectorKeepOption.vue";

const modelValue: Ref<DiceGroup[]> = ref([new DefaultDiceGroup(1, 6)]);

const emit = defineEmits<{
  (event: "update:modelValue", model: DiceGroup[]): void;
}>();

const addDie = () => {
  const last = modelValue.value[modelValue.value.length - 1];
  const newDie = new DefaultDiceGroup(1, 6) as DiceGroup;
  last.chain = { operation: "+", diceGroup: newDie };
  modelValue.value.push(newDie);
  emit("update:modelValue", modelValue.value);
};

emit("update:modelValue", modelValue.value);
</script>

<template>
  <div>
    <v-card v-for="(value, index) in modelValue" :key="index" class="ma-2 pa-2">
      <template #title> DiceGroup #{{ index + 1 }} </template>
      <!-- {{ index }}: {{ value }} -->
      <v-container class=".w-auto ma-0 pa-0">
        <v-row no-gutters class=".w-auto ma-0 pa-2" align="center">
          <v-col sm="5">
            <v-text-field
              v-model="value.count"
              type="number"
              label="Number of same dice"
            />
          </v-col>
          <v-col sm="2" class="centered">d</v-col>
          <v-col sm="5">
            <v-text-field
              v-model="value.faces"
              type="number"
              label="Number of faces of each die"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="ma-0 pa-2.-">
          <v-col sm="6">
            <v-checkbox v-model="value.multiply" label="Multiply?" />
          </v-col>
          <v-col sm="6">
            <DiceSelectorKeepOption v-model="value.options.keep" />
          </v-col>
        </v-row>
      </v-container>
      <template #actions>
        <v-btn class="ma-2 pa-2" prepend-icon="mdi-delete">Remove</v-btn>
      </template>
    </v-card>
    <v-btn prepend-icon="mdi-plus" @click="addDie">Add</v-btn>
  </div>
</template>

<style scoped>
.centered {
  text-align: center;
}
</style>
