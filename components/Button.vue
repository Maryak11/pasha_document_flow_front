<template>
  <button :class="classes" :disabled="disabled" :type="type">
    <Icon v-if="icon && !iconright" classes="mr-3 w-5 h-4" :name="icon" />
    <slot />
    <Icon v-if="icon && iconright" classes="ml-3 w-5 h-4" :name="icon" />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
    },
    kind: {
      type: String,
      required: true,
    },
    bg: {
      type: String,
      default: 'white',
    },
    long: {
      type: Boolean,
    },
    textlg: {
      type: Boolean,
    },
    icon: {
      type: String,
      default: '',
    },
    iconright: {
      type: Boolean,
    },
    center: {
      type: Boolean,
    },
  },

  data() {
    return {
      classes: [
        'flex',
        'justify-center',
        'items-center',
        'rounded-lg',
        'font-bold',
        'p-3',
        'transition-all',
        'focus:transition-all', // ?????
        'disabled:opacity-50',
        'disabled:shadow-none',
        'disabled:cursor-not-allowed',
        this.kind === 'primary'
          ? [
              'primary',
              'text-black',
              'focus:ring-1',
              'focus:ring-dark-blue',
              'hover:shadow-button-inset-md',
            ]
          : [],
        this.kind === 'purple'
          ? [
              'purple_gradient',
              'text-white',
              'focus:ring-1',
              'focus:ring-dark-blue',
              'hover:shadow-button-inset-md',
            ]
          : [],
        this.kind === 'light'
          ? [
              'bg-transparent',
              'text-black',
              'ring-1',
              'ring-black',
              'lg:ring-black',
              'hover:bg-white',
              'hover:text-dark-blue',
              'focus:ring-1',
              'active:shadow-button-inset-md',
              'disabled:text-dark-blue',
              'disabled:bg-transparent',
            ]
          : [],
        this.kind === 'alternative'
          ? [
              'alternative',
              `bg-${this.bg}`,
              'text-dark-blue',
              'disabled:opacity-100',
              'disabled:text-dark-blue',
              'disabled:text-opacity-50',
              this.disabled ? `hover:bg-${this.bg}` : '',
            ]
          : [],
        this.kind === 'purpleAlternative'
          ? [
              'purpleAlternative',
              `bg-${this.bg}`,
              'text-dark-blue',
              'disabled:opacity-100',
              'disabled:text-dark-blue',
              'disabled:text-opacity-50',
              this.disabled ? `hover:bg-${this.bg}` : '',
            ]
          : [],
        this.kind === 'gosuslugi'
          ? [
              'text-dark-blue',
              'bg-custom-gray',
              'bg-opacity-20',
              'hover:bg-opacity-50',
              'active:shadow-button-inset',
              'active:bg-opacity-50',
              'focus:ring',
              'focus:ring-custom-gray',
              'disabled:opacity-20',
              'disabled:bg-opacity-20',
            ]
          : [],
        this.long ? ['w-full'] : ['px-8', 'w-full', 'md:w-auto'],
        this.textlg ? ['text-lg'] : ['text-sm'],
        this.center ? ['mx-auto'] : [],
      ],
    };
  },
};
</script>

<style scoped>
.primary {
  background-image: linear-gradient(to right, #ffdd2d, #ffdd2d);
}
.purple_gradient {
  background-image: linear-gradient(to right, #2b3dff, #ff409a);
}
.alternative {
  position: relative;
  border: 1px solid gray;
  background-clip: padding-box;
  transform-style: preserve-3d;
  padding-top: calc(0.75rem - 1px) !important;
  padding-bottom: calc(0.75rem - 1px) !important;
}
.alternative:hover:enabled {
  color: black;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.15s;
}
.alternative:before {
  background-image: linear-gradient(to right, #ffdd2d, #ffdd2d);
  background-size: cover;
  position: absolute;
  border-radius: inherit;
  transform: translateZ(-1px);
  content: '';
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
}
.alternative:active:before {
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.2);
}
.alternative:focus:not(:active):not(:hover):before {
  color: inherit;
  background-image: none;
  background-color: currentColor;
  transition: all 0.15s;
}
.alternative:disabled:before {
  opacity: 0.5;
}
.alternative:disabled img {
  opacity: 0.5;
}

.purpleAlternative {
  position: relative;
  border: 1px solid transparent;
  background-clip: padding-box;
  transform-style: preserve-3d;
  padding-top: calc(0.75rem - 1px) !important;
  padding-bottom: calc(0.75rem - 1px) !important;
}
.purpleAlternative:hover:enabled {
  color: white;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.15s;
}
.purpleAlternative:before {
  background-image: linear-gradient(to right, #2b3dff, #ff409a);
  background-size: cover;
  position: absolute;
  border-radius: inherit;
  transform: translateZ(-1px);
  content: '';
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
}
.purpleAlternative:active:before {
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3); /* ??? */
}
.purpleAlternative:focus:not(:active):not(:hover):before {
  color: inherit;
  background-image: none;
  background-color: currentColor;
  transition: all 0.15s;
}
.purpleAlternative:disabled:before {
  opacity: 0.5;
}
.purpleAlternative:disabled img {
  opacity: 0.5;
}
</style>
