const signatureImages = Object.values(
  import.meta.glob('../../Designs/S*', { eager: true, import: 'default' }),
).sort();
const tailoredImages = Object.values(
  import.meta.glob('../../Designs/B_DES/*', { eager: true, import: 'default' }),
).sort();
const occasionImages = Object.values(
  import.meta.glob('../../Designs/W_DES/*', { eager: true, import: 'default' }),
).sort();
const essentialsImages = Object.values(
  import.meta.glob('../../Designs/Same/*', { eager: true, import: 'default' }),
).sort();
const boutiqueImages = Object.values(
  import.meta.glob('../../Designs/B_DESS/*', { eager: true, import: 'default' }),
).sort();
const extraDesignImages = Object.entries(
  import.meta.glob('../../Designs/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    import: 'default',
  }),
)
  .filter(([path]) => !/\/S\d+\./i.test(path))
  .map(([, image]) => image)
  .sort();

export const homepageCarouselProducts = [
  {
    id: 'heritage-tailored-blazer',
    name: 'Heritage Tailored Blazer',
    collection: 'Limited Collection',
    price: '$129',
    priceValue: 129,
    originalPrice: '$149',
    originalPriceValue: 149,
    category: 'Outerwear',
    palette: 'apple',
    hoverPalette: 'apple-alt',
    imageSrc: signatureImages[0],
  },
  {
    id: 'pearl-slip-dress',
    name: 'Pearl Slip Dress',
    collection: 'Limited Collection',
    price: '$134',
    priceValue: 134,
    originalPrice: '$154',
    originalPriceValue: 154,
    category: 'Dresses',
    palette: 'peach',
    hoverPalette: 'peach-alt',
    imageSrc: signatureImages[1],
  },
  {
    id: 'atelier-shirt',
    name: 'Atelier Shirt',
    collection: 'Limited Collection',
    price: '$97',
    priceValue: 97,
    originalPrice: '$118',
    originalPriceValue: 118,
    category: 'Tops',
    palette: 'citrus',
    hoverPalette: 'citrus-alt',
    imageSrc: signatureImages[2],
  },
  {
    id: 'noir-column-skirt',
    name: 'Noir Column Skirt',
    collection: 'Limited Collection',
    price: '$112',
    priceValue: 112,
    originalPrice: '$132',
    originalPriceValue: 132,
    category: 'Bottoms',
    palette: 'berry',
    hoverPalette: 'berry-alt',
    imageSrc: signatureImages[3],
  },
  {
    id: 'resort-knit-set',
    name: 'Resort Knit Set',
    collection: 'Limited Collection',
    price: '$138',
    priceValue: 138,
    originalPrice: '$162',
    originalPriceValue: 162,
    category: 'Sets',
    palette: 'tropical',
    hoverPalette: 'tropical-alt',
    imageSrc: signatureImages[4],
  },
  {
    id: 'green-essentials-jacket',
    name: 'Green Essentials Jacket',
    collection: 'Limited Collection',
    price: '$125',
    priceValue: 125,
    originalPrice: '$148',
    originalPriceValue: 148,
    category: 'Outerwear',
    palette: 'greens',
    hoverPalette: 'greens-alt',
    imageSrc: extraDesignImages[0],
  },
];

export const featuredProduct = {
  id: 'heirloom-satin-dress',
  name: 'Heirloom Satin Dress',
  price: '$39',
  priceValue: 39,
  originalPrice: '$49',
  originalPriceValue: 49,
  reviews: 12,
  category: 'Dresses',
  palette: 'peach',
  hoverPalette: 'peach-alt',
  description:
    'This Heirloom Satin Dress features a fluid drape, a softly sculpted neckline, and an effortless silhouette designed for dinners, events, and elevated everyday wear.',
};

