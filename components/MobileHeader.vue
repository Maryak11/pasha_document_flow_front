<template>
  <div class="flex justify-between bg-white py-6 px-4 md:px-10 items-center w-full lg:hidden">
    <MobileNavBar list="accountList" white />
    <div class="ml-3">
      <div
        class="flex gap-2 items-center cursor-pointer"
        @click="$store.commit('visibilityUpdateCity')"
      >
        <Icon classes="w-4 h-4 text-black" name="location" />
        <p class="text-black">
          {{ city.length > 17 ? city.slice(0, 17) + '...' : city }}
        </p>
      </div>
      <UpdateCity />
    </div>
    <div class="hidden sm:block">
      <Button kind="alternative" @click.native="$router.push({ path: '/login' })"
        >Войти в ЛК</Button
      >
    </div>
    <div class="sm:hidden flex cursor-pointer" @click="$router.push({ path: '/login' })">
      <Icon name="user" classes="w-7 h-7 text-black" />
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
  data() {
    return {
      visibilityMobileNavBar: false,
    };
  },
  computed: {
    ...mapFields(['city', 'visibilityUpdateCity']),
  },
};
</script>

<style scoped>
.bg {
  background-color: white;
}
</style>
