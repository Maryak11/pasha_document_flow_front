<template>
  <div
    class="
      grid grid-cols-recieveMethodsMobile
      md:grid-cols-recieveMethods
      gap-4
      justify-items-center
      mb-10
    "
  >
    <RecieveMethodCard
      v-for="method in methods"
      :key="method"
      :method="method"
      icon="bank"
      :selected="selected"
      @cardSelected="selected = $event"
    />
  </div>
</template>

<script>
export default {
  props: {
    methods: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      selected: null,
    };
  },
};
</script>

<style>
</style>