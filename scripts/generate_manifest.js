import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORY_MAPPING = {
  'furniture': 'Furniture (50 Products)',
  'home-decor': 'Home decor items lamps, curtains, wallpapers)',
  'modular-kitchen': 'Modular Kitchen (50 Products)',
  'office-interior': 'Office Interior Setup',
  'design-services': 'Design & Execution Services (25 Items)',
  'wooden-toys': 'Wooden Toys',
  'hanging-products': 'hanging product'
};

const publicPath = path.join(__dirname, '..', 'public');
const categoriesPath = path.join(publicPath, 'categories');
const manifestFile = path.join(publicPath, 'manifest.json');

function generateManifest() {
  console.log('Generating product manifest from local folders...');
  
  if (!fs.existsSync(categoriesPath)) {
    console.error(`Error: Categories folder not found at ${categoriesPath}`);
    return;
  }

  const manifest = {};

  const CUSTOM_PRICES = {
    "2d.jpg": "₹7/sqft",
    "12 Wardrobe Design Bedroom.jpg": "₹12/sqft",
    "Basic Floor Plan With Dimensions.jpg": "₹5/sqft",
    "electrical layout.jpg": "₹5/sqft",
    "Feed _ LinkedIn.jpg": "₹4/sqft",
    "Finishes for Interior Design Like a Pro!.jpg": "₹6/sqft",
    "Lighting model and HDRI.jpg": "₹4/sqft",
    "Living room false ceiling design.jpg": "₹10/sqft",
    "open desk.jpg": "₹12/sqft",
    "Painting serivces.jpg": "₹4/sqft",
    "services.jpg": "₹8/sqft",
    "Site Supervision Works_.jpg": "₹10/sqft",
    "Top Turnkey Contractor.jpg": "₹15/sqft",
    "Transform Your Space with.jpg": "₹10/sqft",
    "wood services.jpg": "₹12/sqft"
  };

  Object.entries(CATEGORY_MAPPING).forEach(([slug, folderName]) => {
    const fullPath = path.join(categoriesPath, folderName);
    
    if (fs.existsSync(fullPath)) {
      try {
        const files = fs.readdirSync(fullPath)
          .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
          });

        manifest[slug] = {
          folderName,
          files: files.map(file => {
            let price = null;
            if (CUSTOM_PRICES[file] || CUSTOM_PRICES[file.replace(/\.[^/.]+$/, "")]) {
               price = CUSTOM_PRICES[file] || CUSTOM_PRICES[file.replace(/\.[^/.]+$/, "")];
            } else if (slug === 'office-interior') {
               price = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
            } else if (slug === 'hanging-products') {
               price = Math.floor(Math.random() * (7000 - 2000 + 1)) + 2000;
            } else if (slug === 'home-decor') {
               price = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
            } else if (slug === 'wooden-toys') {
               price = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
            } else if (slug === 'modular-kitchen') {
               price = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
            } else if (slug === 'furniture') {
               // Extract the 'mm' value from the filename
               const match = file.match(/([\d.]+)\s*mm/i);
               if (match && match[1]) {
                 const mmValue = parseFloat(match[1]);
                 // Base 10 rupees, proportional increment
                 price = Math.max(10, Math.floor(mmValue * 20));
               } else {
                 price = 10;
               }
            }
            
            return {
              name: file.replace(/\.[^/.]+$/, ""), // Remove extension for name
              path: `/categories/${folderName}/${file}`,
              price: price
            };
          })
        };
        
        console.log(`- Loaded ${files.length} images for category: ${slug}`);
      } catch (err) {
        console.error(`- Error reading folder ${folderName}:`, err.message);
      }
    } else {
      console.warn(`- Warning: Folder not found: ${folderName}`);
    }
  });

  try {
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
    console.log(`\nSuccessfully created manifest.json at ${manifestFile}`);
  } catch (err) {
    console.error('Error writing manifest.json:', err.message);
  }
}

generateManifest();
