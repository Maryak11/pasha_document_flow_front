<template>
  <div class="min-h-screen">
    <Sidebar :links="links" :adminpanel="true" />
    <main class="lg:ml-72 xl:ml-92 pb-8 md:px-7 xl:px-10 min-h-screen bg-white md:bg-bg-main">
      <AccountHeader adminpanel list="adminPanel" />
      <Nuxt />
    </main>
    <MessageView :options="notification" />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  data() {
    return {
      links: [
        { title: 'Настройки', svg: 'settings', path: '/adminPanel/settings' },
        { title: 'Новости', svg: 'news', path: '/adminPanel/news/page' },
        { title: 'Блог', svg: 'news', path: '/adminPanel/blog/page' },
        { title: 'FAQ', svg: 'question', path: '/adminPanel/faq' },
        { title: 'Загрузка файлов', svg: 'upload', path: '/adminPanel/filesUpload/page' },
        { title: 'Пользователи', svg: 'users', path: '/adminPanel/users' },
        { title: 'Партнеры', svg: 'users', path: '/adminPanel/partners' },
        { title: 'Отзывы', svg: 'reviews', path: '/adminPanel/reviews' },
        { title: 'Вакансии', svg: 'vacancies', path: '/adminPanel/vacancies' },
        { title: 'Документы', svg: 'documentFields', path: '/adminPanel/documents' },
        { title: 'Страницы', svg: 'svedenie', path: '/adminPanel/pages' },
        { title: 'Видеочат', svg: 'videochat', path: '/adminPanel/videochat' },
      ],
    };
  },

  computed: {
    ...mapFields(['notification']),
  },
};
</script>

<style></style>
