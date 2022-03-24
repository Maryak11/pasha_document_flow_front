export default (o, instance) => {
  return {
    getAllUsers() {
      return instance(o).get('/users');
    },
    getUser(id) {
      return instance(o).get(`/users/${id}`);
    },
    updateUser(id, user) {
      return instance(o).put(`/users/${id}`, user);
    },
    registerUser(payload) {
      return instance(o).post(`/auth/register`, payload);
    },
  };
};
