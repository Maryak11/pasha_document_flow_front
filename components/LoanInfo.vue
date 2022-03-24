<template>
  <ul class="text-base mt-6 mb-8">
    <li
      :class="[
        'flex',
        'justify-between',
        'items-center',
        'py-3',
        'border-b',
        'border-gray-200',
        changeloan ? 'opacity-50' : '',
      ]"
    >
      <span>Сумма займа</span>
      <div class="flex flex-wrap justify-end items-center">
        <span
          :class="{
            'opacity-50 text-xs sm:text-base mr-1 sm:mr-4': newinfo.amount,
          }"
        >
          {{ info.amount }}
        </span>
        <span v-if="newinfo.amount">{{ newinfo.amount }}</span>
      </div>
    </li>
    <li
      :class="[
        'flex',
        'justify-between',
        'items-center',
        'py-3',
        'border-b',
        'border-gray-200',
        changeloan ? 'opacity-50' : '',
      ]"
    >
      <span>Процентная ставка</span>
      <div class="flex flex-wrap justify-end items-center">
        <span :class="{ 'opacity-50 text-xs sm:text-base mr-1 sm:mr-4': newinfo.percent }">{{
          info.percent
        }}</span>
        <span v-if="newinfo.percent">{{ newinfo.percent }}</span>
      </div>
    </li>
    <li
      :class="[
        'flex',
        'justify-between',
        'items-center',
        'py-3',
        'border-b',
        'border-gray-200',
        changeloan ? 'opacity-50' : '',
      ]"
    >
      <span>К возврату</span>
      <div class="flex items-center">
        <div class="flex flex-wrap justify-end items-center">
          <span :class="{ 'opacity-50 text-xs sm:text-base mr-1 sm:mr-4': newinfo.return }">{{
            info.return
          }}</span>
          <span v-if="newinfo.return">{{ newinfo.return }}</span>
        </div>
        <img src="~assets/img/icons/question.svg" alt="question" class="ml-2" />
      </div>
    </li>
    <li
      :class="[
        'flex',
        'justify-between',
        'items-center',
        'py-3',
        'border-b',
        'border-gray-200',
        changeloan ? 'opacity-50' : '',
      ]"
    >
      <span>Задолженность</span>
      <div class="flex flex-wrap justify-end items-center">
        <span :class="{ 'opacity-50 text-xs sm:text-base mr-1 sm:mr-4': newinfo.debt }">{{
          info.debt
        }}</span>
        <span v-if="newinfo.debt">{{ newinfo.debt }}</span>
      </div>
    </li>
    <li
      :class="[
        'flex',
        'justify-between',
        'items-center',
        'py-3',
        'border-b',
        'border-gray-200',
        changeloan ? 'opacity-50' : '',
      ]"
    >
      <span>Дата выдачи</span>
      <div class="flex flex-wrap justify-end items-center">
        <span :class="{ 'opacity-50 text-xs sm:text-base mr-1 sm:mr-4': newinfo.issueDate }">{{
          info.issueDate
        }}</span>
        <span v-if="newinfo.issueDate">{{ newinfo.issueDate }}</span>
      </div>
    </li>
    <li
      :class="[
        'flex',
        'justify-between',
        'items-center',
        'py-3',
        expired ? 'text-statusBudge-danger' : '',
      ]"
    >
      <span>Дата возврата</span>
      <div class="flex flex-wrap justify-end items-center">
        <span :class="{ 'opacity-50 text-xs sm:text-base mr-1 sm:mr-4': newinfo.returnDate }">
          {{ info.returnDate }}
        </span>
        <span v-if="newinfo.returnDate">{{ newinfo.returnDate }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
    expired: {
      type: Boolean,
    },
    newinfo: {
      type: Object,
      default() {
        return {};
      },
    },
    changeloan: {
      type: Boolean,
    },
  },
};
</script>

<style>
</style>