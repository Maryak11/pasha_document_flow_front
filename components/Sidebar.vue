<template>
  <aside
    class="hidden lg:block fixed bg-sidebar-bg pt-24 pl-6 pr-8 h-screen"
    :class="{
      'w-72 xl:w-92': adminpanel,
      'w-64 xl:w-72': !adminpanel,
    }"
  >
    <ul class="text-base mb-10">
      <li>
        <NuxtLink
          v-for="el in links"
          :key="el.title"
          class="flex px-4 py-2.5 rounded-lg mb-2"
          :to="el.path"
          :class="{ 'nuxt-link-active': isRouteActive(el.path) }"
          no-prefetch
        >
          <Icon classes="mr-4 w-6 h-6 text-dark-blue" :name="el.svg" />
          <span>{{ el.title }}</span>
        </NuxtLink>
      </li>
    </ul>

    <Button v-if="!adminpanel" kind="alternative" bg="sidebar-bg" icon="envelope" long>
      Напишите нам
    </Button>
  </aside>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
    adminpanel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {};
  },

  methods: {
    isRouteActive(path) {
      if (
        this.$route.path.includes(path) ||
        (path.includes('news') && this.$route.path.includes('news')) ||
        (path.includes('blog') && this.$route.path.includes('blog'))
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.nuxt-link-active {
  background-image: linear-gradient(to right, #4a32fe 0%, #a52fd2 3%, #e9def3 3%, #fadbe6 100%);
  transition: all 0.2s;
}
.nuxt-link-active:hover {
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}
.nuxt-link-active:active {
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}
a:hover:not(.nuxt-link-active) {
  background-image: linear-gradient(to right, #4a32fe 0%, #a52fd2 3%, #ede6f3 3%);
  transition: all 0.2s;
}
</style>
