<template>
  <div
    :class="[
      'rounded-xl',
      'md:border md:border-dark-blue',
      'md:bg-none',
      'hover:bg-none',
      'hover:bg-dark-blue',
      'cursor-pointer',
      'p-4',
      'px-2',
      'md:px-3',
      'w-42',
      'md:w-44',
      'flex flex-col',
      'items-center',
      'hover:text-white',
      'transition-all',
      selected === method
        ? ['bg-none', 'bg-dark-blue', 'text-white']
        : ['bg-tableHead', 'text-dark-blue'],
    ]"
    @click="$emit('cardSelected', method)"
  >
    <h4 class="text-sm text-center font-bold mb-3">{{ method }}</h4>
    <Icon classes="h-14 w-14 bg-current mb-4" :name="icon" />
    <div class="flex justify-between items-center text-xs w-full mb-1">
      <span>Комиссия:</span>
      <span class="font-bold">{{ commission }}</span>
    </div>
    <div class="flex justify-between items-baseline text-xs w-full">
      <span>Часы&nbsp;работы:</span>
      <span class="font-bold text-right">{{ worktime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    method: {
      type: String,
      default: 'vtb',
    },
    icon: {
      type: String,
      required: true,
    },
    commission: {
      type: String,
      default: '',
    },
    worktime: {
      type: String,
      default: '',
    },
    selected: {
      type: String,
      default: null,
    },
  },
};
</script>

<style>
</style>