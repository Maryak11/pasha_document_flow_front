<template>
  <transition name="notification">
    <div v-if="show" class="fixed top-20 right-10 text-black text-sm sm:text-lg z-60">
      <div class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
        <div class="flex gap-4 items-center">
          <img class="h-5 w-5" :src="iconUrl" alt="notification" />
          {{ options.message }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapFields(['notification']),

    iconUrl() {
      return require(`~/assets/img/icons/notification/${this.options.type}.svg`);
    },
  },

  watch: {
    options() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    },
  },
};
</script>

<style>
.notification-enter-active {
  transition: right 0.6s;
}
.notification-leave-active {
  transition: right 0.4s;
}
.notification-enter,
.notification-leave-active {
  right: -100%;
}
.z-index {
  z-index: 60;
}
</style>
