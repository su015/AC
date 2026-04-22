// Central configuration for Indian Refrigeration website
// All components must read from this file instead of hardcoding values.

const siteConfig = {
  business: {
    name: "Indian Refrigeration",
    tagline: "Cool Comfort, Guaranteed.",
    founded: "2008",
    description:
      "Premier AC sales, service & accessories partner in Sector 31, Noida. Trusted by 10,000+ homes & businesses.",
  },
  contact: {
    phone: "+91 98765 43210",
    phoneDial: "+919876543210",
    whatsapp: "919876543210",
    email: "contact@indianrefrigeration.in",
    address: {
      line1: "Shop No. 14, Main Market",
      line2: "Sector 31, Noida",
      city: "Noida",
      state: "Uttar Pradesh",
      pin: "201301",
      full: "Shop No. 14, Main Market, Sector 31, Noida, UP 201301",
    },
    hours: "Mon–Sun · 8:00 AM – 9:00 PM",
    location: {
      lat: 28.5733,
      lng: 77.3344,
    },
  },
  serviceAreas: [
    "Noida (All Sectors)",
    "Greater Noida",
    "Ghaziabad",
    "Delhi NCR",
    "Indirapuram",
    "Vaishali",
  ],
  theme: {
    primary: "#0EA5E9",
    primaryHover: "#0284C7",
    accent: "#00E5FF",
    textHeading: "#0C4A6E",
    textBody: "#334155",
    glassBorder: "rgba(14, 165, 233, 0.2)",
  },
  featureToggles: {
    snowParticles: true,
    threeDAC: true,
    threeDGlobe: true,
    stickyMobileBar: true,
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Services", href: "#services" },
    { label: "Shop", href: "#shop" },
    { label: "Contact", href: "#contact" },
  ],
  heroSlides: [
    {
      key: "sales",
      eyebrow: "AC Sales",
      title: "Premium Air Conditioners, Installed With Care.",
      subtitle:
        "Split, Window, Cassette & Commercial ACs from the world's top brands — at the most honest prices in Noida.",
      primaryCta: { label: "Explore Products", href: "#products" },
      secondaryCta: { label: "Talk To Expert", href: "#contact" },
    },
    {
      key: "services",
      eyebrow: "Repair & Service",
      title: "Same-Day AC Service By Certified Technicians.",
      subtitle:
        "Gas refilling, deep cleaning, installation & AMC — fast response across Sector 31 and all of Noida.",
      primaryCta: { label: "Book Service", href: "#contact" },
      secondaryCta: { label: "View Services", href: "#services" },
    },
    {
      key: "shop",
      eyebrow: "Accessories",
      title: "Genuine AC Accessories, Delivered Locally.",
      subtitle:
        "Remotes, hoses, covers, adapters — everything your AC needs. Enquire on WhatsApp for instant quotes.",
      primaryCta: { label: "Shop Now", href: "#shop" },
      secondaryCta: { label: "WhatsApp Us", href: "whatsapp" },
    },
  ],
  products: [
    {
      id: "split",
      name: "Split AC",
      specs: "1.0 – 2.0 Ton · Inverter · 5 Star",
      description:
        "Whisper-quiet cooling for bedrooms, living rooms & offices. Best-selling category.",
      image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "window",
      name: "Window AC",
      specs: "0.75 – 1.5 Ton · Fixed Speed · 3 Star+",
      description:
        "Compact, budget-friendly cooling — ideal for smaller rooms and rentals.",
      image: "/images/window.png",
    },
    {
      id: "cassette",
      name: "Cassette AC",
      specs: "2.0 – 4.0 Ton · 4-Way Airflow",
      description:
        "Ceiling-mounted luxury cooling for boardrooms, restaurants and showrooms.",
      image: "https://images.unsplash.com/photo-1621905252507-b354bc2d18c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "duct",
      name: "Duct AC",
      specs: "3.0 – 11.0 Ton · Concealed",
      description:
        "Hidden central cooling — uniform comfort for large homes and commercial spaces.",
      image: "/images/duct.png",
    },
    {
      id: "vrf",
      name: "VRF Systems",
      specs: "8 – 60 HP · Multi-Zone",
      description:
        "Intelligent, zoned cooling for offices, hotels & retail — designed, supplied & installed.",
      image: "/images/vrf.png",
    },
  ],
  services: [
    {
      id: "install",
      name: "AC Installation",
      icon: "Wrench",
      description:
        "Perfect fitment, copper piping, drainage & test runs — by BEE-certified engineers.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "repair",
      name: "Repair & Maintenance",
      icon: "Settings",
      description:
        "Cooling issues, leakage, noise, PCB failure — diagnosed & fixed same-day.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gas",
      name: "Gas Refilling",
      icon: "Droplets",
      description:
        "R-32, R-410A, R-22 — leak test, vacuuming, and top-up with genuine gas.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cleaning",
      name: "AC Deep Cleaning",
      icon: "Sparkles",
      description:
        "Jet-wash service for filters, coils & fins — restore up to 30% cooling efficiency.",
      image: "https://images.unsplash.com/photo-1590433431252-23c97b99801a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "amc",
      name: "Annual Maintenance (AMC)",
      icon: "CalendarCheck",
      description:
        "Year-round priority servicing plans starting ₹1,499 — covers 2–4 scheduled visits.",
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "fridge",
      name: "Refrigerator & Freezer",
      icon: "Refrigerator",
      description:
        "Repair, gas charging & compressor replacement for all fridges and deep freezers.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    },
  ],
  accessories: [
    {
      id: "remote",
      name: "Universal AC Remote",
      price: "₹299",
      image:
        "https://images.pexels.com/photos/9644760/pexels-photo-9644760.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
      description: "Works with 1000+ AC models. Instant replacement for lost remotes.",
    },
    {
      id: "hose",
      name: "Exhaust Hose (6ft)",
      price: "₹649",
      image:
        "https://images.pexels.com/photos/6667356/pexels-photo-6667356.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
      description: "Heavy-duty flexible exhaust for portable & window ACs.",
    },
    {
      id: "adapter",
      name: "Vacuum Port Adapter Kit",
      price: "₹399",
      image:
        "https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
      description: "Complete brass adapter set for R-32 / R-410A servicing.",
    },
    {
      id: "cover",
      name: "Outdoor AC Cover",
      price: "₹499",
      image:
        "https://images.pexels.com/photos/7641845/pexels-photo-7641845.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
      description: "UV & weatherproof cover — extends outdoor unit life by years.",
    },
  ],
  howItWorks: [
    { step: 1, title: "Book", desc: "Call, WhatsApp or fill the form in 30 seconds." },
    { step: 2, title: "Visit", desc: "Technician reaches your door at the scheduled slot." },
    { step: 3, title: "Service", desc: "Transparent diagnosis & fixed with genuine parts." },
    { step: 4, title: "Done", desc: "Pay only after you're 100% satisfied. 90-day warranty." },
  ],
  whyChooseUs: [
    { icon: "Zap", title: "Fast Response", desc: "Same-day service across Noida." },
    { icon: "Award", title: "Certified Technicians", desc: "15+ years of hands-on experience." },
    { icon: "IndianRupee", title: "Honest Pricing", desc: "No hidden charges. Upfront quotes." },
    { icon: "ShieldCheck", title: "Genuine Parts", desc: "OEM-only spares with warranty." },
    { icon: "MapPin", title: "Local Experts", desc: "Based in Sector 31 — we know Noida." },
    { icon: "HeartHandshake", title: "10,000+ Happy Customers", desc: "4.8★ rated across Google." },
  ],
  testimonials: [
    {
      name: "Priya Sharma",
      role: "Sector 50, Noida",
      rating: 5,
      text: "Booked in the morning, fixed by afternoon. The technician explained everything and charged exactly what was quoted. Finally a service I can trust.",
    },
    {
      name: "Rahul Mehta",
      role: "Business Owner, Sector 18",
      rating: 5,
      text: "Got 12 cassette ACs installed at our office. Crew was punctual, clean and professional. Highly recommend for commercial projects.",
    },
    {
      name: "Anjali Verma",
      role: "Indirapuram",
      rating: 5,
      text: "AC wasn't cooling. Three others quoted ₹8k+ for gas + compressor. Indian Refrigeration found it was just a loose wire. ₹500 and done.",
    },
    {
      name: "Vikram Singh",
      role: "Greater Noida",
      rating: 5,
      text: "Signed up for their AMC plan last year. Two scheduled visits, zero breakdowns this summer. Worth every rupee.",
    },
  ],
  api: {
    base: process.env.REACT_APP_BACKEND_URL,
    bookings: "/api/bookings",
    enquiries: "/api/enquiries",
  },
  brands: [
    { name: "Daikin", logo: "https://logo.clearbit.com/daikin.com" },
    { name: "LG", logo: "https://logo.clearbit.com/lg.com" },
    { name: "Samsung", logo: "https://logo.clearbit.com/samsung.com" },
    { name: "Panasonic", logo: "https://logo.clearbit.com/panasonic.com" },
    { name: "Hitachi", logo: "https://logo.clearbit.com/hitachi.com" },
    { name: "Carrier", logo: "https://logo.clearbit.com/carrier.com" },
    { name: "Mitsubishi", logo: "https://logo.clearbit.com/mitsubishielectric.com" },
    { name: "Voltas", logo: "https://logo.clearbit.com/voltas.com" },
    { name: "Blue Star", logo: "https://logo.clearbit.com/bluestarindia.com" },
    { name: "Haier", logo: "https://logo.clearbit.com/haier.com" }
  ],
};

export default siteConfig;
