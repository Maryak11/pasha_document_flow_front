<template>
  <div class="min-h-screen">
    <Sidebar :links="links" />
    <main class="lg:ml-64 xl:ml-72 pb-8 md:px-7 xl:px-10 min-h-screen bg-white md:bg-bg-main">
      <AccountHeader list="loginList" />
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
        { title: 'Мой займ', svg: 'dollar', alt: 'dollar', path: '/lk/myloan' },
        { title: 'История займов', svg: 'list', alt: 'list', path: '/lk/history' },
        { title: 'Промокоды', svg: 'card', alt: 'card', path: '/lk/promocode' },
        { title: 'Профиль', svg: 'settings', alt: 'settings', path: '/lk/profile' },
        { title: 'Помощь', svg: 'question', alt: 'question', path: '/lk/help' },
        { title: 'Видеочат', svg: 'videochat', alt: 'question', path: '/lk/videochat' },
      ],
    };
  },

  computed: {
    ...mapFields(['notification']),
  },
};
</script>

<style></style>
