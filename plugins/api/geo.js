export default (instance) => {
  return {
    getCurrentCity(payload) {
      return instance().post('/geolocate/address', payload);
    },
    helpCity(payload) {
      return instance().post('/suggest/address', payload);
    },
  };
};
