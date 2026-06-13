/**
 * Mock-first property data for Taylor Made Salcombe.
 *
 * This is the single source of truth for the running app today. It is designed
 * so a Sanity backend can replace it later WITHOUT touching pages — all reads
 * go through lib/data.ts, which currently maps onto this array. See
 * sanity/README.md and docs/concierge-platform-technical-design.md.
 *
 * NOTE: All `images` use keyworded LoremFlickr placeholders. Replace with
 * Taylor Made's genuine photography (likely via a Sanity image CDN) before
 * launch.
 */

export type PropertyLocation = "Salcombe" | "Thurlestone" | "South Hams";

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: PropertyLocation;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  dogFriendly: boolean;
  seaView: boolean;
  hotTub: boolean;
  pricePerWeekFrom: number;
  reviewScore: number;
  reviewLabel: string;
  instantBook: boolean;
  shortDescription: string;
  longDescription: string;
  amenities: string[];
  images: string[];
}

/** Build a luxurious-looking keyworded placeholder image URL. */
function placeholder(width: number, height: number, keywords: string): string {
  return `https://loremflickr.com/${width}/${height}/${keywords}`;
}

const COASTAL = "salcombe,devon,coast,sea";
const INTERIOR = "interior,luxury,home";

function gallery(seedKeywords: string): string[] {
  return [
    placeholder(1200, 800, COASTAL),
    placeholder(800, 600, INTERIOR),
    placeholder(800, 600, `${seedKeywords},interior`),
    placeholder(800, 600, "kitchen,luxury,interior"),
    placeholder(800, 600, "bedroom,luxury,coastal"),
    placeholder(800, 600, "devon,coast,view"),
  ];
}