export const testimonials = [
  {
    quote:
      'The quality of every piece surprised me. The fit is flattering, elevated, and genuinely feels premium.',
    author: 'Samantha L.',
  },
  {
    quote:
      'Finally, a brand that makes clothes look polished without sacrificing comfort. Everything feels considered.',
    author: 'James K.',
  },
  {
    quote:
      'I have never received so many compliments on my outfits. Apple & Peaches just gets modern dressing.',
    author: 'Nina R.',
  },
  {
    quote:
      'The tailoring, palette, and finishing are all top tier. It feels far more expensive than it is.',
    author: 'Daniel M.',
  },
  {
    quote:
      'I love how versatile the collection is. I can style the same pieces for work, dinners, and travel.',
    author: 'Emma S.',
  },
  {
    quote:
      'The brand has such a strong visual identity. Every order feels luxe from packaging to fit.',
    author: 'Alex W.',
  },
];

export const blogPosts = [
  {
    id: 'capsule-wardrobe',
    title: 'How to Build a Weekly Capsule Wardrobe',
    excerpt:
      'A cleaner way to dress with fewer, better pieces that work from morning meetings to late dinners.',
    category: 'Style',
    date: 'Jan 16, 2026',
    palette: 'apple',
  },
  {
    id: 'fabric-story',
    title: 'Behind the Fabric: How We Source Texture',
    excerpt:
      'A closer look at the mills, finishings, and small design choices that shape every Apple & Peaches collection.',
    category: 'Journal',
    date: 'Jan 16, 2026',
    palette: 'greens',
  },
  {
    id: 'occasion-dressing',
    title: '5 Ways Thoughtful Dressing Changes Everything',
    excerpt:
      'From confidence to comfort, the right wardrobe can shift the way you move through every room.',
    category: 'Lifestyle',
    date: 'Mar 2, 2026',
    palette: 'peach',
  },
];

export const collectionCards = [
  { title: 'TAILORED OUTERWEAR', palette: 'greens' },
  { title: 'OCCASION DRESSES', palette: 'peach' },
  { title: 'APPLE & PEACHES ESSENTIALS', palette: 'apple' },
];

export const infiniteStripPalettes = [
  'apple',
  'peach',
  'greens',
  'citrus',
  'berry',
  'tropical',
  'apple-alt',
  'peach-alt',
];

