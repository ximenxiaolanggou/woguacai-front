import {userInfo} from "@/api/auth";
import {TOKEN_VALUE,TOKEN_NAME} from "@/utils/const";
import Cookies from "js-cookie";

const state = {
  user: {},
  permissions: [],
  tokenName: undefined,
  tokenValue: undefined
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },

  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },

  SET_TOKEN_NAME: (state, tokenName) => {
    state.tokenName = tokenName
  },

  SET_TOKEN_VALUE: (state, tokenValue) => {
    state.tokenValue = tokenValue
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROUTES', constantRoutes)
      resolve(constantRoutes)
    })
  },

  userInfo({ commit }) {
    return new Promise((resolve, reject) => {
      userInfo()
          .then(res => {
            let data = res.data;
            commit('SET_USER', data);
            commit('SET_PERMISSIONS', data.permissions);
            resolve(data.permissions);
          }).catch(err => {
            reject(err);
      })
    })
  },

  resetToken({ commit }) {
    Cookies.remove(TOKEN_NAME)
    Cookies.remove(TOKEN_VALUE)
    commit('SET_USER', {});
    commit('SET_PERMISSIONS', []);
    commit('SET_TOKEN_NAME', undefined);
    commit('SET_TOKEN_VALUE', undefined);
  },

  setUser({commit}, user) {
    commit('SET_USER', user)
  },

  setPermissions({commit}, permissions) {
    commit('SET_PERMISSIONS', permissions)
  },

  setTokenName({commit}, tokenName) {
    commit('SET_TOKEN_NAME', tokenName)
  },

  setTokenValue({commit}, tokenValue){
    commit('SET_TOKEN_VALUE', tokenValue)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
