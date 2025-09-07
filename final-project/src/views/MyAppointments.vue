<!-- filepath: src/views/MyAppointments.vue -->
<template>
  <div class="appointments-page">
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="page-title animate__animated animate__fadeInUp">
        <i class="bi bi-calendar-check-fill"></i>
        My Appointments
      </h1>
      <p class="page-subtitle animate__animated animate__fadeInUp animate__delay-1s">
        Manage your scheduled appointments
      </p>
    </div>

    <!-- Appointments Content -->
    <div class="appointments-content">
      <!-- Stats Cards -->
      <div class="stats-section animate__animated animate__fadeInUp animate__delay-2s">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-calendar-check"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ appointments.length }}</div>
              <div class="stat-label">Total Appointments</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-clock"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ upcomingCount }}</div>
              <div class="stat-label">Upcoming</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ completedCount }}</div>
              <div class="stat-label">Completed</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments List -->
      <div v-if="appointments.length" class="appointments-section">
        <div class="section-header animate__animated animate__fadeInUp animate__delay-3s">
          <h2>Your Appointments</h2>
          <div class="filter-tabs">
            <button 
              v-for="filter in filters" 
              :key="filter.value"
              @click="activeFilter = filter.value"
              :class="['filter-tab', { active: activeFilter === filter.value }]"
            >
              <i :class="filter.icon"></i>
              {{ filter.label }}
            </button>
          </div>
        </div>
        
        <div class="appointments-grid">
          <div 
            v-for="(appointment, index) in filteredAppointments" 
            :key="appointment.id || index" 
            class="appointment-card animate__animated animate__fadeInUp"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="card-header">
              <div class="doctor-info">
                <div class="doctor-avatar">
                  <i class="bi bi-person-circle"></i>
                </div>
                <div class="doctor-details">
                  <h3>{{ appointment.doctor }}</h3>
                  <p class="specialty">{{ appointment.specialty || 'General Medicine' }}</p>
                </div>
              </div>
              <div class="status-badge" :class="getStatusClass(appointment)">
                <i :class="getStatusIcon(appointment)"></i>
                {{ getStatusText(appointment) }}
              </div>
            </div>
            
            <div class="card-body">
              <div class="appointment-details">
                <div class="detail-item">
                  <i class="bi bi-calendar-date"></i>
                  <div>
                    <span class="label">Date</span>
                    <span class="value">{{ formatDate(appointment.date) }}</span>
                  </div>
                </div>
                <div class="detail-item">
                  <i class="bi bi-clock"></i>
                  <div>
                    <span class="label">Time</span>
                    <span class="value">{{ appointment.time }}</span>
                  </div>
                </div>
                <div class="detail-item">
                  <i class="bi bi-geo-alt"></i>
                  <div>
                    <span class="label">Location</span>
                    <span class="value">{{ appointment.location || 'Medical Center' }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card-footer">
              <button 
                @click="cancel(index)" 
                class="cancel-btn"
                :disabled="isPastAppointment(appointment)"
              >
                <i class="bi bi-x-circle"></i>
                Cancel Appointment
              </button>
              <button class="reschedule-btn">
                <i class="bi bi-arrow-clockwise"></i>
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state animate__animated animate__fadeInUp animate__delay-3s">
        <div class="empty-icon">
          <i class="bi bi-calendar-x"></i>
        </div>
        <h2>No Appointments Yet</h2>
        <p>You haven't booked any appointments yet. Start by finding a doctor that suits your needs.</p>
        <router-link to="/doctors" class="btn btn-primary">
          <i class="bi bi-search"></i>
          Find Doctors
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const appointments = ref(JSON.parse(localStorage.getItem('appointments') || '[]'))
const activeFilter = ref('all')

const filters = [
  { value: 'all', label: 'All', icon: 'bi bi-list-ul' },
  { value: 'upcoming', label: 'Upcoming', icon: 'bi bi-clock' },
  { value: 'completed', label: 'Completed', icon: 'bi bi-check-circle' }
]

const upcomingCount = computed(() => {
  return appointments.value.filter(appointment => !isPastAppointment(appointment)).length
})

const completedCount = computed(() => {
  return appointments.value.filter(appointment => isPastAppointment(appointment)).length
})

const filteredAppointments = computed(() => {
  if (activeFilter.value === 'all') {
    return appointments.value
  } else if (activeFilter.value === 'upcoming') {
    return appointments.value.filter(appointment => !isPastAppointment(appointment))
  } else if (activeFilter.value === 'completed') {
    return appointments.value.filter(appointment => isPastAppointment(appointment))
  }
  return appointments.value
})

function isPastAppointment(appointment) {
  const appointmentDate = new Date(appointment.date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return appointmentDate < today
}

function getStatusClass(appointment) {
  if (isPastAppointment(appointment)) {
    return 'status-completed'
  }
  return 'status-upcoming'
}

function getStatusIcon(appointment) {
  if (isPastAppointment(appointment)) {
    return 'bi bi-check-circle-fill'
  }
  return 'bi bi-clock-fill'
}

function getStatusText(appointment) {
  if (isPastAppointment(appointment)) {
    return 'Completed'
  }
  return 'Upcoming'
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

function cancel(index) {
  if (confirm('Are you sure you want to cancel this appointment?')) {
    appointments.value.splice(index, 1)
    localStorage.setItem('appointments', JSON.stringify(appointments.value))
  }
}
</script>

<style scoped>
.appointments-page {
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

.appointments-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.stats-section {
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.05), transparent);
  transition: left 0.5s;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.4);
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.appointments-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #f8fafc;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  background: rgba(30, 41, 59, 0.6);
  border-radius: 12px;
  padding: 0.25rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.filter-tab {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.filter-tab:hover {
  color: #f8fafc;
  background: rgba(56, 189, 248, 0.1);
}

.filter-tab.active {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #0f172a;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
}

.appointments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.appointment-card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.appointment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.05), transparent);
  transition: left 0.5s;
}

.appointment-card:hover::before {
  left: 100%;
}

.appointment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.4);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.doctor-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.doctor-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
}

.doctor-details h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.25rem;
}

.specialty {
  color: #94a3b8;
  font-size: 0.9rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-upcoming {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.status-completed {
  background: rgba(156, 163, 175, 0.1);
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.2);
}

.card-body {
  margin-bottom: 1.5rem;
}

.appointment-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.detail-item i {
  color: #38bdf8;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.detail-item div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item .label {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
}

.detail-item .value {
  font-size: 0.95rem;
  color: #f8fafc;
  font-weight: 500;
}

.card-footer {
  display: flex;
  gap: 0.75rem;
}

.cancel-btn, .reschedule-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
}

.cancel-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.cancel-btn:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}

.cancel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reschedule-btn {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.reschedule-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  transform: translateY(-2px);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 20px;
}

.empty-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #0f172a;
  font-size: 3rem;
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.empty-state h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #94a3b8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .appointments-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-tabs {
    justify-content: center;
  }
  
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .page-title i {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .appointment-card {
    padding: 1rem;
  }
  
  .card-footer {
    flex-direction: column;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .empty-state {
    padding: 2rem 1rem;
  }
  
  .empty-icon {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }
}
</style>
