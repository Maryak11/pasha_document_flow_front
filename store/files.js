import { getField, updateField } from 'vuex-map-fields';
import { setMany } from 'vue-set-path';

export const state = () => ({
  allFiles: [],
  currentUploadFile: [],
  filesToUpload: [],
  currentFile: {},
  currentFileName: '',
  staticCurrentFile: {},
  filesPagesCount: 1,
  filesPerPage: 40,
});

export const getters = {
  getField,

  filteredFaqs({ faqsList, filter }) {
    return faqsList.filter((t) => t.question.includes(filter));
  },
};

export const mutations = {
  updateField,

  setMany(state, properties) {
    setMany(state, properties);
  },

  addToAllFiles(state, newFiles) {
    state.allFiles = [...newFiles, ...state.allFiles];
    const total = state.allFiles.length + newFiles.length;
    if (total > state.filesPerPage) {
      state.allFiles.splice(-newFiles.length, newFiles.length);
    }
  },

  addToUploadFiles(state, newFiles) {
    state.filesToUpload = [...newFiles, ...state.filesToUpload];
  },

  removeCurrentFile(state, idx) {
    state.filesToUpload.splice(idx, 1);
  },
  removeAllFiles(state) {
    state.filesToUpload = [];
  },

  updateFile(state, file) {
    const idx = state.allFiles.findIndex((f) => f.id === file.id);
    state.allFiles[idx] = file;
    state.staticCurrentFile = file;
    state.currentFile = file;
    state.currentFileName = file.name;
  },

  deleteFile(state) {
    state.allFiles = state.allFiles.filter((f) => f.id !== state.currentFile.id);
  },
};

export const actions = {
  async getAllFiles({ commit }, { page }) {
    try {
      const { data } = await this.$api.disk().getAllFiles(page);
      this.$router.push(`/adminPanel/filesUpload/page/${page || 1}`);
      commit('setMany', {
        filesPerPage: data.filesPerPage,
        allFiles: data.rows,
        filesPagesCount: Math.ceil(data.filesCount / data.filesPerPage),
      });
    } catch (err) {
      if (err.response?.status === 404) {
        this.$router.push({ path: '/adminPanel/filesUpload/page/1' });
      }
    }
  },

  async uploadFiles({ commit, state }) {
    if (state.filesToUpload.length > 20) {
      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'warning',
            message: 'Вы не можете загрузить больше 20 файлов',
          },
        },
        { root: true },
      );
    } else if (state.filesToUpload.length === 0) {
      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'warning',
            message: 'Сначала добавьте файлы',
          },
        },
        { root: true },
      );
    } else {
      try {
        const formData = new FormData();
        state.filesToUpload.forEach((f) => {
          formData.append('multi-files', f);
        });
        const res = await this.$api.disk().uploadFiles(formData);
        commit('addToAllFiles', res.data.body);
        commit('updateField', { path: 'currentUploadFile', value: res.data.body });
        commit(
          'updateField',
          {
            path: 'notification',
            value: {
              type: 'success',
              message: res.data.message,
            },
          },
          { root: true },
        );
        commit('updateField', { path: 'filesToUpload', value: [] });
      } catch (err) {
        commit(
          'updateField',
          {
            path: 'notification',
            value: {
              type: 'error',
              message: err.response.data.message,
            },
          },
          { root: true },
        );
      }
    }
  },
  async uploadFilesForClient({ commit, state }) {
    if (state.filesToUpload.length === 0) {
      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'warning',
            message: 'Сначала добавьте файлы',
          },
        },
        { root: true },
      );
    } else {
      try {
        const formData = new FormData();
        state.filesToUpload.forEach((f) => {
          formData.append('multi-files', f);
        });
        const res = await this.$api.disk().uploadFilesForApplication(formData);
        commit('addToAllFiles', res.data.body);
        commit('updateField', { path: 'currentUploadFile', value: res.data.body });
        commit(
          'updateField',
          {
            path: 'notification',
            value: {
              type: 'success',
              message: res.data.message,
            },
          },
          { root: true },
        );
        commit('updateField', { path: 'filesToUpload', value: [] });
      } catch (err) {
        commit(
          'updateField',
          {
            path: 'notification',
            value: {
              type: 'error',
              message: err.response.data.message,
            },
          },
          { root: true },
        );
      }
    }
  },

  async updateFile({ state, commit }) {
    try {
      const newFileObj = { ...state.currentFile, name: state.currentFileName };
      const { data } = await this.$api.disk().updateFile(newFileObj);
      commit('updateFile', data.body);
      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'success',
            message: data.message,
          },
        },
        { root: true },
      );
    } catch (err) {
      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'error',
            message: err.response.data.message,
          },
        },
        { root: true },
      );
    }
  },

  async deleteFile({ state, commit }) {
    try {
      const res = await this.$api.disk().deleteFile(state.currentFile.id);
      commit('deleteFile');

      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'success',
            message: res.data.message,
          },
        },
        { root: true },
      );
    } catch (err) {
      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'error',
            message: err.response.data.message,
          },
        },
        { root: true },
      );
    }
  },

  async synchronizeFiles({ commit }, renameFiles) {
    try {
      const { data } = await this.$api.disk().synchronizeFiles(renameFiles);
      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'success',
            message: data.message,
          },
        },
        { root: true },
      );
    } catch (err) {
      commit(
        'updateField',
        {
          path: 'notification',
          value: {
            type: 'error',
            message: err.response.data.message,
          },
        },
        { root: true },
      );
    }
  },
};
