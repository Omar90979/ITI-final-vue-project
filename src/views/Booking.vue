<!-- filepath: src/views/Booking.vue -->
<template>
  <div v-if="doctor" class="booking-page">
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="page-title animate__animated animate__fadeInUp">
        <i class="bi bi-calendar-plus-fill"></i>
        Book Appointment
      </h1>
      <p class="page-subtitle animate__animated animate__fadeInUp animate__delay-1s">
        Schedule your appointment with {{ doctor.name }}
      </p>
    </div>

    <!-- Booking Content -->
    <div class="booking-content">
      <!-- Doctor Info Card -->
      <div class="doctor-info-card animate__animated animate__fadeInUp animate__delay-2s">
        <div class="doctor-header">
          <img :src="doctor.photo" :alt="doctor.name" class="doctor-photo" />
          <div class="doctor-details">
            <h2>{{ doctor.name }}</h2>
            <p class="specialty">{{ doctor.specialty }}</p>
            <p class="location">
              <i class="bi bi-geo-alt-fill"></i>
              {{ doctor.location }}
            </p>
            <div class="rating">
              <div class="stars">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <span>4.9 (127 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Form -->
      <div class="booking-form-container animate__animated animate__fadeInUp animate__delay-3s">
        <div class="form-header">
          <h2>Appointment Details</h2>
          <p>Please fill in your information to confirm the booking</p>
        </div>
        
        <form @submit.prevent="book" class="booking-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name" class="form-label">
                <i class="bi bi-person-fill"></i>
                Full Name
              </label>
              <input 
                id="name"
                v-model="name" 
                type="text"
                placeholder="Enter your full name" 
                class="form-input"
                required 
              />
            </div>
            
            <div class="form-group">
              <label for="phone" class="form-label">
                <i class="bi bi-telephone-fill"></i>
                Phone Number
              </label>
              <input 
                id="phone"
                v-model="phone" 
                type="tel"
                placeholder="Enter your phone number" 
                class="form-input"
                required 
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">
              <i class="bi bi-envelope-fill"></i>
              Email Address
            </label>
            <input 
              id="email"
              v-model="email" 
              type="email"
              placeholder="Enter your email address" 
              class="form-input"
              required 
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="date" class="form-label">
                <i class="bi bi-calendar-date-fill"></i>
                Appointment Date
              </label>
              <input 
                id="date"
                v-model="date" 
                type="date" 
                class="form-input"
                :min="minDate"
                required 
              />
            </div>
            
            <div class="form-group">
              <label for="time" class="form-label">
                <i class="bi bi-clock-fill"></i>
                Time Slot
              </label>
              <select 
                id="time"
                v-model="time" 
                class="form-select"
                required
              >
                <option disabled value="">Select a time slot</option>
                <option v-for="slot in doctor.slots" :key="slot" :value="slot">
                  {{ slot }}
                </option>
              </select>
            </div>
          </div>
          
          <button type="submit" class="book-btn" :disabled="isBooking">
            <i class="bi bi-calendar-check-fill"></i>
            <span v-if="!isBooking">Confirm Booking</span>
            <span v-else>Processing...</span>
          </button>
        </form>
        
        <div v-if="msg" class="success-msg animate__animated animate__fadeInDown">
          <i class="bi bi-check-circle-fill"></i>
          <div>
            <h3>Booking Confirmed!</h3>
            <p>Your appointment has been successfully scheduled.</p>
            <p class="appointment-details">
              <strong>{{ doctor.name }}</strong> - {{ formatDate(date) }} at {{ time }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="error-page">
    <div class="error-content">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <h2>Doctor Not Found</h2>
      <p>The doctor you're looking for doesn't exist.</p>
      <router-link to="/doctors" class="btn btn-primary">
        <i class="bi bi-arrow-left"></i>
        Back to Doctors
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const doctors = [
  {
    id: 1, 
    name: 'Dr. Ahmed Hassan', 
    specialty: 'Dentist', 
    location: 'Cairo Medical Center', 
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face', 
    slots: ['10:00', '12:00', '14:00', '16:00']
  },
  {
    id: 2, 
    name: 'Dr. Sarah Mohamed', 
    specialty: 'Dermatologist', 
    location: 'Giza Health Clinic', 
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face', 
    slots: ['11:00', '13:00', '15:00']
  },
  {
    id: 3, 
    name: 'Dr. Mohamed Ali', 
    specialty: 'Cardiologist', 
    location: 'Alexandria Hospital', 
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face', 
    slots: ['09:00', '15:00', '17:00']
  },
  {
    id: 4, 
    name: 'Dr. Fatma Ibrahim', 
    specialty: 'Pediatrician', 
    location: 'Cairo Children Hospital', 
    photo:'https://randomuser.me/api/portraits/women/44.jpg' , 
    slots: ['08:00', '10:00', '14:00', '16:00']
  },
  {
    id: 5, 
    name: 'Dr. Omar Mohamed', 
    specialty: 'Orthopedist', 
    location: 'Sports Medicine Center', 
    photo: 'https://media.licdn.com/dms/image/v2/D4E03AQFYMIbfankJbQ/profile-displayphoto-scale_400_400/B4EZiu6IDsHIAg-/0/1755281132060?e=1759968000&v=beta&t=YlzYqTw8WqPTp6rMgPGrWRWAWUX4A8l6ovVbtR14YCE', 
    slots: ['09:00', '11:00', '13:00']
  },
  {
    id: 6, 
    name: 'Dr. Nour El-Din', 
    specialty: 'Neurologist', 
    location: 'Neuro Center Cairo', 
    photo: 'https://randomuser.me/api/portraits/women/65.jpg', 
    slots: ['10:00', '12:00', '15:00', '17:00']
  }
]

const doctor = doctors.find(d => d.id == route.params.id)
const name = ref('')
const phone = ref('')
const email = ref('')
const date = ref('')
const time = ref('')
const msg = ref('')
const isBooking = ref(false)

// Set minimum date to today
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

function book() {
  if (name.value && phone.value && email.value && date.value && time.value) {
    isBooking.value = true
    
    // Simulate booking process
    setTimeout(() => {
      const appointment = {
        id: Date.now(),
        doctor: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location,
        date: date.value,
        time: time.value,
        name: name.value,
        phone: phone.value,
        email: email.value,
        status: 'confirmed'
      }
      
      let appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      appointments.push(appointment)
      localStorage.setItem('appointments', JSON.stringify(appointments))
      
      msg.value = 'Booking confirmed!'
      isBooking.value = false
      
      // Redirect to appointments page after 3 seconds
      setTimeout(() => {
        router.push('/my-appointments')
      }, 3000)
    }, 2000)
  }
}
</script>

<style scoped>
.booking-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.page-title i {
  color: #38bdf8;
  font-size: 2.5rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.booking-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.doctor-info-card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.doctor-info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.05), transparent);
  transition: left 0.5s;
}

