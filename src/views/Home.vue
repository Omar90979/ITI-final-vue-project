<!-- filepath: src/views/Home.vue -->
<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title animate__animated animate__fadeInUp">
            Welcome to <span class="highlight">MediCare</span>
          </h1>
          <p class="hero-subtitle animate__animated animate__fadeInUp animate__delay-1s">
            Your trusted healthcare partner. Book appointments with qualified doctors 
            and manage your health journey with ease.
          </p>
          <div class="hero-buttons animate__animated animate__fadeInUp animate__delay-2s">
            <router-link to="/doctors" class="btn btn-primary">
              <i class="bi bi-search"></i>
              Find Doctors
            </router-link>
            <router-link to="/my-appointments" class="btn btn-secondary">
              <i class="bi bi-calendar-check"></i>
              My Appointments
            </router-link>
          </div>
        </div>
        <div class="hero-image animate__animated animate__fadeInRight animate__delay-1s">
          <div class="image-container">
            <img src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hospital_1150-17080.jpg" 
                 alt="Doctor with stethoscope" class="hero-img" />
            <div class="floating-elements">
              <div class="floating-icon icon-1">
                <i class="bi bi-heart-pulse"></i>
              </div>
              <div class="floating-icon icon-2">
                <i class="bi bi-shield-check"></i>
              </div>
              <div class="floating-icon icon-3">
                <i class="bi bi-people"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title animate__animated animate__fadeInUp">
          Why Choose MediCare?
        </h2>
        <div class="features-grid">
          <div class="feature-card animate__animated animate__fadeInUp animate__delay-1s">
            <div class="feature-icon">
              <i class="bi bi-clock-history"></i>
            </div>
            <h3>Quick Booking</h3>
            <p>Book appointments in just a few clicks with our streamlined process.</p>
          </div>
          <div class="feature-card animate__animated animate__fadeInUp animate__delay-2s">
            <div class="feature-icon">
              <i class="bi bi-shield-check"></i>
            </div>
            <h3>Verified Doctors</h3>
            <p>All our doctors are verified and highly qualified professionals.</p>
          </div>
          <div class="feature-card animate__animated animate__fadeInUp animate__delay-3s">
            <div class="feature-icon">
              <i class="bi bi-calendar-event"></i>
            </div>
            <h3>Easy Management</h3>
            <p>Manage all your appointments from one convenient dashboard.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item animate__animated animate__fadeInUp">
            <div class="stat-number">500+</div>
            <div class="stat-label">Happy Patients</div>
          </div>
          <div class="stat-item animate__animated animate__fadeInUp animate__delay-1s">
            <div class="stat-number">50+</div>
            <div class="stat-label">Expert Doctors</div>
          </div>
          <div class="stat-item animate__animated animate__fadeInUp animate__delay-2s">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support</div>
          </div>
          <div class="stat-item animate__animated animate__fadeInUp animate__delay-3s">
            <div class="stat-number">99%</div>
            <div class="stat-label">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8));
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%2338bdf8" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  animation: float 20s ease-in-out infinite;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #f8fafc;
  margin: 0;
}

.highlight {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #0f172a;
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(56, 189, 248, 0.4);
}

.btn-secondary {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border: 2px solid rgba(56, 189, 248, 0.3);
}

.btn-secondary:hover {
  background: rgba(56, 189, 248, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.2);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  position: relative;
  width: 400px;
  height: 400px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
}

.hero-img:hover {
  transform: scale(1.05);
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  font-size: 1.5rem;
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
  animation: float 3s ease-in-out infinite;
}

.icon-1 {
  top: 10%;
  right: -10%;
  animation-delay: 0s;
}

.icon-2 {
  bottom: 20%;
  left: -15%;
  animation-delay: 1s;
}

.icon-3 {
  top: 50%;
  right: -20%;
  animation-delay: 2s;
}

.features-section {
  padding: 5rem 0;
  background: rgba(15, 23, 42, 0.5);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #38bdf8, #0ea5e9);
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.05), transparent);
  transition: left 0.5s;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.4);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #0f172a;
  font-size: 2rem;
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
}

.stats-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(14, 165, 233, 0.1));
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  transition: all 0.3s;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #94a3b8;
  font-weight: 500;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .image-container {
    width: 300px;
    height: 300px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .image-container {
    width: 250px;
    height: 250px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
}
</style>
