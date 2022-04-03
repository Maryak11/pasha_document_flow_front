import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  notification: {},
});

export const getters = {
  getField,
};

export const mutations = {
  updateField,
};
