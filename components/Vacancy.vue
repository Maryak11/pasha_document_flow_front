<template>
  <div
    class="flex flex-col bg-reviewsBg gap-6 p-6 rounded-lg border hover:border-transparent transition-all cursor-pointer transform group hover:scale-105 hover:shadow-lg"
    @click="$router.push({ path: `vacancy/${el.id}` })"
  >
    <h1 class="text-2xl font-semibold">{{ el.name }}</h1>
    <div class="flex gap-4">
      <img class="w-5 h-5" src="@/assets/img/icons/location.svg" alt="location" />
      <p v-if="currentCity !== ''">{{ currentCity }}</p>
      <div v-else>
        <p v-for="(city, index) in el.cities" :key="index">{{ city }}</p>
      </div>
    </div>
    <h1 class="text-xl font-semibold">Обязанности</h1>
    <ul class="flex flex-col gap-2">
      <li v-for="(dut, index) in el.duties" :key="index">- {{ dut }}</li>
    </ul>
    <div class="flex gap-2 items-center group-hover:gap-4 transition-all">
      <p>Подробнее</p>
      <Icon classes="w-3 h-3" name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    el: {
      type: Object,
      required: true,
    },
    currentCity: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
