<template>
  <img
    v-if="isImg(file.name)"
    :src="file.url"
    :alt="file.name"
    class="w-full h-full object-cover"
  />
  <div
    v-else
    class="flex items-center justify-center h-full bg-gray-200 relative border border-gray-400"
  >
    <Icon name="documentFields" classes="w-10 h-10" />
    <div class="absolute left-0 right-0 bottom-0 text-xs bg-white break-words text-center">
      {{ file.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  methods: {
    isImg(name) {
      const ext = name.split('.').pop();
      return ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'svg';
    },
  },
};
</script>

<style>
</style>