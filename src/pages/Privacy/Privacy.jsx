import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <h1>Privacy Policy & Terms</h1>
        <p className="privacy-updated">Last updated: April 2026</p>

        <div className="privacy-content glass-card">
          <section className="privacy-section">
            <h2>1. Privacy Policy</h2>
            <p>Woodharbour India Pvt. Ltd. ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
            
            <h3>Information We Collect</h3>
            <ul>
              <li><strong>Personal Information:</strong> Name, email, phone number, and address when you place an order or contact us.</li>
              <li><strong>Usage Data:</strong> Browser type, pages visited, time spent on pages, and other diagnostic data.</li>
              <li><strong>Cookies:</strong> Small files stored on your device to enhance your browsing experience.</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <ul>
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders and inquiries</li>
              <li>To improve our website and services</li>
              <li>To send promotional communications (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h3>Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.</p>

            <h3>Third-Party Services</h3>
            <p>We may use third-party services (payment processors, analytics) that collect information about you. These services have their own privacy policies.</p>
          </section>

          <section className="privacy-section">
            <h2>2. Terms & Conditions</h2>
            
            <h3>General</h3>
            <p>By accessing and using this website, you accept and agree to be bound by these Terms & Conditions. If you disagree with any part, you must not use our website.</p>

            <h3>Products & Pricing</h3>
            <ul>
              <li>All product descriptions are as accurate as possible. However, slight variations in color and dimensions may occur.</li>
              <li>Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
              <li>We reserve the right to modify prices without prior notice.</li>
            </ul>

            <h3>Orders & Payment</h3>
            <ul>
              <li>An order is confirmed only upon receipt of payment or confirmation of Cash on Delivery.</li>
              <li>We accept UPI, credit/debit cards, net banking, and Cash on Delivery.</li>
              <li>We reserve the right to cancel orders due to stock unavailability or pricing errors.</li>
            </ul>

            <h3>Shipping & Delivery</h3>
            <ul>
              <li>Free delivery on orders above ₹10,000.</li>
              <li>Standard delivery within 7-15 business days depending on location.</li>
              <li>Custom/made-to-order items may take 15-30 days.</li>
              <li>Assembly services available at select locations.</li>
            </ul>

            <h3>Returns & Refunds</h3>
            <ul>
              <li>30-day return policy for non-customized items.</li>
              <li>Products must be unused and in original packaging.</li>
              <li>Customized and made-to-order items are non-returnable.</li>
              <li>Refunds processed within 7-10 business days after inspection.</li>
            </ul>

            <h3>Warranty</h3>
            <p>All furniture products come with a 5-year warranty against manufacturing defects. Warranty does not cover normal wear and tear, misuse, or environmental damage.</p>
          </section>

          <section className="privacy-section">
            <h2>3. Contact Us</h2>
            <p>For any questions about these policies, contact us at:</p>
            <ul>
              <li><strong>Email:</strong> woodhorbor@gmail.com</li>
              <li><strong>Phone:</strong> 76765 03429</li>
              <li><strong>Address:</strong> #25/24-1, 50 Feet Road, T.G Layout, Ittamadu, B.S.K 3rd Stage, Bengaluru - 560085</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
