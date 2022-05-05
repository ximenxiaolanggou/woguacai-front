const getters = {
  isCollapse: state => state.common.isCollapse,
  routes: state => state.route.routes,
  user: state => state.user.user,
  permissions: state => state.user.permissions,
  tokenName: state => state.user.tokenName,
  tokenValue: state => state.user.tokenValue,
}
export default getters
