<template>
  <div
    :class="[bg, 'text-black', 'flex', 'flex-col', 'rounded-lg', narrow ? 'my-2 gap-3' : 'gap-5']"
  >
    <div
      class="flex justify-between"
      :class="narrow ? ['flex-col'] : ['flex-col', 'lg:flex-row', 'lg:items-center']"
    >
      <p class="font-semibold w-28 mb-2" :class="[narrow ? '' : 'lg:text-xl']">Сумма</p>
      <div>
        <MyInput v-model="loanAmount" price />
      </div>
    </div>

    <RangeSlider v-model="loanAmount" min="5000" max="35000" step="3000" :noticks="narrow" />
    <p class="text-xs md:text-sm -mt-1">Займ на сумму более 700₽ доступен со второго займа</p>

    <div
      class="flex justify-between"
      :class="narrow ? ['flex-col'] : ['flex-col', 'lg:flex-row', 'lg:items-center']"
    >
      <p class="font-semibold w-28 mb-2" :class="[narrow ? '' : 'lg:text-xl']">Срок</p>
      <div>
        <MyInput />
      </div>
    </div>
    <RangeSlider min="0" max="60" step="30" :noticks="narrow" />
    <Button kind="primary" @click.native="showFormModal = !showFormModal">Получить</Button>
    <!-- <div class="flex flex-col gap-5 w-full" :class="{ 'text-sm': narrow }">
      <div class="flex gap-2 justify-between">
        <div class="w-5/12" :class="[narrow ? '' : 'lg:w-1/2']">
          <p>Вы получите</p>
          <p class="font-extrabold">700₽</p>
        </div>
        <div class="w-7/12" :class="[narrow ? '' : 'lg:w-1/2']">
          <p>Процентная ставка</p>
          <div class="flex gap-2 font-extrabold w-1/2">
            <p :class="{ 'opacity-50 line-through': promocode }">Х.X%</p>
            <p v-if="promocode">N.N%</p>
          </div>
        </div>
      </div>
      <div class="flex gap-2 justify-between">
        <div class="w-5/12" :class="[narrow ? '' : 'lg:w-1/2']">
          <p>К возврату</p>
          <div class="flex gap-2 font-extrabold">
            <p :class="{ 'opacity-50 line-through': promocode }">Y.Y₽</p>
            <p v-if="promocode">Z.Z₽</p>
          </div>
        </div>
        <div class="w-7/12" :class="[narrow ? '' : 'lg:w-1/2']">
          <p>Дата возврата</p>
          <p class="font-extrabold">31.31.3131</p>
        </div>
      </div>
    </div>
    <div
      v-if="!narrow && !nopromocode"
      class="flex justify-between items-start gap-2"
      :class="narrow ? ['flex-col'] : ['flex-col', 'xl:flex-row', 'xl:items-center']"
    >
      <div class="xl:w-1/3">
        <Dotted value="Промокод" :texsize="narrow ? 'xs' : ''" gray />
      </div>
      <div
        v-if="!promocode"
        class="flex gap-2 items-center flex-grow w-full"
        :class="{ 'xl:w-2/3': !narrow }"
      >
        <div class="flex-grow">
          <MyInput type="text" placeholder="Промокод" promocode />
        </div>

        <Button kind="alternative" :bg="bgcolor" @click.native="promocode = !promocode">ОК</Button>
      </div>
      <div v-else class="py-4 text-green-700">Промокод подтвержден</div>
    </div> -->
    <div>
      <Dotted value="Если не смогу вернуть вовремя?" gray question />
    </div>

    <Modal :isopen="showFormModal" @closeModal="showFormModal = false">
      <GetLoan />
    </Modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { russianLanguageMask } from '@/plugins/helpers.js';

export default {
  props: {
    to: {
      type: String,
      default: '/myloan/newloan',
    },
    narrow: {
      type: Boolean,
    },
    bgcolor: {
      type: String,
      default: 'white',
    },
    nopromocode: {
      type: Boolean,
    },
  },

  data() {
    return {
      russianLanguageMask,
      loanAmount: 5000,
      promocode: false,
      showFormModal: false,
    };
  },

  computed: {
    ...mapFields(['city']),

    bg() {
      return `bg-${this.bgcolor}`;
    },
  },
};
</script>

<style scoped></style>
