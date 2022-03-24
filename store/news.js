import { getField, updateField } from 'vuex-map-fields';
import { setMany } from 'vue-set-path';

export const state = () => ({
  newsList: [],
  newsPublishedList: [],
  currentNews: {},
  filter: '',
  publishedNews: false,
  newsTitle: '',
  newsMetaTitle: '',
  newsMetaKeyWords: '',
  newsMetaDescription: '',
  newsBody: '',
  newsImageLink: '',
  newNewsTitle: '',
  newNewsMetaTitle: '',
  newNewsMetaKeyWords: '',
  newNewsMetaDescription: '',
  newNewsBody: '',
  newNewsImageLink: '',
  newsPagesCount: 1,
  paginationConditionHelper: 0,
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
  async getAllNews({ state, commit }, { page, adminPanel, mainPage }) {
    try {
      const request = {
        page,
        adminPanel,
        filter: state.filter,
      };
      commit('updateField', { path: 'paginationConditionHelper', value: 0 });
      const { data } = await this.$api.web().getAllNews(request);
      adminPanel
        ? this.$router.push(`/adminPanel/news/page/${page || 1}`)
        : mainPage
        ? this.$router.push('')
        : this.$router.push(`/news/page/${page || 1}`);
      commit('setMany', {
        newsList: data.rows,
        paginationConditionHelper: 1,
        newsPagesCount: Math.ceil(data.newsCount / data.newsPerPage),
      });
    } catch (err) {
      if (err.response?.status === 404) {
        adminPanel
          ? this.$router.push({ path: '/adminPanel/news/page/1' })
          : this.$router.push({ path: '/news/page/1' });
      }
    }
  },

  async getOneNews({ commit }, { name, adminPanel }) {
    try {
      const { data } = await this.$api.web().getOneNews({ name, adminPanel });
      commit('setMany', {
        currentNews: data,
        newsTitle: data.title,
        newsBody: data.body,
        newsImageLink: data.newsImageLink,
        newsMetaTitle: data.name,
        newsMetaKeyWords: data.metaKeywords,
        newsMetaDescription: data.metaDescription,
        publishedNews: data.published,
      });
    } catch (err) {
      this.$router.push({ path: '/news/page/1' });
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

  async deleteNews({ commit }, { name, page }) {
    try {
      const response = await this.$api.web().deleteNews(name);
      const notification = {
        type: 'success',
        message: response.data.message,
      };
      commit('updateField', { path: 'notification', value: notification }, { root: true });
      const request = {
        page,
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
};
