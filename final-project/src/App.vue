<!-- filepath: src/App.vue -->
<template>
  <div class="main-layout">
    <Navbar />
    <transition name="fade" mode="out-in">
      <div class="page-content">
        <router-view />
      </div>
    </transition>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', 'Segoe UI', 'Cairo', sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  background-attachment: fixed;
  color: #f8fafc;
  line-height: 1.6;
  overflow-x: hidden;
}

.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.page-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  animation: slideInUp 0.6s ease-out;
}

/* Enhanced animations */
@keyframes slideInUp {
  from { 
    opacity: 0; 
    transform: translateY(40px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(30px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #38bdf8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0ea5e9;
}

/* Responsive design */
@media (max-width: 768px) {
  .page-content {
    padding: 1rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .page-content {
    padding: 0.5rem;
  }
}
</style>
