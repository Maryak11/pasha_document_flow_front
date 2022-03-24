<template>
  <header class="hidden lg:flex justify-between items-center py-4 px-4 md:px-10 relative">
    <div class="flex flex-col justify-start gap-2 relative">
      <NuxtLink to="/" class="text-xl font-bold text-black" no-prefetch>Деньги на дом</NuxtLink>
      <div
        class="flex gap-2 items-center cursor-pointer"
        @click="$store.commit('visibilityUpdateCity')"
      >
        <Icon classes="w-4 h-4 text-black" name="location" />
        <p class="text-black">
          {{ city.length > 17 ? city.slice(0, 17) + '...' : city }}
        </p>
      </div>
      <UpdateCity />
    </div>
    <ul class="flex items-center font-medium tracking-wider gap-7 text-black">
      <li>
        <DropdownLink to="/getMoney"> Получить деньги </DropdownLink>
      </li>
      <li>
        <DropdownLink to="/repayLoan"> Погасить займ </DropdownLink>
      </li>
      <li>
        <DropdownLink to="/faq">FAQ</DropdownLink>
      </li>
      <li>
        <DropdownLink
          to="/documents"
          :links="[
            { name: 'Документы', to: '/documents' },
            { name: 'Новости', to: '/news/page' },
            { name: 'Вакансии', to: '/vacancies' },
            { name: 'Партнеры', to: '/partners' },
            { name: 'Блог', to: '/blog/page/' },
          ]"
        >
          О нас
        </DropdownLink>
      </li>
      <li>
        <DropdownLink to="/appeal">Пожаловаться</DropdownLink>
      </li>
      <li>
        <Button kind="alternative" @click.native="$router.push({ path: '/login' })"
          >Личный кабинет</Button
        >
      </li>
    </ul>
  </header>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
  props: {
    black: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapFields(['city']),
  },
};
</script>

<style scoped></style>
