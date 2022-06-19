<template>
  <div class="p-6 pb-10 md:p-10 md:rounded-lg bg-white text-dark-text xl:w-5/6">
    <div class="flex mb-7 justify-between group cursor-pointer">
      <button class="flex w-full" @click.stop="visibleAddUser = !visibleAddUser">
        <img
          class="mr-4 transform scale-100 group-hover:scale-125 transition-all self-center"
          :src="require(`@/assets/img/icons/plus.svg`)"
          alt="plus"
        />
        <span class="transform transition-all group-hover:translate-x-1"
          >Добавить пользователя</span
        >
      </button>
    </div>
    <transition name="accordion">
      <form v-if="visibleAddUser" class="flex flex-col gap-3" @submit.prevent="submit">
        <div>
          <span>Имя</span>
          <MyInput v-model="displayedName" />
        </div>
        <div>
          <span>Email</span>
          <MyInput v-model="email" />
        </div>
        <div>
          <span>Телефон</span>
          <MyInput v-model="phone" maska="+7 (9##) ###-##-##" />
        </div>
        <div>
          <span>Роль</span>
          <CustomSelect
            :options="[{ name: 'admin' }, { name: 'user' }]"
            @selectedOption="selectRole"
          />
        </div>
        <span>Отдел</span>
        <CustomSelect :options="divisions" @selectedOption="setSelectOptionDivisions" />
        <div class="h-3"></div>
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
          <Button kind="purple" type="submit">Добавить пользователя</Button>
        </div>
      </form>
    </transition>
    <p class="text-3xl font-bold my-10">Список пользователей</p>
    <MyInput v-model="filter" placeholder="Поиск по пользователям" />
    <div class="flex flex-col gap-6 mt-8 overflow-auto">
      <div class="md:hidden">
        <MobileTableUsers :data="filteredUsers" />
      </div>
      <div class="hidden md:flex">
        <Table :columns="columns" :data="filteredUsers" @openDogovor="editorUser" />
      </div>
    </div>
  </div>
</template>

<script>
import { generatePassword } from '~/plugins/helpers';

export default {
  layout: 'adminPanel',
  data: () => ({
    users: [],
    email: '',
    displayedName: '',
    role: 'admin',
    divisionId: 1,
    phone: '',
    filter: '',
    password: '',
    visibleAddUser: '',
    columns: [
      {
        id: 1,
        field: 'email',
        label: 'E-mail',
        opacity: true,
      },
      {
        id: 2,
        field: 'displayedName',
        label: 'Login',
        opacity: false,
      },
      {
        id: 3,
        field: 'scope',
        label: 'Scope',
        opacity: true,
      },
      {
        id: 4,
        field: 'divisionName',
        label: 'Отдел',
        opacity: true,
      },
    ],
  }),
  computed: {
    filteredUsers() {
      return this.users.filter((t) => t.displayedName.includes(this.filter));
    },
  },
  async mounted() {
    const { data } = await this.$api.web().getAllUsers();
    const payload = await this.$api.web().getAllDivisions();
    this.users = data;
    this.divisions = payload.data;
  },

  methods: {
    async submit() {
      try {
        const newUser = {
          email: this.email,
          displayedName: this.displayedName,
          scope: this.role,
          phone: this.phone,
          divisionId: this.divisionId,
          password: this.password,
        };
        if (this.password) {
          const response = await this.$api.web().registerUser(newUser);
          const notification = {
            type: 'success',
            message: response.data.message,
          };
          this.$store.commit('updateField', { path: 'notification', value: notification });
          this.users = [newUser, ...this.users];
        } else {
          const notification = {
            type: 'error',
            message: 'Сначала сгенерируйте пароль и сохраните его в безопасное место',
          };
          this.$store.commit('updateField', { path: 'notification', value: notification });
        }
      } catch (err) {
        const notification = {
          type: 'error',
          message: err.response.data.message,
        };
        this.$store.commit('updateField', { path: 'notification', value: notification });
      }
    },
    setSelectOptionDivisions(payload) {
      this.divisionId = payload.value;
    },

    generatePass() {
      this.password = generatePassword();
    },
    editorUser(item) {
      const user = this.users.find((el) => el.email === item);
      this.$router.push({ path: `users/${user.id}` });
    },
    selectRole(opt) {
      console.log(opt);
      this.role = opt.name;
    },
  },
};
</script>
