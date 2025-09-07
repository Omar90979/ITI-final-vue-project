<!-- filepath: src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <i class="bi bi-heart-pulse-fill"></i>
        <span>MediCare</span>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">
          <i class="bi bi-house-door-fill"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/doctors" class="nav-link">
          <i class="bi bi-people-fill"></i>
          <span>Doctors</span>
        </router-link>
        <router-link to="/my-appointments" class="nav-link">
          <i class="bi bi-calendar-check-fill"></i>
          <span>My Appointments</span>
        </router-link>
        <router-link to="/contact" class="nav-link">
          <i class="bi bi-envelope-fill"></i>
          <span>Contact</span>
        </router-link>
      </div>
      <div class="mobile-menu-toggle" @click="toggleMobileMenu">
        <i class="bi bi-list"></i>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
.navbar {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(56, 189, 248, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: slideDown 0.6s ease-out;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #38bdf8;
  text-decoration: none;
}

.nav-brand i {
  font-size: 1.8rem;
  animation: pulse 2s infinite;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f8fafc;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.1), transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover, .nav-link.router-link-exact-active {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #0f172a;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.nav-link i {
  font-size: 1.1rem;
  transition: transform 0.3s;
}

.nav-link:hover i {
  transform: scale(1.1);
}

.mobile-menu-toggle {
  display: none;
  color: #f8fafc;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s;
}

.mobile-menu-toggle:hover {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-brand span {
    display: none;
  }
  
  .nav-container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    height: 60px;
    padding: 0 0.5rem;
  }
  
  .nav-brand {
    font-size: 1.2rem;
  }
  
  .nav-brand i {
    font-size: 1.5rem;
  }
}
</style>
