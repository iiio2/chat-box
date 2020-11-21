<template>
    <div>
        <slot name="user" :user=user></slot>
    </div>
</template>


<script>
import { auth } from '../firebase';
import { ref } from '@vue/composition-api'; 

export default {
    setup(){
        var user = ref(null); 
        var unsubscribe = auth.onAuthStateChanged(firebaseUser => user.value = firebaseUser); 

        return {
            user, 
            unsubscribe, 
        }
    }, 
    destroyed(){
        this.unsubscribe;  
    }
}
</script>


<style scoped>

</style>