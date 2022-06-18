<template>
  <div
    :class="[
      'rounded-lg',
      'flex',
      'items-center',
      type === 'badPhoto' || type === 'rejection' || type === 'expired'
        ? ['py-3', 'text-statusBudge-danger']
        : type === 'active' ||
          type === 'approved' ||
          type === 'prolongationApproved' ||
          type === 'repaid'
        ? ['bg-green-50', 'w-max', 'font-bold', 'p-2', 'md:p-3', 'px-4']
        : type === 'review'
        ? ['bg-yellow-50', 'w-max', 'font-bold', 'p-2', 'md:p-3', 'px-4']
        : '',
    ]"
  >
    <div class="min-w-4">
      <StatusBudge :type="status" />
    </div>
    <span class="ml-3">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },

  computed: {
    text() {
      switch (this.type) {
        case 'active':
          return 'Активный';
        case 'review':
          return 'Рассмотрение заявки';
        case 'badPhoto':
          return 'Мы не можем принять решение по причине плохого качества фотографий документов. Пожалуйста, обновите их';
        case 'expired':
          return 'Займ просрочен на Х дней. Оплатите как можно скорее или воспользуйтесь пролонгацией';
        case 'repaid':
          return 'Займ погашен';
        case 'approved':
          return 'Одобрено';
        case 'prolongationApproved':
          return 'Пролонгация одобрена';
        default:
          return '';
      }
    },
    status() {
      switch (this.type) {
        case 'active':
        case 'approved':
        case 'prolongationApproved':
        case 'repaid':
          return 'success';

        case 'review':
          return 'warning';

        case 'badPhoto':
        case 'rejection':
        case 'expired':
          return 'danger';

        default:
          return '';
      }
    },
  },
};
</script>

<style></style>
