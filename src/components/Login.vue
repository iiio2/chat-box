<template>
    <div class="mt-5">
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="email" v-model="email" />
                <p class="text-danger">{{ invalidEmail }}</p>
                <p class="text-danger">{{ invalidUser }}</p>
            </div>

            <div class="form-group">
                <label for="password">password</label>
                <input type="password" class="form-control" name="password" v-model="password" />
                <p class="text-danger">{{ weakPassword }}</p>
            </div>

            <input type="submit" class="btn btn-success" value="Login" />
        </form>
    </div>
</template>


<script>

import { auth } from '../firebase'; 

export default {
    name:'Login',
    data(){
        return {
            email:'',
            password:'', 
            invalidEmail:'', 
            invalidUser:'', 
            weakPassword:'', 
        }
    },
    methods:{
        login(){
            auth.signInWithEmailAndPassword(this.email, this.password)
            .then(user=>{ 
                user.user.getIdToken()
                .then(token=>{
                    var idToken = localStorage.setItem('idToken',token); 
                    window.location.href = '/chats'; 
                })
            })
            .catch(error=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                if(errorCode == 'auth/invalid-email'){
                    this.invalidEmail = errorMessage; 
                }
                if(errorCode == 'auth/user-not-found'){
                    this.invalidUser = errorMessage; 
                }
                if(errorCode == 'auth/wrong-password'){
                    this.weakPassword = errorMessage; 
                }
            })
        }
    }
    
}
</script>


<style scoped>

</style>