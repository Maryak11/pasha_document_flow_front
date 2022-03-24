<template>
  <div
    class="flex flex-col relative rounded-lg sm:w-96 w-80 bg-gray-100 px-8 py-4 gap-2 transition-all"
    :class="{
      'cursor-pointer hover:opacity-60': adminpanel,
      grab: !adminpanel,
    }"
    @click="$emit('clickReview', el)"
  >
    <div class="flex justify-between">
      <h1 class="text-black font-bold text-base sm:text-lg">{{ el.name }}</h1>
      <div class="flex gap-2">
        <p class="text-black font-medium text-base sm:text-lg">{{ el.estimation }}</p>
        <img src="@/assets/img/icons/star.svg" alt="star" />
      </div>
    </div>

    <div class="prose w-full" v-html="el.body"></div>
    <button
      v-if="adminpanel"
      class="flex items-center gap-2 absolute border-2 border-bgStep text-black transform scale-100 transition-all hover:scale-110 p-1 rounded-lg bottom-2 right-2 text-sm"
      @click.stop="deleteReview(el.id)"
    >
      <img class="h-3 w-3" src="~/assets/img/icons/cross.svg" alt="delete" />
    </button>
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
    deleteReview(id) {
      this.$store.dispatch('reviews/deleteReviews', id);
    },
  },
};
</script>

<style>
.grab {
  cursor: grab;
}
</style>
