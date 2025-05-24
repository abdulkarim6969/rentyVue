import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/main.css'


// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faEnvelope, faShoppingCart, faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faEnvelope, faShoppingCart, faUser, faRightToBracket)

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
