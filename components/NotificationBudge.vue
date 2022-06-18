<template>
  <div ref="notif" class="md:relative">
    <div
      :class="[
        'text-xs',
        'p-1.5',
        'px-3',
        'flex',
        'justify-center',
        'items-center',
        'rounded-3xl',
        'bg-purple',
        'opacity-80',
        'hover:opacity-100',
        'active:opacity-90',
        'cursor-pointer',
        'shadow-budge',
        'transition-all',
        'select-none',
        isOpen ? 'opacity-100' : '',
      ]"
      @click="isOpen = !isOpen"
    >
      <img src="~assets/img/icons/notification.svg" alt="notification" />
      <span class="ml-1 text-white">15</span>
    </div>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute md:w-104 w-screen top-16 md:top-12 left-0 right-0 md:-left-24 rounded-lg bg-white pt-6 z-40 shadow-notifications"
      >
        <h4 class="text-xs text-notifications-text-purple uppercase ml-5 mb-2">Уведомления</h4>
        <ul class="max-h-notifications customScroll">
          <li v-for="(item, idx) in notifications" :key="item.title">
            <div
              :class="[
                'pl-5',
                'py-5',
                'flex',
                'justify-start',
                'items-center',
                idx % 2 ? 'bg-gray-100' : '',
              ]"
            >
              <div class="min-w-4 flex justify-center items-center">
                <StatusBudge :type="item.type" />
              </div>
              <div class="px-5">
                <p class="text-sm text-notifications-text-gray mb-1">{{ item.title }}</p>
                <span class="text-xs text-notifications-text-purple">{{ item.date }}</span>
              </div>
            </div>
          </li>
        </ul>

        <p class="cursor-pointer text-center text-xs my-4">Отметить как прочтенные (10)</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      notifications: [
        {
          title: 'Поступление ХХХ₽ по договору №ХХХХХ asdfdfda fdas fdsa f das afds',
          date: '3 часа назад',
          type: 'success',
        },
        {
          title: 'Осталось 2 дня для оплаты по договору №ХХХХХХХ',
          date: '3 часа назад',
          type: 'danger',
        },
        { title: 'Заявка отклонена', date: '1 день назад', type: 'danger' },
        { title: 'Заявка на ХХХ1₽ зарегистрирована', date: '20.20.2020', type: 'warning' },
        { title: 'Заявка на ХХХ2₽ зарегистрирована', date: '20.20.2020', type: 'warning' },
        { title: 'Заявка на ХХХ3₽ зарегистрирована', date: '20.20.2020', type: 'warning' },
        { title: 'Заявка на ХХХ4₽ зарегистрирована', date: '20.20.2020', type: 'warning' },
      ],
    };
  },

  mounted() {
    window.addEventListener('click', this.clickListener);
  },

  beforeDestroy() {
    window.removeEventListener('click', this.clickListener);
  },

  methods: {
    clickListener(e) {
      if (!this.$refs.notif.contains(e.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.customScroll {
  overflow-y: scroll;
  overflow-y: overlay;
  scrollbar-color: #e4d7fb transparent;
  scrollbar-width: 6px;
}
.customScroll::-webkit-scrollbar {
  width: 6px;
}
.customScroll::-webkit-scrollbar-track {
  border-radius: 3px;
}
.customScroll::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-image: linear-gradient(
    90deg,
    rgba(43, 61, 255, 0.2) -66.25%,
    rgba(255, 64, 154, 0.2) 166.25%
  );
}
</style>
