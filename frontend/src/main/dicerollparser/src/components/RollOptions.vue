<script setup lang="ts">
import { type Ref, ref } from "vue";

const advancedState: Ref<Boolean> = ref(false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  advanced: Boolean;
}>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits<{
  (event: "update:advanced", payload: Boolean): void;
}>();
</script>

<template>
  <v-card title="Options" class="pa-2 ma-2">
    <v-switch
      label="Toggle detail mode"
      v-model="advancedState"
      @update:model-value="$emit('update:advanced', advancedState)"
    ></v-switch>
  </v-card>
</template>
