<template>
  <div
    class="
      relative
      flex
      h-52
      items-center
      justify-center
      p-3
      shadow-md
      hover:shadow-none
      cursor-pointer
      transition-all
      rounded-lg
    "
    @click="openLink(partner.partnerLink)"
  >
    <img :src="partner.partnerImageLink" :alt="partner.partnerName" />
    <button
      v-if="admin"
      class="
        flex
        items-center
        gap-2
        absolute
        border-2 border-bgStep
        text-black
        transform
        scale-100
        transition-all
        hover:scale-110
        p-1
        rounded-lg
        top-1
        right-1
        text-sm
      "
      @click.stop="deletePartner(partner.id)"
    >
      <img class="h-3 w-3" src="~/assets/img/icons/cross.svg" alt="delete" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    partner: {
      type: Object,
      required: true,
    },
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    deletePartner(id) {
      this.$store.dispatch('partners/deletePartner', id);
    },
    openLink(link) {
      window.open(link);
    },
  },
};
</script>

<style lang="scss" scoped></style>
