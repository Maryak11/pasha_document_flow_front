<template>
  <ol class="flex gap-2 mb-2 flex-wrap">
    <li class="flex gap-2">
      <NuxtLink to="/">
        <span>Главная</span>
      </NuxtLink>
      <span>></span>
    </li>
    <li v-for="(crumb, index) in crumbs" :key="index" class="flex gap-2">
      <NuxtLink :to="crumb.path" :class="{ 'opacity-50': index === crumbs.length - 1 }">
        <span>{{ crumb.title }}</span>
      </NuxtLink>
      <span v-if="index !== crumbs.length - 1">></span>
    </li>
  </ol>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    ...mapFields('blog', ['blogCategories']),
    crumbs() {
      const fullPath = this.$route.fullPath;
      const crumbs = [];
      switch (true) {
        case fullPath.includes('getMoney'):
          crumbs.push({ title: 'Получить деньги', path: '/getMoney' });
          break;
        case fullPath.includes('repayLoan'):
          crumbs.push({ title: 'Погасить займ', path: '/repayLoan' });
          break;
        case fullPath.includes('faq'):
          crumbs.push({ title: 'Вопросы', path: '/faq' });
          break;
        case fullPath.includes('documents'):
          crumbs.push({ title: 'Документы', path: '/documents' });
          break;
        case fullPath.includes('news'):
          crumbs.push({ title: 'Новости', path: '/news/page/1' });
          break;
        case fullPath.includes('partners'):
          crumbs.push({ title: 'Партнеры', path: '/partners' });
          break;
        case fullPath.includes('blog'):
          crumbs.push({ title: 'Блог', path: '/blog/page/1' });
          switch (true) {
            case !fullPath.includes('blog/page'):
              switch (true) {
                case fullPath.includes('blog/topic'):
                  crumbs.push({
                    title: this.blogCategories.find((c) => c.urlName === fullPath.split('/')[3])
                      .name,
                    path: `/blog/topic/${fullPath.split('/')[3]}/page/1`,
                  });
                  break;
                default:
                  crumbs.push({
                    title: this.blogCategories.find((c) => c.urlName === fullPath.split('/')[2])
                      .name,
                    path: `/blog/topic/${fullPath.split('/')[2]}/page/1`,
                  });
              }
          }
          break;
      }
      return crumbs;
    },
  },
};
</script>

<style>
</style>