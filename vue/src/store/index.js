import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: false
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },

  actions: {
    setToken({ commit }, token) {
      commit("SET_TOKEN", token && token.trim() ? token.trim() : false);
    }
  }
});
