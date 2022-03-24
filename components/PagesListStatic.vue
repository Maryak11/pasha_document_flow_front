<template>
  <div>
    <div class="text-center text-3xl font-bold mb-10">Статичные страницы</div>
    <transition name="fade" mode="out-in">
      <div v-if="staticPages.length" key="1" class="flex flex-col gap-4">
        <PageCardStatic v-for="el in staticPages" :key="el.id" :el="el" adminpanel />
      </div>
      <p v-else key="2" class="mt-10 text-2xl text-center text-dark-blue font-bold">
        Страниц пока нет
      </p>
    </transition>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  async fetch() {
    await this.$store.dispatch('pages/getStaticPages');
  },

  computed: {
    ...mapFields('pages', ['staticPages']),
  },
};
</script>

<style>
</style>