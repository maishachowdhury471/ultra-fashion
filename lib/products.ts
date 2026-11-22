export type AgeGroup = 'Baby' | 'Boys' | 'Teens' | 'Men';

export interface Product {
  id: string;
  name: string;
  category: string;
  ageGroup: AgeGroup;
  ageLabel: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  sizes: string[];
  colors: string[];
  image: string;
  badge?: string;
  description: string;
}

export const AGE_GROUPS: { key: AgeGroup; label: string; range: string }[] = [
  { key: 'Baby', label: 'Baby', range: '0–2' },
  { key: 'Boys', label: 'Boys', range: '3–12' },
  { key: 'Teens', label: 'Teens', range: '13–19' },
  { key: 'Men', label: 'Men', range: '20+' },
];

export const CATEGORIES = [
  'Panjabi',
  'T-Shirt',
  'Polo',
  'Formal Shirt',
  'Jeans',
  'Hoodie',
  'Jacket',
  'Three-Piece Suit',
  'Sweater',
  'Shoes',
  'Sneakers',
  'Accessories',
];

export function formatPrice(n: number): string {
  return '৳' + n.toLocaleString('en-IN');
}

function img(id: string): string {
  return `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;
}

export const FALLBACK_IMG = img('photo-1521572163474-6864f9cf17ab');

interface Photo {
  url: string;
  colors: string[];
}

const PHOTOS: Photo[] = [
  { url: img('photo-1521572163474-6864f9cf17ab'), colors: ['White'] },
  { url: img('photo-1620012253295-c15cc3e65df4'), colors: ['Black'] },
  { url: img('photo-1594938298603-c8148c4dae35'), colors: ['Navy', 'Grey'] },
  { url: img('photo-1551028719-00167b16eac5'), colors: ['Brown', 'Black'] },
  { url: img('photo-1556821840-3a63f95609a7'), colors: ['Grey', 'Black'] },
  { url: img('photo-1542272604-787c3835535d'), colors: ['Blue'] },
  { url: img('photo-1549298916-b41d501d3772'), colors: ['Red', 'White'] },
  { url: img('photo-1560343090-f0409e92791a'), colors: ['Brown', 'Tan'] },
  { url: img('photo-1591047139829-d91aecb6caea'), colors: ['Olive', 'Green'] },
  { url: img('photo-1603252109303-2751441dd157'), colors: ['White', 'Blue'] },
  { url: img('photo-1617137968427-85924c800a22'), colors: ['Black', 'White'] },
  { url: img('photo-1503342217505-b0a15ec3261c'), colors: ['Yellow', 'White'] },
  { url: img('photo-1519238263530-99bdd11df2ea'), colors: ['White', 'Blue'] },
  { url: img('photo-1583743814966-8936f5b7be1a'), colors: ['Grey', 'White'] },
  { url: img('photo-1576566588028-4147f3842f27'), colors: ['White', 'Black'] },
];

export function sizesFor(ageGroup: AgeGroup, category: string): string[] {
  if (category === 'Shoes' || category === 'Sneakers')
    return ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];
  if (category === 'Accessories') return ['One Size'];
  if (ageGroup === 'Baby') return ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'];
  if (ageGroup === 'Boys') return ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'];
  if (ageGroup === 'Teens') return ['XS', 'S', 'M', 'L'];
  return ['S', 'M', 'L', 'XL', 'XXL'];
}

function ageLabel(ageGroup: AgeGroup): string {
  if (ageGroup === 'Baby') return 'Baby 0–2';
  if (ageGroup === 'Boys') return 'Boys 3–12';
  if (ageGroup === 'Teens') return 'Teens 13–19';
  return 'Men 20+';
}

const HANDWRITTEN: Product[] = [
  { id: 'p001', name: 'Baby White Cotton Romper Set', category: 'T-Shirt', ageGroup: 'Baby', ageLabel: 'Baby 0–2', price: 899, oldPrice: 1299, rating: 4.8, reviews: 214, stock: 42, sizes: sizesFor('Baby', 'T-Shirt'), colors: ['White'], image: PHOTOS[12].url, badge: 'Best Seller', description: 'Soft breathable cotton romper set for newborns. Gentle on skin, easy snap buttons.' },
  { id: 'p002', name: 'Baby Blue Everyday Bodysuit', category: 'T-Shirt', ageGroup: 'Baby', ageLabel: 'Baby 0–2', price: 649, oldPrice: 899, rating: 4.7, reviews: 156, stock: 58, sizes: sizesFor('Baby', 'T-Shirt'), colors: ['Blue', 'White'], image: PHOTOS[12].url, description: 'Everyday bodysuit in soft cotton with a comfortable stretch fit for babies.' },
  { id: 'p003', name: 'Boys Yellow Eid T-Shirt', category: 'T-Shirt', ageGroup: 'Boys', ageLabel: 'Boys 3–12', price: 749, oldPrice: 1099, rating: 4.9, reviews: 321, stock: 35, sizes: sizesFor('Boys', 'T-Shirt'), colors: ['Yellow', 'White'], image: PHOTOS[11].url, badge: 'Eid Special', description: 'Bright Eid T-shirt for boys. Premium cotton, bright colour that stays bright after wash.' },
  { id: 'p004', name: 'Boys White School Polo', category: 'Polo', ageGroup: 'Boys', ageLabel: 'Boys 3–12', price: 899, oldPrice: 1299, rating: 4.6, reviews: 98, stock: 64, sizes: sizesFor('Boys', 'Polo'), colors: ['White'], image: PHOTOS[0].url, description: 'Smart white polo for school and outings. Durable collar, soft pique cotton.' },
  { id: 'p005', name: 'Boys Navy Festive Panjabi', category: 'Panjabi', ageGroup: 'Boys', ageLabel: 'Boys 3–12', price: 1499, oldPrice: 2199, rating: 4.9, reviews: 402, stock: 28, sizes: sizesFor('Boys', 'Panjabi'), colors: ['Navy'], image: PHOTOS[2].url, badge: 'Best Seller', description: 'Festive navy panjabi for boys. Elegant cut, comfortable for all-day wear at Eid.' },
  { id: 'p006', name: 'Teen Black Street Hoodie', category: 'Hoodie', ageGroup: 'Teens', ageLabel: 'Teens 13–19', price: 1799, oldPrice: 2599, rating: 4.8, reviews: 512, stock: 31, sizes: sizesFor('Teens', 'Hoodie'), colors: ['Black'], image: PHOTOS[1].url, badge: 'Best Seller', description: 'Street-style black hoodie with kangaroo pocket and warm fleece lining.' },
  { id: 'p007', name: 'Teen Grey Everyday Hoodie', category: 'Hoodie', ageGroup: 'Teens', ageLabel: 'Teens 13–19', price: 1599, oldPrice: 2299, rating: 4.7, reviews: 289, stock: 44, sizes: sizesFor('Teens', 'Hoodie'), colors: ['Grey'], image: PHOTOS[4].url, description: 'Soft grey hoodie for daily wear. Pre-shrunk fleece, ribbed cuffs and hem.' },
  { id: 'p008', name: 'Teen White Graphic T-Shirt', category: 'T-Shirt', ageGroup: 'Teens', ageLabel: 'Teens 13–19', price: 799, oldPrice: 1199, rating: 4.6, reviews: 187, stock: 73, sizes: sizesFor('Teens', 'T-Shirt'), colors: ['White', 'Black'], image: PHOTOS[14].url, description: 'Clean white graphic tee. 100% cotton, regular fit, print that does not crack.' },
  { id: 'p009', name: 'Teen Blue Skinny Jeans', category: 'Jeans', ageGroup: 'Teens', ageLabel: 'Teens 13–19', price: 1899, oldPrice: 2799, rating: 4.7, reviews: 264, stock: 39, sizes: sizesFor('Teens', 'Jeans'), colors: ['Blue'], image: PHOTOS[5].url, description: 'Stretch blue skinny jeans for teens. Comfortable, durable denim with a modern fit.' },
  { id: 'p010', name: 'Men White Premium T-Shirt', category: 'T-Shirt', ageGroup: 'Men', ageLabel: 'Men 20+', price: 999, oldPrice: 1499, rating: 4.8, reviews: 876, stock: 120, sizes: sizesFor('Men', 'T-Shirt'), colors: ['White'], image: PHOTOS[0].url, badge: 'Best Seller', description: 'Premium heavyweight white tee. Thick cotton, no transparency, perfect regular fit.' },
  { id: 'p011', name: 'Men Black Slim Polo', category: 'Polo', ageGroup: 'Men', ageLabel: 'Men 20+', price: 1299, oldPrice: 1899, rating: 4.7, reviews: 431, stock: 66, sizes: sizesFor('Men', 'Polo'), colors: ['Black', 'White'], image: PHOTOS[10].url, description: 'Slim-fit black polo with a structured collar. Smart for office and casual days.' },
  { id: 'p012', name: 'Men Navy Three-Piece Suit', category: 'Three-Piece Suit', ageGroup: 'Men', ageLabel: 'Men 20+', price: 8999, oldPrice: 12999, rating: 4.9, reviews: 198, stock: 15, sizes: sizesFor('Men', 'Three-Piece Suit'), colors: ['Navy', 'Grey'], image: PHOTOS[2].url, badge: 'Premium', description: 'Sharp navy three-piece suit. Jacket, waistcoat and trousers in a fine wool blend.' },
  { id: 'p013', name: 'Men Brown Leather Jacket', category: 'Jacket', ageGroup: 'Men', ageLabel: 'Men 20+', price: 4999, oldPrice: 7499, rating: 4.8, reviews: 342, stock: 22, sizes: sizesFor('Men', 'Jacket'), colors: ['Brown', 'Black'], image: PHOTOS[3].url, badge: 'Premium', description: 'Classic brown leather jacket. Genuine-feel finish, quilted lining, zip pockets.' },
  { id: 'p014', name: 'Men Olive Field Jacket', category: 'Jacket', ageGroup: 'Men', ageLabel: 'Men 20+', price: 3499, oldPrice: 4999, rating: 4.6, reviews: 167, stock: 27, sizes: sizesFor('Men', 'Jacket'), colors: ['Olive', 'Green'], image: PHOTOS[8].url, description: 'Utility olive field jacket with four pockets. Water-resistant shell, breathable lining.' },
  { id: 'p015', name: 'Men Blue Everyday Jeans', category: 'Jeans', ageGroup: 'Men', ageLabel: 'Men 20+', price: 2199, oldPrice: 3199, rating: 4.8, reviews: 654, stock: 89, sizes: sizesFor('Men', 'Jeans'), colors: ['Blue'], image: PHOTOS[5].url, badge: 'Best Seller', description: 'Everyday blue jeans with a little stretch. Straight fit, five pockets, fade-resistant.' },
  { id: 'p016', name: 'Men White Formal Shirt', category: 'Formal Shirt', ageGroup: 'Men', ageLabel: 'Men 20+', price: 1699, oldPrice: 2499, rating: 4.7, reviews: 298, stock: 54, sizes: sizesFor('Men', 'Formal Shirt'), colors: ['White', 'Blue'], image: PHOTOS[9].url, description: 'Crisp white formal shirt. Wrinkle-resistant cotton, perfect for office and events.' },
  { id: 'p017', name: 'Men Red Running Sneakers', category: 'Sneakers', ageGroup: 'Men', ageLabel: 'Men 20+', price: 3999, oldPrice: 5999, rating: 4.9, reviews: 721, stock: 41, sizes: sizesFor('Men', 'Sneakers'), colors: ['Red', 'White'], image: PHOTOS[6].url, badge: 'Best Seller', description: 'Lightweight red running sneakers with cushioned sole and breathable mesh upper.' },
  { id: 'p018', name: 'Men Brown Leather Shoes', category: 'Shoes', ageGroup: 'Men', ageLabel: 'Men 20+', price: 4499, oldPrice: 6499, rating: 4.8, reviews: 233, stock: 19, sizes: sizesFor('Men', 'Shoes'), colors: ['Brown', 'Tan'], image: PHOTOS[7].url, badge: 'Premium', description: 'Polished brown leather shoes. Comfort insole, durable sole, formal and smart.' },
  { id: 'p019', name: 'Men Grey Winter Sweater', category: 'Sweater', ageGroup: 'Men', ageLabel: 'Men 20+', price: 1999, oldPrice: 2999, rating: 4.7, reviews: 176, stock: 47, sizes: sizesFor('Men', 'Sweater'), colors: ['Grey', 'White'], image: PHOTOS[13].url, description: 'Warm grey knit sweater. Soft acrylic-wool blend, ribbed neck, cuffs and hem.' },
  { id: 'p020', name: 'Men Black Casual T-Shirt', category: 'T-Shirt', ageGroup: 'Men', ageLabel: 'Men 20+', price: 899, oldPrice: 1399, rating: 4.6, reviews: 543, stock: 95, sizes: sizesFor('Men', 'T-Shirt'), colors: ['Black'], image: PHOTOS[1].url, description: 'Everyday black tee in soft combed cotton. Regular fit, crew neck, pre-shrunk.' },
  { id: 'p021', name: 'Boys Blue Denim Jacket', category: 'Jacket', ageGroup: 'Boys', ageLabel: 'Boys 3–12', price: 1999, oldPrice: 2899, rating: 4.7, reviews: 143, stock: 26, sizes: sizesFor('Boys', 'Jacket'), colors: ['Blue', 'White'], image: PHOTOS[9].url, description: 'Classic blue denim jacket for boys. Sturdy stitching, button front, chest pockets.' },
  { id: 'p022', name: 'Men Navy Eid Panjabi', category: 'Panjabi', ageGroup: 'Men', ageLabel: 'Men 20+', price: 2499, oldPrice: 3599, rating: 4.9, reviews: 467, stock: 33, sizes: sizesFor('Men', 'Panjabi'), colors: ['Navy'], image: PHOTOS[2].url, badge: 'Eid Special', description: 'Elegant navy Eid panjabi in premium cotton. Mandarin collar, perfect festive fit.' },
];

// Deterministic generation: 278 more products, total exactly 300.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STYLES = ['Classic', 'Premium', 'Everyday', 'Street', 'Urban', 'Comfort', 'Signature', 'Essential', 'Modern', 'Heritage'];
const AGE_WORDS: Record<AgeGroup, string> = { Baby: 'Baby', Boys: 'Boys', Teens: 'Teen', Men: 'Men' };
const AGE_KEYS: AgeGroup[] = ['Baby', 'Boys', 'Teens', 'Men'];

function generated(): Product[] {
  const rand = mulberry32(42);
  const out: Product[] = [];
  for (let i = 0; i < 278; i++) {
    const n = i + 23; // product number 23..300
    const ageGroup = AGE_KEYS[i % 4];
    const category = CATEGORIES[(i * 5 + Math.floor(i / 4)) % CATEGORIES.length];
    const photo = PHOTOS[(i * 7 + 3) % PHOTOS.length];
    const color = photo.colors[Math.floor(rand() * photo.colors.length)];
    const style = STYLES[Math.floor(rand() * STYLES.length)];
    const price = 499 + Math.floor(rand() * 4500);
    const discount = 0.2 + rand() * 0.25;
    const oldPrice = Math.round(price / (1 - discount) / 10) * 10;
    const rating = Math.round((3.8 + rand() * 1.2) * 10) / 10;
    out.push({
      id: `p${String(n).padStart(3, '0')}`,
      name: `${AGE_WORDS[ageGroup]} ${color} ${category} — ${style} Edition ${String(n).padStart(3, '0')}`,
      category,
      ageGroup,
      ageLabel: ageLabel(ageGroup),
      price,
      oldPrice: Math.max(oldPrice, price + 100),
      rating,
      reviews: 12 + Math.floor(rand() * 600),
      stock: 5 + Math.floor(rand() * 90),
      sizes: sizesFor(ageGroup, category),
      colors: [color],
      image: photo.url,
      badge: rating >= 4.8 ? 'Best Seller' : undefined,
      description: `${style} ${color.toLowerCase()} ${category.toLowerCase()} for ${ageLabel(ageGroup).toLowerCase()}. Quality fabric, comfortable fit, made for everyday wear in Bangladesh.`,
    });
  }
  return out;
}

export const PRODUCTS: Product[] = [...HANDWRITTEN, ...generated()];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function relatedProducts(product: Product, count = 4): Product[] {
  const same = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.ageGroup === product.ageGroup));
  return same.slice(0, count);
}
