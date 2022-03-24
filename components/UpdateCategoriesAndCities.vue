<template>
  <div>
    <h2 class="font-bold text-xl text-center mb-6">Список городов</h2>
    <div class="md:border md:border-dark-blue md:border-opacity-30 rounded-lg md:p-6 mb-3">
      <Draggable
        v-model="filteredLists"
        ghost-class="ghost"
        handle=".handle"
        @start="dragging = true"
        @end="dragging = false"
      >
        <transition-group name="fade" class="flex flex-col gap-3">
          <div
            v-for="item in list"
            :key="item.id"
            class="
              flex
              items-center
              gap-3
              sm:border-none
              border
              rounded-lg
              border-dark-blue border-opacity-30
              p-2
            "
          >
            <div class="flex items-center gap-1 w-full">
              <Icon name="draggable" classes="w-12 h-12 text-black handle move" />
              <div class="w-full flex flex-col sm:flex-row gap-3">
                <MyInput
                  auto="chrome-off"
                  :value="item.name"
                  @input="(e) => changeItemField(e, item, 'name')"
                />
                <MyInput
                  auto="chrome-off"
                  :value="city ? item.translitName : item.urlName"
                  :maska="{ mask: 'Z*', tokens: { Z: { pattern: /[\da-z_-]/ } } }"
                  @input="(e) => changeItemField(e, item, 'translit_name')"
                />
              </div>
            </div>
            <button
              class="
                flex
                items-center
                justify-center
                border-2 border-bgStep
                text-black
                transform
                scale-100
                transition-all
                hover:scale-110
                p-2
                rounded-lg
                w-10
                h-10
                flex-grow
              "
              @click.stop="() => deleteItem(item)"
            >
              <img class="h-3 w-3" src="~/assets/img/icons/cross.svg" alt="delete" />
            </button>
          </div>
        </transition-group>
      </Draggable>
    </div>
    <div class="flex flex-col items-center justify-center gap-3">
      <div class="flex gap-2 w-full sm:flex-row flex-col">
        <MyInput v-model="new_item_name" auto="chrome-off" placeholder="Название" />
        <MyInput
          v-model="new_item_translit_name"
          :maska="{ mask: 'Z*', tokens: { Z: { pattern: /[\da-z_-]/ } } }"
          placeholder="Название латиницей"
        />
      </div>
      <div class="flex sm:flex-row flex-col gap-3 w-full">
        <Button long kind="purple" @click.native="updateLists">Сохранить</Button>
        <Button long kind="purpleAlternative" @click.native="addItem">Добавить</Button>
      </div>
    </div>
  </div>
</template>

<script>
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cyrillicToTranslit = new CyrillicToTranslit();
export default {
  props: {
    city: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    new_item_name: '',
    new_item_translit_name: '',
  }),
  computed: {
    filteredLists: {
      get() {
        return this.list;
      },
      set(value) {
        if (this.city) {
          this.$store.dispatch('settings/updateAllCities', value);
        } else this.$store.dispatch('settings/updateAllCategories', value);
      },
    },
  },
  watch: {
    new_item_name(newVal) {
      this.new_item_translit_name = cyrillicToTranslit
        .transform(newVal, '-')
        .toLowerCase()
        .replace(/[^\da-z_-]/g, '');
    },
  },
  methods: {
    changeItemField(e, item, field) {
      if (this.city) {
        this.$store.commit('settings/changeCityField', { item, field, value: e, list: 'city' });
      } else
        this.$store.commit('settings/changeCityField', { item, field, value: e, list: 'category' });
    },
    updateLists() {
      if (this.city) {
        this.$store.dispatch('settings/updateCities');
      } else this.$store.dispatch('settings/updateCategories');
    },
    async addItem() {
      if (this.city) {
        await this.$store.dispatch('settings/addCity', {
          name: this.new_item_name,
          translitName: this.new_item_translit_name,
        });
        this.new_item_name = '';
        this.new_item_translit_name = '';
      } else {
        await this.$store.dispatch('settings/addCategory', {
          name: this.new_item_name,
          urlName: this.new_item_translit_name,
        });
        this.new_item_name = '';
        this.new_item_translit_name = '';
      }
    },
    deleteItem(item) {
      const confirmation = confirm(
        'Уверены, что хотите удалить? Все связанные с этим полем элементы также удалятся.',
      );
      if (confirmation) {
        if (this.city) {
          this.$store.dispatch('settings/deleteCity', item.id);
        } else this.$store.dispatch('settings/deleteCategory', item.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
