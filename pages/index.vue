<template>
  <div
    class="w-full md:w-2/3 lg:w-3/5 xl:w-2/4 2xl:w-2/5 bg-white rounded-lg py-4 px-6 md:py-10 md:px-16 lg:py-14 lg:px-24"
  >
    <form class="flex flex-col justify-center gap-8" @submit.prevent="userLogin">
      <div class="flex justify-center">
        <h1 class="md:text-3xl font-semibold text-xl">Вход в документооборот</h1>
      </div>
      <div class="flex flex-col gap-5 mt-5">
        <div>
          <label>Логин</label>
          <MyInput v-model="login.email" type="text" />
        </div>
        <div>
          <label>Пароль</label>
          <MyInput v-model="login.password" type="password" />
        </div>
      </div>
      <div class="flex flex-col iyems-center gap-4">
        <Button type="submit" kind="primary" long textlg>Войти</Button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'adminPanelLogin',

  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    async userLogin() {
      try {
        const { data } = await this.$auth.loginWith('refresh', { data: this.login });
        await this.$auth.setUser(data.user);
        console.log(this.$auth.user);
      } catch (err) {
        this.$store.commit('updateField', {
          path: 'notification',
          value: {
            type: 'error',
            message: err.response.data.message,
          },
        });
      }
    },
  },
};
</script>

<style scoped></style>
