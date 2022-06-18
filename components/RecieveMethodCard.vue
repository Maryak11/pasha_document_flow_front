<template>
  <div
    :class="[
      'rounded-lg',
      'md:border md:border-dark-blue',
      'md:bg-none',
      'hover:bg-none',
      'hover:bg-dark-blue',
      'cursor-pointer',
      'py-5',
      'md:py-3',
      'px-3',
      'h-24',
      'md:h-auto',
      'w-full',
      'md:w-36',
      'flex',
      'md:flex-col',
      'items-center',
      'justify-center',
      'hover:text-white',
      'transition-all',
      'relative',
      'card',
      selected === method
        ? ['bg-none', 'bg-dark-blue', 'text-white']
        : ['bg-tableHead', 'text-dark-blue'],
    ]"
    @click="$emit('cardSelected', method)"
  >
    <Icon
      classes="h-14 w-14 bg-current mr-5 md:m-0 absolute top-5 left-5 md:static icon"
      :name="icon"
    />
    <span class="md:mt-2 font-bold md:font-semibold text-lg md:text-sm name">{{ methodName }}</span>
  </div>
</template>

<script>
export default {
  props: {
    method: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      required: true,
    },
    selected: {
      type: String,
      default: null,
    },
  },

  computed: {
    methodName() {
      switch (this.method) {
        case 'vtb':
          return 'ВТБ';
        case 'qiwi':
          return 'КИВИ';
        case 'alpha':
          return 'Альфа-Банк';
        case 'sberbank':
          return 'Сбербанк';
        case 'tinkoff':
          return 'Тинькофф';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 340px) {
  .card {
    height: 70px;
  }
  .icon {
    width: 40px;
    height: 40px;
    top: 15px;
  }
  .name {
    font-size: 14px;
  }
}
</style>
