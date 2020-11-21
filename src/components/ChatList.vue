<template>
    <div class="mt-5">
        <User #user="{ user }" >
            <div v-if="user">
                <div class="card pt-5 pb-2">
                    <div class="card-body" v-chat-scroll>
                        <ul :key="message.id" v-for="message in messages">
                            <li>
                        <span><strong> {{ message.name }}</strong> </span>
                        <span>{{ message.message }}</span>
                        <span>{{ message.time }}</span>
                            
                            </li>
                        </ul>
                        
                    </div>
                    <form @submit.prevent="addChat" autocomplete="off">
                            <div class="form-group">
                                <input type="text" class="form-control" name="name" v-model="message" />
                            </div>
                        </form>
                </div>
            </div>

            <div v-else>
                <p>Loading...</p>
            </div>
        </User>
    </div>
</template>


<script>

import User from './User.vue'; 
import { auth } from '../firebase'; 
import { db } from "../firebase"; 
import moment from 'moment'; 

export default {
    name:'Chats', 
    data(){
        return{
            message:'', 
            messages:[], 
        }
    },
    components:{
        User, 
    }, 
    methods:{
        addChat(){
            if(this.message.trim().length == 0){
                return; 
            }
            db.collection('chats').add({
                message:this.message, 
                owner: auth.currentUser.uid,
                time:Date.now(),  
                name:auth.currentUser.displayName, 
            })
            this.message = '';  
        }, 
    
    }, 
    created(){
        db.collection('chats').orderBy('time').onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type == 'added'){
                    this.messages.push({
                        message:change.doc.data().message, 
                        time:moment(change.doc.data().time).format('lll'), 
                        id:change.doc.id, 
                        name:change.doc.data().name, 
                    })
                    console.log(this.messages); 
                }
            })
        })
    }
}
</script>


<style scoped>
    .card{
        background:#dcdde1; 
        width:70%;
        margin:auto; 
    }
    .card-body{
        height: 400px;
        overflow: auto;
    }
    ul {
        list-style: none;
    }
    span{
        display: block;
    }
    li{
        background: #dff9fb;
        border-radius: 10px;
        padding-left: 10px;
    }
    form {
        width:80%; 
        margin:auto
    }
</style>