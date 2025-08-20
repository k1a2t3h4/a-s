import { type Component } from 'solid-js';

const Contact: Component = () => {
  return (
    <div class="contact-container">
      <div class="contact-header">
        <h1>Contact Us</h1>
        <p class="contact-subtitle">Get in touch with our team</p>
      </div>
      
      <div class="contact-content">
        <div class="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Ready to start your next project? We'd love to hear from you. 
            Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <div class="contact-details">
            <div class="contact-item">
              <h4>📧 Email</h4>
              <p>hello@example.com</p>
            </div>
            <div class="contact-item">
              <h4>📱 Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div class="contact-item">
              <h4>📍 Address</h4>
              <p>123 Tech Street, Digital City, DC 12345</p>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div class="form-group">
              <label for="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" class="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
