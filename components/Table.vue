<template>
  <div>
    <div class="text-sm">
      <div>
        <table class="table-fixed w-full">
          <thead class="bg-tableHead">
            <tr class="">
              <td
                v-for="col in columns"
                :key="col.id"
                class="py-3 font-bold last:rounded-r-8 first:rounded-l-8"
                :class="{
                  'tdLastChild text-left  px-16': small,
                  'text-center': small === false,
                }"
              >
                {{ col.label }}
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="h-96 mt-1" :class="{ 'scroll overflow-x-auto': !users }">
        <table class="w-full table-fixed">
          <tbody class="">
            <tr
              v-for="dat in data"
              :key="dat.id"
              class="group border-b text-center last:border-b-0"
            >
              <td
                v-for="(el, index) in newArr"
                :key="index"
                class="py-6 transition-all"
                :class="{
                  'opacity-50':
                    ((index === 1 || index === 2) && small === false) ||
                    dat[el] === 'Заявка отклонена',
                  'font-bold': index === 0,
                  'px-16 last:text-right last:pr-10 text-left': small,
                  'cursor-pointer group-hover:opacity-25': index === 0,
                }"
                @click="openDogovor(index, dat[el])"
              >
                {{ dat[el] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
    users: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      newArr: [],
    };
  },

  mounted() {
    this.newArr = this.columns.map((el) => el.field);
  },

  methods: {
    openDogovor(index, el) {
      if (index === 0) {
        this.$emit('openDogovor', el);
      }
    },
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
  overflow-y: overlay;
  scrollbar-color: #e4d7fb transparent;
  scrollbar-width: 6px;
}
.scroll::-webkit-scrollbar {
  width: 6px;
}
.scroll::-webkit-scrollbar-track {
  border-radius: 3px;
}
.scroll::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-image: linear-gradient(
    90deg,
    rgba(43, 61, 255, 0.2) -66.25%,
    rgba(255, 64, 154, 0.2) 166.25%
  );
}
</style>
