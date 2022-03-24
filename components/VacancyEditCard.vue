<template>
  <transition name="fade">
    <div
      class="
        relative
        bg-reviewsBg
        p-4
        px-6
        pr-12
        rounded-xl
        sm:shadow-xl
        transition-all
        hover:shadow-none
        cursor-pointer
        prose
      "
      @click="$router.push({ path: `vacancies/${el.cityTranslitName}/${el.translitTitle}` })"
    >
      <button
        class="
          flex
          items-center
          gap-3
          absolute
          border-2 border-bgStep
          text-black
          transform
          scale-100
          transition-all
          hover:scale-110
          p-2
          rounded-lg
          top-3
          right-5
        "
        @click.stop="deleteVacancy"
      >
        <img class="h-3 w-3" src="~/assets/img/icons/cross.svg" alt="delete" />
      </button>
      <div
        class="absolute bottom-3 bg-green right-5 p-2 text-white rounded-lg"
        :class="{ 'bg-green-600': el.published === true, 'bg-red-600': el.published === false }"
      >
        {{ el.published ? 'Обубликовано' : 'Черновик' }}
      </div>
      <p class="font-bold text-lg mb-2 pr-12">
        {{ el.title }}
      </p>
      <p class="opacity-40">
        {{ el.cityName }}
      </p>
      <p class="opacity-40">
        {{ el.createdAt | dateFormat }}
      </p>
    </div>
  </transition>
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
    deleteVacancy() {
      this.$store.dispatch('vacancies/deleteVacancy', this.el.id);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
