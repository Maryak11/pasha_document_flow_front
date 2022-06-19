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
        { title: 'Профиль', svg: 'users', path: '/profile' },
        { title: 'Пользователи', svg: 'users', path: '/users' },
        { title: 'Проекты', svg: 'list', path: '/projects' },
      ],
    };
  },

  computed: {
    ...mapFields(['notification']),
  },
};
</script>

<style></style>
