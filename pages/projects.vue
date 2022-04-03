<template>
  <div
    class="flex flex-col items-center md:items-stretch pb-10 p-10 md:rounded-xl bg-white text-dark-text xl:w-5/6"
  >
    <div class="flex justify-between w-full items-center justify-center">
      <p class="text-3xl font-bold">Проекты</p>
      <CustomSelect
        enteroption="Выберите категорию"
        :options="mapBlogCategories"
        @selectedOption="setSelectOptionDivisions"
      />
      <CustomSelect
        enteroption="Выберите категорию"
        :options="statuses"
        @selectedOption="setSelectOptionStatus"
      />
      <div class="relative group">
        <div
          class="flex gap-3 border rounded-md items-center p-3 hover:bg-gray-200 transition-all cursor-pointer"
          @click="visibilityDivision = !visibilityDivision"
        >
          <p>{{ categoryName.length ? categoryName[0].name : 'Разделы категорий' }}</p>
          <Icon
            :classes="`w-3 h-3 cursor-pointer transition-all duration-300 transform ${
              visibilityDivision ? '-rotate-90' : 'rotate-90'
            }`"
            name="arrow"
          />
        </div>
        <transition name="accordion">
          <div
            v-if="visibilityDivision"
            class="absolute z-20 w-max bg-white shadows rounded-md mt-2 right-0 p-4"
          >
            <div
              v-for="item in divisions"
              :key="item.id"
              @click="visibilityDivision = !visibilityDivision"
            >
              <NuxtLink
                exact
                :to="`/blog/topic/${item.divisionTranslitName}/page`"
                class="inline-block w-full p-2 hover:bg-gray-100 rounded-lg"
              >
                {{ item.divisionName }}
              </NuxtLink>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div key="1" class="flex flex-col gap-6 mt-8">
      <div v-for="project in projects" :key="project.id" class="rounded-lg shadows p-4">
        <div>Назыание проекта: {{ project.projectName }}</div>
        <div class="flex gap-2">
          <label>Отделы: </label>
          <div v-for="div in project.divisions" :key="div.id" class="flex gap-2">
            {{ div.divisionName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'adminPanel',
  data() {
    return {
      divisions: [],
      visibilityDivision: false,
      divisionValue: 0,
      statusValue: 'all',
      projects: [],
      statuses: [
        { value: 0, name: 'Показать все', translitName: 'all' },
        { value: 1, name: 'Открытые', translitName: 'open' },
        { value: 2, name: 'Закрытые', translitName: 'close' },
      ],
    };
  },
  computed: {
    auth() {
      return this.$auth.hasScope('admin');
    },
    categoryName() {
      return this.divisions.filter((item) => item.divisionTranslitName === this.$route.params.name);
    },
    mapBlogCategories() {
      const newArr = this.divisions.map((el) => {
        return { ...el, value: el.id, name: el.divisionName };
      });
      const resultArray = [{ value: 0, id: 0, name: 'Показать все' }, ...newArr];
      return resultArray;
    },
  },
  async mounted() {
    this.getProjects(this.divisionValue, this.statusValue);
    const { data } = await this.$api.web().getAllDivisions();
    this.divisions = data;
  },
  methods: {
    async getProjects(divisionId, status) {
      const { data } = await this.$api.web().getAllProjects(divisionId, status);
      this.projects = data;
    },
    setSelectOptionDivisions(div) {
      this.divisionValue = div.id;
      this.getProjects(this.divisionValue, this.statusValue);
    },
    setSelectOptionStatus(status) {
      this.statusValue = status.translitName;
      console.log(this.statusValue);
      this.getProjects(this.divisionValue, this.statusValue);
    },
  },
};
</script>
<style scoped></style>
