<template>
  <div>
    <MyInput
      v-model="queryCity"
      placeholder="Начните вводить навзвание города"
      @focus="visibleDaData = true"
      @blur="visibleDaData = false"
    />
    <transition name="accordion">
      <div v-if="filteredCity.length && visibleDaData" class="rounded-lg p-3 bg-white">
        <p class="text-sm mb-3 text-gray-500">Выберите город или продолжите ввод</p>
        <div
          v-for="(el, index) in filteredCity.slice(0, 4)"
          :key="index"
          class="bg-white p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer"
          @mousedown="updateCity(el)"
        >
          {{ el }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
export default {
  data() {
    return {
      queryCity: '',
      filteredCity: '',
      visibleDaData: false,
    };
  },
  computed: {
    ...mapGetters(['getCity']),
    ...mapFields(['city']),
  },
  watch: {
    queryCity(newVal) {
      return this.query(newVal);
    },
  },

  created() {
    this.queryCity = this.getCity;
    this.query = _.debounce((newVal) => {
      this.$api
        .geo()
        .helpCity(JSON.stringify({ query: newVal }))
        .then((res) => {
          const data = res.data.suggestions;
          const filterCity = data.map((el, index) => el.data.city);
          this.filteredCity = [...new Set(filterCity.filter((el) => el !== null))];
        });
    }, 500);
  },
  methods: {
    updateCity(el) {
      this.city = el;
      this.queryCity = el;
      this.$emit('updateCity', el);
    },
  },
};
</script>

<style lang="scss" scoped></style>
