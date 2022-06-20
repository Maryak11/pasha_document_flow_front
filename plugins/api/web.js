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
    getAllProjects(divisionId, status, userId) {
      return instance(o).get(`/projects`, {
        params: {
          divisionId,
          status,
          userId,
        },
      });
    },
    getOneProject(projectId) {
      return instance(o).get(`/projects/${projectId}`);
    },
    getTasksByProject(projectId, userId, status) {
      return instance(o).get(`/tasks`, {
        params: {
          projectId,
          userId,
          status,
        },
      });
    },
    getUsersForAddProject(projectId) {
      return instance(o).get(`/users/project`, {
        params: {
          projectId,
        },
      });
    },
    updateProject(projectId, payload) {
      return instance(o).post(`/projects/${projectId}`, payload);
    },
    addTask(payload) {
      return instance(o).post(`/task`, payload);
    },
    getOneTask(id) {
      return instance(o).get(`/task/${id}`);
    },
    updateTask(id, payload) {
      return instance(o).put(`/task/${id}`, payload);
    },
  };
};
