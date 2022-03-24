<template>
  <div class="flex flex-col md:flex-row gap-2">
    <p :class="{ 'text-red-600 transition-all': meta.length > 160 }">
      {{ meta.length + '/160' }}
    </p>
    <transition name="fade" mode="out-in">
      <p v-if="meta.length > 160" class="text-red-600">
        Макс. 160 символов (лишний текст обрежется автоматически после сохранения)
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
