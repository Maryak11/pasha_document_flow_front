<template>
  <div>
    <ul>
      <li>Имя: {{ auth.user.displayedName }}</li>
      <li>Email: {{ auth.user.email }}</li>
      <li>Роль: {{ auth.user.scope }}</li>
      <li>Отдел: {{ auth.user.divisionName }}</li>
      <li>Дата регистрации: {{ auth.user.createdAt | dateFormat }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  layout: 'adminPanel',
  computed: {
    auth() {
      return this.$auth;
    },
  },
};
</script>
<style scoped></style>
