<template>
  <div class="flex w-full justify-center">
    <div class="w-full">
      <div v-swiper:mySwiper="swiperOption" class="swiper" @transitionEnd="transitionEnd">
        <div class="swiper-wrapper">
          <div
            v-for="el in reviewsList"
            :key="el.id"
            class="swiper-slide flex justify-center lg:justify-between z-10"
          >
            <Review :el="el" />
          </div>
        </div>
      </div>
      <div
        v-if="reviewsList.length > 3"
        class="flex items-center mt-10 mx-0 justify-between sm:justify-start sm:mx-16 gap-10"
      >
        <div class="flex gap-6">
          <div
            v-for="(el, index) in circleArr"
            :key="index"
            class="
              flex
              items-center
              rounded-full
              w-2
              h-2
              sm:w-4 sm:h-4
              bg-dark-text bg-opacity-70
              transition-all
              cursor-pointer
            "
            :class="{
              'bg-gradient-to-r from-statusBudge-warning to-yellow-400 w-6 sm:w-12 ':
                index === currentSlide,
            }"
            @click="goSlide(index)"
          ></div>
        </div>
        <div class="flex justify-between sm:justify-start gap-4">
          <Icon
            classes="
                transform
                rotate-180
                w-6
                h-6
                transition-all
                hover:scale-110 hover:-translate-x-1
                cursor-pointer
              "
            name="arrowThin"
            @click.native="mySwiper.slidePrev()"
          />
          <Icon
            classes="
                transform
                w-6
                h-6
                transition-all
                hover:scale-110 hover:translate-x-1
                cursor-pointer
              "
            name="arrowThin"
            @click.native="mySwiper.slideNext()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  data() {
    return {
      width: 0,

      currentSlide: 1,
      swiperOption: {
        initialSlide: 1,
        spaceBetween: 60,

        breakpoints: {
          1305: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          830: {
            slidesPerView: 2,
          },
        },
      },
    };
  },
  async fetch() {
    await this.$store.dispatch('reviews/getAllReviews');
  },

  computed: {
    ...mapFields('reviews', ['reviewsList']),
    // swiper() {
    //   return this.mySwiper.$swiper;
    // },
    circleArr() {
      if (this.width > 1305) {
        return this.reviewsList.length < 3 ? 1 : this.reviewsList.length - 2;
      } else if (this.width > 795) {
        return this.reviewsList.length < 3 ? 1 : this.reviewsList.length - 1;
      } else return this.reviewsList.length < 3 ? 1 : this.reviewsList.length;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    transitionEnd() {
      this.currentSlide = this.mySwiper.activeIndex;
    },
    goSlide(index) {
      this.mySwiper.slideTo(index);
    },
    handleResize() {
      this.width = window.innerWidth;
    },
  },
};
</script>

<style></style>
