import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// ponytail: clean inline SVGs for zero dependencies & solid Rollup compile
const Icons = {
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  ),
  WhatsApp: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
  ),
  Maps: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  ),
  Call: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
  ),
  Star: ({ size = 16, className = "", fill = "none" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  ),
  Check: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>
  ),
  ChevronRight: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>
  ),
  ChevronLeft: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>
  ),
  Menu: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
  ),
  X: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
  ),
  Tv: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
  ),
  Volume: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
  ),
  Recliner: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 10H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z"></path><path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path></svg>
  ),
  Utensils: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v8c0 1.1.9 2 2 2h3Z"></path><path d="M18 22v-7"></path></svg>
  ),
  Calendar: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  )
};

// ponytail: minimal delay loader config using simple native timeouts
const LOADER_QUOTES = [
  "Cinema is a mirror that can focus the world.",
  "Every frame is a painting, every memory a masterpiece.",
  "Movies touch our hearts and awaken our vision.",
  "Where every story finds its spotlight.",
  "Experience the magic of private cinema."
];

// Room & Pricing Configuration
const SCREENS = [
  {
    id: 1,
    name: 'Couple Suite',
    tag: 'COUPLES & DUOS',
    price: '1,199',
    desc: 'Cozy and intimate environment tailored for couples. Features luxury recliners and absolute privacy.',
    capacity: '2-4 Guests',
    screen: '135" 4K HDR Screen',
    audio: 'Atmos 5.1 Surround',
    image: 'https://moviebash.in/assets/uploads/screens/1467482a-58a8-4d4d-b2d7-260c9e811aff.JPG',
    highlights: ['Plush Leather Recliners', 'Complimentary Rose Petals Decor', 'Perfect for Proposals & Anniversaries', 'Dedicated AC Control']
  },
  {
    id: 2,
    name: 'Celebration Suite',
    tag: 'POPULAR CHOICE',
    price: '1,499',
    desc: 'The ultimate choice for birthdays, anniversaries, and group movie nights with customized celebration setups.',
    capacity: '2-8 Guests',
    screen: '150" 4K UHD Screen',
    audio: 'Dolby Atmos 7.1.2 Space',
    image: 'https://moviebash.in/assets/uploads/screens/2560473c-65e1-439c-a609-93ba8001195f.JPG',
    highlights: ['Extended Recliner Layout', 'Grand Birthday / Anniversary Decor', 'Dynamic RGB Lighting System', 'Full OTT & PS5 Gaming Access']
  },
  {
    id: 3,
    name: 'Mega Family Suite',
    tag: 'LARGE CELEBRATIONS',
    price: '1,999',
    desc: 'Grand theater hall setup perfect for large family gatherings, reunions, corporate groups, and private parties.',
    capacity: 'Up to 15 Guests',
    screen: '180" Giant Theater Screen',
    audio: 'Immersive Dolby Atmos Pro',
    image: 'https://moviebash.in/assets/uploads/screens/21b1b9ae-5394-429b-872a-152c337bb0c9.JPG',
    highlights: ['Massive Group Seating Area', 'Dedicated Cake Cutting Table', 'Surprise Entry Tunnel Ready', 'High-End Karaokes Available']
  }
];

const TIME_SLOTS = [
  { id: 'slot-1', time: '10:00 AM - 01:00 PM', status: 'Available' },
  { id: 'slot-2', time: '01:15 PM - 04:15 PM', status: 'Available' },
  { id: 'slot-3', time: '04:30 PM - 07:30 PM', status: 'Available' },
  { id: 'slot-4', time: '07:45 PM - 10:45 PM', status: 'Available' },
  { id: 'slot-5', time: '11:00 PM - 02:00 AM', status: 'Available' }
];

const ADDONS = [
  {
    category: 'Cakes',
    items: [
      { id: 'cake-1', name: 'Black Forest Cake (0.5kg)', price: 399, image: 'https://moviebash.in/assets/uploads/addons/BlackForest.jpeg' },
      { id: 'cake-2', name: 'Red Velvet Surprise Cake (0.5kg)', price: 499, image: 'https://moviebash.in/assets/uploads/addons/WhatsApp_Image_2024-12-01_at_6.41.38_PM.jpeg' }
    ]
  },
  {
    category: 'Celebration Decor & Effects',
    items: [
      { id: 'effect-1', name: 'Cold Pyro Sparklers (2 units)', price: 199, image: 'https://moviebash.in/assets/uploads/addons/Pyro.jpg' },
      { id: 'effect-2', name: 'Fog Entry Smoke Machine', price: 299, image: 'https://moviebash.in/assets/uploads/addons/fog-effect.jpg' }
    ]
  },
  {
    category: 'Photography & Extras',
    items: [
      { id: 'extra-1', name: 'DSLR Professional Photoshoot', price: 499, image: 'https://moviebash.in/assets/uploads/addons/Camera.webp' },
      { id: 'extra-2', name: 'Premium LED Name Lights', price: 399, image: 'https://moviebash.in/assets/uploads/addons/LED_Name.jpg' }
    ]
  }
];

const REVIEWS = [
  { 
    name: 'Pushpa Sharma', 
    text: 'Here we celebrated our baby boy\'s first birthday!! Awesome comfort zone!! And it was fantastic decoration and theme... Thank you so much to make our happiness in memorable. We feel Love at first sight, decor edition...', 
    rating: 5, 
    source: 'Local Guide • 2 reviews', 
    timeAgo: '5 months ago',
    initial: 'P',
    bgColor: 'bg-emerald-600'
  },
  { 
    name: 'Venugopal R', 
    text: 'We celebrated my daughter\'s birthday twice here. Very friendly team and very supportive. You guys made my daughter\'s birthday wonderful and special. We will definitely come back for my daughter\'s 3rd Birthday. Thank you so much to Team Movie Bash.', 
    rating: 5, 
    source: 'Local Guide • 307 reviews', 
    timeAgo: '4 months ago',
    initial: 'V',
    bgColor: 'bg-amber-600'
  },
  { 
    name: 'Shreyasee Padhy', 
    text: 'Very good decoration and net and clean behaviour is tooo good and am happy with their service. Must visit to celebrate. 💕 🫶 ...', 
    rating: 5, 
    source: 'Local Guide • 3 reviews', 
    timeAgo: '3 weeks ago',
    initial: 'S',
    bgColor: 'bg-blue-600'
  },
  { 
    name: 'Lavanya V', 
    text: 'Absolutely amazing experience! made our event stunning and stress-free. Everything was organized perfectly, and I couldn\'t have asked for a better team! thanks so much movie bash team 🥰 ...', 
    rating: 5, 
    source: 'Local Guide • 2 reviews', 
    timeAgo: '4 months ago',
    initial: 'L',
    bgColor: 'bg-pink-600'
  }
];

const GALLERY = [
  { id: 1, title: 'VIP Red Carpet Entry', image: '/gallery-5.jpg' },
  { id: 2, title: 'Royal Birthday Celebration', image: '/gallery-1.jpg' },
  { id: 3, title: 'Movie Lounge', image: '/gallery-2.jpg' },
  { id: 4, title: 'Intimate Proposal Path', image: 'https://moviebash.in/assets/uploads/addons/candle-entry.jpg' },
  { id: 5, title: 'Gilded Birthday Decor', image: '/gallery-4.jpg' },
  { id: 6, title: 'Grand Floral Love Bench', image: '/gallery-3.jpg' },
  { id: 7, title: 'Bespoke Recliner Comfort', image: '/gallery-6.jpg' }
];

