<template>
  <div class="relative wrapper">
    <NuxtLink
      :to="to"
      class="py-2 block text-sm link"
      :class="{
        'nuxt-link-active': activeLink,
      }"
      no-prefetch
    >
      <slot />
    </NuxtLink>

    <ul v-if="links.length" class="absolute bg-white text-black rounded-md p-3 shadows z-20">
      <li v-for="link in links" :key="link.name" class="relative">
        <NuxtLink
          :to="link.to"
          exact
          no-prefetch
          class="py-2 pr-2 block transition-all link text-sm"
          :class="{
            'nuxt-link-active': $route.name
              .replaceAll('-', '')
              .includes(link.to.replaceAll('/', '').slice(0, 4)),
          }"
          >{{ link.name }}</NuxtLink
        >
      </li>
    </ul>
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
  },
  computed: {
    activeLink() {
      let bool = false;
      if (this.links.length) {
        this.links.forEach((item) => {
          if (this.$route.name.replace(/-/g, '').includes(item.to.match(/[a-z]+/g)[0])) {
            bool = true;
          }
        });
        return bool;
      }
      return false;
    },
  },
};
</script>

<style scoped>
ul::after {
  display: block;
  position: absolute;
  left: 0;
  width: 0;
  height: 1px;
  opacity: 0.7;
  margin-top: 2px;
  background-color: #adbbb4;
  content: '';
  transition: width 0.5s ease-out;
}
.wrapper::after > a:hover {
  width: 100%;
}
.wrapper ul {
  visibility: hidden;
  transition: all 0.2s;
  opacity: 0;
  transform: translateY(-10px);
  transform-origin: top;
  top: 35px;
  width: max-content;
}
.wrapper:hover ul {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}
</style>
