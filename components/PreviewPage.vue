<template>
  <div>
    <h1 class="text-3xl font-bold mb-3">{{ news.title }}</h1>
    <div>
      <img
        v-if="news.imageLink"
        class="mr-6 my-3 xl:w-1/3 lg:w-1/2 rounded-lg"
        align="left"
        :src="news.imageLink"
        alt=""
      />
      <span
        style="clear: both"
        class="prose p-3"
        v-html="news.body.replace(/<p><\/p>/g, '<p>&nbsp;</p>')"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
