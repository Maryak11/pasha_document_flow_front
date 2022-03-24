<template>
  <ul v-if="totalPagesCount > 1" class="flex my-8 items-center justify-center">
    <li
      v-for="page in paginationRange"
      :key="page + Math.random()"
      class="text-dark-blue text-center text-sm md:text-base"
    >
      <div
        v-if="typeof page === 'number'"
        class="h-9 w-9 md:h-10 md:w-10 rounded-md flex items-center justify-center md:mx-0.5"
        :class="[
          currentPage === page
            ? 'font-bold border border-dark-blue select-none pointer-events-none'
            : 'cursor-pointer hover:bg-gray-100 transition-all',
        ]"
        @click="() => pageSelect(page)"
      >
        {{ page }}
      </div>
      <div
        v-else
        class="
          text-center
          h-9
          md:h-10
          w-3
          md:w-7
          flex
          items-center
          justify-center
          select-none
          pointer-events-none
        "
      >
        ...
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    totalPagesCount: {
      type: Number,
      required: true,
    },
    siblingCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  emits: ['pageChange'],

  computed: {
    paginationRange() {
      const totalPageNumbers = this.siblingCount + 5;
      const dots = '...';
      if (totalPageNumbers >= this.totalPagesCount) {
        return this.range(1, this.totalPagesCount);
      }

      const leftSiblingIdx = Math.max(this.currentPage - this.siblingCount, 1);
      const rightSiblingIdx = Math.min(this.currentPage + this.siblingCount, this.totalPagesCount);
      const shouldShowLeftDots = leftSiblingIdx > 1;
      const shouldShowRightDots = rightSiblingIdx < this.totalPagesCount - 1;
      const firstPageIdx = 1;
      const lastPageIdx = this.totalPagesCount;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 2 + 2 * this.siblingCount;
        const leftRange = this.range(1, leftItemCount);

        return [...leftRange, dots, this.totalPagesCount];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 2 + 2 * this.siblingCount;
        const rightRange = this.range(
          this.totalPagesCount - rightItemCount + 1,
          this.totalPagesCount,
        );
        return [firstPageIdx, dots, ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = this.range(leftSiblingIdx, rightSiblingIdx);
        return [firstPageIdx, dots, ...middleRange, dots, lastPageIdx];
      }
      return [];
    },
  },

  methods: {
    pageSelect(page) {
      this.$emit('pageChange', page);
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    },
    range(start, end) {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => start + idx);
    },
  },
};
</script>

<style scoped>
</style>