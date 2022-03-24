<template>
  <div>
    <MessageView :options="notification" />
    <div class="shadow-xl">
      <div class="lg:container mx-auto">
        <Header />
        <MobileHeader />
      </div>
    </div>
    <main>
      <Nuxt />
    </main>
    <Footer />
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

<style scoped></style>
