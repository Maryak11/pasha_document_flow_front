import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  city: 'Санкт-Петербург',
  notification: {},
  visibilityUpdateCity: false,
  confirmation: false,
});

export const getters = {
  getField,

  getCity(state) {
    return state.city;
  },
  getConfirmation(state) {
    return state.confirmation;
  },
};

export const mutations = {
  updateField,

  visibilityUpdateCity(state) {
    state.visibilityUpdateCity = !state.visibilityUpdateCity;
  },
  setCity(state, city) {
    state.city = city;
  },
};

export const actions = {
  async getCurrentCity({ commit }, vm) {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };
    const { lat, lng } = await vm.getLocation(options);
    const city = await this.$api.geo().getCurrentCity(JSON.stringify({ lat, lon: lng }));
    commit(
      'updateField',
      { path: 'city', value: city.data.suggestions[0].data.city },
      { root: true },
    );
    commit('visibilityUpdateCity');
  },
};
