import {constantRoutes, asyncRoutes} from "@/router";

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routers) => {
    state.routes = routers
  }
}


const actions = {
  generateRoutes({ commit, rootState }) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, rootState.user.permissions);
      console.log(accessedRoutes)
      let routers = [...constantRoutes, ...accessedRoutes];
      commit('SET_ROUTES', routers)
      resolve(routers)
    })
  }
}

export function filterAsyncRoutes(routes, permissions) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  function hasPermission(permissions, route) {
    if (route.meta && route.meta.permissions) {
      return permissions.some(permission => route.meta.permissions.includes(permission))
    } else {
      return true
    }
  }

  return res
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
