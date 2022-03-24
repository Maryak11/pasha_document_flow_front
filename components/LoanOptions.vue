<template>
  <div
    class="flex justify-between items-center bg-white shadows transition-all transform md:hover:shadow-2xl md:hover:-translate-y-2 rounded-2xl group cursor-pointer py-8 shadow-lg hover:border-transparent sm:px-8 px-4"
    @click="$emit('toggleModal', el)"
  >
    <div class="flex flex-col gap-6">
      <h1 class="text-black font-bold xl:text-xl text-lg">{{ el.head }}</h1>
      <div>
        <p class="text-black opacity-70 xl:text-lg text-sm">
          от {{ el.term[0] }} до {{ el.term[1] }} недель,
        </p>
        <p class="text-black opacity-70 xl:text-lg text-sm">
          от {{ el.price[0] }} до {{ el.price[1] }} рублей
        </p>
      </div>
      <div
        class="flex w-28 justify-between cursor-pointer items-center text-dark-blue opacity-40 group-hover:opacity-100 transition-all"
      >
        <p class="">Подробнее</p>
        <Icon classes="group-hover:ml-4 transition-all w-3 h-3" name="arrow" />
      </div>
    </div>
    <div class="flex items-center h-32">
      <img
        class="w-36 h-36 sm:w-48 sm:h-48"
        :src="require(`@/assets/img/illustrations/${el.svg}.svg`)"
        alt="option"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    el: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
