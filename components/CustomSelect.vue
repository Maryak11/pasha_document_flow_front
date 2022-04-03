<template>
  <div class="relative mt-1 rounded-xl">
    <div
      ref="select"
      tabindex="0"
      class="flex rounded-xl border border-gray-300 bg-white min-w-265 focus:border-dark-blue text-sm px-5 pr-10 py-inputPad py- w-full cursor-pointer z-20 transition-all"
      @click="visibilitySelect = !visibilitySelect"
    >
      {{ currentOption || enteroption || options[0].name }}
      <Icon
        :classes="`w-3 h-3 absolute top-4.5 right-3 cursor-pointer transition-all duration-300 transform ${
          visibilitySelect ? '-rotate-90' : 'rotate-90'
        }`"
        name="arrow"
      />
    </div>
    <transition name="select">
      <ul
        v-if="visibilitySelect"
        class="w-full absolute top-12 border border-inputBorDef rounded-xl color-dark-blue bg-selectBg z-20 break-all py-0.5 px-2.5 shadows"
      >
        <li
          v-for="(el, index) in options"
          :key="el.value"
          class="hover:border-b py-2 px-1.5 text-sm opacity-70 hover:opacity-100 cursor-pointer"
          :class="{ 'border-b ': index + 1 < options.length }"
          @click="() => selectedOption(el)"
        >
          {{ el.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    enteroption: {
      type: String,
      default: '',
    },
  },

  emits: ['selectedOption'],

  data() {
    return {
      visibilitySelect: false,
      currentOption: '',
    };
  },

  mounted() {
    window.addEventListener('click', this.clickListener);
  },

  beforeDestroy() {
    window.removeEventListener('click', this.clickListener);
  },

  methods: {
    selectedOption(option) {
      this.$emit('selectedOption', option);
      this.currentOption = option.name;
      this.visibilitySelect = false;
    },
    clickListener(e) {
      if (!this.$refs.select.contains(e.target)) {
        this.visibilitySelect = false;
      }
    },
  },
};
</script>

<style scoped>
.arrow {
  transition: all 0.3s;
}
.select-enter-active {
  transition: all 0.3s;
}
.select-leave-active {
  transition: all 0.3s;
}
.select-enter,
.select-leave-to {
  opacity: 0;
}
</style>
