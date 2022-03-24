<template>
  <header
    class="
      flex
      justify-between
      lg:justify-end
      items-center
      py-6
      px-6
      md:px-0
      bg-bg-main
      md:bg-transparent
    "
  >
    <div class="lg:hidden">
      <MobileNavBar :list="list" />
    </div>

    <div class="flex items-center">
      <div v-if="!adminpanel">
        <NotificationBudge />
      </div>
      <div class="flex items-center ml-6 md:mr-8 gap-3">
        <img class="shadow-budge rounded-full" src="~assets/img/icons/user.svg" alt="user" />
        <span class="text-base text-dark-blue" :class="{ 'hidden md:block': !adminpanel }">{{
          adminpanel ? $auth.user.displayedName : 'Иван Иванович'
        }}</span>
      </div>
      <img
        class="hover:opacity-70 cursor-pointer transition-all hidden md:block"
        src="~assets/img/icons/logout.svg"
        alt="logout"
        @click="logout"
      />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    list: {
      type: String,
      required: true,
    },
    adminpanel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      visibilityMobileNavBar: false,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style></style>
