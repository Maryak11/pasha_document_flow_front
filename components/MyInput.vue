<template>
  <div class="flex flex-col sm:flex-row w-full justify-between sm:items-center">
    <label v-if="label" :for="id" class="text-base font-semibold mb-1">{{ label }}</label>
    <div
      class="cursor-text flex rounded-lg relative border border-gray-400 focus-within:border-dark-blue gap-2 justify-between text-sm w-full transition-all"
      :class="{
        'bg-gray-200': disabled,
        'bg-white': !disabled,
        'sm:max-w-215': label,
      }"
    >
      <input
        :id="id"
        v-maska="maska"
        :name="name"
        :value="value"
        :type="dataType"
        :disabled="disabled"
        :autocomplete="auto"
        :class="{ 'uppercase px-5 py-3': promocode }"
        class="outline-none w-full rounded-lg px-4 py-inputPad"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
      <img
        v-if="type === 'password'"
        alt="passwordEye"
        class="cursor-pointer absolute right-3.5 top-3.5"
        :src="require(`@/assets/img/icons/${logo}.svg`)"
        @click="toggleInputType"
      />
      <img
        v-if="price"
        alt="ruble"
        class="cursor-pointer absolute right-3.5 top-4"
        :src="require(`@/assets/img/icons/rub.svg`)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    promocode: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    price: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    maska: {
      type: [String, Object],
      required: false,
      default: '',
    },
    auto: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      dataType: '',
      logo: 'eye',
    };
  },

  mounted() {
    this.dataType = this.type;
  },

  methods: {
    toggleInputType() {
      this.dataType === 'password' ? (this.dataType = 'text') : (this.dataType = 'password');
      this.logo === 'eye' ? (this.logo = 'eyeClose') : (this.logo = 'eye');
    },
  },
};
</script>

<style scoped>
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #fcfcfc inset !important;
  -webkit-box-shadow: 0 0 0px 1000px #fcfcfc inset !important;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
input[type='date'] {
  -webkit-appearance: none;
  background-color: transparent;
}
</style>
