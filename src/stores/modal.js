import { defineStore } from "pinia";

export default defineStore("modal", {
  state: () => ({
    isOpen: false,
  }),
  // gettersはcacheする
  // 定義すれば、どこのコンポーネントでも使える
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    },
  },
  actions: {},
});
