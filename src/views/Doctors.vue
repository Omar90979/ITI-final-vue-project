<!-- filepath: src/views/Doctors.vue -->
<template>
  <div class="doctors-page">
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="page-title animate__animated animate__fadeInUp">
        <i class="bi bi-people-fill"></i>
        Our Expert Doctors
      </h1>
      <p class="page-subtitle animate__animated animate__fadeInUp animate__delay-1s">
        Find and book appointments with qualified healthcare professionals
      </p>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-section animate__animated animate__fadeInUp animate__delay-2s">
      <div class="search-container">
        <div class="search-input-group">
          <i class="bi bi-search search-icon"></i>
          <input 
            v-model="search" 
            type="text"
            placeholder="Search by doctor name or specialty..." 
            class="search-input"
          />
        </div>
        <div class="filter-group">
          <i class="bi bi-funnel filter-icon"></i>
          <select v-model="filter" class="filter-select">
            <option value="">All Specialties</option>
            <option v-for="s in specialties" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div class="results-info animate__animated animate__fadeInUp animate__delay-3s">
      <p v-if="filteredDoctors.length > 0">
        <i class="bi bi-info-circle"></i>
        Showing {{ filteredDoctors.length }} doctor{{ filteredDoctors.length !== 1 ? 's' : '' }}
        <span v-if="search || filter">for your search</span>
      </p>
      <p v-else class="no-results">
        <i class="bi bi-exclamation-triangle"></i>
        No doctors found matching your criteria
      </p>
    </div>

    <!-- Doctors Grid -->
    <div class="doctors-grid">
      <div 
        v-for="(doc, index) in filteredDoctors" 
        :key="doc.id" 
        class="doctor-card animate__animated animate__fadeInUp"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="card-header">
          <div class="doctor-image-container">
            <img :src="doc.photo" :alt="doc.name" class="doctor-img" />
            <div class="status-indicator">
              <i class="bi bi-circle-fill"></i>
              <span>Available</span>
            </div>
          </div>
          <div class="specialty-badge">
            <i :class="getSpecialtyIcon(doc.specialty)"></i>
            {{ doc.specialty }}
          </div>
        </div>
        
        <div class="card-body">
          <h3 class="doctor-name">{{ doc.name }}</h3>
          <p class="doctor-location">
            <i class="bi bi-geo-alt-fill"></i>
            {{ doc.location }}
          </p>
          <div class="rating">
            <div class="stars">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <span class="rating-text">4.9 (127 reviews)</span>
          </div>
          <div class="available-slots">
            <p class="slots-label">Available Today:</p>
            <div class="slots-list">
              <span v-for="slot in doc.slots.slice(0, 3)" :key="slot" class="slot-badge">
                {{ slot }}
              </span>
              <span v-if="doc.slots.length > 3" class="more-slots">
                +{{ doc.slots.length - 3 }} more
              </span>
            </div>
          </div>
        </div>
        
        <div class="card-footer">
          <router-link :to="`/booking/${doc.id}`" class="book-btn">
            <i class="bi bi-calendar-plus"></i>
            Book Appointment
          </router-link>
          <button class="view-profile-btn">
            <i class="bi bi-person-lines-fill"></i>
            View Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const doctors = ref([
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
    name: 'Dr. Nour Mahmoud', 
    specialty: 'Neurologist', 
    location: 'Neuro Center Cairo', 
    photo: 'https://randomuser.me/api/portraits/women/65.jpg', 
    slots: ['10:00', '12:00', '15:00', '17:00']
  }
])

const specialties = [...new Set(doctors.value.map(d => d.specialty))]
const search = ref('')
const filter = ref('')

const filteredDoctors = computed(() => {
  return doctors.value.filter(doc =>
    (doc.name.toLowerCase().includes(search.value.toLowerCase()) || 
     doc.specialty.toLowerCase().includes(search.value.toLowerCase())) &&
    (filter.value === '' || doc.specialty === filter.value)
  )
})

const getSpecialtyIcon = (specialty) => {
  const icons = {
    'Dentist': 'bi bi-tooth',
    'Dermatologist': 'bi bi-droplet',
    'Cardiologist': 'bi bi-heart-pulse',
    'Pediatrician': 'bi bi-people',
    'Orthopedist': 'bi bi-bone',
    'Neurologist': 'bi bi-cpu'
  }
  return icons[specialty] || 'bi bi-person-badge'
}
</script>

<style scoped>
.doctors-page {
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

.search-section {
  margin-bottom: 2rem;
}

.search-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
}

.search-input-group {
  flex: 2;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 1.1rem;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(56, 189, 248, 0.2);
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.6);
  color: #f8fafc;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
}

.search-input::placeholder {
  color: #64748b;
}

.filter-group {
  flex: 1;
  position: relative;
}

.filter-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 1.1rem;
  z-index: 1;
}

.filter-select {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(56, 189, 248, 0.2);
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.6);
  color: #f8fafc;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
}

.results-info {
  text-align: center;
  margin-bottom: 2rem;
  color: #94a3b8;
}

.results-info i {
  color: #38bdf8;
  margin-right: 0.5rem;
}

.no-results {
  color: #f87171;
}

.doctors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.doctor-card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.doctor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.05), transparent);
  transition: left 0.5s;
}

.doctor-card:hover::before {
  left: 100%;
}

.doctor-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.4);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.doctor-image-container {
  position: relative;
}

.doctor-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #38bdf8;
  transition: transform 0.3s;
}

.doctor-card:hover .doctor-img {
  transform: scale(1.1);
}

.status-indicator {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: #10b981;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 2px solid rgba(30, 41, 59, 0.6);
}

.status-indicator i {
  font-size: 0.5rem;
}

.specialty-badge {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #0f172a;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-body {
  margin-bottom: 1.5rem;
}

.doctor-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.doctor-location {
  color: #94a3b8;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  color: #fbbf24;
  font-size: 0.9rem;
}

.rating-text {
  color: #94a3b8;
  font-size: 0.9rem;
}

.available-slots {
  margin-bottom: 1rem;
}

.slots-label {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.slots-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.slot-badge {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.more-slots {
  color: #94a3b8;
  font-size: 0.8rem;
  font-style: italic;
}

.card-footer {
  display: flex;
  gap: 0.75rem;
}

.book-btn {
  flex: 1;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #0f172a;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
}

.book-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.view-profile-btn {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
}

.view-profile-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  transform: translateY(-2px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .doctors-grid {
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
  }
  
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .page-title i {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .doctor-card {
    padding: 1rem;
  }
  
  .card-footer {
    flex-direction: column;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
