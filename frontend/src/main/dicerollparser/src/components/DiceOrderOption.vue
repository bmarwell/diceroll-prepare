<template>
  <v-row>
    <v-col sm="6">
      <v-checkbox
        v-model="internalOrderEnabled"
        label="Order?"
        @update:model-value="onUpdateOrderModel()"
      ></v-checkbox>
    </v-col>
    <v-col sm="6">
      <v-spacer v-show="!internalOrderEnabled" />
      <v-switch
        v-show="internalOrderEnabled"
        v-model:model-value="internalOrder"
        :label="orderLabel()"
        @update:model-value="onUpdateOrderModel()"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { type DiceOrder, DiceOrderType } from "@/models/dice";
import { type Ref, ref } from "vue";

const props = defineProps<{
  modelValue: DiceOrder;
}>();

const internalModel: Ref<DiceOrder> = ref(props.modelValue);

const internalOrderEnabled = ref(false);
const internalOrder = ref(false);

const orderLabel = () => {
  if (internalOrder.value === false) return "Descending";

  return "Ascending";
};

function onUpdateOrderModel() {
  console.log("New keep: ", internalOrderEnabled.value, internalOrder.value);

  if (internalOrderEnabled.value === false) {
    internalModel.value.enabled = false;
    return;
  }

  if (internalOrder.value === true) {
    internalModel.value.enabled = true;
    internalModel.value.type = DiceOrderType.ASC;
  } else {
    internalModel.value.enabled = true;
    internalModel.value.type = DiceOrderType.DESC;
  }

  console.log("after: ", internalModel.value);
}
</script>

<style scoped></style>
