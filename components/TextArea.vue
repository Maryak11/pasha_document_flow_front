<template>
  <textarea
    :value="value"
    class="
      outline-none
      w-full
      py-3
      rounded-xl
      border border-gray-400
      focus:border-dark-blue
      px-4
      resize-none
      text-sm
    "
    :class="[high ? 'h-32' : 'h-full']"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    high: {
      type: Boolean,
    },
  },
};
</script>

<style>
</style>