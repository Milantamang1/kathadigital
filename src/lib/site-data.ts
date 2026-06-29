export const services = [
  {
    slug: "wedding-photography",
    title: "Wedding Photography",
    short: "Elegant wedding photography covering bridal portraits, ceremonies, receptions, and candid family memories.",
    image: "/katha-media/wedding4.jpeg",
  },
  {
    slug: "wedding-cinematography",
    title: "Wedding Cinematography",
    short: "Cinematic wedding films — highlight films, documentary edits, drone coverage, teasers, and full event films.",
    image: "/katha-media/wedding6.jpeg",
  },
  {
    slug: "event-coverage",
    title: "Event Coverage",
    short: "Professional photo and video coverage for corporate events, pageants, concerts, and cultural programs.",
    image: "/katha-media/event1.jpeg",
  },
  {
    slug: "product-photography",
    title: "Product Photography",
    short: "High-quality product photography for e-commerce, food, fashion, jewelry, cosmetics, and campaigns.",
    image: "/katha-media/event3.jpeg",
  },
  {
    slug: "commercial-production",
    title: "Commercial Production",
    short: "Creative commercials including brand videos, TV spots, corporate films, and digital advertisements.",
    image: "/katha-media/event2.jpeg",
  },
  {
    slug: "social-media-content",
    title: "Social Media Content",
    short: "Short-form videos, reels, promotional clips, BTS content, thumbnails, and campaign visuals.",
    image: "/katha-media/wedding7.jpeg",
  },
  {
    slug: "documentary",
    title: "Documentary Production",
    short: "Story-driven documentary films focused on people, culture, places, businesses, and inspiring journeys.",
    image: "/katha-media/mountain-view-trip.jpeg",
  },
  {
    slug: "corporate-video",
    title: "Corporate Video",
    short: "Professional videos for companies, training, promotion, branding, and corporate communication.",
    image: "/katha-media/wedding1.jpeg",
  },
];

export const portfolioCategories = [
  "All",
  "Weddings",
  "Pre-Wedding",
  "Engagement",
  "Events",
  "Products",
  "Commercial",
  "Travel",
  "Portraits",
] as const;

export const portfolio = [
  { title: "Red Saree Proposal", category: "Weddings", location: "Kathmandu, Nepal", date: "May 2025", desc: "A graceful proposal frame built around color, gesture, and a quiet cinematic pause.", image: "/katha-media/wedding-proposal.webp" },
  { title: "Ride Into Forever", category: "Pre-Wedding", location: "Bhaktapur", date: "Apr 2025", desc: "A playful pre-wedding sequence with classic styling, warm brick textures, and natural chemistry.", image: "/katha-media/wedding-bike-couple.webp" },
  { title: "Temple Courtyard Vows", category: "Weddings", location: "Kathmandu Valley", date: "Mar 2025", desc: "Traditional wedding portraits focused on texture, ritual detail, and intimate connection.", image: "/katha-media/wedding-traditional-close.webp" },
  { title: "Classic Embrace", category: "Weddings", location: "Patan", date: "Feb 2025", desc: "A soft, heritage-inspired couple portrait framed with traditional architecture.", image: "/katha-media/wedding-traditional-embrace.webp" },
  { title: "Forest Road Session", category: "Engagement", location: "Godawari", date: "Jan 2025", desc: "A calm green setting shaped into a romantic portrait story for a young couple.", image: "/katha-media/wedding-forest-couple.webp" },
  { title: "Journey Together", category: "Pre-Wedding", location: "Nagarkot Road", date: "Dec 2024", desc: "A road-trip inspired couple shoot with movement, direction, and relaxed storytelling.", image: "/katha-media/wedding-car-couple.webp" },
  { title: "Diva Supermodel Finale", category: "Events", location: "Kathmandu", date: "Nov 2024", desc: "Stage-lit pageant portraits captured with editorial clarity and event energy.", image: "/katha-media/event-winner-crown.webp" },
  { title: "Grand Finale Portraits", category: "Events", location: "Kathmandu", date: "Oct 2024", desc: "A refined event portrait series balancing glamour, lights, and confident expression.", image: "/katha-media/event-grand-finale.webp" },
  { title: "Mountain Story", category: "Travel", location: "Himalayan Region", date: "Sep 2024", desc: "A travel visual built around scale, solitude, and the feeling of reaching higher ground.", image: "/katha-media/mountain-view-trip.webp" },
  { title: "Studio Red", category: "Portraits", location: "Studio", date: "Aug 2024", desc: "A bold portrait session using clean light, color contrast, and confident styling.", image: "/katha-media/event-red-portrait.webp" },
];

export const youtubeVideos = [
  {
    id: "4akCjtmezHE",
    title: "Wedding Cinematography",
    type: "Wedding Film",
    description: "A polished wedding film shaped around emotion, ritual, detail, and cinematic pacing.",
  },
  {
    id: "Ju5HDbTcXMs",
    title: "Aerial Cinematography",
    type: "Drone View",
    description: "Sweeping aerial visuals shaped with scale, atmosphere, and a polished sense of place.",
  },
  {
    id: "ghe6mWFUw4c",
    title: "Music Video",
    type: "Music Video",
    description: "A performance-led visual with rhythm, movement, and a crisp digital finish.",
  },
  {
    id: "uNHlc8XwEyY",
    title: "Katha Mero Pani",
    type: "Talk Show",
    description: "Conversation-led storytelling with real voices and a thoughtful studio rhythm.",
  },
  {
    id: "7DCwXWVKbBo",
    title: "Gantavya",
    type: "Travel Story",
    description: "Travel storytelling shaped around place, culture, people, and movement.",
  },
  {
    id: "6OFqS_qlJB0",
    title: "Story Feature",
    type: "Human Story",
    description: "A story-led film focused on people, memory, and meaningful quiet details.",
  },
] as const;