export const properties: Property[] = [
  {
    id: "prop-hytti",
    slug: "hytti",
    name: "Hytti",
    location: "Salcombe",
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    dogFriendly: true,
    seaView: true,
    hotTub: true,
    pricePerWeekFrom: 2100,
    reviewScore: 4.9,
    reviewLabel: "Exceptional",
    instantBook: true,
    shortDescription:
      "A light-filled contemporary home with sea views, moments from the water in Salcombe.",
    longDescription:
      "Hytti is a calm, contemporary retreat built around the light and the view. Floor-to-ceiling glass frames the estuary, while the open-plan living space flows out to a sun-trap terrace made for slow mornings and long evenings. Three generous bedrooms, two beautifully finished bathrooms and a kitchen designed for gathering — and, when you'd rather not cook, for a private chef to take over. Dogs are welcome, so the whole family can come.",
    amenities: [
      "Estuary sea views",
      "Hot tub",
      "Sun-trap terrace",
      "Dog-friendly",
      "Open-plan living",
      "Designer kitchen",
      "Wood-burning stove",
      "Fast Wi-Fi",
      "Off-street parking",
      "Welcome hamper",
    ],
    images: gallery("salcombe,contemporary"),
  },
  {
    id: "prop-sea-chest",
    slug: "sea-chest",
    name: "Sea Chest",
    location: "Salcombe",
    sleeps: 4,
    bedrooms: 2,
    bathrooms: 2,
    dogFriendly: true,
    seaView: true,
    hotTub: false,
    pricePerWeekFrom: 1800,
    reviewScore: 4.8,
    reviewLabel: "Exceptional",
    instantBook: true,
    shortDescription:
      "A cosy coastal cottage moments from the water, perfect for couples and small families.",
    longDescription:
      "Sea Chest is the quintessential Salcombe bolt-hole — a cosy coastal cottage just a short stroll from the harbour. Inside, it's been thoughtfully restored: a snug sitting room, a bright kitchen and two restful bedrooms, each with its own bathroom. Step out and you're moments from the water, the ferry and the town's best tables. Bring the dog and make it a proper escape.",
    amenities: [
      "Glimpses of the sea",
      "Short walk to harbour",
      "Dog-friendly",
      "Restored coastal cottage",
      "Two en-suite bedrooms",
      "Cosy sitting room",
      "Fast Wi-Fi",
      "Welcome hamper",
    ],
    images: gallery("salcombe,cottage"),
  },
  {
    id: "prop-four-the-reach",
    slug: "four-the-reach",
    name: "Four The Reach",
    location: "Salcombe",
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 3,
    dogFriendly: false,
    seaView: true,
    hotTub: true,
    pricePerWeekFrom: 3100,
    reviewScore: 5.0,
    reviewLabel: "Exceptional",
    instantBook: false,
    shortDescription:
      "A generous waterside home for larger gatherings, with panoramic estuary views.",
    longDescription:
      "Four The Reach is made for the gatherings you remember for years. A grand, light-flooded living space opens onto a terrace with panoramic estuary views, while four elegant bedrooms and three bathrooms give everyone room to breathe. The kitchen is a chef's dream — and our private-catering team love working in it. With a hot tub above the water and the town a short walk away, it's the address for milestone celebrations.",
    amenities: [
      "Panoramic estuary views",
      "Hot tub",
      "Terrace dining",
      "Chef's kitchen",
      "Sleeps eight in comfort",
      "Three bathrooms",
      "Fast Wi-Fi",
      "Off-street parking",
      "Welcome hamper",
    ],
    images: gallery("devon,luxury,waterside"),
  },
  {
    id: "prop-summer-cottage",
    slug: "summer-cottage",
    name: "Summer Cottage",
    location: "Thurlestone",
    sleeps: 6,
    bedrooms: 4,
    bathrooms: 3,
    dogFriendly: true,
    seaView: true,
    hotTub: false,
    pricePerWeekFrom: 1450,
    reviewScore: 4.9,
    reviewLabel: "Exceptional",
    instantBook: true,
    shortDescription:
      "A relaxed family home in Thurlestone, a short stroll from the beach and golf links.",
    longDescription:
      "Summer Cottage is everything a Thurlestone holiday should be — relaxed, generous and just up from the sand. Four bedrooms and three bathrooms make it an easy fit for families, while the big farmhouse kitchen and garden are where the days begin and end. The beach, the golf links and the coast path are all within a stroll. Dogs are very welcome.",
    amenities: [
      "Sea views",
      "Short walk to beach",
      "Dog-friendly",
      "Large garden",
      "Farmhouse kitchen",
      "Family-friendly layout",
      "Fast Wi-Fi",
      "Off-street parking",
      "Welcome hamper",
    ],
    images: gallery("thurlestone,devon"),
  },
  {
    id: "prop-the-cottage",
    slug: "the-cottage",
    name: "The Cottage",
    location: "Salcombe",
    sleeps: 4,
    bedrooms: 2,
    bathrooms: 1,
    dogFriendly: true,
    seaView: false,
    hotTub: false,
    pricePerWeekFrom: 1800,
    reviewScore: 4.7,
    reviewLabel: "Exceptional",
    instantBook: false,
    shortDescription:
      "A characterful town cottage tucked into the heart of Salcombe, steps from everything.",
    longDescription:
      "The Cottage is a characterful hideaway in the very heart of Salcombe — the kind of place you settle into and never want to leave. Two comfortable bedrooms, a welcoming sitting room and a sweet courtyard make it ideal for couples or a small family. Everything is on the doorstep: the harbour, the shops, the ferry and the town's finest restaurants. Dogs welcome.",
    amenities: [
      "Heart of Salcombe",
      "Courtyard garden",
      "Dog-friendly",
      "Steps from the harbour",
      "Characterful interiors",
      "Fast Wi-Fi",
      "Welcome hamper",
    ],
    images: gallery("salcombe,town,cottage"),
  },
  {
    id: "prop-spion-lodge",
    slug: "spion-lodge",
    name: "Spion Lodge",
    location: "South Hams",
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 4,
    dogFriendly: true,
    seaView: true,
    hotTub: true,
    pricePerWeekFrom: 3350,
    reviewScore: 5.0,
    reviewLabel: "Exceptional",
    instantBook: false,
    shortDescription:
      "An elevated retreat with panoramic coastal views across the South Hams.",
    longDescription:
      "Spion Lodge sits high above the South Hams, with views that stretch out across the coast and out to sea. It's an architectural retreat designed for indulgence: four bedrooms each with their own bathroom, a vast living space framed by glass, and a hot tub positioned for sunsets. This is the house for a special week — a big birthday, a family reunion, a celebration that deserves a backdrop like no other.",
    amenities: [
      "Panoramic coastal views",
      "Hot tub with a view",
      "Four en-suite bedrooms",
      "Dog-friendly",
      "Architectural living space",
      "Chef's kitchen",
      "Fast Wi-Fi",
      "Ample parking",
      "Welcome hamper",
    ],
    images: gallery("devon,coast,lodge"),
  },
];
