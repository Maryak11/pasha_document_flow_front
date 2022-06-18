<template>
  <label
    :class="[
      'relative',
      'inline-block',
      'w-10',
      'h-6',
      'rounded-lg',
      'cursor-pointer',
      'transition-all',
      'hover:opacity-100',
      { 'opacity-60': !checked },
    ]"
  >
    <input
      type="checkbox"
      class="opacity-0 w-0 h-0"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <div class="absolute bg-gray-400 inset-0 transition-all rounded-lg"></div>
    <div class="absolute h-5 w-5 bg-white left-0.5 top-0.5 rounded-lg transition-all"></div>
  </label>
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

<style scoped>
input:checked + div {
  background-color: #424770;
}
input:checked + div + div {
  transform: translateX(80%);
}
</style>
