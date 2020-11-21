<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">

  <div class="collapse navbar-collapse container" id="navbarNav">
    <ul class="navbar-nav">
      <router-link to="/" tag="li" class="nav-item">
            <a class="nav-link">Home</a>
      </router-link>
      <router-link v-if="token == null" to="/register" tag="li" class="nav-item">
            <a class="nav-link">Register</a>
      </router-link>
      <router-link v-if="token == null" to="/login" tag="li" class="nav-item">
            <a class="nav-link">Login</a>
      </router-link>
      <router-link v-if="token" to="/chats" tag="li" class="nav-item">
            <a class="nav-link">Chats</a>
      </router-link>
      <li v-if="token" class="nav-item signout" @click="signOut">
        <p class="nav-link">Logout</p>
      </li>
    </ul>
  
  </div>
</nav>
</template>

<script>

import { auth } from '../firebase'; 

var token = localStorage.getItem('idToken'); 

export default {
    data(){
      return {
         token, 
      }
    }, 
    methods:{
      signOut(){
          auth.signOut()
          .then(user=>{
            localStorage.removeItem('idToken'); 
            window.location.href = '/login'; 
          })
      }
    }
}
</script>


<style scoped>
  .signout{
    cursor: pointer;
  }
</style>