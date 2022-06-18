<template>
  <div
    class="relative bg-reviewsBg p-8 shadows rounded-lg sm:shadow-xl transition-all hover:shadow-none cursor-pointer prose"
    @click.stop="
      $router.push({
        path: `/adminPanel/pages/${el.name}`,
      })
    "
  >
    <h2 class="font-bold md:text-xl text-base mb-3 pr-6">
      {{ el.title }}
    </h2>
    <p class="opacity-40">
      {{ el.createdAt | dateFormat }}
    </p>
  </div>
</template>

<script>
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
};
</script>

<style scoped></style>
