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
          files: files.map(file => ({
            name: file.replace(/\.[^/.]+$/, ""), // Remove extension for name
            path: `/categories/${folderName}/${file}`
          }))
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
