<template>
  <transition name="fade">
    <div
      ref="faq"
      class="relative bg-reviewsBg p-8 rounded-xl sm:shadow-xl transition-all hover:shadow-none cursor-pointer prose"
      @click="$router.push({ path: `faq/${el.id}` })"
    >
      <button
        class="flex items-center gap-3 absolute border-2 border-bgStep text-black transform scale-100 transition-all hover:scale-110 p-2 rounded-lg top-3 right-5"
        @click.stop="deleteFaq"
      >
        <img class="h-3 w-3" src="~/assets/img/icons/cross.svg" alt="delete" />
      </button>
      <div
        class="absolute bottom-3 bg-green right-5 p-2 text-white rounded-lg"
        :class="{ 'bg-green-600': el.published === true, 'bg-red-600': el.published === false }"
      >
        {{ el.published ? 'Опубликовано' : 'Черновик' }}
      </div>
      <p class="font-bold text-lg mb-3 pr-12">
        {{ el.question }}
      </p>
      <p class="opacity-40">
        {{ el.createdAt | dateFormat }}
      </p>
      <p v-if="body" v-html="el.answer"></p>
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
    body: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    deleteFaq() {
      this.$store.dispatch('faq/deleteFaq', this.el.id);
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
.grab {
  cursor: grab;
}
</style>
