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
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Shop", href: "/shop" },
    { label: "Contact", href: "/#contact" },
  ],
  heroSlides: [

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
  shopProducts: [
    {
      id: "split-daikin-15",
      name: "Daikin 1.5 Ton 5 Star Inverter Split AC",
      category: "AC",
      price: 44500,
      brand: "Daikin",
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
      images: [
        "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
        "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"
      ],
      description: "Model No. : FTKL50UV16 1.5 Ton, suitable for room size up to 150 sq ft. 5 Star BEE Rating 2024. PM 2.5 filter. Energy efficient, best-in-class cooling with easy maintenance. Econo Mode: Auto-adjusts the temperature to ensure comfort during your sleep. Warranty: 1 year comprehensive, 5 years on PCB, 10 Years on compressor.",
      specs: { capacity: "1.5 Ton", rating: "5 Star", type: "Inverter Split", warranty: "1 Year Comprehensive" },
      features: ["PM 2.5 Filter", "Triple Display", "Dew Clean Technology", "100% Copper"]
    },
    {
      id: "window-lg-15",
      name: "LG 1.5 Ton 3 Star Dual Inverter Window AC",
      category: "AC",
      price: 32900,
      brand: "LG",
      image: "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946",
      images: ["https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"],
      description: "LG Window AC with Dual Inverter Compressor: Varied speed dual rotary motor has a wider rotational frequency which saves more energy along with higher speed cooling range than conventional compressors.",
      specs: { capacity: "1.5 Ton", rating: "3 Star", type: "Window AC", warranty: "1 Year" },
      features: ["Dual Inverter", "Clean Air Filter", "Top Discharge", "Low Gas Detection"]
    },
    {
      id: "split-blue-star-15",
      name: "Blue Star 1.5 Ton 5 Star Inverter Split AC",
      category: "AC",
      price: 46900,
      brand: "Blue Star",
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
      images: ["https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png"],
      description: "Blue Star Inverter Split AC with Brushless DC motor for high reliability and noise-less operation.",
      specs: { capacity: "1.5 Ton", rating: "5 Star", type: "Inverter", warranty: "1 Year" },
      features: ["Dust Filter", "Self Diagnosis", "Eco Mode", "Hidden Display"]
    },
    {
      id: "split-samsung-20",
      name: "Samsung 2.0 Ton 3 Star Inverter Split AC",
      category: "AC",
      price: 52000,
      brand: "Samsung",
      image: "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946",
      images: ["https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"],
      description: "Powerful cooling for large living rooms. Digital Inverter Boost technology cools the air 43% faster.",
      specs: { capacity: "2.0 Ton", rating: "3 Star", type: "Inverter", warranty: "1 Year" },
      features: ["Fast Cooling", "Tri-Care Filter", "Auto Clean", "Good Sleep Mode"]
    },
    {
      id: "cassette-daikin-30",
      name: "Daikin 3.0 Ton Cassette AC",
      category: "AC",
      price: 88000,
      brand: "Daikin",
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
      images: ["https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png"],
      description: "Ceiling-mounted cooling for commercial spaces. 4-way airflow ensures uniform temperature distribution.",
      specs: { capacity: "3.0 Ton", rating: "Non-Star", type: "Cassette", warranty: "1 Year" },
      features: ["4-Way Airflow", "Silent Operation", "Fresh Air Intake", "Easy Maintenance"]
    },
    {
      id: "remote-uni",
      name: "Universal AC Remote",
      category: "Accessory",
      price: 299,
      brand: "Universal",
      image: "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946",
      images: ["https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"],
      description: "Works with 1000+ AC models including Daikin, LG, Samsung, Voltas, and more.",
      specs: { range: "10 Meters", battery: "2 x AAA", compatibility: "1000+ Brands" },
      features: ["LCD Display", "Auto-Search", "Night Glow Buttons"]
    },
    {
      id: "remote-lg",
      name: "LG Original AC Remote",
      category: "Accessory",
      price: 750,
      brand: "LG",
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
      images: ["https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png"],
      description: "Original replacement remote for all LG Inverter and Non-Inverter split ACs.",
      specs: { compatibility: "LG Split ACs", range: "8 Meters", battery: "2 x AAA" },
      features: ["Energy Save Button", "Timer Function", "Mode Selection"]
    },
    {
      id: "pcb-universal",
      name: "Universal Split AC PCB Kit",
      category: "Accessory",
      price: 1250,
      brand: "Indian Ref",
      image: "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946",
      images: ["https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"],
      description: "Full logic control PCB kit for repairing old split ACs.",
      specs: { voltage: "220V", types: "Universal", includes: "Remote + PCB" },
      features: ["Auto Restart", "5 Working Modes", "Fan Speed Control"]
    },
    {
      id: "gas-r32",
      name: "R-32 Refrigerant Gas (1kg Can)",
      category: "Accessory",
      price: 1100,
      brand: "Floron",
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
      images: ["https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png"],
      description: "Pure R-32 refrigerant for modern inverter ACs.",
      specs: { weight: "1kg", type: "R-32", purity: "99.9%" },
      features: ["Eco-Friendly", "High Efficiency", "Sealed Packaging"]
    },
    {
      id: "bracket-outdoor",
      name: "Heavy Duty Outdoor Unit Bracket",
      category: "Accessory",
      price: 950,
      brand: "Generic",
      image: "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946",
      images: ["https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"],
      description: "Wall mounting bracket for outdoor units. Made of galvanized steel.",
      specs: { material: "Galvanized Steel", capacity: "Up to 100kg", coating: "Powder Coated" },
      features: ["Anti-Vibration Pads", "Easy Assembly", "Rust Proof"]
    },
    {
      id: "copper-pipe",
      name: "Copper Pipe Set (10ft) with Insulation",
      category: "Accessory",
      price: 2400,
      brand: "Mandev",
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
      images: ["https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png"],
      description: "Pre-flared copper tubes for 1.5 Ton AC installation.",
      specs: { length: "10 Feet", sizes: "1/4\" & 1/2\"", insulation: "6mm Foam" },
      features: ["99.9% Pure Copper", "Seamless Finish", "Easy Bending"]
    },
    {
      id: "drain-pipe",
      name: "Flexible AC Drain Pipe (15ft)",
      category: "Accessory",
      price: 350,
      brand: "ProWash",
      image: "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946",
      images: ["https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"],
      description: "Corrugated flexible pipe for water drainage.",
      specs: { length: "15 Feet", diameter: "16mm", material: "UV-PVC" },
      features: ["Highly Flexible", "Long Lasting", "Standard Fit"]
    },
    {
      id: "stabilizer-vguard",
      name: "V-Guard AC Stabilizer (i4 Magno)",
      category: "Accessory",
      price: 2650,
      brand: "V-Guard",
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
      images: ["https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png"],
      description: "Digital display voltage stabilizer for 1.5 Ton AC.",
      specs: { capacity: "12 Amps", range: "170V - 280V", display: "Digital" },
      features: ["ITDS Technology", "Thermal Overload Protection", "Compact Design"]
    },
    {
      id: "hose-heavy",
      name: "Exhaust Hose (6ft) for Portable AC",
      category: "Accessory",
      price: 649,
      brand: "Generic",
      image: "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946",
      images: ["https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"],
      description: "High-quality flexible polypropylene exhaust hose.",
      specs: { length: "6 Feet", diameter: "5 Inches", material: "Polypropylene" },
      features: ["Heat Resistant", "Flexible", "Easy Installation"]
    },
    {
      id: "capacitor-kelvin",
      name: "Kelvin Running Capacitor (45uF)",
      category: "Accessory",
      price: 180,
      brand: "Kelvin",
      image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png",
      images: ["https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/UiiN8IXLJ-BPL-Inverter-Split-AC-1.5T-3-Star-BAS-V183ATFC5.png"],
      description: "Heavy-duty motor starter capacitor for compressor stability.",
      specs: { value: "45uF", voltage: "440V AC", frequency: "50/60 Hz" },
      features: ["Aluminum Shell", "Long Life Span", "Stable Performance"]
    },
    {
      id: "cleaning-prowash",
      name: "ProWash AC Service Wash Bag",
      category: "Accessory",
      price: 899,
      brand: "ProWash",
      image: "https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946",
      images: ["https://kaydeeelectronics.in/cdn/shop/files/untitled-design-17-1-676674255a2f3.webp?v=1734768186&width=1946"],
      description: "Professional split AC cleaning cover with drainage pipe.",
      specs: { material: "Waterproof PVC", hoseLength: "2 Meters", compatibility: "1.0 - 2.0 Ton Split AC" },
      features: ["Elastic Fastening", "Full Protection", "Reusable"]
    }
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
