<template>
  <div
    class="flex justify-center items-center gap-6 opacity-50 transition-opacity"
    :class="{ 'opacity-100 ': current }"
  >
    <div
      class="flex justify-center items-center rounded-full img"
      :class="{ 'bg-dark-blue': current, 'bg-bgStep': !current }"
    >
      <img
        :src="require(`@/assets/img/icons/${logo}.svg`)"
        :class="{ filter: current }"
        alt="step"
      />
    </div>
    <div class="flex flex-col">
      <div class="font-semibold xl:text-lg text-sm" :class="{ 'text-lg': mobile }">
        {{ stepnumber }}
      </div>
      <div class="font-light xl:text-base text-xs" :class="{ 'text-base': mobile }">
        {{ labelstep }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepnumber: {
      type: String,
      required: true,
    },
    labelstep: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: 'profile',
    },
    current: {
      type: Boolean,
      required: false,
    },
    mobile: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>
.img {
  width: 50px;
  height: 50px;
}
img {
  width: 30px;
  height: 30px;
}
.filter {
  filter: brightness(0) invert(1);
}
</style>