const FAQS = [
  { q: "Can we bring our own food?", a: "Yes! Outside food and beverages are completely welcome in all our private suites. We also provide side tables and cutleries for your comfort." },
  { q: "What is the booking advance amount?", a: "To secure your slot, a minimal booking advance of ₹1,000/- is requested. The remaining balance can be cleared when you arrive." },
  { q: "Do you provide balloon decorations?", a: "Yes, we offer premium balloon decorations for birthdays, anniversaries, and custom surprise events. You can select decoration packages in our booking step." },
  { q: "Can we play games on PS5?", a: "Absolutely! Our suites are fully equipped with console connectivity support. You can bring your own console or request our pre-configured gaming add-ons." },
  { q: "What is your cancellation policy?", a: "Bookings can be rescheduled up to 48 hours prior to your slot. Cancellations made within 24 hours of the booking are non-refundable." }
];

const OCCASIONS = [
  { title: "Surprise Birthdays", desc: "Celebrate milestones with premium decorations, fog entry, cold pyro sparklers, and custom cakes.", image: "https://moviebash.in/assets/uploads/screens/2560473c-65e1-439c-a609-93ba8001195f.JPG" },
  { title: "Intimate Proposals", desc: "Craft unforgettable moments with rose petal entries, custom LED name displays, and mood lighting.", image: "https://moviebash.in/assets/uploads/addons/candle-entry.jpg" },
  { title: "Private Movie Shows", desc: "Experience your favorite cinema releases or family videos on a giant 150-inch 4K screen with Dolby Atmos.", image: "https://moviebash.in/assets/uploads/screens/21b1b9ae-5394-429b-872a-152c337bb0c9.JPG" },
  { title: "Live Sports & Gaming", desc: "Cheer on your teams on live sports screens or host multiplayer tournaments on high-speed consoles.", image: "https://moviebash.in/assets/uploads/screens/1467482a-58a8-4d4d-b2d7-260c9e811aff.JPG" }
];

