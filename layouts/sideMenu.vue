<template>
  <div>
    <div class="shadows">
      <div class="lg:container mx-auto">
        <Header />
        <MobileHeader />
      </div>
    </div>
    <div class="lg:container px-4 md:px-10 mx-auto flex gap-14 py-8 md:py-14">
      <aside class="w-3/12 hidden xl:block">
        <MessageView :options="notification" />
        <NavigationMenu />
        <div v-if="$route.name !== 'getMoney'" class="p-4 bg-gray-100 rounded-lg">
          <Loan narrow bgcolor="gray-100" />
        </div>
      </aside>
      <main class="w-full xl:w-9/12">
        <Breadcrumbs />
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold">
            {{ title[$route.matched[0].path.replace('/', '')] }}
          </h1>
          <div
            v-if="
              ($route.name.includes('blog') && $route.name.indexOf('page') > -1) ||
              $route.name.indexOf('topic') > -1
            "
            class="relative group"
          >
            <div
              class="flex gap-3 border rounded-md items-center p-3 hover:bg-gray-200 transition-all cursor-pointer"
              @click="visibilityCategory = !visibilityCategory"
            >
              <p>{{ categoryName.length ? categoryName[0].name : 'Разделы категорий' }}</p>
              <Icon
                :classes="`w-3 h-3 cursor-pointer transition-all duration-300 transform ${
                  visibilityCategory ? '-rotate-90' : 'rotate-90'
                }`"
                name="arrow"
              />
            </div>
            <transition name="accordion">
              <div
                v-if="visibilityCategory"
                class="absolute z-20 w-max bg-white shadows rounded-md mt-2 right-0 p-4"
              >
                <div
                  v-for="cat in blogCategories"
                  :key="cat.id"
                  @click="visibilityCategory = !visibilityCategory"
                >
                  <NuxtLink
                    exact
                    :to="`/blog/topic/${cat.urlName}/page`"
                    class="inline-block w-full p-2 hover:bg-gray-100 rounded-lg"
                  >
                    {{ cat.name }}
                  </NuxtLink>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <Nuxt />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
  data() {
    return {
      visibilityCategory: false,
      loanOptions: [
        {
          head: 'До зарплаты',
          term: ['1', '4'],
          price: ['3000', '20000'],
          advantages: [
            'Удобно на короткий срок',
            'Возврат одним платежом в конце срока',
            'Пролонгация на неограниченное время',
            'Скидка 25% при повторном обращении',
          ],
          svg: 'dateLoan',
        },
        {
          head: 'Стандартный',
          term: ['9', '52'],
          price: ['10000', '60000'],
          advantages: [
            'Удобно на длинный срок',
            'Возврат частями так, как вам удобно',
            'Честное полное и частичное досрочное гашение на любом сроке',
            'Повторным клиентам сумма больше, а процент ниже',
          ],
          svg: 'standartLoan',
        },
      ],
      title: {
        repayLoan: 'Погасить займ',
        getMoney: 'Получить деньги',
        documents: 'Документы',
        partners: 'Партнеры',
        news: 'Новости',
        faq: 'Популярные вопросы',
        blog: 'Блог',
      },
    };
  },
  async fetch() {
    await this.$store.dispatch('blog/getCategories');
  },

  computed: {
    ...mapFields(['notification']),
    ...mapFields('blog', ['blogCategories', 'blogPostCategoryIdDisplay']),
    categoryName() {
      return this.blogCategories.filter((item) => item.urlName === this.$route.params.name);
    },
  },
};
</script>

<style></style>
