import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import WelcomePage from './components/welcome/welcome.vue'
import EventsPage from './components/dashboard/events.vue'
import NewEventPage from './components/dashboard/newEvent.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '/new', component: NewEventPage },
  {
    path: '/events',
    component: EventsPage,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({mode: 'history', routes})