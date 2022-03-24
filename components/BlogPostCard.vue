<template>
  <div
    class="
      relative
      bg-reviewsBg
      p-8
      shadows
      rounded-xl
      sm:shadow-xl
      transition-all
      hover:shadow-none
      cursor-pointer
      prose
    "
    @click.stop="
      $router.push({
        path: `${$route.name.includes('adminPanel') ? '/adminPanel' : ''}/blog/${
          category[0].urlName
        }/${el.name}`,
      })
    "
  >
    <button
      v-if="adminpanel"
      class="
        flex
        items-center
        gap-3
        absolute
        border-2 border-bgStep
        text-black
        transform
        scale-100
        transition-all
        hover:scale-110
        p-2
        rounded-lg
        top-1
        right-1
      "
      @click.stop="deleteBlogPost"
    >
      <img class="h-3 w-3" src="~/assets/img/icons/cross.svg" alt="delete" />
    </button>
    <div
      v-if="adminpanel"
      class="absolute bottom-2 bg-green right-3 p-2 text-white rounded-lg"
      :class="{ 'bg-green-600': el.published === true, 'bg-red-600': el.published === false }"
    >
      {{ el.published ? 'Опубликовано' : 'Черновик' }}
    </div>
    <div class="absolute font-bold right-10 top-8 hidden md:inline-block">
      {{ category[0].name }}
    </div>
    <h2 class="font-bold md:text-xl text-base mb-3 pr-6">
      {{ el.title }}
    </h2>
    <p class="opacity-70">
      {{ el.createdAt | dateFormat }} в рубрике
      <span class="font-bold">{{ category[0].name }}</span>
    </p>
    <div>
      <img
        v-if="el.blogImageLink"
        class="mr-6 my-3 xl:w-1/3 lg:w-1/2 rounded-xl"
        align="left"
        :src="el.blogImageLink"
        alt=""
      />
      <span
        style="clear: both"
        class="prose"
        v-html="prepareDescription.replace(/<p><\/p>/g, '<p>&nbsp;</p>')"
      ></span>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
  props: {
    el: {
      type: Object,
      required: true,
    },
    adminpanel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapFields('blog', ['blogCategories']),
    category() {
      return this.blogCategories.filter((item) => item.id === this.el.categoryId);
    },
    prepareDescription() {
      const parsed = this.el.body.replace(/\s+/g, ' ').substring(0, 800).split(' ');

      parsed.splice(-1, 1);

      while (parsed.join(' ').length > 796) {
        parsed.splice(-1, 1);
      }

      parsed.push('...');
      return parsed.join(' ');
    },
  },

  methods: {
    deleteBlogPost() {
      this.$store.dispatch('blog/deleteBlogPost', {
        name: this.el.name,
        page: +this.$route.params.page || 1,
      });
    },
  },
};
</script>

<style scoped>
</style>
