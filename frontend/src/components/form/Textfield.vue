<template>
  <div>
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :autofocus="autofocus"
      :about="modelValue"
      :placeholder="placeholder"
      @input="updateText"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  label: { type: String, required: true },
  id: { type: String },
  type: { type: String},
  modelValue: { type: String, required: true },
  autofocus: { type: Boolean, default: false },
  placeholder: { type: String },
});

const emit = defineEmits(["update:modelValue"]);
const updateText = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style scoped lang="scss">
@import "/css/components/form/Textfield.scss";
</style>
