<template>
  <div
    class="
      bg-reviewsBg
      rounded-2xl
      p-6
      text-header
      border border-gray-100
      flex
      gap-8
      md:hover:ml-5 md:hover:shadow-lg
      transition-all
      items-center
      cursor-pointer
      group
    "
    @click="openFile"
  >
    <img class="w-8 h-8" src="@/assets/img/icons/document.png" alt="document" />
    <div class="w-full">
      <div class="flex items-center justify-between w-full">
        <a class="md:text-xl text:lg font-bold" :href="el.link" target="blank">
          {{ el.name }}
        </a>
        <Icon classes="text-header w-4 h-4" name="arrow" />
      </div>
    </div>
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

  methods: {
    openFile() {
      if (process.client) {
        window.open(this.el.link);
      }
    },
  },
};
</script>

<style scoped></style>
