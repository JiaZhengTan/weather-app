<script setup lang="ts">
const props = defineProps({
  formLabel: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inputValidation: {
    type: [Function],
    default: (value: string) => value,
  },
});

const input = defineModel<string>("input");
</script>

<template>
  <div class="relative h-16">
    <label class="absolute top-3 left-2 text-xs text-[#757575] z-10">
      {{ props.formLabel }}
    </label>
    <input
      v-model="input"
      :type="props.type"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      @input="input = inputValidation()"
      class="absolute bottom-1 left-0 w-full px-2 pt-6 pb-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-[#F5F5F5]"
    />
  </div>
</template>
