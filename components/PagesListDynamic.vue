<template>
  <div>
    <div class="text-center text-3xl font-bold mb-10">Динамичные страницы</div>
    <MyInput v-model="filter" placeholder="Поиск по страницам" />
    <div class="h-5" />
    <transition name="fade" mode="out-in">
      <div v-if="dynamicPages.length" key="1">
        <div class="flex flex-col gap-4">
          <PageCard v-for="el in dynamicPages" :key="el.id" :el="el" adminpanel />
        </div>
        <Pagination
          :total-pages-count="dynamicPagesPagesCount"
          :sibling-count="2"
          :current-page="currentPage"
          @pageChange="changePage"
        />
      </div>
      <p v-else key="2" class="mt-10 text-2xl text-center text-dark-blue font-bold">
        Страницы не найдены
      </p>
    </transition>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapFields } from 'vuex-map-fields';

export default {
  data: () => ({
    currentPage: 1,
    filter: '',
  }),

  async fetch() {
    await this.$store.dispatch('pages/getDynamicPages', {
      page: this.currentPage,
      filter: this.filter,
    });
  },

  computed: {
    ...mapFields('pages', ['dynamicPages', 'dynamicPagesPagesCount']),
  },

  watch: {
    filter() {
      debounce(() => {
        this.$store.dispatch('pages/getDynamicPages', { page: 1, filter: this.filter });
      }, 600)();
    },
  },

  methods: {
    changePage(newPage) {
      this.currentPage = +newPage;
      this.$store.dispatch('pages/getDynamicPages', { page: +newPage, filter: this.filter });
    },
  },
};
</script>

<style>
</style>