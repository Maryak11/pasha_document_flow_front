<template>
  <div
    class="flex flex-col items-center md:items-stretch pb-10 p-10 md:rounded-lg bg-white text-dark-text"
  >
    <div
      class="flex flex-col md:flex-row mb-7 justify-between md:items-center group cursor-pointer"
    >
      <div v-if="$auth.user.scope === 'admin'" class="flex justify-between">
        <button class="flex w-full mb-4 md:mb-0" @click.stop="showAddTask = !showAddTask">
          <img
            class="mr-4 transform scale-100 group-hover:scale-125 transition-all self-center"
            :src="require(`@/assets/img/icons/plus.svg`)"
            alt="plus"
          />
          <span class="transform transition-all group-hover:translate-x-1">Создать задачу</span>
        </button>
      </div>
      <CustomSelect
        :enteroption="statuses[0].name"
        :options="statuses"
        @selectedOption="setSelectOptionStatus"
      />
    </div>
    <transition name="accordion">
      <div v-if="showAddTask" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label>Название задачи</label>
          <MyInput v-model="taskTitle" />
        </div>
        <CustomSelect
          :enteroption="
            mapUsersForSelectComponent[0].name
              ? mapUsersForSelectComponent[0].name
              : 'Назначьте сотрудника'
          "
          :options="mapUsersForSelectComponent"
          @selectedOption="setSelectOptionUser"
        />
        <div class="flex flex-col gap-2">
          <label>Описание задачи</label>
          <TiptapEditor v-model="taskDescription" />
        </div>
        <div class="flex flex-wrap gap-3">
          <div v-for="file in filesArray" :key="file.id" class="relative">
            <div class="flex justify-around border p-5 rounded-md">
              <div>{{ file.name }}</div>
              <!-- <div>{{ file.url.split('.')[1] }}</div> -->
              <button
                class="flex items-center gap-3 absolute text-black transform scale-100 transition-all hover:scale-125 p-2 rounded-lg top-1 right-1"
                @click.stop="deleteFile(file)"
              >
                <img class="h-2 w-2" src="~/assets/img/icons/cross.svg" alt="delete" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <Button kind="alternative" @click.native="openModal = true">Загрузить файлы</Button>
          <Button kind="alternative" @click.native="addTask">Создать задачу</Button>
        </div>
      </div>
    </transition>
    <div class="grid grid-cols-partnerCol gap-3 mt-5">
      <TasksCard v-for="item in tasks" :key="item.id" :task="item" />
    </div>
    <Modal :isopen="openModal" @closeModal="openModal = false">
      <Upload />
      <h2 class="text-xl font-bold mt-5 mb-3">Выберите файл для задачи</h2>
      <transition name="fade" mode="out-in">
        <div v-if="allFiles.length" key="1">
          <div class="grid auto-rows-filesPreview grid-cols-filesPreview gap-3">
            <div
              v-for="file in allFiles"
              :key="file.name"
              class="transition-all transform hover:scale-105 cursor-pointer square"
              @click="addFilesArray(file)"
            >
              <FilePreview :file="file" />
            </div>
          </div>

          <Pagination
            no-scroll
            :total-pages-count="filesPagesCount"
            :sibling-count="2"
            :current-page="filesPage"
            @pageChange="changeFilesPage"
          />
        </div>
        <p v-else key="2">Файлов пока нет</p>
      </transition>
    </Modal>
  </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
import { v4 } from 'uuid';
export default {
  layout: 'adminPanel',
  data() {
    return {
      statuses: [
        { value: 0, name: 'Показать все', translitName: 'all' },
        { value: 1, name: 'Открытые', translitName: 'open' },
        { value: 2, name: 'Закрытые', translitName: 'close' },
      ],
      statusValue: 'all',
      tasks: [],
      users: [],
      selectedUser: '',
      taskTitle: '',
      taskDescription: '',
      openModal: false,
      showAddTask: false,
      fileName: '',
      filesPage: 1,
      filesArray: [],
    };
  },
  computed: {
    ...mapFields('files', ['allFiles', 'filesToUpload', 'filesPagesCount']),
    mapUsersForSelectComponent() {
      return this.users.map((item) => {
        return { ...item, value: item.id, name: item.displayedName };
      });
    },
    initialUser() {
      return this.mapUsersForSelectComponent[0] ? this.mapUsersForSelectComponent[0].id : 4;
    },
  },
  mounted() {
    this.getTasks(this.statusValue);
    this.getUsers();
  },
  methods: {
    async getTasks(status) {
      const userId = this.$auth.user.id;
      const { data } = await this.$api
        .web()
        .getTasksByProject(this.$route.params.id, +userId, status);
      this.tasks = data;
    },
    async getUsers() {
      const { data } = await this.$api.web().getUsersForAddProject(this.$route.params.id);
      this.users = data;
      this.selectedUser = this.initialUser;
    },

    async addTask() {
      try {
        const newTask = {
          taskName: this.taskTitle,
          description: this.taskDescription,
          userId: this.selectedUser,
          status: 'open',
          projectId: this.$route.params.id,
          files: this.filesArray,
        };
        const { data } = await this.$api.web().addTask(newTask);
        const notification = {
          type: 'success',
          message: data.message,
        };
        this.getTasks(this.statusValue);
        this.$store.commit(
          'updateField',
          { path: 'notification', value: notification },
          { root: true },
        );
        this.taskTitle = '';
        this.taskDescription = '';
        this.selectedUser = this.initialUser;
        this.filesArray = [];
      } catch (err) {
        const notification = {
          type: 'error',
          message: err.response.data.message,
        };
        this.$store.commit(
          'updateField',
          { path: 'notification', value: notification },
          { root: true },
        );
      }
    },

    setSelectOptionStatus(status) {
      this.statusValue = status.translitName;
      this.getTasks(this.statusValue);
    },
    setSelectOptionUser(opt) {
      this.selectedUser = opt.value;
    },
    addFilesArray({ url, name }) {
      const newItem = {
        id: v4(),
        url,
        name,
      };
      this.filesArray.push(newItem);
    },
    deleteFile(file) {
      this.filesArray = this.filesArray.filter((el) => el.id !== file.id);
    },
    changeFilesPage(newPage) {
      this.filesPage = +newPage;
      this.$store.dispatch('files/getAllFiles', { page: +newPage, routeName: this.$route.name });
    },
  },
};
</script>
<style scoped></style>
