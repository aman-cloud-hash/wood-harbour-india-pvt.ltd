export const categories = [
  {
    id: 'furniture',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Handcrafted premium wooden furniture for every room',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    icon: '🪑'
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Lamps, curtains, wall decor & artistic accents',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
    icon: '🏮'
  },
  {
    id: 'modular-kitchen',
    name: 'Modular Kitchen',
    slug: 'modular-kitchen',
    description: 'Modern modular kitchen designs & installations',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    icon: '🍳'
  },
  {
    id: 'office-interior',
    name: 'Office Interior',
    slug: 'office-interior',
    description: 'Professional office interior setups & furniture',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    icon: '🏢'
  },
  {
    id: 'design-services',
    name: 'Design & Execution',
    slug: 'design-services',
    description: 'End-to-end design consultation & execution services',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    icon: '📐'
  },
  {
    id: 'wooden-toys',
    name: 'Wooden Toys',
    slug: 'wooden-toys',
    description: 'Safe, handcrafted wooden toys for children',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80',
    icon: '🧸'
  },
  {
    id: 'hanging-products',
    name: 'Hanging Products',
    slug: 'hanging-products',
    description: 'Swings, hanging chairs, planters & decorative hangings',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    icon: '🪴'
  }
];

export const sampleProducts = [
  // Furniture
  {
    id: 'f1',
    name: 'Royal Teak Dining Table',
    category: 'furniture',
    price: 45999,
    originalPrice: 59999,
    description: 'Exquisite 6-seater dining table crafted from premium teak wood with intricate hand-carved details. Features a rich honey finish that highlights the natural wood grain. Built to last generations.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    trending: true,
    dimensions: '180cm x 90cm x 76cm',
    material: 'Premium Teak Wood',
    weight: '45 kg'
  },
  {
    id: 'f2',
    name: 'Heritage Rosewood Sofa Set',
    category: 'furniture',
    price: 89999,
    originalPrice: 119999,
    description: 'Luxurious 3+1+1 sofa set in premium rosewood with plush velvet cushions. Traditional craftsmanship meets modern comfort. Each piece features hand-polished finish.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
    ],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    trending: true,
    dimensions: '220cm x 85cm x 90cm',
    material: 'Indian Rosewood (Sheesham)',
    weight: '75 kg'
  },
  {
    id: 'f3',
    name: 'Walnut Bookshelf Tower',
    category: 'furniture',
    price: 18999,
    originalPrice: 24999,
    description: 'Elegant 5-tier bookshelf made from solid walnut wood. Open-back design with adjustable shelf heights. Perfect for living rooms and study areas.',
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
    ],
    rating: 4.6,
    reviews: 67,
    inStock: true,
    featured: false,
    trending: true,
    dimensions: '80cm x 35cm x 190cm',
    material: 'Walnut Wood',
    weight: '28 kg'
  },
  {
    id: 'f4',
    name: 'King Size Carved Bed Frame',
    category: 'furniture',
    price: 62999,
    originalPrice: 79999,
    description: 'Magnificent king-size bed frame with intricately carved headboard. Made from seasoned mango wood with a mahogany finish. Includes matching side tables.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'
    ],
    rating: 4.7,
    reviews: 156,
    inStock: true,
    featured: true,
    trending: false,
    dimensions: '200cm x 185cm x 120cm',
    material: 'Mango Wood',
    weight: '95 kg'
  },
  {
    id: 'f5',
    name: 'Console Table with Drawers',
    category: 'furniture',
    price: 15999,
    originalPrice: 21999,
    description: 'Sleek console table with 3 drawers and lower shelf. Crafted from engineered wood with solid wood veneer. Brass-finish hardware adds a touch of luxury.',
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80'
    ],
    rating: 4.5,
    reviews: 43,
    inStock: true,
    featured: false,
    trending: false,
    dimensions: '120cm x 35cm x 80cm',
    material: 'Engineered Wood + Veneer',
    weight: '18 kg'
  },
  // Home Decor
  {
    id: 'hd1',
    name: 'Artisan Wooden Table Lamp',
    category: 'home-decor',
    price: 3499,
    originalPrice: 4999,
    description: 'Handturned wooden base table lamp with premium linen shade. Warm ambient lighting perfect for bedside or living areas. Each piece is uniquely crafted.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&q=80'
    ],
    rating: 4.4,
    reviews: 78,
    inStock: true,
    featured: true,
    trending: true,
    dimensions: '25cm x 25cm x 45cm',
    material: 'Turned Wood + Linen',
    weight: '1.5 kg'
  },
  {
    id: 'hd2',
    name: 'Macrame Wall Hanging Set',
    category: 'home-decor',
    price: 2499,
    originalPrice: 3499,
    description: 'Set of 3 handwoven macrame wall hangings in varying sizes. Mounted on driftwood bars. Bohemian-chic style that adds texture and warmth to any space.',
    images: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80'
    ],
    rating: 4.6,
    reviews: 92,
    inStock: true,
    featured: false,
    trending: true,
    dimensions: 'Large: 60cm x 90cm',
    material: 'Cotton Rope + Driftwood',
    weight: '0.8 kg'
  },
  {
    id: 'hd3',
    name: 'Carved Wooden Mirror Frame',
    category: 'home-decor',
    price: 7999,
    originalPrice: 10999,
    description: 'Oval wall mirror with elaborately carved wooden frame. Hand-finished in antique gold. Statement piece for entryways and living rooms.',
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80'
    ],
    rating: 4.8,
    reviews: 56,
    inStock: true,
    featured: true,
    trending: false,
    dimensions: '70cm x 100cm x 5cm',
    material: 'Carved Wood + Mirror Glass',
    weight: '8 kg'
  },
  {
    id: 'hd4',
    name: 'Premium Velvet Curtain Pair',
    category: 'home-decor',
    price: 4999,
    originalPrice: 6999,
    description: 'Luxurious velvet curtains in deep forest green. Blackout lining for complete privacy. Rod-pocket design with tiebacks included.',
    images: [
      'https://images.unsplash.com/photo-1560185009-dddeb820c7b7?w=800&q=80'
    ],
    rating: 4.5,
    reviews: 34,
    inStock: true,
    featured: false,
    trending: false,
    dimensions: '140cm x 270cm per panel',
    material: 'Premium Velvet',
    weight: '3 kg'
  },
  // Modular Kitchen
  {
    id: 'mk1',
    name: 'L-Shape Modular Kitchen',
    category: 'modular-kitchen',
    price: 249999,
    originalPrice: 329999,
    description: 'Complete L-shape modular kitchen setup with soft-close cabinets, granite countertop, and stainless steel sink. Includes 3D design consultation and professional installation.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80'
    ],
    rating: 4.9,
    reviews: 45,
    inStock: true,
    featured: true,
    trending: true,
    dimensions: 'Customizable',
    material: 'Marine Plywood + Laminate',
    weight: 'NA'
  },
  {
    id: 'mk2',
    name: 'U-Shape Premium Kitchen',
    category: 'modular-kitchen',
    price: 389999,
    originalPrice: 489999,
    description: 'Spacious U-shape modular kitchen with island counter. Premium acrylic finish cabinets, quartz countertop, and integrated appliance slots. Full design and installation included.',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    rating: 4.8,
    reviews: 23,
    inStock: true,
    featured: true,
    trending: false,
    dimensions: 'Customizable',
    material: 'BWR Plywood + Acrylic',
    weight: 'NA'
  },
  {
    id: 'mk3',
    name: 'Compact Parallel Kitchen',
    category: 'modular-kitchen',
    price: 179999,
    originalPrice: 229999,
    description: 'Efficient parallel kitchen design ideal for smaller spaces. Maximizes storage with tall units and corner solutions. Includes chimney hood space.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    rating: 4.7,
    reviews: 38,
    inStock: true,
    featured: false,
    trending: true,
    dimensions: 'Customizable',
    material: 'Marine Plywood + PU Finish',
    weight: 'NA'
  },
  // Office Interior
  {
    id: 'oi1',
    name: 'Executive Desk Setup',
    category: 'office-interior',
    price: 34999,
    originalPrice: 44999,
    description: 'Premium executive desk with integrated cable management, pull-out keyboard tray, and lockable drawers. Rich walnut finish with chrome accents.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80'
    ],
    rating: 4.6,
    reviews: 67,
    inStock: true,
    featured: true,
    trending: true,
    dimensions: '150cm x 75cm x 76cm',
    material: 'Engineered Wood + Walnut Veneer',
    weight: '42 kg'
  },
  {
    id: 'oi2',
    name: 'Conference Table (10 Seater)',
    category: 'office-interior',
    price: 59999,
    originalPrice: 79999,
    description: '10-seater conference table in solid wood with integrated power outlets and data ports. Professional boat-shape design with cable management trough.',
    images: [
      'https://images.unsplash.com/photo-1431540015159-0f9673f46413?w=800&q=80'
    ],
    rating: 4.8,
    reviews: 29,
    inStock: true,
    featured: false,
    trending: false,
    dimensions: '300cm x 120cm x 76cm',
    material: 'Solid Teak Wood',
    weight: '85 kg'
  },
  {
    id: 'oi3',
    name: 'Ergonomic Wood Office Chair',
    category: 'office-interior',
    price: 14999,
    originalPrice: 19999,
    description: 'Ergonomic office chair with bentwood frame, memory foam cushion, and adjustable height. Combines comfort with classic wooden aesthetics.',
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80'
    ],
    rating: 4.5,
    reviews: 84,
    inStock: true,
    featured: false,
    trending: true,
    dimensions: '65cm x 65cm x 110cm',
    material: 'Bentwood + Leather',
    weight: '12 kg'
  },
  // Design & Execution Services
  {
    id: 'ds1',
    name: 'Complete Home Interior Package',
    category: 'design-services',
    price: 499999,
    originalPrice: 699999,
    description: 'End-to-end home interior design and execution. Includes 3D visualization, material selection, project management, and complete installation. For homes up to 1500 sq ft.',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80'
    ],
    rating: 5.0,
    reviews: 18,
    inStock: true,
    featured: true,
    trending: true,
    dimensions: 'Up to 1500 sq ft',
    material: 'Premium Materials',
    weight: 'NA'
  },
  {
    id: 'ds2',
    name: 'Room Makeover Consultation',
    category: 'design-services',
    price: 9999,
    originalPrice: 14999,
    description: 'Professional interior design consultation for a single room. Includes mood board, 3D render, material palette, and shopping list. Virtual or on-site visit available.',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80'
    ],
    rating: 4.7,
    reviews: 56,
    inStock: true,
    featured: false,
    trending: true,
    dimensions: 'Per Room',
    material: 'Consultation',
    weight: 'NA'
  },
  // Wooden Toys
  {
    id: 'wt1',
    name: 'Wooden Train Set (12 Pieces)',
    category: 'wooden-toys',
    price: 2999,
    originalPrice: 3999,
    description: 'Classic wooden train set with engine, 3 carriages, tracks, and accessories. Made from neem wood with child-safe, non-toxic paint. Ages 3+.',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80'
    ],
    rating: 4.8,
    reviews: 143,
    inStock: true,
    featured: true,
    trending: true,
    dimensions: '45cm x 30cm (assembled)',
    material: 'Neem Wood',
    weight: '0.8 kg'
  },
  {
    id: 'wt2',
    name: 'Stacking Blocks Set (24 Pieces)',
    category: 'wooden-toys',
    price: 1499,
    originalPrice: 1999,
    description: 'Colorful wooden stacking blocks in various shapes and sizes. Develops motor skills and spatial awareness. Smooth sanded edges for safety.',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80'
    ],
    rating: 4.6,
    reviews: 201,
    inStock: true,
    featured: false,
    trending: true,
    dimensions: '5cm each block',
    material: 'Rubberwood',
    weight: '1.2 kg'
  },
  {
    id: 'wt3',
    name: 'Wooden Dollhouse',
    category: 'wooden-toys',
    price: 5999,
    originalPrice: 7999,
    description: 'Three-story wooden dollhouse with furniture set. Detailed rooms include kitchen, bedroom, and living room. Opens fully for easy play access.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80'
    ],
    rating: 4.9,
    reviews: 67,
    inStock: true,
    featured: true,
    trending: false,
    dimensions: '60cm x 40cm x 70cm',
    material: 'Birch Plywood',
    weight: '4.5 kg'
  },
  // Hanging Products
  {
    id: 'hp1',
    name: 'Macrame Hanging Chair',
    category: 'hanging-products',
    price: 8999,
    originalPrice: 12999,
    description: 'Bohemian macrame swing chair with comfortable cushion. Supports up to 120kg. Perfect for balconies, porches, and indoor corners.',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80'
    ],
    rating: 4.7,
    reviews: 98,
    inStock: true,
    featured: true,
    trending: true,
    dimensions: '80cm x 65cm x 130cm',
    material: 'Cotton Rope + Wooden Frame',
    weight: '8 kg'
  },
  {
    id: 'hp2',
    name: 'Wooden Hanging Planter Set',
    category: 'hanging-products',
    price: 1999,
    originalPrice: 2999,
    description: 'Set of 3 tiered wooden hanging planters with jute rope. Each planter features drainage holes. Ideal for herbs and small plants.',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80'
    ],
    rating: 4.5,
    reviews: 76,
    inStock: true,
    featured: false,
    trending: true,
    dimensions: '15cm x 15cm per planter',
    material: 'Teak Wood + Jute',
    weight: '1.5 kg'
  },
  {
    id: 'hp3',
    name: 'Decorative Wind Chime',
    category: 'hanging-products',
    price: 1299,
    originalPrice: 1799,
    description: 'Handcrafted wooden wind chime with bamboo tubes and coconut shell top. Produces soothing, melodic tones. Beautiful natural aesthetic.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80'
    ],
    rating: 4.4,
    reviews: 112,
    inStock: true,
    featured: false,
    trending: false,
    dimensions: '15cm x 15cm x 60cm',
    material: 'Bamboo + Coconut Shell',
    weight: '0.4 kg'
  },
  {
    id: 'hp4',
    name: 'Porch Swing with Canopy',
    category: 'hanging-products',
    price: 24999,
    originalPrice: 34999,
    description: 'Two-seater porch swing with waterproof fabric canopy. Solid wood construction with chain hardware included. Supports up to 200kg.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80'
    ],
    rating: 4.8,
    reviews: 34,
    inStock: true,
    featured: true,
    trending: false,
    dimensions: '150cm x 70cm x 180cm',
    material: 'Teak Wood + Canvas',
    weight: '35 kg'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Bengaluru',
    rating: 5,
    text: 'Absolutely stunning furniture! The teak dining table is a masterpiece. The craftsmanship is exceptional and it arrived perfectly packaged. Woodharbour truly delivers premium quality.',
    avatar: '👩'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 5,
    text: 'Got our entire modular kitchen done by Woodharbour. From design to installation, everything was seamless. The attention to detail is remarkable. Highly recommended!',
    avatar: '👨'
  },
  {
    id: 3,
    name: 'Anitha Reddy',
    location: 'Hyderabad',
    rating: 5,
    text: 'The rosewood sofa set is beyond beautiful. Real wood, real craftsmanship. My living room looks like a luxury showroom now. Thank you Woodharbour team!',
    avatar: '👩'
  },
  {
    id: 4,
    name: 'Vikram Patel',
    location: 'Delhi',
    rating: 4,
    text: 'Ordered wooden toys for my kids and they love them! Non-toxic, well-made, and beautiful. So much better than plastic toys. Will order more for gifts.',
    avatar: '👨'
  },
  {
    id: 5,
    name: 'Meera Nair',
    location: 'Kochi',
    rating: 5,
    text: 'The hanging macrame chair is absolutely gorgeous and so comfortable! It is the centerpiece of our balcony now. Amazing quality at a fair price.',
    avatar: '👩'
  }
];
