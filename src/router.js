import Vue from 'vue';
import VueRouter from 'vue-router'; 
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import ChatList from './components/ChatList.vue'; 

import { auth } from "./firebase"; 

var token = localStorage.getItem('idToken'); 


Vue.use(VueRouter); 

export const router = new VueRouter({
    mode:'history',
    routes:[
        {path:'/', component:Home, name:'Home'}, 
        {path:'/register', component:Register, name:'Register',
        beforeEnter:(to,from,next)=>{
          if(token == null){
            next();
          }else{
            next('/chats'); 
          }
        }
       }, 
        {path:'/login', component:Login, name:'Login', 
        beforeEnter:(to,from,next)=>{
          if(token == null){
            next();
          }else{
            next('/chats'); 
          }
        }
      },  
        {path:'/chats', component:ChatList, name:'Chats',  meta: { requiresAuth: true }}, 
    ]
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!token) {
        next("/login");
      } else {
        next();
      }
    } else {
      next() // make sure to always call next()!
    }
  })

