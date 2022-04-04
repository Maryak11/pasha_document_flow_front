<template>
  <div
    class="flex flex-col items-center md:items-stretch pb-10 p-10 md:rounded-xl bg-white text-dark-text"
  >
    <div class="flex justify-between w-full items-center justify-center">
      <p class="text-3xl font-bold">Проекты</p>
      <CustomSelect
        :enteroption="statuses[0].name"
        :options="mapBlogCategories"
        @selectedOption="setSelectOptionDivisions"
      />
      <CustomSelect
        :enteroption="statuses[0].name"
        :options="statuses"
        @selectedOption="setSelectOptionStatus"
      />
    </div>
    <div key="1" class="grid grid-cols-news gap-6 mt-8">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @projectCardClick="clickCard"
      />
    </div>
    <Modal :isopen="showModal" @closeModal="showModal = false">{{ currentProject }}</Modal>
  </div>
</template>
<script>
export default {
  layout: 'adminPanel',
  data() {
    return {
      divisions: [],
      divisionValue: 0,
      showModal: false,
      statusValue: 'all',
      currentProject: {},
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
    async clickCard(id) {
      console.log(id);
      this.showModal = true;
      const { data } = await this.$api.web().getOneProject(id);
      this.currentProject = data;
    },
  },
};
</script>
<style scoped></style>
