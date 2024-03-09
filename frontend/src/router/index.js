import { createRouter, createWebHistory } from 'vue-router'
import Startpage from '../views/Startpage.vue'
import Newproject from '../views/Project/Newproject.vue'
import Projectpage from '../views/Project/Projectpage.vue'
import Login from '../views/Profiles/Login.vue'
import Register from '../views/Profiles/Register.vue'
import Profilepage from '../views/Profiles/Profilepage.vue'
import Error from '../views/Error.vue'
import Cookies from 'js-cookie'
import axios from 'axios'

const isLoggedIn = (next) => { 
  if(Cookies.get('isLoggedIn')){
    next()
  }
  else{
    next({
      path: '/login',
      replace: true
    })
  }
} 

const isLoggedOut = (next) => { 
  if(Cookies.get('isLoggedIn')){
    next({
      path: '/',
      replace: true
    })
  }
  else{
    next()
  }
} 



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Startpage
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login,
      beforeEnter(to, from, next){
        isLoggedOut(next)
      }
    },
    {
      path: '/register/',
      name: 'Register',
      component: Register,
      beforeEnter(to, from, next){
        isLoggedOut(next)
      }
    },
    {
      path: '/profile/:user/',
      name: 'Profile',
      component: Profilepage
    },
    {
      path: '/project/:name/',
      name: 'Project',
      component: Projectpage
    },
    {
      path: '/new/',
      name: 'new Project',
      component: Newproject,
      beforeEnter(to, from, next){
        isLoggedIn(next)
      }
    },
    { path: '/:pathMatch(.*)*', name: 'Error', component: Error },
  ]
})

export default router;
