<template>
  <NuxtLink :to="to" class="absolute -top-10 left-3 hidden md:flex items-center md:gap-1">
    <Icon classes="w-3 h-3 transform rotate-180" name="arrow" />
    <span>Назад</span>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
      required: true,
    },
  },
};
</script>

<style>
</style>