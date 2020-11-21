import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api';
import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueCompositionAPI); 
Vue.use(VueChatScroll);

import {router} from './router';

new Vue({
  el: '#app',
  router, 
  render: h => h(App)
})
