export type MerchVariant = {
  label: string;
  sku: string;
  inventory: number;
};

export type MerchProduct = {
  name: string;
  sku: string;
  image: string;
  price: string;
  description: string;
  status: "Coming Soon" | "Preorder Coming Soon";
  tone: string;
  category: "apparel" | "accessory" | "home" | "print";
  variants: MerchVariant[];
  inventory: number;
  concepts?: string[];
  slogans?: string[];
};

export const merchProducts: MerchProduct[] = [
  {
    name: "FEDUP Signature T-Shirt",
    sku: "FEDUP-TEE-SIGNATURE",
    image: "/images/merch/fedup-signature-tee.svg",
    price: "$34",
    description: "Heavyweight black cotton tee with gold logo and statement design concepts.",
    status: "Preorder Coming Soon",
    tone: "Premium black cotton",
    category: "apparel",
    inventory: 0,
    variants: ["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => ({
      label: size,
      sku: `FEDUP-TEE-SIGNATURE-${size}`,
      inventory: 0,
    })),
    concepts: ["Front logo only", "Large back statement design", "Typography-based design"],
    slogans: ["From Prison to Purpose", "Pain Into Purpose"],
  },
  {
    name: "FEDUP Premium Hoodie",
    sku: "FEDUP-HOODIE-PREMIUM",
    image: "/images/merch/fedup-premium-hoodie.svg",
    price: "$72",
    description: "Premium fleece hoodie with chest logo, sleeve accent, and back statement options.",
    status: "Preorder Coming Soon",
    tone: "Luxury black fleece",
    category: "apparel",
    inventory: 0,
    variants: ["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => ({
      label: size,
      sku: `FEDUP-HOODIE-PREMIUM-${size}`,
      inventory: 0,
    })),
    concepts: ["Front logo only", "Large back movement design", "Sleeve typography accent"],
    slogans: ["FEDUP: The Movement", "Survival. Redemption. Purpose."],
  },
  {
    name: "FEDUP Hat / Snapback",
    sku: "FEDUP-HAT-SNAPBACK",
    image: "/images/merch/fedup-statement-hat.svg",
    price: "$32",
    description: "Structured black snapback with embroidered gold FEDUP branding.",
    status: "Coming Soon",
    tone: "Embroidered structured cap",
    category: "accessory",
    inventory: 0,
    variants: [{ label: "One Size", sku: "FEDUP-HAT-SNAPBACK-OS", inventory: 0 }],
    slogans: ["FEDUP: The Movement"],
  },
  {
    name: "FEDUP Coffee Mug",
    sku: "FEDUP-MUG-BLACK-GOLD",
    image: "/images/merch/fedup-coffee-mug.svg",
    price: "$24",
    description: "Matte black ceramic mug with clean gold FEDUP branding.",
    status: "Coming Soon",
    tone: "Matte ceramic",
    category: "home",
    inventory: 0,
    variants: [{ label: "12 oz", sku: "FEDUP-MUG-BLACK-GOLD-12OZ", inventory: 0 }],
    slogans: ["Pain Into Purpose"],
  },
  {
    name: "FEDUP Tote Bag",
    sku: "FEDUP-TOTE-LUXURY",
    image: "/images/merch/fedup-tote-bag.svg",
    price: "$28",
    description: "Minimal black canvas tote with gold logo and purpose-driven typography.",
    status: "Coming Soon",
    tone: "Luxury canvas utility",
    category: "accessory",
    inventory: 0,
    variants: [{ label: "Standard", sku: "FEDUP-TOTE-LUXURY-STD", inventory: 0 }],
    slogans: ["Females Ending Defeat Unleashing Purpose"],
  },
  {
    name: "FEDUP Wall Poster",
    sku: "FEDUP-POSTER-CINEMATIC",
    image: "/images/merch/fedup-wall-poster.svg",
    price: "$30",
    description: "Cinematic FEDUP wall print with black, gold, and white documentary branding.",
    status: "Coming Soon",
    tone: "Archival wall print",
    category: "print",
    inventory: 0,
    variants: [
      { label: "18x24", sku: "FEDUP-POSTER-CINEMATIC-18X24", inventory: 0 },
      { label: "24x36", sku: "FEDUP-POSTER-CINEMATIC-24X36", inventory: 0 },
    ],
    slogans: ["Survival. Redemption. Purpose.", "From Prison to Purpose"],
  },
];