.doctor-info-card:hover::before {
  left: 100%;
}

.doctor-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.doctor-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #38bdf8;
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.doctor-details h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.specialty {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #0f172a;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
}

.location {
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.stars {
  color: #fbbf24;
  font-size: 1rem;
}

.rating span {
  color: #94a3b8;
  font-size: 0.9rem;
}

.booking-form-container {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.booking-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.05), transparent);
  transition: left 0.5s;
}

.booking-form-container:hover::before {
  left: 100%;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #94a3b8;
  font-size: 1rem;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f8fafc;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-label i {
  color: #38bdf8;
  font-size: 1rem;
}

.form-input, .form-select {
  width: 100%;
  padding: 1rem;
  border: 2px solid rgba(56, 189, 248, 0.2);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.6);
  color: #f8fafc;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
}

.form-input::placeholder {
  color: #64748b;
}

.book-btn {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #0f172a;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
}

.book-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.book-btn:hover::before {
  left: 100%;
}

.book-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.book-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.success-msg {
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideInUp 0.5s ease-out;
}

.success-msg i {
  font-size: 2rem;
  flex-shrink: 0;
}

.success-msg h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.success-msg p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

.appointment-details {
  font-size: 0.85rem !important;
  margin-top: 0.5rem !important;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  text-align: center;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 500px;
}

.error-content i {
  font-size: 4rem;
  color: #ef4444;
  margin-bottom: 1rem;
}

.error-content h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1rem;
}

.error-content p {
  color: #94a3b8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .booking-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .page-title i {
    font-size: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .booking-form-container, .doctor-info-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .booking-form-container, .doctor-info-card {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .doctor-photo {
    width: 100px;
    height: 100px;
  }
}
</style>
