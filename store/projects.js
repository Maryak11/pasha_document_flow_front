import { getField, updateField } from 'vuex-map-fields';
import { setMany } from 'vue-set-path';

export const state = () => ({
  projectName: '',
  customer: '',
  status: '',
  divisionsForProject: [],
  usersForProject: [],
});

export const getters = {
  getField,

  filteredNews({ newsList, filter }) {
    return newsList.filter((t) => t.title.includes(filter));
  },
};

export const mutations = {
  updateField,

  setMany(state, properties) {
    setMany(state, properties);
  },
};

export const actions = {
  async getOneProject({ commit }, projectId) {
    try {
      const { data } = await this.$api.web().getOneProject(projectId);
      commit('setMany', {
        projectName: data.projectName,
        customer: data.customer,
        status: data.status,
        divisionsForProject: data.divisions,
        usersForProject: data.users,
      });
    } catch (err) {
      console.log(err);
    }
  },

  async addNews({ commit, state }) {
    try {
      const newNews = {
        title: state.newNewsTitle,
        body: state.newNewsBody,
        newsImageLink: state.newNewsImageLink,
        name: state.newNewsMetaTitle,
        metaDescription: this.$prepareDescription(state.newNewsMetaDescription.toLowerCase()),
        metaKeywords: state.newNewsMetaKeyWords,
      };
      const { data } = await this.$api.web().addNews(newNews);
      commit('setMany', {
        newNewsTitle: '',
        newNewsBody: '',
        newNewsImageLink: '',
        newNewsMetaTitle: '',
        newNewsMetaKeyWords: '',
        newNewsMetaDescription: '',
      });
      const notification = {
        type: 'success',
        message: data.message,
      };
      commit('updateField', { path: 'notification', value: notification }, { root: true });
      this.$router.push('/adminPanel/news/page/1');
      const request = {
        page: 1,
        adminPanel: true,
        filter: state.filter,
      };
      const res = await this.$api.web().getAllNews(request);
      commit('updateField', { path: 'newsList', value: res.data.rows });
    } catch (err) {
      const notification = {
        type: 'error',
        message: err.response.data.message,
      };
      commit('updateField', { path: 'notification', value: notification }, { root: true });
    }
  },

  async updateNews({ commit, state }, name) {
    try {
      const response = await this.$api.web().updateNews(name, {
        title: state.newsTitle,
        body: state.newsBody,
        newsImageLink: state.newsImageLink,
        name: state.newsMetaTitle,
        metaDescription: this.$prepareDescription(state.newsMetaDescription.toLowerCase()),
        metaKeywords: state.newsMetaKeyWords,
        published: state.publishedNews,
      });
      const notification = {
        type: 'success',
        message: response.data.message,
      };
      commit('updateField', { path: 'notification', value: notification }, { root: true });
      this.$router.go(-1);
    } catch (err) {
      const notification = {
        type: 'error',
        message: err.response.data.message,
      };
      commit('updateField', { path: 'notification', value: notification }, { root: true });
    }
  },
};
