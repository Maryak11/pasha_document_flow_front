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
        { 'opacity-60 ': !checked },
        { 'border-dark-blue ': checked },
      ]"
    >
      <input
        type="checkbox"
        class="opacity-0 w-0 h-0"
        @change="$emit('change', $event.target.checked)"
      />
      <div
        class="absolute inset-0 border-2 transition-all rounded-md"
        :class="({ 'bg-white': !checked }, { 'bg-dark-blue': checked })"
      ></div>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