export const testimonials = [
  { name: "Anjali Sharma", role: "Bride", quote: "Katha Digital didn't just film our wedding — they bottled the feeling of the day. Every frame is a memory." },
  { name: "Rajan Maharjan", role: "Founder, Himalayan Coffee Co.", quote: "Their brand film completely transformed how customers see us. Cinematic, emotional, on brand." },
  { name: "Priya Gurung", role: "Mrs Nepal 2025", quote: "Working with the team felt effortless. The coverage was world-class — both photo and motion." },
];

export const productions = {
  kathaMeroPani: {
    title: "Katha Mero Pani",
    type: "Talk Show",
    description:
      "A talk show featuring inspiring conversations, real stories, guest profiles, and meaningful discussions.",
    image: "/katha-media/event2.jpeg",
    episodes: [
      { num: "EP 01", title: "The Storyteller's Mind", guest: "Anil Pradhan", date: "May 14, 2025" },
      { num: "EP 02", title: "Crafting a Brand", guest: "Sunita Rai", date: "May 28, 2025" },
      { num: "EP 03", title: "Cinema & Culture", guest: "Deepak Tamang", date: "Jun 11, 2025" },
      { num: "EP 04", title: "The Mountain Mindset", guest: "Maya Sherpa", date: "Jun 25, 2025" },
    ],
  },
  gantavya: {
    title: "Gantavya Eak Katha",
    type: "Travel Vlog",
    description:
      "A travel vlog exploring destinations, culture, people, food, lifestyle, and local stories.",
    image: "/katha-media/mountain-view-trip.jpeg",
    destinations: ["Mustang", "Rara Lake", "Ilam", "Bandipur", "Manang", "Janakpur"],
    episodes: [
      { num: "EP 01", title: "Above the Clouds — Mustang", date: "Apr 02, 2025" },
      { num: "EP 02", title: "Rara, The Hidden Mirror", date: "Apr 16, 2025" },
      { num: "EP 03", title: "Tea Trails of Ilam", date: "Apr 30, 2025" },
    ],
  },
};

export const blogPosts = [
  { title: "How to Prepare for Your Wedding Photoshoot", category: "Wedding Tips", date: "Jun 02, 2025", author: "Sunil Shrestha", excerpt: "From outfit changes to golden hour timing — everything you need to know before your shoot.", image: "/katha-media/wedding2.jpeg" },
  { title: "Why Cinematic Wedding Films Are Worth It", category: "Photography", date: "May 24, 2025", author: "Editorial", excerpt: "A photo freezes a moment. A film makes you live it again.", image: "/katha-media/wedding6.jpeg" },
  { title: "Best Poses for Couple Photography", category: "Photography", date: "May 12, 2025", author: "Editorial", excerpt: "Posing that feels real — our framework for natural couple sessions.", image: "/katha-media/wedding7.jpeg" },
  { title: "How Product Photography Helps Your Business Grow", category: "Business Stories", date: "Apr 28, 2025", author: "Editorial", excerpt: "Studies show product imagery moves conversion more than copy. Here's why.", image: "/katha-media/event3.jpeg" },
  { title: "Behind the Scenes of Katha Mero Pani", category: "Media", date: "Apr 14, 2025", author: "Sunil Shrestha", excerpt: "Lighting a talk show set on a budget — what we learned in season one.", image: "/katha-media/event2.jpeg" },
  { title: "Travel Storytelling Through Video", category: "Travel Stories", date: "Mar 30, 2025", author: "Editorial", excerpt: "Five rules we follow when filming a place — and the one we always break.", image: "/katha-media/trip-picture.jpeg" },
];

export const blogCategories = [
  "All",
  "Entertainment",
  "Lifestyle",
  "Photography",
  "Events",
  "Culture",
  "Media",
  "Business Stories",
  "Wedding Tips",
  "Travel Stories",
  "Camera Reviews",
] as const;

export const events = {
  upcoming: [
    { name: "Mrs Nepal Finale 2026", date: "Jan 18, 2026", location: "Hyatt Regency, Kathmandu", desc: "Official media partner for the national finale.", image: "/katha-media/event1.jpeg" },
    { name: "Himalaya Fashion Week", date: "Feb 22, 2026", location: "Soaltee Hotel, Kathmandu", desc: "Three days of runway, backstage, and editorial.", image: "/katha-media/event2.jpeg" },
    { name: "Startup Nepal Summit", date: "Mar 09, 2026", location: "Yak & Yeti", desc: "Corporate event coverage and keynote films.", image: "/katha-media/event3.jpeg" },
  ],
  completed: [
    { name: "Mrs Nepal 2025", date: "Feb 2025", location: "Kathmandu", desc: "Full pageant coverage — pre-event, finale, and post.", image: "/katha-media/event1.jpeg" },
    { name: "Echoes Concert", date: "Dec 2024", location: "Bhrikutimandap", desc: "Live multi-cam concert film.", image: "/katha-media/event2.jpeg" },
    { name: "Excellence Awards 2024", date: "Nov 2024", location: "Soaltee", desc: "Annual corporate awards night coverage.", image: "/katha-media/event3.jpeg" },
  ],
};