export const shopProducts = [
  ...homepageCarouselProducts,
  {
    id: 'obsidian-trench',
    name: 'Obsidian Trench',
    collection: 'Outerwear',
    price: '$179',
    priceValue: 179,
    originalPrice: '$219',
    originalPriceValue: 219,
    category: 'Outerwear',
    palette: 'berry',
    hoverPalette: 'berry-alt',
    imageSrc: extraDesignImages[1],
  },
  {
    id: 'rose-line-dress',
    name: 'Rose Line Dress',
    collection: 'Dresses',
    price: '$142',
    priceValue: 142,
    originalPrice: '$169',
    originalPriceValue: 169,
    category: 'Dresses',
    palette: 'peach',
    hoverPalette: 'peach-alt',
    imageSrc: extraDesignImages[2],
  },
  {
    id: 'ivory-wrap-top',
    name: 'Ivory Wrap Top',
    collection: 'Essentials',
    price: '$118',
    priceValue: 118,
    originalPrice: '$149',
    originalPriceValue: 149,
    category: 'Tops',
    palette: 'citrus',
    hoverPalette: 'citrus-alt',
    imageSrc: tailoredImages[0],
  },
  {
    id: 'emerald-wide-leg',
    name: 'Emerald Wide Leg Trouser',
    collection: 'Bottoms',
    price: '$96',
    priceValue: 96,
    originalPrice: '$120',
    originalPriceValue: 120,
    category: 'Bottoms',
    palette: 'greens',
    hoverPalette: 'greens-alt',
    imageSrc: tailoredImages[1],
  },
  {
    id: 'opal-midi',
    name: 'Opal Midi Dress',
    collection: 'Dresses',
    price: '$154',
    priceValue: 154,
    originalPrice: '$184',
    originalPriceValue: 184,
    category: 'Dresses',
    palette: 'apple-alt',
    hoverPalette: 'peach-alt',
    imageSrc: tailoredImages[2],
  },
  {
    id: 'studio-knit-set',
    name: 'Studio Knit Set',
    collection: 'Sets',
    price: '$108',
    priceValue: 108,
    originalPrice: '$132',
    originalPriceValue: 132,
    category: 'Sets',
    palette: 'tropical',
    hoverPalette: 'tropical-alt',
    imageSrc: occasionImages[0],
  },
  {
    id: 'atelier-pleated-set',
    name: 'Atelier Pleated Set',
    collection: 'Occasion',
    price: '$166',
    priceValue: 166,
    originalPrice: '$196',
    originalPriceValue: 196,
    category: 'Sets',
    palette: 'apple',
    hoverPalette: 'apple-alt',
    imageSrc: occasionImages[1],
  },
  {
    id: 'sunline-cape',
    name: 'Sunline Cape',
    collection: 'Essentials',
    price: '$132',
    priceValue: 132,
    originalPrice: '$158',
    originalPriceValue: 158,
    category: 'Outerwear',
    palette: 'greens',
    hoverPalette: 'greens-alt',
    imageSrc: occasionImages[2],
  },
  {
    id: 'everyday-sculpt-top',
    name: 'Everyday Sculpt Top',
    collection: 'Essentials',
    price: '$92',
    priceValue: 92,
    originalPrice: '$114',
    originalPriceValue: 114,
    category: 'Tops',
    palette: 'citrus',
    hoverPalette: 'citrus-alt',
    imageSrc: essentialsImages[0],
  },
  {
    id: 'soft-drape-midi',
    name: 'Soft Drape Midi',
    collection: 'Boutique',
    price: '$148',
    priceValue: 148,
    originalPrice: '$176',
    originalPriceValue: 176,
    category: 'Dresses',
    palette: 'peach',
    hoverPalette: 'peach-alt',
    imageSrc: essentialsImages[1],
  },
  {
    id: 'gallery-brooch',
    name: 'Gallery Brooch',
    collection: 'Boutique',
    price: '$88',
    priceValue: 88,
    originalPrice: '$110',
    originalPriceValue: 110,
    category: 'Tops',
    palette: 'berry',
    hoverPalette: 'berry-alt',
    imageSrc: boutiqueImages[0],
  },
  {
    id: 'heirloom-wrap-jacket',
    name: 'Heirloom Wrap Jacket',
    collection: 'Boutique',
    price: '$184',
    priceValue: 184,
    originalPrice: '$214',
    originalPriceValue: 214,
    category: 'Outerwear',
    palette: 'greens',
    hoverPalette: 'greens-alt',
    imageSrc: boutiqueImages[1],
  },
  {
    id: 'studio-occasion-dress',
    name: 'Studio Occasion Dress',
    collection: 'Boutique',
    price: '$172',
    priceValue: 172,
    originalPrice: '$205',
    originalPriceValue: 205,
    category: 'Dresses',
    palette: 'apple-alt',
    hoverPalette: 'peach-alt',
    imageSrc: boutiqueImages[2],
  },
];

export const shopCategories = [
  'All',
  'Outerwear',
  'Dresses',
  'Tops',
  'Bottoms',
  'Sets',
];

export const faqItems = [
  {
    question: 'How do I place an order?',
    answer:
      'Browse the collection, add your preferred sizes to the bag, and head to checkout to confirm shipping details and payment.',
  },
  {
    question: 'How much does delivery cost?',
    answer:
      'Shipping is calculated at checkout based on your location, with complimentary delivery on all orders over $100.',
  },
  {
    question: 'What are the delivery methods?',
    answer:
      'We offer standard delivery, express shipping, and select priority options depending on region and stock availability.',
  },
  {
    question: 'How do I check product availability?',
    answer:
      'Availability is shown directly on each product card and detail page. Popular pieces update in real time as sizes sell out.',
  },
  {
    question: 'How do I exchange or return goods?',
    answer:
      'Returns and exchanges can be requested within 14 days of delivery as long as the garment is unworn and tags remain attached.',
  },
];
