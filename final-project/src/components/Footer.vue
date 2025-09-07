<!-- filepath: src/components/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <i class="bi bi-heart-pulse-fill"></i>
            <span>MediCare</span>
          </div>
          <p class="footer-description">
            Your trusted partner in healthcare. Book appointments with qualified doctors 
            and manage your health journey with ease.
          </p>
          <div class="social-links">
            <a href="https://www.facebook.com/omar.mohammed.665257" class="social-link" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
             <a href="https://x.com/OmarMoh22310866?fbclid=IwY2xjawMq1fJleHRuA2FlbQIxMABicmlkETFRMmRLWmU1QVBOYVNCVzI0AR5a9aP39XCsblvUSolCY5GwdPY3ovnflidK_Y0fIEidQh72c7_ZyE8HkMCVCw_aem_h0_M1jny297R91LfIH3U3Q" class="social-link" aria-label="X (formerly Twitter)">
               <i class="bi bi-twitter-x"></i>
             </a>
            <a href="https://www.instagram.com/om3r_moh3mmed/?fbclid=IwY2xjawMq1wBleHRuA2FlbQIxMABicmlkETFRMmRLWmU1QVBOYVNCVzI0AR6jZ-XOmK0iRuTLq7o8arBDRaKsM3R4QXv6RUwTdjT2X6JF7qNwhd6GdmzfyQ_aem_YSm6kQHyU9Y7fJ1YnVpJBQ#" class="social-link" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/omar-mohamed-a24783337/" class="social-link" aria-label="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/doctors">Find Doctors</router-link></li>
            <li><router-link to="/my-appointments">My Appointments</router-link></li>
            <li><router-link to="/contact">Contact Us</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Services</h3>
          <ul class="footer-links">
            <li><a href="#">General Medicine</a></li>
            <li><a href="#">Cardiology</a></li>
            <li><a href="#">Dermatology</a></li>
            <li><a href="#">Dentistry</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">Contact Info</h3>
          <div class="contact-info">
            <div class="contact-item">
              <i class="bi bi-geo-alt-fill"></i>
              <span>123 Medical Street, Health City, HC 12345</span>
            </div>
            <div class="contact-item">
              <i class="bi bi-telephone-fill"></i>
              <span>+20 (120) 886-7209</span>
            </div>
            <div class="contact-item">
              <i class="bi bi-envelope-fill"></i>
              <span>omarmohammedabdelradi@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; 2024 MediCare. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-top: 1px solid rgba(56, 189, 248, 0.2);
  margin-top: auto;
  animation: slideUp 0.6s ease-out;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 2rem;
  padding: 3rem 0 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 0.5rem;
}

.footer-brand i {
  font-size: 1.8rem;
  animation: pulse 2s infinite;
}

.footer-description {
  color: #94a3b8;
  line-height: 1.6;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.2rem;
}

.social-link:hover {
  background: #38bdf8;
  color: #0f172a;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.footer-title {
  color: #f8fafc;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  position: relative;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #38bdf8, #0ea5e9);
  border-radius: 1px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links li a {
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 0.95rem;
  position: relative;
  padding-left: 0;
}

.footer-links li a::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 1px;
  background: #38bdf8;
  transition: width 0.3s;
}

.footer-links li a:hover {
  color: #38bdf8;
  padding-left: 15px;
}

.footer-links li a:hover::before {
  width: 10px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #94a3b8;
  font-size: 0.95rem;
}

.contact-item i {
  color: #38bdf8;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.footer-bottom {
  border-top: 1px solid rgba(56, 189, 248, 0.1);
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #64748b;
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
}

.footer-bottom-links a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-bottom-links a:hover {
  color: #38bdf8;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
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
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 0 1.5rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-bottom-links {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 0 0.5rem;
  }
  
  .footer-content {
    padding: 1.5rem 0 1rem;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>
