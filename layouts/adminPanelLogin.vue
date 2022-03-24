<template>
  <div class="flex justify-center items-center bg-white min-h-screen text-dark-blue">
    <Nuxt />
    <MessageView :options="notification" />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  computed: {
    ...mapFields(['notification']),
  },
};
</script>
