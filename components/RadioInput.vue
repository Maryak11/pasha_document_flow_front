<template>
  <label
    :class="[
      'inline-block',
      'relative',
      'w-5',
      'h-5',
      'rounded-full',
      'cursor-pointer',
      'flex',
      'items-center',
      isChecked ? 'ring-2 ring-dark-blue' : 'ring-1 ring-gray-300 opacity-60 hover:opacity-100',
    ]"
  >
    <input
      type="radio"
      class="opacity-0"
      :value="value"
      :checked="isChecked"
      @change="$emit('change', $event.target.value)"
    />
    <div
      :class="[
        'absolute',
        'inset-px',
        'rounded-full',
        isChecked ? 'bg-dark-blue' : 'bg-transparent',
      ]"
    ></div>

    <span class="ml-6">{{ label }}</span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },

  computed: {
    isChecked() {
      return this.modelValue === this.value;
    },
  },
};
</script>

<style>
</style>