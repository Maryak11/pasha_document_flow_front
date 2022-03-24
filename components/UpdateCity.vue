<template>
  <div
    v-show="visibilityUpdateCity"
    class="absolute w-80 lg:top-20 lg:left-0 text-black top-20 left-6 z-20"
  >
    <div
      v-if="!visibilityHelp"
      class="
        flex
        items-center
        p-4
        bg-white
        shadows
        font-bold
        justify-center
        rounded-md
        lg:-bottom-10 lg:right-0
        gap-4
      "
    >
      <p>Это ваш город?</p>
      <div class="flex justify-around gap-3">
        <button
          class="border-2 rounded-lg px-2 py-1 hover:bg-gray-600 hover:text-white transition-all"
          @click="confirmationCity"
        >
          Да
        </button>
        <button
          class="border-2 rounded-lg px-2 py-1 hover:bg-gray-600 hover:text-white transition-all"
          @click="visibilityHelp = !visibilityHelp"
        >
          Нет
        </button>
      </div>
    </div>

    <Modal :isopen="visibilityHelp" @closeModal="visibilityHelp = false">
      <h2 class="font-bold text-2xl mb-6">Выбор города</h2>
      <Dadata @updateCity="updateCity" />
    </Modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  data() {
    return {
      queryCity: '',
      filteredCity: '',
      visibilityHelp: false,
    };
  },
  computed: {
    ...mapFields(['city', 'visibilityUpdateCity', 'confirmation']),
  },

  methods: {
    updateCity() {
      this.visibilityHelp = false;
      this.confirmation = true;
      this.visibilityUpdateCity = false;
    },
    confirmationCity() {
      this.visibilityUpdateCity = !this.visibilityUpdateCity;
      this.confirmation = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
