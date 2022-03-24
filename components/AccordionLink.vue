<template>
  <div class="text-dark-text">
    <NuxtLink
      v-if="!links.length"
      :to="to"
      class="pl-2 py-3 block font-semibold"
      no-prefetch
      @click.native="togglemobilenavbar"
    >
      <slot />
    </NuxtLink>
    <div
      v-else
      class="flex justify-start items-center gap-4 select-none cursor-pointer pl-2 py-3"
      @click="isOpen = !isOpen"
    >
      <span class="font-semibold">
        <slot />
      </span>
      <Icon
        :classes="`w-3 h-3 transition-all duration-300 transform ${
          isOpen ? '-rotate-90' : 'rotate-90'
        }`"
        name="arrow"
      />
    </div>
    <transition name="links">
      <ul v-if="links.length && isOpen">
        <li v-if="to">
          <NuxtLink
            :to="to"
            no-prefetch
            class="ml-3 py-1.5 block"
            @click.native="togglemobilenavbar"
            >Перейти в раздел</NuxtLink
          >
        </li>
        <li v-for="link in links" :key="link.name">
          <NuxtLink
            :to="link.to"
            no-prefetch
            class="ml-3 py-1.5 block"
            @click.native="togglemobilenavbar"
          >
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default() {
        return [];
      },
    },
    to: {
      type: String,
      required: true,
    },
    togglemobilenavbar: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style>
img {
  transition: all 0.3s;
}
.links-enter-active {
  transition: max-height 0.5s ease-in-out, opacity 0.5s 0.1s;
  max-height: 100vh;
}
.links-leave-active {
  transition: all 0.3s;
  max-height: 100vh;
}
.links-enter,
.links-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
