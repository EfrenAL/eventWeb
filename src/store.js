import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

import router from './router'

Vue.use(Vuex)

var TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDE5dmsybjNvLzVnQkI2YzljaGxRNTBQYkxIMHczMHZTRGc4M3ZBb0h6T3Ftc1dEdzlKS05SV1ZNZGNud0pJVzBNcVBGaDFMSWg0R0tnPT0iLCJpYXQiOjE1MzQ5MjI3MTd9.zE3NKZQD3z8oYqsAfS_Rm-ywzNhQMQasjfkYvO1kkNU';

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    events: []
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    storeEvents (state, events) {
      state.events = events
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup ({commit, dispatch}, authData) {
      axios.post('/user', {
        name: authData.name,
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    newEvent ({commit, dispatch}, newEvent) {

      console.log('New event method')
      console.log(newEvent)

      axios.post('/event', {
        name: newEvent.name,
        description: newEvent.description,
        //picture: event.picture,
        postcode: newEvent.postcode,
        street: newEvent.street,      
        city: newEvent.city,
        country: newEvent.country
      })
        .then(res => {
          console.log(res)
          alert('Event inserted succesfully!')
        })
        .catch(error => console.log(error))
    },
    login ({commit, dispatch}, authData) {
      axios.post('/user/login', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)

          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          //localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('token', TOKEN)
          localStorage.setItem('userId', res.data.email)
          //localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: TOKEN,
            userId: res.data.email
          })
          //dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    },
    storeUser ({commit, state}, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchEvents ({commit, state}) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/event/all')
        .then(res => {
          console.log(res)
          const data = res.data
          const events = []
          for (let key in data) {
            const event = data[key]
            event.id = key
            events.push(event)
          }
          console.log(events)
          commit('storeEvents', events)
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    events (state) {
      return state.events
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})