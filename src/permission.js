import router from './router'
import store from './store'
import Cookies from "js-cookie";
import {TOKEN_NAME, TOKEN_VALUE} from "@/utils/const";
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar styles

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  let tokenName = Cookies.get(TOKEN_NAME);
  let tokenValue = Cookies.get(TOKEN_VALUE);
  if (tokenName) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/home' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasPermissions = store.getters.user.permissions && store.getters.user.permissions
      if (hasPermissions) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const permissions = await store.dispatch('user/userInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('route/generateRoutes',  permissions)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

store.dispatch('route/generateRoutes')

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
