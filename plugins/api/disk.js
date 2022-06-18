export default (c, instance) => {
  return {
    getAllFiles(page) {
      return instance(c).get(`/filesUpload/${page}`);
    },
    uploadFiles(files) {
      console.log(files);
      return instance(c).post(`/filesUpload?userId=${c.$auth.user.id}`, files);
    },
    uploadFilesForApplication(files) {
      return instance(c).post(`/filesUploadForClient?userId=123`, files);
    },
    deleteFile(id) {
      return instance(c).delete(`/filesUpload/${id}`);
    },
    updateFile(file) {
      return instance(c).put(`/filesUpload/${file.id}`, file, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    synchronizeFiles(renameFiles) {
      return instance(c).get(`/filesUpload/sync`, {
        headers: { 'Content-Type': 'application/json' },
        params: {
          rename: +renameFiles,
        },
      });
    },
  };
};
