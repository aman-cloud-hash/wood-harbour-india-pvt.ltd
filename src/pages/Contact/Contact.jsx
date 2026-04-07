import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields');
      return;
    }
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=80" alt="Contact" />
          <div className="page-hero-overlay" />
        </div>
        <div className="about-hero-content container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Reach out to us anytime.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p className="contact-desc">Have questions about our products or need a custom solution? Our team is here to help.</p>

              <div className="contact-cards">
                <div className="contact-info-card glass-card">
                  <div className="contact-info-icon"><FiMapPin /></div>
                  <h4>Visit Us</h4>
                  <p>#25/24-1, 50 Feet Road,<br/>T.G Layout, Ittamadu,<br/>B.S.K 3rd Stage,<br/>Bengaluru - 560085</p>
                </div>
                <div className="contact-info-card glass-card">
                  <div className="contact-info-icon"><FiPhone /></div>
                  <h4>Call Us</h4>
                  <p><a href="tel:7676503429">76765 03429</a></p>
                  <p><a href="tel:9571665129">95716 65129</a></p>
                  <p><a href="tel:8431365445">84313 65445</a></p>
                </div>
                <div className="contact-info-card glass-card">
                  <div className="contact-info-icon"><FiMail /></div>
                  <h4>Email Us</h4>
                  <p><a href="mailto:woodhorbor@gmail.com">woodhorbor@gmail.com</a></p>
                </div>
                <div className="contact-info-card glass-card">
                  <div className="contact-info-icon"><FiClock /></div>
                  <h4>Business Hours</h4>
                  <p>Mon - Sat: 9AM - 7PM<br/>Sunday: 10AM - 5PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section glass-card">
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required id="contact-name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required id="contact-email" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} id="contact-phone" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input type="text" className="form-input" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} id="contact-subject" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-input" rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required id="contact-message" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" id="contact-submit" style={{ width: '100%' }}>
                  <FiSend /> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="map-section" style={{ marginTop: 'var(--space-3xl)' }}>
            <iframe
              title="Woodharbour Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.55!3d12.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU1JzQ4LjAiTiA3N8KwMzMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
