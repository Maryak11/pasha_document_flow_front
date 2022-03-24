<template>
  <div :class="['h-4', 'w-4', 'min-w-4', 'rounded-2xl', background[type]]"></div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      background: {
        success: `bg-statusBudge-success`,
        warning: `bg-statusBudge-warning`,
        danger: `bg-statusBudge-danger`,
      },
    };
  },
};
</script>

<style>
</style>