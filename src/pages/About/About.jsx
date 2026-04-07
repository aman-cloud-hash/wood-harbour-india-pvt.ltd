import { FiAward, FiUsers, FiMapPin, FiStar } from 'react-icons/fi';
import { useScrollAnimation } from '../../utils/helpers';
import './About.css';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation(0.1);
  return (
    <div ref={ref} className={`${className} ${isVisible ? 'animate-visible' : 'animate-hidden'}`}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80" alt="Woodharbour Workshop" />
          <div className="page-hero-overlay" />
        </div>
        <div className="about-hero-content container">
          <h1>Our Story</h1>
          <p>Crafting excellence in wood since our founding</p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="about-story-grid">
            <AnimatedSection className="about-story-text">
              <span className="about-label">About Woodharbour</span>
              <h2>Where Tradition Meets Innovation</h2>
              <p>
                Woodharbour India Pvt. Ltd. was founded with a singular vision — to bring premium, 
                handcrafted wooden furniture and interior solutions to discerning homeowners across India. 
                Based in the vibrant city of Bengaluru, we combine traditional woodworking techniques 
                with modern design sensibilities.
              </p>
              <p>
                Every piece that bears the Woodharbour name is a testament to our commitment to quality. 
                From selecting the finest woods to the final polish, our skilled artisans ensure that 
                each product meets the highest standards of craftsmanship.
              </p>
              <p>
                We believe that furniture is not just about function — it's about creating spaces that 
                inspire, comfort, and endure. That's why we take pride in every grain pattern, every 
                joint, and every finish.
              </p>
            </AnimatedSection>
            <AnimatedSection className="about-story-image">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" alt="Woodwork" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-section">
        <div className="container">
          <div className="about-stats">
            {[
              { icon: <FiAward />, num: '500+', label: 'Products Crafted' },
              { icon: <FiUsers />, num: '2,000+', label: 'Happy Customers' },
              { icon: <FiMapPin />, num: '15+', label: 'Cities Served' },
              { icon: <FiStar />, num: '4.8', label: 'Average Rating' }
            ].map((stat, i) => (
              <AnimatedSection key={i} className="about-stat-card">
                <div className="about-stat-icon">{stat.icon}</div>
                <span className="about-stat-num">{stat.num}</span>
                <span className="about-stat-label">{stat.label}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2>Our Values</h2>
              <span className="accent-line" />
            </div>
          </AnimatedSection>
          <div className="values-grid">
            {[
              { emoji: '🌳', title: 'Sustainability', desc: 'We responsibly source our wood and use eco-friendly finishes to minimize our environmental footprint.' },
              { emoji: '✋', title: 'Craftsmanship', desc: 'Every piece is handcrafted by skilled artisans who take immense pride in their work.' },
              { emoji: '💎', title: 'Quality', desc: 'We never compromise on materials or processes. Premium quality is our non-negotiable standard.' },
              { emoji: '🤝', title: 'Trust', desc: 'Building lasting relationships with our customers through transparency and honest dealings.' }
            ].map((val, i) => (
              <AnimatedSection key={i} className="value-card glass-card">
                <span className="value-emoji">{val.emoji}</span>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="section company-info-section">
        <div className="container">
          <AnimatedSection>
            <div className="company-info glass-card">
              <h3>Company Information</h3>
              <div className="company-details">
                <div className="detail-row">
                  <span className="detail-label">Company Name</span>
                  <span>Woodharbour India Private Limited</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">CIN</span>
                  <span>U43302KA2026PTC215133</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Registered Address</span>
                  <span>#25/24-1, 50 Feet Road, T.G Layout, Ittamadu, B.S.K 3rd Stage, Bengaluru - 560085</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email</span>
                  <span>woodhorbor@gmail.com</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone</span>
                  <span>76765 03429 / 95716 65129 / 84313 65445</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
