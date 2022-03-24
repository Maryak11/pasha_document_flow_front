<template>
  <div :class="['text-dark-text', { 'border-b border-gray-300': !last }]">
    <div
      class="flex justify-between items-center select-none cursor-pointer py-4"
      @click="isOpen = !isOpen"
    >
      <h3 class="text-lg font-semibold">{{ title }}</h3>

      <Icon
        :classes="`w-3 h-3 transition-all duration-300 transform ${
          isOpen ? '-rotate-90' : 'rotate-90'
        }`"
        name="arrow"
      />
    </div>
    <transition name="accordion">
      <div v-show="isOpen">
        <slot>
          <div class="prose" v-html="body"></div>
        </slot>
        <div class="h-6"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: null,
    },
    last: {
      type: Boolean,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped>
img {
  transition: all 0.3s;
}
.accordion-enter-active {
  transition: max-height 0.5s ease-in-out, opacity 0.5s 0.1s;
  max-height: 100vh;
}
.accordion-leave-active {
  transition: all 0.3s;
  max-height: 100vh;
}
.accordion-enter,
.accordion-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
