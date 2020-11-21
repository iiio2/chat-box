<template>
    <div class="mt-5">
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" name="name" v-model="name" />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="email" v-model="email" />
                <p class="text-danger">{{ duplicateEmail }}</p>
                <p class="text-danger">{{ invalidEmail }}</p>
            </div>


            <div class="form-group">
                <label for="password">password</label>
                <input type="password" class="form-control" name="password" v-model="password" />
                <p class="text-danger">{{ weakPassword }}</p>
            </div>
            <input type="submit" class="btn btn-success" value="Register" />
        </form>
    </div>
</template>


<script>

import { auth } from '../firebase'; 

export default {
   name:'Register',
   data(){
       return {
           name:'', 
           email:'',
           password:'',
           duplicateEmail:'', 
           invalidEmail:'',
           weakPassword:'', 
       }
   },
   methods:{
       register(){
           if(this.name.trim().length == 0){
               return; 
           }
           auth.createUserWithEmailAndPassword(this.email,this.password)
           .then(user=>{
               user.user.updateProfile({
                   displayName : this.name
               }) 
               //console.log(user.user); 

               this.$router.replace('/login'); 
           })
           .catch(error=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            if(error.code == 'auth/email-already-in-use'){
                this.duplicateEmail = errorMessage; 
            }
            if(errorCode == 'auth/invalid-email'){
                this.invalidEmail = errorMessage; 
            }
            if(errorCode == 'auth/weak-password'){
                this.weakPassword = errorMessage; 
            }
           })
       }
   }

}
</script>


<style scoped>

</style>