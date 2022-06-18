<template>
  <transition name="modal">
    <div
      v-if="isopen"
      class="fixed z-50 top-0 left-0 right-0 bottom-0 bg-white md:bg-dark-blue md:bg-opacity-80 flex justify-center items-center px-0 md:px-10"
      @mousedown="$emit('closeModal')"
    >
      <div
        :class="[
          'window',
          'max-h-screen',
          'w-full',
          'md:w-5/6',
          'p-10',
          'pt-24',
          'md:pt-10',
          'pb-6',
          'px-4',
          'md:px-10',
          'rounded-lg',
          'bg-white',
          'text-dark-text',
          'relative',
          'overflow-auto',
          wide ? 'xl:w-2/3' : narrow ? 'xl:w-5/12' : 'xl:w-1/2',
        ]"
        @mousedown.stop
      >
        <div class="absolute top-14 lg:top-5 right-6 cursor-pointer" @click="$emit('closeModal')">
          <img src="~assets/img/icons/close.svg" alt="close" />
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    wide: {
      type: Boolean,
    },
    narrow: {
      type: Boolean,
    },
    isopen: {
      type: Boolean,
    },
  },

  emits: ['closeModal'],

  watch: {
    isopen(newVal) {
      this.isopen
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'visible');
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .window {
    max-height: 90vh;
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
