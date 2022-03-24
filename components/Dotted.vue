<template>
  <div ref="notif" class="relative" @click="openQuestion = !openQuestion">
    <span
      class="bg-dashed black bg-bottom bg-repeat-x bg-bgDashed text-dark-blue cursor-pointer"
      :class="[
        gray ? 'opacity-50 hover:opacity-100 font-bold' : 'hover:bg-dashedBlack',
        `text-${textsize}`,
      ]"
    >
      {{ value }}
    </span>
    <transition name="answer">
      <div
        v-if="openQuestion && question"
        class="absolute top-12 bg-reviewsBg p-6 rounded-xl question"
      >
        <p>
          В случае непредвиденных ситуаций «Деньги На Дом» готов продлить срок возврата денег до
          60-ти дней!
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    gray: {
      type: Boolean,
      required: false,
      default: false,
    },
    question: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    textsize: {
      type: String,
      default: 'base',
    },
  },
  data() {
    return {
      openQuestion: false,
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
        this.openQuestion = false;
      }
    },
  },
};
</script>
<style scoped>
.black:hover {
  background-image: 'linear-gradient(to right, rgb(0, 0, 0) 80%, rgba(255, 255, 255, 0) 30%)';
}
.question::before {
  content: '';
  position: absolute;
  top: -10px;
  transform: rotate(45deg);
  width: 20px;
  height: 20px;
  background-color: #fafafa;
  z-index: 50;
}
.answer-enter-active,
.answer-leave-active {
  transition: opacity 0.5s;
}
.answer-enter,
.answer-leave-to {
  opacity: 0;
}
</style>
