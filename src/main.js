import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const routes = [{ path: '/', component: HomeView }]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// createApp(App).use(router).mount('#app')

const app = createApp(App).use(router)

app.use(Toast)

app.mount('#app')