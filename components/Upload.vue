<template>
  <div class="flex flex-col gap-7">
    <input ref="files" class="hidden" type="file" multiple @change="filesChange" />
    <div
      class="
        transition-all
        border-dashed border-2 border-gray-300
        cursor-pointer
        flex
        justify-center
        items-center
        rounded-xl
        h-36
        hover:bg-gray-50
      "
      :class="{ 'bg-gray-50': dragging }"
      @drop="dragFile"
      @dragenter.prevent="dragging = true"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @dragend.prevent="dragging = false"
      @click="$refs.files.click()"
    >
      <div class="flex items-center justify-center flex-col gap-1">
        <Icon name="upload" classes="w-14 h-14 text-gray-300 text-purple opacity-50" />
        <p class="text-center text-dark-blue">Перетащите файлы или нажмите</p>
      </div>
    </div>

    <ul v-if="filesToUpload.length" class="flex flex-row flex-wrap gap-2">
      <li
        v-for="(file, idx) in filesToUpload"
        :key="file.name"
        class="flex items-center gap-2 p-1.5 pl-3 bg-purple text-xs w-min rounded-full"
      >
        <span class="whitespace-nowrap text-white">{{ fileName(file.name) }}</span>
        <div
          class="
            flex
            justify-center
            items-center
            bg-gray-100
            p-1.5
            rounded-full
            cursor-pointer
            hover:bg-gray-300
            transition-all
          "
          @click="() => removeCurrentFile(idx)"
        >
          <Icon name="close" classes="w-2 h-2" />
        </div>
      </li>
    </ul>

    <div class="flex flex-col md:flex-row items-center md:justify-between">
      <div class="mb-3 md:mb-0 w-full md:w-auto">
        <Button kind="purple" @click.native="uploadFiles">Загрузить файлы</Button>
      </div>
      <div class="flex flex-col items-center w-full md:w-auto">
        <Button kind="purpleAlternative" @click.native="synchronizeFiles"
          >Синхронизировать файлы</Button
        >
        <div class="mt-2">
          <CheckboxSquare v-model="renameFilesFlag" /><span>&nbsp;Переименовать файлы</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  data: () => ({
    dragging: false,
    renameFilesFlag: false,
  }),

  computed: {
    ...mapFields('files', ['filesToUpload']),
  },

  created() {
    this.$store.commit('files/updateField', { path: 'filesToUpload', value: [] });
  },

  methods: {
    fileName(name) {
      return name.lastIndexOf('.') <= 12 ? name : name.slice(0, 12) + '...';
    },
    filesChange(e) {
      this.$store.commit('files/addToUploadFiles', Array.from(e.target.files));
    },
    dragFile(e) {
      this.$store.commit('files/addToUploadFiles', Array.from(e.dataTransfer.files));
      this.dragging = false;
    },
    removeCurrentFile() {
      this.$store.commit('files/removeCurrentFile');
    },
    uploadFiles() {
      this.$store.dispatch('files/uploadFiles');
    },
    async synchronizeFiles() {
      await this.$store.dispatch('files/synchronizeFiles', this.renameFilesFlag);
      this.renameFilesFlag = false;
      this.$store.dispatch('files/getAllFiles', { page: 1 });
    },
  },
};
</script>

<style>
</style>