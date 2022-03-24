<template>
  <form @submit.prevent="getLoan">
    <h2 class="lg:text-2xl md:text-xl sm:text-lg font-bold mb-6">
      Для получения займа заполните анкету
    </h2>
    <MessageView :options="notification" />
    <div class="flex justify-between items-center mb-2">
      <span>Сумма</span>
      <span>{{ loanAmount }} ₽</span>
    </div>
    <div class="flex flex-col gap-6 mb-6">
      <RangeSlider v-model="loanAmount" min="5000" max="30000" step="500" noticks />
      <div class="flex flex-col gap-4">
        <MyInput v-model="name" placeholder="*Имя" />
        <MyInput v-model="phone" maska="+7(9##) ### ##-##" placeholder="*Телефон - 79#########" />
        <Dadata />
        <MyInput v-model="email" placeholder="E-mail" />
      </div>
      <div class="flex flex-col gap-3">
        <div>
          <CheckboxSquare v-model="approval" />
          <span class="ml-2"
            >Я согасен на
            <i class="underline cursor-pointer" @click="showModalData = !showModalData"
              >передачу данных</i
            ></span
          >
        </div>
        <div class="relative">
          <CheckboxSquare v-model="approvalAge" />
          <span class="ml-2"
            >Мне уже исполнилось 18 лет и я имею прописку в регионе получения займа</span
          >
        </div>
      </div>
    </div>
    <div class="w-full">
      <Button type="submit" kind="primary" long>Получить деньги</Button>
    </div>
    <Modal :isopen="showModal" @closeModal="showModal = false">
      <div class="flex flex-col gap-6 p-10">
        <p class="text-3xl font-bold">Спасибо за обращение в нашу компанию!</p>
        <p class="text-2xl font-medium">Ваша заявка успешно принята</p>
        <p>В течение 15 минут с Вами свяжется наш специалист</p>
      </div>
    </Modal>
    <Modal :isopen="showModalData" @closeModal="showModalData = false">
      <h2 class="text-2xl font-bold text-center mb-6">Соглашение о передаче данных</h2>
      <div class="mb-4" v-html="dataTransferAgreement.replace(/<p><\/p>/g, '<p>&nbsp;</p>')" />
    </Modal>
  </form>
</template>

<script>
import { v4 } from 'uuid';
import { mapFields } from 'vuex-map-fields';
import { russianLanguageMask } from '@/plugins/helpers.js';

export default {
  data() {
    return {
      russianLanguageMask,
      loanAmount: 5000,
      name: '',
      phone: '',
      email: '',
      showModal: false,
      showModalData: false,
      approval: false,
      approvalAge: false,
      message: false,
    };
  },

  async fetch() {
    await this.$store.dispatch('settings/getOneSetting', 'dataTransferAgreement');
  },

  computed: {
    ...mapFields(['city', 'notification']),
    ...mapFields('settings', ['dataTransferAgreement']),
  },

  methods: {
    async getLoan() {
      if (this.approval && this.approvalAge) {
        const data = {
          summ: this.loanAmount.toString(),
          phone: this.phone.replace(/[^0-9]/g, ''),
          region: this.city,
          city: this.city,
          email: this.email,
          fio: this.name,
          uid: v4(),
          offer: '1',
          wm_id: 'new_site',
        };
        await this.$api.dengi().getLoan(data);
        try {
          this.name = '';
          this.phone = '';
          this.email = '';
          this.approval = false;
          this.approvalAge = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        } catch (err) {}
      } else {
        const notification = {
          type: 'error',
          message: 'Подтвердите согласие',
        };
        this.$store.commit(
          'updateField',
          { path: 'notification', value: notification },
          { root: true },
        );
      }
    },
  },
};
</script>

<style scoped></style>
