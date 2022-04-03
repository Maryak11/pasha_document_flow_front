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
    getAllDivisions() {
      return instance(o).get(`/divisions`);
    },
    getAllProjects(divisionId, status) {
      return instance(o).get(`/projects`, {
        params: {
          divisionId,
          status,
        },
      });
    },
  };
};
