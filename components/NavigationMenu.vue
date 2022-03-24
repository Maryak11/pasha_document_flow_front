<template>
  <ul v-if="linksList" class="mb-8">
    <li v-for="link in linksList" :key="link.name">
      <NuxtLink
        :to="link.to"
        exact
        class="relative p-2 block link rounded-full"
        :class="{
          'nuxt-link-active': $route.name
            .replaceAll('-', '')
            .includes(link.to.replaceAll('/', '').slice(0, 4)),
        }"
        no-prefetch
      >
        {{ link.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
  data() {
    return {
      menuItems: {
        getMoney: [{ name: 'Получить', to: '/getMoney' }],
        repayLoan: [{ name: 'Погасить', to: '/repayLoan' }],
        documents: [
          { name: 'Документы', to: '/documents' },
          { name: 'Новости', to: '/news/page' },
          { name: 'Вакансии', to: '/vacancies' },
          { name: 'Партнеры', to: '/partners' },
          { name: 'Блог', to: '/blog/page' },
        ],
        news: [
          { name: 'Документы', to: '/documents' },
          { name: 'Новости', to: '/news/page' },
          { name: 'Вакансии', to: '/vacancies' },
          { name: 'Партнеры', to: '/partners' },
          { name: 'Блог', to: '/blog/page' },
        ],
        partners: [
          { name: 'Документы', to: '/documents' },
          { name: 'Новости', to: '/news/page' },
          { name: 'Вакансии', to: '/vacancies' },
          { name: 'Партнеры', to: '/partners' },
          { name: 'Блог', to: '/blog/page' },
        ],
        blog: [
          { name: 'Документы', to: '/documents' },
          { name: 'Новости', to: '/news/page' },
          { name: 'Вакансии', to: '/vacancies' },
          { name: 'Партнеры', to: '/partners' },
          { name: 'Блог', to: '/blog/page' },
        ],
      },
    };
  },
  async fetch() {
    await this.$store.dispatch('blog/getCategories');
  },

  computed: {
    ...mapFields('blog', ['blogCategories']),
    mapBlogCategories() {
      const newArr = this.blogCategories.map((el) => {
        return { ...el, to: '/' + el.urlName };
      });
      return newArr;
    },
    linksList() {
      return this.menuItems[this.$route.matched[0].path.replace('/', '')];
    },
  },
};
</script>

<style >
.nuxt-link-active.link::after {
  width: 100%;
}

.link::after {
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
.link:hover::after {
  width: 100%;
}
.link:active::after {
  width: 100%;
}
</style>
