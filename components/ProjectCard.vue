<template>
  <div
    class="relative flex flex-col justify-between gap-2 rounded-lg shadows p-6 cursor-pointer transform hover:-translate-y-1 transition-all"
    @click="$router.push(`projects/${project.id}`)"
  >
    <p class="font-bold text-xl mb-4">{{ project.projectName }}</p>
    <div class="flex flex-wrap gap-2">
      <label>Отделы: </label>
      <div v-for="div in project.divisions" :key="div.id" class="flex gap-2 flex-wrap">
        <p class="font-bold">{{ div.divisionName }}</p>
      </div>
    </div>
    <div class="flex gap-2">
      <label>Заказчик: </label>
      <p class="font-bold">{{ project.customer }}</p>
    </div>
    <div class="flex gap-2">
      <label>Дата создания: </label>
      <p>{{ project.createdAt | dateFormat }}</p>
    </div>
    <div
      class="absolute left-0 top-0 w-0.5 h-full"
      :class="{
        'bg-yellow-600': project.status === 'open',
        'bg-green-600': project.status === 'close',
      }"
    ></div>
    <!-- <div
      class="absolute top-3 right-3 transform hover:rotate-90 bg-white transition-all"
      @click.stop="$emit('projectCardClick', project.id)"
    >
      <Icon name="settings" classes="w-6 h-6 text-black " />
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
