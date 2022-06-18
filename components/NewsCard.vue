<template>
  <div
    class="relative bg-reviewsBg p-8 shadows rounded-lg sm:shadow-xl transition-all hover:shadow-none cursor-pointer prose"
    @click.stop="
      $router.push({
        path: `${$route.name.includes('adminPanel') ? '/adminPanel' : ''}/news/${el.name}`,
      })
    "
  >
    <button
      v-if="adminpanel"
      class="flex items-center gap-3 absolute border-2 border-bgStep text-black transform scale-100 transition-all hover:scale-110 p-2 rounded-lg top-2 right-5"
      @click.stop="deleteNews"
    >
      <img class="h-3 w-3" src="~/assets/img/icons/cross.svg" alt="delete" />
    </button>
    <div
      v-if="adminpanel"
      class="absolute bottom-4 bg-green right-5 p-2 text-white rounded-lg"
      :class="{ 'bg-green-600': el.published === true, 'bg-red-600': el.published === false }"
    >
      {{ el.published ? 'Опубликовано' : 'Черновик' }}
    </div>
    <h2 class="font-bold md:text-xl text-base mb-3 pr-6">
      {{ el.title }}
    </h2>
    <p class="opacity-40">
      {{ el.createdAt | dateFormat }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    el: {
      type: Object,
      required: true,
    },
    adminpanel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    deleteNews() {
      this.$store.dispatch('news/deleteNews', {
        name: this.el.name,
        page: +this.$route.params.page || 1,
      });
    },
  },
};
</script>

<style scoped></style>
