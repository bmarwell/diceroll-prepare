<template>
  <div>
    <v-checkbox v-model="internalModel.enabled" label="keep" />
    <v-row v-show="modelValue.enabled">
      <v-col sm="6">
        <v-switch
          v-model:model-value="keep"
          :label="keepTypeDescription(internalModel)"
          true-value="HIGH"
          false-value="LOW"
          @update:model-value="onUpdateKeepType($event, internalModel)"
        />
      </v-col>
      <v-col sm="6">
        <v-text-field v-model="internalModel.count" type="number" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {
  DiceKeepType,
  type DiceGroup,
  type DiceGroupKeepOptions,
} from "@/models/dice";
import { ref } from "vue";

const props = defineProps<{
  modelValue: DiceGroupKeepOptions;
}>();

const internalModel = ref(props.modelValue);

const emit = defineEmits<{
  (event: "update", value: DiceGroupKeepOptions): void;
}>();

const keep = ref<string>("HIGH");

const onUpdateKeepType = (keepState: any, value: DiceGroupKeepOptions) => {
  switch (keepState) {
    case "HIGH": {
      value.type = DiceKeepType.HIGHEST;
      break;
    }
    case "LOW": {
      value.type = DiceKeepType.LOWEST;
      break;
    }
  }
};

const keepTypeDescription = (value: DiceGroupKeepOptions): string => {
  switch (value.type) {
    case DiceKeepType.LOWEST: {
      return "low";
    }
    default: {
      return "high";
    }
  }
};
</script>

<style scoped></style>
