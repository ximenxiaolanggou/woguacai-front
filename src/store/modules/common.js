const state = {
  isCollapse: false
}

const mutations = {
  SET_COLLAPSE: (state, isCollapse) => {
    state.isCollapse = isCollapse
  }
}


const actions = {
  updateCollapse({ commit },isCollapse) {
    commit('SET_COLLAPSE',isCollapse)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