export default function App() {
  const galleryRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [triggerHeroAnim, setTriggerHeroAnim] = useState(false);
  const [loaderQuote, setLoaderQuote] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const toggleFaq = (idx) => {
    setActiveFaq(prev => prev === idx ? null : idx);
  };

  // Booking Form State
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedScreen, setSelectedScreen] = useState(SCREENS[0]);
  const [bookingDate, setBookingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[2]);
  
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    occasion: 'Birthday Celebration'
  });
  
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [bookingFinished, setBookingFinished] = useState(false);

  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBookingModalOpen]);

  useEffect(() => {
    setLoaderQuote(LOADER_QUOTES[Math.floor(Math.random() * LOADER_QUOTES.length)]);
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTriggerHeroAnim(true);
    }, 2700);
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const containerTop = window.scrollY + rect.top;
        const containerHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        const scrolled = window.scrollY - containerTop;
        const maxScroll = containerHeight - viewportHeight;
        if (maxScroll > 0) {
          const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
          setScrollProgress(progress);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAddonToggle = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(item => item.id === addon.id);
      if (exists) {
        return prev.filter(item => item.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const calculateTotal = () => {
    let total = parseInt(selectedScreen.price.replace(',', ''));
    selectedAddons.forEach(item => {
      total += item.price;
    });
    return total;
  };

  const handleStartBooking = (screen) => {
    setSelectedScreen(screen);
    setBookingStep(1);
    setIsBookingModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.phone) {
      alert("Please fill in your Name and Contact Number.");
      return;
    }
    if (customerDetails.phone.length !== 10) {
      alert("Please enter a valid 10-digit Phone Number.");
      return;
    }
    
    // Confetti effect
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c9a050', '#ffffff', '#111111']
    });

    setBookingFinished(true);

    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(generateWhatsAppLink(), '_blank');
    }, 1500);
  };

  const generateWhatsAppLink = () => {
    const addonText = selectedAddons.length > 0
      ? selectedAddons.map(a => `  • ${a.name} (₹${a.price})`).join('\n')
      : '  • None';

    const text = `*New Booking Request - Movie Bash*\n\n` +
      `*Suite:* ${selectedScreen.name}\n` +
      `*Date:* ${bookingDate}\n` +
      `*Timings:* ${selectedSlot.time}\n` +
      `*Guests:* ${customerDetails.guests}\n` +
      `*Occasion:* ${customerDetails.occasion}\n` +
      `*Add-ons:*\n${addonText}\n\n` +
      `*Customer Details:*\n` +
      `• Name: ${customerDetails.name}\n` +
      `• Phone: ${customerDetails.phone}\n` +
      `• Email: ${customerDetails.email}\n\n` +
      `*Total Price:* ₹${calculateTotal()}/-`;

    return `https://wa.me/919902923656?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative font-sans text-brand-dark bg-brand-bg min-h-screen">
      
      {/* 1. Cine Central Custom Loading Screen */}
      {isLoading && (
        <div className={`loader-container ${isExiting ? 'exit' : ''}`}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            <div className="loader-bg-ring"></div>
          </div>
          
          <div className="max-w-2xl relative z-10 loader-content">
            <div className="mb-8 flex flex-col items-center">
              <img src="/logo.png" alt="Movie Bash" className="h-20 sm:h-24 object-contain" />
            </div>

            <div className="h-24">
              <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto mb-6"></div>
              <h3 className="text-brand-dark text-center font-serif-italic italic text-xl sm:text-2xl md:text-3xl font-bold leading-tight px-4">
                "{loaderQuote}"
              </h3>
              <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto mt-6"></div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Premium Header/Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo element matches exact typography style */}
          <a href="#" className="flex items-center gap-3 group mt-1 no-underline">
            <img 
              src="/logo.png" 
              alt="Movie Bash Logo" 
              className="h-10 md:h-12 object-contain transition-all duration-500" 
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif-italic font-black tracking-tighter uppercase italic text-brand-gold transition-colors duration-500">
                MOVIE BASH
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[3px] uppercase -mt-1 font-bold text-brand-dark/50">
                Bengaluru
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {['Suites', 'Services', 'Reels', 'Pricing', 'Reviews'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs font-sans uppercase tracking-widest font-bold transition-all duration-300 text-brand-dark/70 hover:text-brand-gold hover:-translate-y-0.5 transform inline-block"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right Action Trigger */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="#booking" onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); }} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-[2px] transition-all duration-300 bg-brand-dark text-white hover:bg-brand-gold hover:scale-105 active:scale-95 transform shadow-sm hover:shadow-md">
              Book Now
            </a>
          </div>

          {/* Mobile menu triggers */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-brand-gold hover:text-brand-dark transition-all duration-300 hover:scale-110 active:scale-95 transform">
            {mobileMenuOpen ? <Icons.X size={26} /> : <Icons.Menu size={26} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-brand-dark/98 backdrop-blur-xl z-[60] flex flex-col justify-center items-center p-8"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-brand-gold hover:text-white transition-colors">
              <Icons.X size={28} />
            </button>
            <div className="flex flex-col gap-6 sm:gap-8 text-center">
              {['Suites', 'Services', 'Reels', 'Pricing', 'Gallery', 'Reviews'].map((link, idx) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl sm:text-2xl font-serif-italic italic tracking-widest text-white hover:text-brand-gold font-bold transition-all duration-300"
                  style={{ animation: `fadeIn 0.4s ease-out ${idx * 0.05}s both` }}
                >
                  {link}
                </a>
              ))}
              <a
                href="#booking"
                onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setIsBookingModalOpen(true); }}
                className="mt-6 sm:mt-8 px-10 sm:px-12 py-3.5 sm:py-4 bg-brand-gold hover:bg-[#b58c40] text-white font-sans text-xs font-bold uppercase tracking-[2px] rounded-full shadow-lg transition-transform active:scale-95"
                style={{ animation: 'fadeIn 0.5s ease-out 0.35s both' }}
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* 3. Hero Section (Obsidian Dark Background with Scroll Animations) */}
      <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-75">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black/70 z-[1]"></div>
        <div className="absolute inset-0 z-[2] opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 min-h-[calc(100vh-80px)]">
          
          {/* Floating Trust Badge — unique top element */}
          <div 
            style={{ transitionDelay: '0.1s', transitionDuration: '1.2s' }}
            className={`reveal-element reveal-fade-up ${triggerHeroAnim ? 'active' : ''} mb-6 sm:mb-8`}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
              <div className="flex text-brand-gold gap-0.5">
                {[...Array(5)].map((_, i) => <Icons.Star key={i} size={10} fill="currentColor" />)}
              </div>
              <span className="text-white/90 font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                5.0 Rated
              </span>
              <span className="w-[1px] h-3 bg-white/20"></span>
              <span className="text-white/60 font-sans text-[9px] sm:text-[10px] font-medium uppercase tracking-wider">
                500+ Celebrations
              </span>
              <span className="w-[1px] h-3 bg-white/20 hidden sm:block"></span>
              <span className="text-brand-gold font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hidden sm:block">
                Bengaluru
              </span>
            </div>
          </div>

          {/* Tag layout */}
          <div 
            style={{ transitionDelay: '0.3s', transitionDuration: '1.2s' }}
            className={`reveal-element reveal-fade-up ${triggerHeroAnim ? 'active' : ''}`}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
              <div className="w-8 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[8px] sm:text-[10px] uppercase tracking-[3px] sm:tracking-[5px] font-bold">
                Private Cinema & Celebrations
              </span>
              <div className="w-8 h-[1px] bg-brand-gold"></div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="hero-headline flex flex-col font-bold text-white uppercase text-[28px] sm:text-5xl md:text-7xl lg:text-8xl xl:text-[100px] mb-4 sm:mb-6 md:mb-8 leading-none">
            <div 
              className="hero-text-reveal"
              style={{ transitionDelay: '0.4s' }}
            >
              <span className={`transition-transform duration-[1.4s] cubic-bezier(0.16,1,0.3,1) ${triggerHeroAnim ? 'translate-y-0' : 'translate-y-full'} block`}>
                PREMIUM
              </span>
            </div>
            <div 
              className="hero-text-reveal"
              style={{ transitionDelay: '0.6s' }}
            >
              <span className={`text-brand-gold font-serif-italic italic font-light lowercase py-1 sm:py-2 block transition-transform duration-[1.4s] cubic-bezier(0.16,1,0.3,1) ${triggerHeroAnim ? 'translate-y-0' : 'translate-y-full'}`}>
                private
              </span>
            </div>
            <div 
              className="hero-text-reveal"
              style={{ transitionDelay: '0.8s' }}
            >
              <span className={`transition-transform duration-[1.4s] cubic-bezier(0.16,1,0.3,1) ${triggerHeroAnim ? 'translate-y-0' : 'translate-y-full'} block`}>
                EXPERIENCE
              </span>
            </div>
          </h1>

          <div 
            style={{ transitionDelay: '1.0s', transitionDuration: '1.2s' }}
            className={`reveal-element reveal-fade-up ${triggerHeroAnim ? 'active' : ''}`}
          >
            <p className="text-white/70 font-sans text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mb-6 sm:mb-8 md:mb-10 font-light">
              Host <span className="text-brand-gold font-semibold">immersive movie screenings</span>, <span className="text-brand-gold font-semibold">birthday surprise bashes</span>, <span className="text-brand-gold font-semibold">intimate anniversaries</span>, or <span className="text-brand-gold font-semibold">gaming nights</span> in Bengaluru's <span className="text-white font-semibold underline decoration-brand-gold/60 underline-offset-4">finest private theater slots</span>.
            </p>
          </div>

          <div 
            style={{ transitionDelay: '1.2s', transitionDuration: '1.2s' }}
            className={`reveal-element reveal-fade-up ${triggerHeroAnim ? 'active' : ''}`}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#booking" onClick={(e) => { e.preventDefault(); setIsBookingModalOpen(true); }} className="group relative w-[160px] sm:w-[184px] h-[52px] sm:h-[60px] flex items-center justify-center active:scale-95 hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                  <path d="M0 0H184V45L164 65H0V0Z" fill="white"></path>
                </svg>
                <span className="relative z-10 font-sans font-bold text-[12px] sm:text-[14px] text-black uppercase tracking-widest">GET STARTED</span>
              </a>
              <a href="#suites" className="flex items-center gap-3 text-white hover:text-brand-gold font-sans text-xs uppercase tracking-[3px] transition-colors py-4">
                <span className="w-8 h-[1px] bg-white/40 group-hover:bg-brand-gold"></span>
                Explore Suites
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator overlay */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 md:left-12 right-4 sm:right-6 md:right-12 z-10 flex justify-between items-end text-white/50 text-[8px] sm:text-[9px] uppercase tracking-[3px] font-bold">
          <div className="flex flex-col items-start">
            <span>Scroll to Explore</span>
            <div className="w-[1px] h-6 bg-white/30 mt-2 animate-bounce"></div>
          </div>
          <span className="hidden md:block">Movie Bash Bengaluru</span>
        </div>
      </section>

      {/* 4. Theatre Specifications Grid */}
      <section className="py-12 sm:py-16 md:py-28 bg-mesh-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <Reveal type="fade-up">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Theatre Specs</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 rounded-xl sm:rounded-2xl overflow-hidden border border-black/5 shadow-sm">
            {[
              { icon: <Icons.Tv size={28} />, label: "Screen Size", value: "150 INCH", detail: "4K HDR Pro Screen" },
              { icon: <Icons.Volume size={28} />, label: "Audio Quality", value: "DOLBY ATMOS", detail: "7.1 Immersive Surround" },
              { icon: <Icons.Recliner size={28} />, label: "Seating", value: "RECLINERS", detail: "Premium Plush Seating" },
              { icon: <Icons.Utensils size={28} />, label: "Refreshments", value: "FOOD ALLOWED", detail: "Outside Food Welcome" }
            ].map((spec, i) => (
              <Reveal key={i} type="fade-up" delay={i * 0.1} className="w-full h-full">
                <div className="flex flex-col items-start gap-2 sm:gap-3 p-4 sm:p-6 md:p-8 glass-card hover:bg-white/80 transition-colors duration-500 group h-full">
                  <div className="text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-500">{spec.icon}</div>
                  <div>
                    <span className="text-brand-dark/40 font-sans text-[10px] uppercase tracking-[3px] block mb-1 font-bold">{spec.label}</span>
                    <p className="text-sm md:text-lg font-serif-italic text-brand-dark tracking-wide uppercase italic leading-tight font-bold">{spec.value}</p>
                    <span className="text-brand-dark/60 font-sans text-[10px] sm:text-xs block mt-1 leading-relaxed font-medium">{spec.detail}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Streaming & Entertainment Partner Logos Section */}
      <section className="py-6 sm:py-12 bg-white/80 text-brand-dark overflow-hidden border-y border-black/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-12">
          
          {/* Mobile: compact centered label */}
          <div className="md:hidden text-center mb-4">
            <span className="text-brand-gold font-sans text-[9px] uppercase tracking-[3px] font-bold">Stream Anything</span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Desktop: full text block */}
            <Reveal type="fade-up" className="hidden md:flex flex-col text-left max-w-xs">
              <span className="text-brand-gold font-sans text-[9px] uppercase tracking-[3px] font-bold mb-2">Infinite Choice</span>
              <h4 className="text-2xl font-serif-italic italic text-brand-dark leading-tight font-bold">Stream Anything</h4>
              <p className="text-brand-dark/70 font-sans text-xs mt-2 leading-relaxed">
                Login to your personal accounts on our ultra-speed systems. Netflix, YouTube, Prime, Hotstar, Live Sports, or PlayStation gaming are pre-configured.
              </p>
            </Reveal>

            {/* Logos — always 5 in a single row */}
            <Reveal type="fade-up" delay={0.2} className="flex-1 w-full">
              <div className="flex items-center justify-center sm:justify-between gap-4 sm:gap-6 md:gap-8 flex-wrap-none">
                {[
                  { name: "Netflix", img: "/logos/netflix.svg", heightClass: "h-7 sm:h-11 md:h-12" },
                  { name: "Prime Video", img: "/logos/prime.svg", heightClass: "h-6 sm:h-10 md:h-11" },
                  { name: "Disney+ Hotstar", img: "/logos/hotstar.svg", heightClass: "h-8 sm:h-12 md:h-14" },
                  { name: "YouTube", img: "/logos/youtube.svg", heightClass: "h-6 sm:h-10 md:h-11" },
                  { name: "PlayStation 5", img: "/logos/playstation.svg", heightClass: "h-5 sm:h-9 md:h-10" }
                ].map((partner, i) => (
                  <div key={i} className="flex items-center justify-center shrink-0 opacity-85 hover:opacity-100 hover:scale-110 transition-all duration-300 transform">
                    <img src={partner.img} alt={partner.name} className={`${partner.heightClass} w-auto object-contain`} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 5. Comfort / Recliners Highlight Section */}
      <section className="py-12 sm:py-16 md:py-32 bg-mesh-gradient relative overflow-hidden border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            
            <Reveal type="mask-reveal" className="w-full">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer celebration-border hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl transition-all duration-500">
                <ParallaxImage 
                  src="/gallery-6.jpg" 
                  alt="Plush Seating" 
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-8 left-8 pointer-events-none">
                  <span className="text-white font-serif-italic italic text-2xl md:text-3xl font-bold">Premium Recliners</span>
                </div>
              </div>
            </Reveal>

            <Reveal type="slide-left" className="flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-brand-gold"></div>
                <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Comfort Reinvented</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif-italic text-brand-dark italic mb-6 sm:mb-8 leading-[1.1] font-black">
                Sink into <span className="text-brand-gold">Absolute Luxury</span>
              </h2>

              <p className="text-brand-dark/70 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-10 font-medium">
                Forget standard theater layouts. At Movie Bash, you and your guests relax on ultra-premium leather recliners with private air conditioning, adjustable lights, and side-tables. Experience cinematic magic in comfort.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { label: "Plush Recliners", desc: "Premium soft cushioning" },
                  { label: "Fully AC Rooms", desc: "Independent temperature control" },
                  { label: "Outside Food", desc: "Bring snacks of your choice" },
                  { label: "Private Hosting", desc: "No unwanted disturbances" }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-2 border-brand-gold/40 pl-3 sm:pl-4 py-1">
                    <h4 className="text-brand-dark font-sans text-[10px] sm:text-xs uppercase tracking-[2px] font-bold">{item.label}</h4>
                    <p className="text-brand-dark/50 font-sans text-[10px] sm:text-xs mt-0.5 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 6. Suites Section (Alternating 1:1 Layout) */}
      <section id="suites" className="py-12 sm:py-16 md:py-32 bg-mesh-gradient relative overflow-hidden border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          
          <div className="mb-10 sm:mb-16 text-center md:text-left">
            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Private Suites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif-italic text-brand-dark italic font-bold leading-none">Choose Your Suite</h2>
          </div>

          <div className="flex flex-col gap-12 sm:gap-20 md:gap-36">
            {SCREENS.map((suite, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div key={suite.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
                  
                  {/* Photo container */}
                  <div className={`w-full ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <Reveal type="mask-reveal" className="w-full">
                      <div className="relative overflow-hidden rounded-3xl cursor-pointer group celebration-border hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl transition-all duration-500" onClick={() => handleStartBooking(suite)}>
                        <ParallaxImage 
                           src={suite.image} 
                           alt={suite.name} 
                           className="aspect-[4/3] sm:aspect-[16/10] w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                        <span className="absolute -top-4 -left-2 text-[80px] sm:text-[120px] md:text-[180px] font-serif-italic italic text-black/[0.03] select-none pointer-events-none">
                          0{suite.id}
                        </span>
                      </div>
                    </Reveal>
                  </div>

                  {/* Information block */}
                  <Reveal type={isEven ? "slide-right" : "slide-left"} className={`flex flex-col text-left ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[3px] font-bold mb-3">{suite.tag}</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-italic font-black italic text-brand-dark mb-3 sm:mb-4">{suite.name}</h3>
                    <p className="text-brand-dark/70 font-sans text-sm leading-relaxed mb-6 font-medium">{suite.desc}</p>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="glass-card p-3 sm:p-4 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <span className="text-brand-dark/40 font-sans text-[9px] uppercase tracking-[2px] block font-bold">Capacity</span>
                        <span className="text-brand-dark font-sans text-xs font-bold">{suite.capacity}</span>
                      </div>
                      <div className="glass-card p-3 sm:p-4 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <span className="text-brand-dark/40 font-sans text-[9px] uppercase tracking-[2px] block font-bold">Base Price</span>
                        <span className="text-brand-gold font-sans text-xs font-bold">Starts @ ₹{suite.price}/-</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                      {suite.highlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-3 text-brand-dark font-sans text-xs font-bold hover:translate-x-1 transition-transform duration-300">
                          <Icons.Check size={14} className="text-brand-gold shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-4">
                      <button onClick={() => handleStartBooking(suite)} className="px-8 py-3 bg-brand-dark hover:bg-brand-gold text-white font-sans text-[10px] font-bold uppercase tracking-[2px] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 transform shadow-md hover:shadow-lg">
                        Select Suite
                      </button>
                    </div>
                  </Reveal>

                  {idx < SCREENS.length - 1 && (
                    <div className="lg:col-span-2 w-full flex items-center justify-center py-6 select-none pointer-events-none mt-8 px-2">
                      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
                      <div className="mx-2 sm:mx-4 text-[7px] sm:text-[9px] font-sans tracking-[2px] sm:tracking-[5px] uppercase text-brand-gold/70 font-bold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                        ✦ {idx === 0 ? "4K Ultra-UHD Laser Quality" : "Immersive Surround Dolby Atmos Pro"} ✦
                      </div>
                      <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent via-brand-gold/30 to-transparent"></div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6.5 Occasions & Experiences Section */}
      <section id="services" className="py-12 sm:py-16 md:py-32 bg-mesh-gradient relative overflow-hidden border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          
          <div className="mb-10 sm:mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Experiences</span>
              <div className="w-12 h-[1px] bg-brand-gold"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif-italic text-brand-dark italic font-bold leading-none mb-6">Perfect for Occasions</h2>
            <p className="text-brand-dark/60 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Turn your special events into grand private cinematic highlights. We specialize in hosting celebrations with professional execution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {OCCASIONS.map((occ, i) => (
              <Reveal key={i} type="fade-up" delay={i * 0.15} className="w-full">
                <div className="flex flex-col rounded-2xl overflow-hidden glass-card shadow-sm hover:shadow-lg transition-all duration-500 group h-full">
                  <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-brand-gold/30">
                    <img src={occ.image} alt={occ.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="text-sm sm:text-lg font-serif-italic italic text-brand-dark font-bold mb-1.5 sm:mb-2">{occ.title}</h4>
                      <p className="text-brand-dark/70 font-sans text-[10px] sm:text-xs leading-relaxed font-medium">{occ.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 6.6 How It Works (Visual Guide) */}
      <section className="py-12 sm:py-16 md:py-32 bg-mesh-gradient border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          
          <div className="mb-10 sm:mb-16 md:mb-20 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Steps to Book</span>
              <div className="w-12 h-[1px] bg-brand-gold"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif-italic text-brand-dark italic font-bold leading-none mb-6">How it Works</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
            <div className="absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-black/5 hidden md:block z-0"></div>
            {[
              { num: "01", title: "Select Suite", desc: "Browse from our premium screens & seating setups designed for groups of all sizes." },
              { num: "02", title: "Add Services", desc: "Customize your slot with balloon decoration templates, sparklers, or cakes." },
              { num: "03", title: "Review Slot", desc: "Select your desired booking date and clean timing slot via our form." },
              { num: "04", title: "Confirm Reservation", desc: "Submit details and finalize the booking advance directly on WhatsApp." }
            ].map((step, i) => (
              <Reveal key={i} type="fade-up" delay={i * 0.15} className="relative z-10 w-full">
                <div className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full glass-card flex items-center justify-center font-serif-italic italic text-brand-gold text-xl sm:text-2xl font-black mb-4 sm:mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500 shadow-md">
                    {step.num}
                  </div>
                  <h4 className="text-brand-dark font-sans text-[10px] sm:text-sm font-bold uppercase tracking-[1px] sm:tracking-[2px] mb-2 sm:mb-3">{step.title}</h4>
                  <p className="text-brand-dark/60 font-sans text-[10px] sm:text-xs leading-relaxed font-medium">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>


      {/* 8. Pricing Section (Grid layout matching Cine Central) */}
      <section id="pricing" className="py-12 sm:py-16 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-brand-bg relative overflow-hidden border-t border-black/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-gold/[0.05] blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Suite Pricing</span>
              <div className="w-12 h-[1px] bg-brand-gold"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif-italic text-brand-dark italic font-bold leading-none mb-6">Rates</h2>
            <p className="text-brand-dark/70 font-sans text-xs uppercase tracking-[2px] max-w-md mx-auto leading-relaxed font-bold">
              Transparent hourly rates. Cake decoration services and photography available as add-ons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {SCREENS.map((screen) => (
              <div
                key={screen.id}
                className={`relative flex flex-col p-6 sm:p-8 md:p-10 transition-all duration-500 bg-white rounded-2xl sm:rounded-3xl ${screen.id === 2 ? 'md:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-2 ring-brand-gold' : 'border border-black/10 shadow-sm hover:shadow-md'}`}
              >
                {screen.id === 2 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-gold text-white font-sans text-[9px] font-bold uppercase tracking-[2px] px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-brand-gold/30">
                      <Icons.Star size={10} fill="currentColor" /> Premium Choice
                    </span>
                  </div>
                )}
                
                <h3 className="text-brand-dark font-sans text-[10px] font-black uppercase tracking-[3px] mb-6">{screen.name}</h3>
                
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-serif-italic text-brand-dark italic font-black">₹{screen.price}</span>
                  <span className="text-brand-dark/40 font-sans text-[10px] uppercase tracking-[2px] font-bold">/ hour</span>
                </div>
                
                <p className="text-brand-dark/70 font-sans text-xs leading-relaxed mb-8 mt-2 font-medium">{screen.desc}</p>
                
                <ul className="flex flex-col gap-3 mb-8 flex-grow">
                  {screen.highlights.map((item, n) => (
                    <li key={n} className="flex items-center gap-3 text-brand-dark font-sans text-xs font-bold">
                      <div className={`p-1 rounded-full ${screen.id === 2 ? 'bg-brand-gold/10 text-brand-gold' : 'bg-black/5 text-brand-dark'}`}>
                        <Icons.Check size={12} />
                      </div>
                      <span className="text-[11px]">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleStartBooking(screen)}
                  className={`text-center font-sans text-[9px] font-bold uppercase tracking-[3px] py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${screen.id === 2 ? 'bg-brand-gold text-white hover:bg-[#b58c40] hover:scale-105 shadow-md' : 'bg-brand-dark text-white hover:bg-black hover:scale-105'}`}
                >
                  Book on WhatsApp <Icons.WhatsApp size={14} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Cinematic Moments Gallery (Sticky Horizontal Scroll matching Cine Central) */}
      <section ref={galleryRef} id="gallery" className="relative h-[240vh] sm:h-[260vh] md:h-[300vh] bg-brand-bg border-t border-black/5">
        <div className="sticky top-[12vh] md:top-0 h-[76vh] md:h-screen flex items-center overflow-hidden">
          <div 
            style={{ transform: `translateX(${-scrollProgress * 82}%)` }} 
            className="flex gap-6 md:gap-12 px-4 sm:px-6 md:px-24 items-center transition-transform duration-100 ease-out will-change-transform"
          >
            {/* Header Title Block */}
            <div className="flex flex-col justify-center min-w-[200px] sm:min-w-[300px] md:min-w-[500px] pr-4 md:pr-8 shrink-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-brand-gold"></div>
                <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[6px] font-bold">Gallery</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-8xl lg:text-9xl font-serif-italic text-brand-dark leading-[0.85] uppercase italic font-bold">
                Cinematic <br />
                <span className="text-brand-gold">Moments</span>
              </h2>
              <p className="text-brand-dark/50 font-sans text-xs uppercase tracking-[3px] mt-6 max-w-xs hidden md:block font-bold">
                Scroll down to swipe through real moments captured at Movie Bash
              </p>
            </div>

            {/* Alternating 3D Flipper Image Cards */}
            {GALLERY.map((item, idx) => {
              // Calculate 3D scroll tilt based on card progress position relative to center viewport
              const cardProgress = scrollProgress * 1.5;
              const cardCenter = (idx * 0.35) - cardProgress;
              const rotateY = Math.min(Math.max(cardCenter * 35, -28), 28);
              const translateZ = Math.min(Math.max(-Math.abs(cardCenter) * 120, -100), 0);
              const scale = 1 - Math.min(Math.max(Math.abs(cardCenter) * 0.08, 0), 0.08);

              return (
                <div 
                  key={item.id} 
                  style={{ 
                    transform: `perspective(1200px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                    transformStyle: 'preserve-3d'
                  }}
                  className="relative h-[320px] w-[240px] sm:h-[400px] sm:w-[300px] md:h-[530px] md:w-[400px] overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-900 shrink-0 group shadow-2xl transition-all duration-300 ease-out origin-center will-change-transform cinematic-glass-border"
                >
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
                    <span className="text-white font-serif-italic italic text-xl md:text-2xl font-bold">{item.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Reservation Desk Invitation Section */}
      <section id="booking" className="py-12 sm:py-16 md:py-24 bg-mesh-gradient border-t border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal type="fade-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Reservation Desk</span>
              <div className="w-12 h-[1px] bg-brand-gold"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-italic text-brand-dark italic font-bold mb-6">Ready to Book Your Experience?</h2>
            <p className="text-brand-dark/70 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8 font-medium">
              Reserve your premium private theatre slot in Bengaluru. Select your suite, set the date and time, and customize with premium decorations & gourmet add-ons.
            </p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-4 bg-brand-gold hover:bg-[#b58c40] text-white font-sans text-xs font-bold uppercase tracking-[2px] rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 transform"
            >
              Open Booking Desk <Icons.Calendar size={14} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Booking Form Modal Overlay */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md overflow-y-auto flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fade-in">
          <div className="relative bg-brand-bg w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col my-4 sm:my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-black/5 bg-white">
              <div className="flex items-center gap-3">
                <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[3px] font-bold">Reservation Desk</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                <span className="text-xs font-bold text-brand-dark font-sans uppercase">Booking Wizard</span>
              </div>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-brand-dark/60 hover:text-brand-dark hover:bg-black/10 transition-colors"
              >
                <Icons.X size={18} />
              </button>
            </div>
            
            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[80vh]">
<div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl relative overflow-hidden">
            
            {!bookingFinished ? (
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                
                {/* Left Column: Details form */}
                <div className="lg:col-span-7 space-y-3 sm:space-y-4 md:space-y-6">
                  {/* Step 1: Name and Contact info */}
                  <div className="bg-white/50 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/60 space-y-3 sm:space-y-4">
                    <span className="text-xs font-sans font-bold uppercase tracking-[2px] text-brand-gold block">1. Contact Information</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase tracking-[1px] text-brand-dark/50">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={customerDetails.name}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                          className="w-full bg-black/5 border border-transparent rounded-xl px-4 py-2.5 text-xs font-sans text-brand-dark focus:outline-none focus:border-brand-gold focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase tracking-[1px] text-brand-dark/50">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="9902923656"
                          maxLength={10}
                          value={customerDetails.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setCustomerDetails({ ...customerDetails, phone: val });
                          }}
                          className="w-full bg-black/5 border border-transparent rounded-xl px-4 py-2.5 text-xs font-sans text-brand-dark focus:outline-none focus:border-brand-gold focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Suite selection */}
                  <div className="bg-white/50 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/60 space-y-3">
                    <span className="text-xs font-sans font-bold uppercase tracking-[2px] text-brand-gold block">2. Select Suite Room</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {SCREENS.map(screen => (
                        <div
                          key={screen.id}
                          onClick={() => setSelectedScreen(screen)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${selectedScreen.id === screen.id ? 'border-brand-gold bg-brand-gold/5 text-brand-dark' : 'border-black/5 hover:border-black/20 text-brand-dark'}`}
                        >
                          <span className="block font-sans text-xs font-bold uppercase">{screen.name}</span>
                          <span className="block font-sans text-[10px] text-brand-gold font-bold mt-1">Starts @ ₹{screen.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Date, Time & Occasion */}
                  <div className="bg-white/50 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/60 space-y-3 sm:space-y-4">
                    <span className="text-xs font-sans font-bold uppercase tracking-[2px] text-brand-gold block">3. Date & Occasion</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase tracking-[1px] text-brand-dark/50">Select Date</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-black/5 border border-transparent rounded-xl px-4 py-2.5 text-xs font-sans text-brand-dark focus:outline-none focus:border-brand-gold focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase tracking-[1px] text-brand-dark/50">Guests</label>
                        <select
                          value={customerDetails.guests}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, guests: e.target.value })}
                          className="w-full bg-black/5 border border-transparent rounded-xl px-4 py-2.5 text-xs font-sans text-brand-dark focus:outline-none focus:border-brand-gold focus:bg-white"
                        >
                          {[...Array(15).keys()].map(x => (
                            <option key={x+1} value={x+1}>{x+1} Guests</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-sans font-bold uppercase tracking-[1px] text-brand-dark/50">Occasion</label>
                        <select
                          value={customerDetails.occasion}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, occasion: e.target.value })}
                          className="w-full bg-black/5 border border-transparent rounded-xl px-4 py-2.5 text-xs font-sans text-brand-dark focus:outline-none focus:border-brand-gold focus:bg-white"
                        >
                          <option value="Birthday Celebration">Birthday Celebration</option>
                          <option value="Anniversary Surprise">Anniversary Surprise</option>
                          <option value="Romantic Proposal">Romantic Proposal</option>
                          <option value="Friends Get Together">Friends Get Together</option>
                          <option value="Private Movie Screening">Private Movie Screening</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-[1px] text-brand-dark/50">Select Time Slot</label>
                      <div className="grid grid-cols-3 sm:grid-cols-3 gap-1.5 sm:gap-2">
                        {TIME_SLOTS.map(slot => (
                          <div
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-2 rounded-lg border text-center cursor-pointer transition-all hover:scale-105 active:scale-95 hover:border-brand-gold/60 hover:shadow-sm transform ${selectedSlot.id === slot.id ? 'border-brand-gold bg-brand-gold/5 shadow-sm' : 'border-black/5 hover:border-black/15'}`}
                          >
                            <span className="block font-sans text-[11px] font-bold text-brand-dark">{slot.time}</span>
                            <span className="block text-[8px] uppercase tracking-wider text-brand-gold font-bold">{slot.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Addons and Total checkout summary */}
                <div className="lg:col-span-5 space-y-3 sm:space-y-4 md:space-y-6">
                  {/* Step 4: Addons list */}
                  <div className="bg-white/50 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/60 space-y-3 sm:space-y-4">
                    <span className="text-xs font-sans font-bold uppercase tracking-[2px] text-brand-gold block">4. Add-ons (Optional)</span>
                    
                    <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                      {ADDONS.map((cat, i) => (
                        <div key={i} className="space-y-2">
                          <span className="text-brand-dark/40 font-sans text-[9px] uppercase tracking-[1px] font-bold block">{cat.category}</span>
                          <div className="space-y-1.5">
                            {cat.items.map(addon => {
                              const isSelected = selectedAddons.find(item => item.id === addon.id);
                              return (
                                <div
                                  key={addon.id}
                                  onClick={() => handleAddonToggle(addon)}
                                  className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all hover:-translate-y-0.5 hover:border-brand-gold/60 hover:shadow-sm transform ${isSelected ? 'border-brand-gold bg-brand-gold/5 shadow-sm' : 'border-black/5 hover:border-black/15'}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <img src={addon.image} alt={addon.name} className="w-10 h-10 object-cover rounded" />
                                    <span className="font-sans text-[11px] font-bold text-brand-dark">{addon.name}</span>
                                  </div>
                                  <span className="font-sans text-[11px] text-brand-gold font-bold">₹{addon.price}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Summary Card */}
                  <div className="glass-card-dark text-white rounded-2xl p-6 space-y-4">
                    <span className="text-xs font-sans font-bold uppercase tracking-[2px] text-brand-gold block">Booking Summary</span>
                    
                    <div className="space-y-2 text-xs font-sans text-white/70">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Suite Room:</span>
                        <span className="font-bold text-white">{selectedScreen.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Date & Slot:</span>
                        <span className="font-bold text-white">{bookingDate} • {selectedSlot.time}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Guests & Occasion:</span>
                        <span className="font-bold text-white">{customerDetails.guests} guests • {customerDetails.occasion}</span>
                      </div>
                      {selectedAddons.length > 0 && (
                        <div className="border-b border-white/5 pb-2">
                          <span className="block mb-1">Add-ons:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedAddons.map(addon => (
                              <span key={addon.id} className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-brand-gold font-bold">
                                {addon.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-sans text-xs uppercase tracking-widest text-white/50 font-bold">Total Estimate</span>
                      <span className="font-serif-italic italic text-2xl font-black text-brand-gold">₹{calculateTotal()}/-</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3.5 bg-brand-gold hover:bg-[#b58c40] text-white font-sans text-xs font-bold uppercase tracking-[2px] rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                    >
                      Reserve on WhatsApp <Icons.WhatsApp size={16} />
                    </button>
                  </div>
                </div>

              </form>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Icons.Check size={36} />
                </div>
                <h3 className="text-3xl font-serif-italic italic text-brand-dark font-bold">Booking Initiated!</h3>
                <p className="text-brand-dark/70 font-sans text-sm max-w-md mx-auto leading-relaxed font-medium">
                  We are redirecting you to WhatsApp to complete your reservation. If it doesn't open automatically, click the button below.
                </p>
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-brand-gold hover:bg-[#b58c40] text-white font-sans text-[10px] font-bold uppercase tracking-[2px] rounded-full transition-colors shadow-md"
                >
                  Open WhatsApp <Icons.WhatsApp size={14} />
                </a>
              </div>
            )}

          </div>
            </div>
          </div>
        </div>
      )}
      {/* 9.5 Instagram Reels Showcase Section */}
      <section id="reels" className="py-12 sm:py-16 md:py-32 bg-mesh-gradient border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Trending Highlights</span>
              <div className="w-12 h-[1px] bg-brand-gold"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif-italic text-brand-dark italic font-bold leading-none mb-6">Instagram Reels</h2>
            <p className="text-brand-dark/60 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Catch a glimpse of the real celebrations, surprises, and cinematic setups at Movie Bash. Click to watch on Instagram.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { 
                title: "Grand 1st Birthday Surprise", 
                url: "https://www.instagram.com/reel/Dafra8zRRPH/", 
                img: "https://moviebash.in/assets/uploads/screens/2560473c-65e1-439c-a609-93ba8001195f.JPG",
                tag: "Celebrations"
              },
              { 
                title: "Romantic Proposal Pathway", 
                url: "https://www.instagram.com/reel/DDEkHChvYCc/", 
                img: "https://moviebash.in/assets/uploads/addons/candle-entry.jpg",
                tag: "Proposals"
              },
              { 
                title: "Mega Theatre Surprise Entry", 
                url: "https://www.instagram.com/reel/DUxf3NVkQ1K/", 
                img: "https://moviebash.in/assets/uploads/screens/21b1b9ae-5394-429b-872a-152c337bb0c9.JPG",
                tag: "Screenings"
              },
              { 
                title: "Private Cinema Celebration", 
                url: "https://www.instagram.com/reel/DTvChQhkWW2/", 
                img: "https://moviebash.in/assets/uploads/screens/1467482a-58a8-4d4d-b2d7-260c9e811aff.JPG",
                tag: "Experiences"
              }
            ].map((reel, i) => (
              <Reveal key={i} type="fade-up" delay={i * 0.15} className="w-full">
                <a 
                  href={reel.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block relative overflow-hidden rounded-2xl sm:rounded-3xl group celebration-border aspect-[9/14] sm:aspect-[9/16] cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.01] transition-all duration-500 transform"
                >
                  <img 
                    src={reel.img} 
                    alt={reel.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                  
                  {/* Play Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-brand-gold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>

                  {/* Reel details at bottom */}
                  <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end text-left">
                    <span className="text-brand-gold font-sans text-[9px] uppercase tracking-[2px] font-bold mb-1.5">{reel.tag}</span>
                    <h4 className="text-white font-sans text-[10px] sm:text-sm font-bold uppercase tracking-[1px] leading-snug group-hover:text-brand-gold transition-colors duration-300">{reel.title}</h4>
                    <span className="text-white/45 font-sans text-[9px] uppercase tracking-[1px] mt-2 font-bold flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z" /></svg>
                      Watch Reel
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Reviews Section */}
      <section id="reviews" className="py-12 sm:py-16 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-brand-bg border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Voice of our guests</span>
              <div className="w-12 h-[1px] bg-brand-gold"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif-italic text-brand-dark italic font-bold leading-none mb-6">Reviews</h2>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif-italic text-brand-dark italic font-black">5.0</span>
              <div className="flex flex-col items-start">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => <Icons.Star key={i} size={14} fill="currentColor" className="text-brand-gold" />)}
                </div>
                <span className="text-brand-dark/40 font-sans text-[8px] uppercase tracking-[2px] mt-1 font-bold">Google Maps Rating</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="relative flex flex-col p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white celebration-border hover:shadow-xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 group h-full transform">
                <div className="flex items-center gap-3 mb-4">
                  {/* Avatar badge matching Google layout */}
                  <div className={`w-10 h-10 rounded-full ${review.bgColor} flex items-center justify-center text-white font-sans text-sm font-bold shadow-inner shrink-0`}>
                    {review.initial}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-brand-dark font-sans text-xs font-bold leading-tight truncate">{review.name}</h4>
                    <span className="text-brand-dark/40 font-sans text-[8px] uppercase tracking-[1px] font-bold block truncate">{review.source}</span>
                  </div>
                </div>

                <div className="flex text-brand-gold gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, idx) => <Icons.Star key={idx} size={11} fill="currentColor" className="text-brand-gold" />)}
                </div>
                
                <p className="text-brand-dark/70 font-sans text-[11px] sm:text-xs leading-relaxed mb-6 flex-grow font-medium">"{review.text}"</p>
                
                <div className="flex items-center justify-between border-t border-black/5 pt-3 mt-auto text-[9px] font-bold text-brand-dark/30 uppercase tracking-[1px]">
                  <span>Google Maps</span>
                  <span>{review.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10.5 Collapsible FAQ Accordion Section */}
      <section className="py-12 sm:py-16 md:py-32 bg-mesh-gradient relative overflow-hidden border-t border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 sm:mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold"></div>
              <span className="text-brand-gold font-sans text-[10px] uppercase tracking-[5px] font-bold">Frequently Asked Questions</span>
              <div className="w-12 h-[1px] bg-brand-gold"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-italic text-brand-dark italic font-bold leading-none mb-6">Got Questions?</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <Reveal key={idx} type="fade-up" delay={idx * 0.08} className="w-full">
                  <div className="rounded-2xl glass-card overflow-hidden shadow-sm transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left font-sans text-xs sm:text-sm font-bold uppercase tracking-[1px] text-brand-dark hover:text-brand-gold transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-brand-gold transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"></path></svg>
                      </span>
                    </button>
                    
                    <div 
                      style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
                      className="transition-all duration-500 ease-in-out overflow-hidden bg-white/40 backdrop-blur-md"
                    >
                      <p className="px-4 sm:px-6 py-4 sm:py-5 text-brand-dark/70 font-sans text-xs sm:text-sm leading-relaxed border-t border-black/5 font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. Immersive Dark Footer */}
      <footer className="bg-brand-dark text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16">
          
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src="/logo.png" alt="Movie Bash" className="h-12 object-contain" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif-italic font-black tracking-tighter uppercase italic text-brand-gold leading-none">
                MOVIE BASH <span className="text-white">BENGALURU</span>
              </h2>
            </div>
            <p className="text-white/70 max-w-sm mb-6 sm:mb-8 font-sans text-[10px] sm:text-xs uppercase tracking-widest leading-loose font-medium">
              Experience blockbusters, live matches, or milestone surprises in absolute privacy with 4K visuals and immersive Dolby Atmos surround sound. Bengaluru's signature private theater.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/moviebash.in" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-gold transition-colors">
                <Icons.Instagram />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[5px] text-brand-gold">Location</h4>
            <div className="flex items-start gap-3 text-white/70">
              <Icons.Maps size={18} className="text-brand-gold shrink-0 mt-0.5" />
              <a href="https://maps.app.goo.gl/K7EwgGzCsgny51W88" target="_blank" rel="noopener noreferrer" className="text-xs font-sans uppercase tracking-widest leading-relaxed hover:text-white transition-colors font-medium">
                Electronic City Phase 1,<br />
                Near Wipro Gate,<br />
                Bengaluru, Karnataka 560100
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[5px] text-brand-gold">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <Icons.Call size={18} className="text-brand-gold shrink-0" />
                <a href="tel:+919902923656" className="text-xs font-sans uppercase tracking-widest hover:text-white transition-colors font-medium">
                  +91 99029 23656
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Icons.WhatsApp size={18} className="text-brand-gold shrink-0" />
                <a href="https://wa.me/919902923656" className="text-xs font-sans uppercase tracking-widest hover:text-white transition-colors font-medium">
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[8px] sm:text-[9px] text-white/40 uppercase tracking-[2px] sm:tracking-[3px] font-bold">
          <p>© 2026 Movie Bash Bengaluru. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-brand-gold transition-colors cursor-pointer bg-transparent border-none p-0 font-bold uppercase tracking-[3px]">
              Privacy Policy
            </button>
            <span>•</span>
            <span>Premium Private Theater & Event Space</span>
          </div>
        </div>
      </footer>

      {/* 12. Privacy Policy Modal Dialog */}
      {privacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPrivacyOpen(false)}></div>
          <div className="relative bg-[#f0f4f8] rounded-3xl w-full max-w-2xl p-6 sm:p-10 shadow-2xl border border-white/80 overflow-y-auto max-h-[85vh] z-10 text-left">
            <button 
              onClick={() => setPrivacyOpen(false)}
              className="absolute top-6 right-6 text-brand-dark/40 hover:text-brand-dark transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>

            <h3 className="text-3xl font-serif-italic italic text-brand-dark font-bold mb-6">Privacy Policy</h3>
            
            <div className="space-y-6 font-sans text-xs text-brand-dark/70 leading-relaxed font-medium">
              <p>
                At <strong>Movie Bash Bengaluru</strong>, we prioritize the confidentiality and safety of our guests. This privacy policy outlines the types of information we collect and how we secure it.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[1px] text-brand-dark">1. Information We Collect</h4>
                <p>
                  When you submit a reservation request, we collect your name, phone number, email address, guest headcount, occasion type, and customized suite configurations. This information is exclusively used to manage your private celebration schedule.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[1px] text-brand-dark">2. Absolute Privacy Guarantee</h4>
                <p>
                  Our private theaters are dedicated celebration spaces designed for premium comfort. We do not sell, rent, or share customer contact records with third-party advertising companies. Any account details you use to log into streaming devices during your slot are encrypted and cleared automatically at the end of your session.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[1px] text-brand-dark">3. Cookies & Local Storage</h4>
                <p>
                  We use cookies and lightweight browser cache storage to remember your chosen suite, date selection, and checkout items to ensure a seamless reservation workflow.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[1px] text-brand-dark">4. Contact Support</h4>
                <p>
                  If you have queries or request data modifications, please contact our support team at <strong>+91 99029 23656</strong> or reach out via WhatsApp.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/5 flex justify-end">
              <button 
                onClick={() => setPrivacyOpen(false)}
                className="px-6 py-2.5 bg-brand-dark hover:bg-brand-gold text-white font-sans text-[10px] font-bold uppercase tracking-[2px] rounded-full transition-colors duration-300 hover:scale-105 transform cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ponytail: lightweight scroll-reveal hook component without react-spring/framer-motion bloat
export function Reveal({ children, className = "", delay = 0, duration = 0.8, type = "fade-up" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const styles = {
    transitionDuration: `${duration}s`,
    transitionDelay: `${delay}s`,
  };

  return (
    <div
      ref={ref}
      style={styles}
      className={`reveal-element reveal-${type} ${isVisible ? 'active' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// ponytail: lightweight parallax-reveal scroll component for premium image motion
export function ParallaxImage({ src, alt, className = "" }) {
  const containerRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      const maxOffset = 50; // max px offset inside overflow-hidden bounds
      const factor = 0.08; // sensitivity factor
      const offset = Math.min(Math.max(distanceFromCenter * factor, -maxOffset), maxOffset);
      setOffsetY(offset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img
        src={src}
        alt={alt}
        style={{ transform: `scale(1.2) translateY(${offsetY}px)` }}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
      />
    </div>
  );
}
