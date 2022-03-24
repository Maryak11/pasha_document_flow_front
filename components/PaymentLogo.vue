<template>
  <div class="flex items-center rounded-xl w-24 h-24">
    <img class="" :src="require(`@/assets/img/icons/payments/${el.logo}`)" alt="payment" />
  </div>
</template>

<script>
export default {
  props: {
    el: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
