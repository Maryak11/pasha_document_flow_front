export const baseURL = 'http://127.0.0.1:3080';
const instances = {
  web: (c) => {
    const instance = c.$axios.create({
      baseURL,
    });
    instance.onRequest(async (config) => {
      const expired = c.$auth.strategy.token.status().expired();
      if (expired) {
        const tokens = await c.$auth.refreshTokens();
        config.headers.Authorization = 'Bearer ' + tokens.data.accessToken;
      }
      return config;
    });
    return instance;
  },

  disk: (c) => {
    const instance = c.$axios.create({
      baseURL,
      headers: {
        'Content-Type': 'multipart/formdata',
      },
    });
    instance.onRequest(async (config) => {
      const expired = c.$auth.strategy.token.status().expired();
      if (expired) {
        const tokens = await c.$auth.refreshTokens();
        config.headers.Authorization = 'Bearer ' + tokens.data.accessToken;
      }
      return config;
    });
    return instance;
  },
};

export default instances;
