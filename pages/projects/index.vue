<template>
  <div
    class="flex flex-col items-center md:items-stretch pb-10 p-10 md:rounded-lg bg-white text-dark-text"
  >
    <div class="flex justify-between w-full items-center justify-center">
      <p class="text-3xl font-bold">Проекты</p>
      <div v-if="$auth.user.scope === 'admin' || $auth.user.scope === 'GIP'">
        <CustomSelect
          :enteroption="statuses[0].name"
          :options="[...divisions, { value: 0, name: 'Показать все', translitName: 'all' }]"
          @selectedOption="setSelectOptionDivisions"
        />
      </div>
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
        @projectCardClick="clickCardModal"
      />
    </div>
    <Modal :isopen="showModal" @closeModal="showModal = false">
      <div class="flex flex-col gap-2">
        <label>Название проекта</label>
        <MyInput v-model="projectName" />
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
export default {
  layout: 'adminPanel',
  data() {
    return {
      divisions: [],
      divisionValue: 0,
      showModal: false,
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
    ...mapFields('projects', [
      'projectName',
      'customer',
      'status',
      'divisionsForProject',
      'usersForProject',
    ]),
    auth() {
      return this.$auth.hasScope('admin');
    },
    categoryName() {
      return this.divisions.filter((item) => item.divisionTranslitName === this.$route.params.name);
    },
  },
  async mounted() {
    this.getProjects(this.divisionValue, this.statusValue);
    const { data } = await this.$api.web().getAllDivisions();
    this.divisions = data;
  },
  methods: {
    async getProjects(divisionId, status) {
      const { data } = await this.$api.web().getAllProjects(divisionId, status, this.$auth.user.id);
      this.projects = data;
    },

    setSelectOptionDivisions(div) {
      this.divisionValue = div.value;
      this.getProjects(this.divisionValue, this.statusValue);
    },
    setSelectOptionStatus(status) {
      this.statusValue = status.translitName;
      console.log(this.statusValue);
      this.getProjects(this.divisionValue, this.statusValue);
    },
    async clickCardModal(id) {
      this.showModal = true;
      await this.$store.dispatch('projects/getOneProject', id);
    },
  },
};
</script>
<style scoped></style>
