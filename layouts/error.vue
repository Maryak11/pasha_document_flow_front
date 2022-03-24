<template>
  <div
    class="
      flex flex-col
      lg:flex-row
      justify-between
      lg:p-28
      py-14
      w-full
      h-full
      items-center
      rounded-lg
      bg-white
    "
  >
    <img class="md:w-5/12 w-3/5" src="@/assets/img/illustrations/error.svg" alt="" />

    <div class="flex flex-col lg:w-1/2 w-4/5 gap-6 justify-between lg:items-stretch items-center">
      <p class="xl:text-5xl md:text-3xl text-2xl font-bold">Возможно что-то пошло не так</p>
      <p class="xl:text-3xl text-xl font-bold opacity-40">Такой страницы не существует</p>
      <span
        class="
          flex
          min-w-265
          justify-center
          py-6
          lg:text-2xl
          text-lg
          bg-gray-200
          rounded-lg
          w-3/6
          cursor-pointer
          hover:opacity-50
          transition-all
        "
        @click="$router.push({ path: '/' })"
      >
        На главную страницу
      </span>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style></style>
