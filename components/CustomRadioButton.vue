<template>
  <div class="inline-block">
    <label
      :class="[
        'relative',
        'block min-w',
        'w-6',
        'h-6',
        'rounded-md',
        'cursor-pointer',
        'transition-all',
        'hover:opacity-100',
        'border',
        { 'opacity-60 ': label !== value },
        { 'border-dark-blue ': label === value },
      ]"
    >
      <input
        v-model="radioButtonValue"
        type="radio"
        :value="label"
        :name="name"
        class="opacity-0 w-0 h-0"
      />

      <div
        class="absolute inset-0 border-2 transition-all rounded-md"
        :class="({ 'bg-white': label !== value }, { 'bg-dark-blue': label === value })"
      ></div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    radioButtonValue: {
      get() {
        return this.value;
      },
      set() {
        this.$emit('change', this.label);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
