<template>
  <div
    class="relative flex flex-col bg-gray-50 px-5 pt-5 pb-9 shadow-md rounded-md transform hover:-translate-y-0.5 transition-all cursor-pointer"
    @click="$router.push({ path: `${task.projectId}/${task.id}` })"
  >
    <div class="font-bold">
      {{ task.taskName }}
    </div>
    <div class="">
      {{ task.user.displayedName | initials }}
    </div>
    <div class="flex gap-1 absolute right-1 bottom-1 items-center justify-center">
      <Icon name="calendar1" classes="w-4 h-4 text-black opacity-50" />
      {{ task.createdAt | dateFormat }}
    </div>
    <div
      class="absolute left-0 top-0 w-0.5 h-full"
      :class="{
        'bg-yellow-600': task.status === 'open',
        'bg-green-600': task.status === 'close',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style></style>
