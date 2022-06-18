<template>
  <div class="flex gap-2 items-center m-px">
    <input
      :id="id"
      :ref="id"
      :disabled="disabled"
      type="file"
      class="w-px h-px opacity-0 overflow-hidden absolute"
      @change="fileAdded"
    />
    <label
      :for="id"
      :class="[
        'flex',
        'items-center',
        'w-full',
        'text-sm',
        'whitespace-nowrap',
        'rounded-lg',
        'p-3',
        'transition-all',
        disabled ? 'opacity-20 bg-dark-blue text-white' : 'text-dark-blue',
        fileName
          ? 'text-black font-normal pointer-events-none'
          : 'cursor-pointer font-bold border border-dark-blue hover:bg-dark-blue hover:text-white active:shadow-button-inset-lg focus:border-black',
      ]"
    >
      <Icon v-if="icon" classes="inline-block mr-2 w-4 h-4" :name="icon" />
      {{ (fileName && fileName.slice(0, 8) + '...') || label }}
    </label>
    <span
      v-if="fileName"
      class="text-sm text-black opacity-50 cursor-pointer"
      @click="clearFileInput"
      >Удалить</span
    >
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
  props: {
    disabled: {
      type: Boolean,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Файл',
    },
    icon: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      fileName: null,
    };
  },
  computed: {
    ...mapFields('files', ['filesToUpload']),
  },

  methods: {
    fileAdded(e) {
      this.$emit('fileChanged');
      this.fileName = this.$refs[this.id].files[0].name;
      this.$store.commit('files/addToUploadFiles', Array.from(e.target.files));
    },
    clearFileInput() {
      this.$refs[this.id].value = '';
      this.fileName = null;
      this.$emit('fileChanged');
      this.$store.commit('files/removeAllFiles');
    },
  },
};
</script>

<style></style>
