import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import SEO from '../../components/SEO';
import './Categories.css';

export default function Categories() {
  return (
    <div className="categories-page">
      <SEO 
        title="Browse by Category | Woodharbour India" 
        description="Explore our diverse range of handcrafted wood products categorized for your convenience."
      />

      <section className="categories-hero">
        <div className="container">
          <h1>Our Categories</h1>
          <p>Explore our diverse collection of handcrafted products</p>
        </div>
      </section>

      <section className="categories-grid-section">
        <div className="container">
          <div className="category-grid">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.slug}`}
                className="category-card-item"
              >
                <div className="category-card-img">
                  <img src={category.image} alt={category.name} loading="lazy" />
                  <div className="category-card-overlay-btn">
                    <span>View More</span>
                  </div>
                </div>
                <div className="category-card-info">
                  <span className="cat-icon">{category.icon}</span>
                  <h3>{category.name}</h3>
                  <p>{category.description || 'Premium handcrafted excellence.'}</p>
                  <div className="cat-explore-link">
                    Explore Collection →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
