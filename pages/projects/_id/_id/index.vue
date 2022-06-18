<template>
  <div
    class="flex flex-col items-center md:items-stretch pb-10 p-10 md:rounded-lg bg-white text-dark-text"
  >
    <div class="flex flex-col gap-4">
      <div class="flex justify-between">
        <div class="font-bold text-2xl">{{ task.taskName }}</div>
        <div
          v-if="task.status === 'open'"
          class="flex justify-center items-center gap-2 border rounded-lg p-3"
        >
          <div>Задача в работе</div>
          <div class="bg-yellow-600 rounded-full w-3 h-3"></div>
        </div>
        <div v-else class="flex justify-center items-center gap-2 border rounded-lg p-3">
          <p>Задача закрыта</p>
          <div class="bg-green-500 rounded-full w-3 h-3"></div>
        </div>
      </div>
      <div>
        <div class="prose border p-6 rounded-lg" v-html="task.description"></div>
      </div>
      <div class="flex flex-wrap gap-3">
        <div v-for="file in files" :key="file.id" class="relative">
          <div
            class="flex justify-around border p-3 cursor-pointer rounded-md bg-gray-200 text-black transform transition-all hover:-translate-y-1"
          >
            <a :href="file.url" target="_blank">{{ file.name.slice(0, 55) + '...' }}</a>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <Button kind="alternative" @click.native="openModal = true">Загрузить файлы</Button>
        <Button kind="alternative" @click.native="openModalCloseTask = true">Закрыть задачу</Button>
      </div>
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
    <Modal :isopen="openModalCloseTask" narrow @closeModal="openModalCloseTask = false">
      <div class="flex justify-between items-center flex-col gap-10">
        <h2 class="text-xl font-bold">Вы уверены что хотите закрыть задачу?</h2>
        <div class="flex justify-center w-full items-center gap-20">
          <Button kind="alternative" @click.native="closeTask">Закрыть задачу</Button>
          <Button kind="alternative" @click.native="openModalCloseTask = false">Отмена</Button>
        </div>
      </div>
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
      task: {},
      users: [],
      selectedUser: '',
      taskTitle: '',
      taskDescription: '',
      openModal: false,
      status: false,
      files: [],
      filesPage: 1,
      filesArray: [],
      openModalCloseTask: false,
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
    this.getTask();
  },
  methods: {
    async getTask() {
      const { data } = await this.$api.web().getOneTask(this.$route.params.id);
      this.task = data;
      this.files = data.files;
      this.status = data.status;
    },
    closeTask() {
      console.log('sadasd');
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
      this.files.push(newItem);
      this.openModal = false;
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
