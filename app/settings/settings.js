import Vue from 'vue'
import store from './store'

import fastclick from 'tool/lib/fastclick'

import App from './App'

fastclick.attach(document.body);

new Vue({
	el: 'body',
	store,
	components: { App }
})