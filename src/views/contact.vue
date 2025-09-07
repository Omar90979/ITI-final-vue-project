<template>
  <div class="contact-page">
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="page-title animate__animated animate__fadeInUp">
        <i class="bi bi-envelope-fill"></i>
        Contact Us
      </h1>
      <p class="page-subtitle animate__animated animate__fadeInUp animate__delay-1s">
        Get in touch with us for any questions or support
      </p>
    </div>

    <!-- Contact Content -->
    <div class="contact-content">
      <!-- Contact Form -->
      <div class="contact-form-container animate__animated animate__fadeInUp animate__delay-2s">
        <div class="form-header">
          <h2>Send us a Message</h2>
          <p>We'll get back to you as soon as possible</p>
        </div>
        
        <form @submit.prevent="send" class="contact-form">
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
          
          <div class="form-group">
            <label for="message" class="form-label">
              <i class="bi bi-chat-text-fill"></i>
              Message
            </label>
            <textarea 
              id="message"
              v-model="msg" 
              placeholder="Tell us how we can help you..." 
              class="form-textarea"
              rows="5"
              required
            ></textarea>
          </div>
          
          <button type="submit" class="send-btn" :disabled="isSubmitting">
            <i class="bi bi-send-fill"></i>
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else>Sending...</span>
          </button>
        </form>
        
        <div v-if="done" class="success-msg animate__animated animate__fadeInDown">
          <i class="bi bi-check-circle-fill"></i>
          <div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you soon.</p>
          </div>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="contact-info animate__animated animate__fadeInUp animate__delay-3s">
        <h2>Get in Touch</h2>
        <div class="info-cards">
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-telephone-fill"></i>
            </div>
            <div class="info-content">
              <h3>Phone</h3>
              <p>+20 (120) 886-7209</p>
              <span>Mon - Fri, 9:00 AM - 6:00 PM</span>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-envelope-fill"></i>
            </div>
            <div class="info-content">
              <h3>Email</h3>
              <p>omarmohammedabdelradi@gmail.com</p>
              <span>We'll respond within 24 hours</span>
            </div>
          </div>
          
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-geo-alt-fill"></i>
            </div>
            <div class="info-content">
              <h3>Address</h3>
              <p>123 Medical Street</p>
              <span>Health City, HC 12345</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const msg = ref('')
const done = ref(false)
const isSubmitting = ref(false)

function send() {
  if(name.value && email.value && msg.value) {
    isSubmitting.value = true
    
    // Simulate API call
    setTimeout(() => {
      done.value = true
      name.value = email.value = msg.value = ''
      isSubmitting.value = false
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        done.value = false
      }, 5000)
    }, 1500)
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
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

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-form-container {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.contact-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.05), transparent);
  transition: left 0.5s;
}

.contact-form-container:hover::before {
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

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.form-input, .form-textarea {
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

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
}

.form-input::placeholder, .form-textarea::placeholder {
  color: #64748b;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.send-btn {
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
}

.send-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.send-btn:hover::before {
  left: 100%;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
}

.send-btn:disabled {
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

.contact-info h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 2rem;
  text-align: center;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
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

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.05), transparent);
  transition: left 0.5s;
}

.info-card:hover::before {
  left: 100%;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.4);
}

.info-icon {
  width: 60px;
  height: 60px;
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

.info-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.25rem;
}

.info-content p {
  font-size: 1rem;
  color: #38bdf8;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.info-content span {
  font-size: 0.85rem;
  color: #94a3b8;
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
  .contact-content {
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
  
  .contact-form-container {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .contact-form-container {
    padding: 1rem;
  }
  
  .info-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
