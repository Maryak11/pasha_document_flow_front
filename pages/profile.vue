<template>
  <div>{{ $auth.user.id }}</div>
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
