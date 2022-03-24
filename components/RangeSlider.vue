<template>
  <div class="relative wrapper flex justify-center items-center" :style="cssVars">
    <div class="track rounded-sm">
      <div v-if="!noticks" class="ticks">
        <div
          v-for="tick in ticks"
          :key="tick"
          :style="{ left: `calc(${(100 / ((max - min) / step)) * (tick - 1)}% - 1px)` }"
          class="tick"
        ></div>
      </div>
    </div>
    <input
      ref="range"
      type="range"
      name="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('change', +$event.target.value)"
    />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    modelValue: {
      type: [Number],
      default: 0,
    },
    min: {
      type: [Number, String],
      required: true,
    },
    max: {
      type: [Number, String],
      required: true,
    },
    step: {
      type: [Number, String],
      required: true,
    },
    noticks: {
      type: Boolean,
    },
  },

  emits: ['change'],

  data() {
    return {
      cssVars: {
        '--bgSize': 0,
        '--leftBgPosition': 0,
      },
    };
  },

  computed: {
    ticks() {
      return (this.max - this.min) / this.step + 1;
    },
  },

  mounted() {
    this.getBgProps();
    window.addEventListener('resize', this.getBgProps);
    window.addEventListener('orientationchange', this.getBgProps);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getBgProps);
    window.removeEventListener('orientationchange', this.getBgProps);
  },

  methods: {
    getBgProps() {
      const rect = this.$refs.range.getBoundingClientRect();
      this.cssVars['--leftBgPosition'] = rect.left - 10 + 'px';
      this.cssVars['--bgSize'] = rect.width + 20 + 'px';
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 15px 0;
  z-index: 0;
}
.track {
  position: absolute;
  height: 3px;
  width: 100%;
  background-image: linear-gradient(to right, #ffdd2d, #dfba03);
  top: 15px;
  left: 0;
  border-radius: 2px;
}
.ticks {
  width: calc(100% - 27px);
  position: relative;
  margin-left: 13.5px;
}
.tick {
  position: absolute;
  background-image: linear-gradient(to right, #ffdd2d, #ffdd2d);
  background-attachment: fixed;
  background-size: var(--bgSize);
  background-position: var(--leftBgPosition);
  background-repeat: no-repeat;
  width: 2px;
  height: 17px;
  border-radius: 1px;
  top: -7px;
}
input[type='range'] {
  -webkit-appearance: none;
  display: block;
  position: absolute;
  width: 100%;
  margin: 0 auto;
  height: 3px;
  background: none;
  outline: none;
  -webkit-transition: 0.2s;
  transition: all 0.2s;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid gray;
  cursor: pointer;
  /* background-image: linear-gradient(to right, #ffdd2d, #ffdd2d); */
  background-color: white;
  background-attachment: fixed;
  background-size: var(--bgSize);
  background-position: var(--leftBgPosition);
  background-repeat: no-repeat;
  opacity: 0.9;
  box-sizing: border-box;
}
input[type='range']::-moz-range-thumb {
  appearance: none;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  background-image: linear-gradient(to right, #ffdd2d, #ffdd2d);
  background-attachment: fixed;
  background-size: var(--bgSize);
  background-position: var(--leftBgPosition);
  background-clip: border-box;
  opacity: 0.9;
  box-sizing: border-box;
}
</style>
