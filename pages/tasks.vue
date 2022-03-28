<template>
  <div>{{ auth }}</div>
</template>
<script>
export default {
  layout: 'adminPanel',
  computed: {
    auth() {
      return this.$auth.hasScope('admin');
    },
  },
};
</script>
<style scoped></style>
