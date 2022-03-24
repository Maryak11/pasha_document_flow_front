<template>
  <div class="w-full flex flex-col gap-6">
    <div v-for="el in data" :key="el.id">
      <div
        class="
          flex
          justify-between
          items-center
          bg-bgPreparationElement
          px-6
          py-2
          text-sm
          font-bold
          cursor-pointer
        "
        @click="$router.push({ path: `users/${el.id}` })"
      >
        <p class="text-lg">{{ el.email }}</p>
        <Icon classes="w-3 h-3" name="arrow" />
      </div>
      <div class="px-6 py-3 flex flex-col gap-6">
        <div class="flex justify-between border-b py-4">
          <p>Login</p>
          <p class="font-bold">{{ el.displayedName }}</p>
        </div>
        <div class="flex justify-between border-b py-4">
          <p>Role</p>
          <p class="font-bold">{{ el.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
