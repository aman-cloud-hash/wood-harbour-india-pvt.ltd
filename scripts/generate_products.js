import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DIR = path.join(__dirname, '../public/products');
const OUTPUT_FILE = path.join(__dirname, '../src/data/products_automated.js');

function generate() {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.error(`Please create a directory at: ${PRODUCTS_DIR} and add your categories/images.`);
    return;
  }

  const categories = fs.readdirSync(PRODUCTS_DIR).filter(item => 
    fs.statSync(path.join(PRODUCTS_DIR, item)).isDirectory()
  );

  const products = [];
  
  categories.forEach(category => {
    const categoryPath = path.join(PRODUCTS_DIR, category);
    const files = fs.readdirSync(categoryPath).filter(file => 
      ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(path.extname(file).toLowerCase())
    );

    files.forEach(file => {
      const name = path.parse(file).name.replace(/[-_]/g, ' ');
      products.push({
        id: `p${Date.now()}${Math.floor(Math.random() * 1000)}`,
        title: name.charAt(0).toUpperCase() + name.slice(1),
        category: category.toLowerCase().replace(/\s+/g, '-'),
        price: Math.floor(Math.random() * (50000 - 5000) + 5000), 
        description: `Handcrafted ${name} made with premium wood. Durable and elegant for your home.`,
        material: 'Premium Wood',
        dimensions: 'Customizable Size',
        image_url: `/products/${category}/${file}`, // Path for frontend
        inStock: true
      });
    });
  });

  const content = `// Automated product data generation
export const automatedProducts = ${JSON.stringify(products, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`Successfully generated ${products.length} products!`);
}

generate();
