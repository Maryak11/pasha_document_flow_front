<template>
  <div class="p-6 pb-10 md:p-10 md:rounded-lg bg-white text-dark-text xl:w-2/3">
    <form class="flex flex-col gap-3" @submit.prevent="submit">
      <div>
        <span>Имя</span>
        <MyInput v-model="user.displayedName" />
      </div>
      <div>
        <span>Email</span>
        <MyInput v-model="user.email" />
      </div>
      <div>
        <span>Телефон</span>
        <MyInput v-model="user.phone" maska="+7 (9##) ###-##-##" />
      </div>
      <div>
        <span>Роль</span>
        <CustomSelect
          v-if="user.divisionId"
          :enteroption="enteroptionForScope"
          :options="optionScope"
          @selectedOption="selectRole"
        />
      </div>
      <div>
        <span>Отдел</span>
        <CustomSelect
          v-if="divisions.length"
          :enteroption="enteroption"
          :options="divisions"
          @selectedOption="setSelectOptionDivisions"
        />
      </div>

      <div v-if="!password">
        <Button kind="purpleAlternative" @click.native="generatePass">
          Сгенерировать пароль
        </Button>
      </div>
      <div v-else class="flex justify-between">
        <span class="text-green-500 p-2.5">{{ password }}</span>
        <span class="text-red-500 cursor-pointer p-2.5" @click="password = ''"
          >Отменить пароль</span
        >
      </div>

      <div>
        <Button kind="purple" type="submit">Сохранить изменения</Button>
      </div>
    </form>
  </div>
</template>

<script>
import { generatePassword } from '~/plugins/helpers';
export default {
  layout: 'adminPanel',

  data: () => ({
    user: {},
    password: '',
    divisions: [],
    enteroption: '',
    enteroptionForScope: '',
    divisionId: '',
    optionScope: [{ name: 'admin' }, { name: 'user' }],
  }),

  async mounted() {
    const { data } = await this.$api.web().getUser(this.$route.params.id);
    this.user = data;
    const payload = await this.$api.web().getAllDivisions();
    this.divisions = payload.data;
    const option = this.divisions.find((el) => +this.user.divisionId === el.value);
    this.enteroptionForScope = this.user.scope;
    this.divisionId = this.user.divisionId;
    this.enteroption = option.name;
  },

  methods: {
    async submit() {
      if (this.password) this.user.password = this.password;
      const { data } = await this.$api.web().updateUser(this.$route.params.id, {
        password: this.user.password,
        email: this.user.email,
        divisionId: this.divisionId,
        scope: this.user.scope,
        phone: this.user.phone,
      });
      const notification = {
        type: 'success',
        message: data.message,
      };
      this.$store.commit('updateField', { path: 'notification', value: notification });
    },

    generatePass() {
      this.password = generatePassword();
    },
    selectRole(opt) {
      this.user.scope = opt.name;
      console.log(this.user.scope);
    },
    setSelectOptionDivisions(opt) {
      this.divisionId = opt.value;
    },
  },
};
</script>

<style scoped></style>
