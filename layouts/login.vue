<template>
  <div class="lg:bg-gray-200 bg-white min-h-screen text-dark-blue">
    <div class="bg-white shadows">
      <div class="lg:container mx-auto">
        <Header />
        <MobileHeader />
      </div>
    </div>
    <div class="flex justify-center md:mt-10 pb-12">
      <Nuxt />
    </div>
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
