import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Doctors from '../views/Doctors.vue'
import Booking from '../views/Booking.vue'
import MyAppointments from '../views/MyAppointments.vue'
import Contact from '../views/contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/doctors', component: Doctors },
  { path: '/booking/:id', component: Booking },
  { path: '/my-appointments', component: MyAppointments },
  { path: '/contact', component: Contact },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
