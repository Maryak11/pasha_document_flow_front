<template>
  <div class="flex items-center">
    <div v-if="item.type === 'divider'" class="divider" />
    <button
      v-else
      type="button"
      class="px-2 rounded-md m-1 font-bold hover:bg-black hover:text-white text-lg"
      :class="{ 'text-white bg-black': item.isActive ? item.isActive() : null }"
      :title="item.title"
      @click="item.action"
    >
      <Icon classes="h-6 w-6 hover:text-white" :name="item.icon" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.divider {
  min-width: 2px;
  height: 1.7rem;
  background-color: black;
  opacity: 0.3;
}
</style>
