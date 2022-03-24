<template>
  <div>
    <Icon
      classes="h-6 w-6 flex justify-center transition-all cursor-pointer text-black cursor-pointer items-center"
      name="burger"
      @click.native.prevent="toggleVisibility"
    />
    <div
      class="fixed -left-full top-0 bg-white w-full px-4 py-20 h-screen transition-all transform overflow-auto"
      :class="{
        'translate-x-full z-50': visibilityMobileNavBar,
        'translate-x-0 z-0': !visibilityMobileNavBar,
      }"
    >
      <nav class="flex flex-col justify-between h-full">
        <ul class="flex flex-col">
          <AccordionLink
            v-for="item in filteredList"
            :key="item.name"
            :links="item.links"
            :to="item.path || ''"
            :togglemobilenavbar="toggleVisibility"
          >
            {{ item.name }}
          </AccordionLink>
        </ul>
        <NuxtLink v-if="list === 'loginList'" to="/login" no-prefetch>Выход</NuxtLink>
        <Icon
          classes="transform rotate-180 absolute top-8 right-6 cursor-pointer w-6 h-6"
          name="arrow"
          @click.native="toggleVisibility"
        />
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: [String],
      required: false,
      default: 'accountPage',
    },
    white: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      visibilityMobileNavBar: false,

      loginList: [
        { name: 'Мой займ', path: '/lk/myloan' },
        { name: 'История займов', path: '/lk/history' },
        { name: 'Промокоды', path: '/lk/promocode' },
        { name: 'Профиль', path: '/lk/profile' },
        { name: 'Помощь', path: '/lk/help' },
        { name: 'Видеочат', path: '/lk/videochat' },
      ],
      adminPanelList: [
        { name: 'Настройки', path: '/adminPanel/settings' },
        { name: 'Новости', path: '/adminPanel/news/page' },
        { name: 'FAQ', path: '/adminPanel/faq' },
        { name: 'Загрузка файлов', path: '/adminPanel/filesUpload/page' },
        { name: 'Пользователи', path: '/adminPanel/users' },
        { name: 'Партнеры', path: '/adminPanel/partners' },
        { name: 'Отзывы', path: '/adminPanel/reviews' },
        { name: 'Вакансии', path: '/adminPanel/vacancies' },
        { name: 'Документы', path: '/adminPanel/documents' },
        { name: 'Видеочат', path: '/adminPanel/videochat' },
      ],
      accountList: [
        {
          name: 'Получить деньги',
          path: '/getMoney',
          links: [],
        },
        {
          name: 'Вернуть займ',
          path: '/repayLoan',
          links: [],
        },
        { name: 'FAQ', path: '/faq' },
        {
          name: 'О нас',
          links: [
            { name: 'Документы', to: '/documents' },
            { name: 'Новости', to: '/news' },
            { name: 'Вакансии', to: '/vacancies' },
          ],
        },
        { name: 'Личный кабинет', path: '/login' },
      ],
    };
  },

  computed: {
    filteredList() {
      if (this.list === 'accountList') return this.accountList;
      else if (this.list === 'loginList') return this.loginList;
      else if (this.list === 'adminPanel') return this.adminPanelList;
      else return [];
    },
    iconClasses() {
      if (this.white) {
        return 'h-6 w-6 flex justify-center transition-all cursor-pointer text-white cursor-pointer items-center';
      }
      return 'h-6 w-6 flex justify-center transition-all  cursor-pointer text-dark-blue cursor-pointer items-center';
    },
  },
  // watch: {
  //   visibilityMobileNavBar(newVal) {
  //     newVal
  //       ? (document.body.style.overflow = 'hidden')
  //       : (document.body.style.overflow = 'visible');
  //   },
  // },

  methods: {
    toggleVisibility() {
      this.visibilityMobileNavBar = !this.visibilityMobileNavBar;
    },
  },
};
</script>

<style scoped>
.nuxt-link-active {
  background-image: linear-gradient(90deg, rgb(236, 235, 254) -13.54%, rgb(253, 235, 245) 108.96%);
  border-bottom: none;
  border-radius: 10px;
}
</style>
