export default (instance) => {
  return {
    getLoan(payload) {
      return instance().post('/leads/create', payload);
    },

  };
};
