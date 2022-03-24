<template>
  <ul>
    <li
      v-for="(field, key) in data"
      :key="key"
      class="font-semibold text-base flex justify-between items-center gap-2 py-2"
    >
      <span class="flex-1">{{ key }}</span>
      <span v-if="key !== 'Пароль'" class="font-normal text-sm">{{ field }}</span>
      <div v-else class="flex items-center font-normal text-xs opacity-50 cursor-pointer">
        <span class="mr-3">Изменить</span>
        <img src="~assets/img/icons/edit.svg" alt="edit" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style>
</style>