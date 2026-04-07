import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Stay Updated</h3>
              <p>Subscribe for exclusive offers, new arrivals & design inspiration</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="newsletter-input" id="newsletter-email" />
              <button type="submit" className="btn btn-gold" id="newsletter-submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🪵</span>
                <div>
                  <h4>Woodharbour</h4>
                  <span>India Pvt. Ltd.</span>
                </div>
              </div>
              <p className="footer-desc">
                Crafting premium wooden furniture & interior solutions since our inception. 
                Every piece tells a story of quality, artistry, and timeless design.
              </p>
              <p className="footer-cin">CIN: U43302KA2026PTC215133</p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Instagram"><FiInstagram /></a>
                <a href="#" className="social-link" aria-label="Facebook"><FiFacebook /></a>
                <a href="#" className="social-link" aria-label="Twitter"><FiTwitter /></a>
                <a href="#" className="social-link" aria-label="YouTube"><FiYoutube /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h5>Quick Links</h5>
              <Link to="/">Home</Link>
              <Link to="/products">Shop All</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>

            {/* Categories */}
            <div className="footer-col">
              <h5>Categories</h5>
              <Link to="/products?category=furniture">Furniture</Link>
              <Link to="/products?category=home-decor">Home Decor</Link>
              <Link to="/products?category=modular-kitchen">Modular Kitchen</Link>
              <Link to="/products?category=office-interior">Office Interior</Link>
              <Link to="/products?category=wooden-toys">Wooden Toys</Link>
            </div>

            {/* Contact */}
            <div className="footer-col footer-contact">
              <h5>Contact Us</h5>
              <div className="contact-item">
                <FiMapPin />
                <span>#25/24-1, 50 Feet Road, T.G Layout, Ittamadu, B.S.K 3rd Stage, Bengaluru - 560085</span>
              </div>
              <div className="contact-item">
                <FiPhone />
                <div>
                  <a href="tel:7676503429">76765 03429</a>
                  <a href="tel:9571665129">95716 65129</a>
                </div>
              </div>
              <div className="contact-item">
                <FiMail />
                <a href="mailto:woodhorbor@gmail.com">woodhorbor@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Woodharbour India Pvt. Ltd. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/privacy">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top" id="scroll-top">
        <FiArrowUp />
      </button>
    </footer>
  );
}
