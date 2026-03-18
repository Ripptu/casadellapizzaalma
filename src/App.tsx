/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, MapPin, Clock, Info, Instagram, Facebook, Phone, Mail, Navigation, Calendar, Users, MessageSquare, Leaf, Flame, WheatOff, Check, ChevronRight, CloudSun, Sun, CloudRain, Star, ChevronDown, ChevronUp, BookOpen, Quote } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

// --- Data ---
type MenuItem = {
  id: string;
  number: string;
  name: string;
  description: string;
  price: string;
  priceLarge?: string;
  category: string;
  tags: string[];
};

const menuItems: MenuItem[] = [
  // Vorspeisen
  { id: 'v1', number: '1', name: 'Bruschetta della Casa', description: 'Bruschetta nach Art des Hauses', price: '5,50 €', category: 'Vorspeisen', tags: ['vegetarisch', 'vegan'] },
  { id: 'v2', number: '2', name: 'Bruschetta Caprese', description: 'auf weißem Pizzabrot; Tomaten, Mozzarella, Rucola', price: '7,50 €', category: 'Vorspeisen', tags: ['vegetarisch'] },
  { id: 'v3', number: '3', name: 'Tomaten Mozzarella', description: '', price: '7,50 €', category: 'Vorspeisen', tags: ['vegetarisch'] },
  // Salate
  { id: 's6', number: '6', name: 'Insalata Mista', description: 'Gemischter Salat', price: '5,00 €', priceLarge: '7,50 €', category: 'Salate', tags: ['vegetarisch', 'vegan'] },
  { id: 's7', number: '7', name: 'Insalata di Pomodorie e Cipolla', description: 'Tomatensalat mit Zwiebeln', price: '5,50 €', category: 'Salate', tags: ['vegetarisch', 'vegan'] },
  { id: 's8', number: '8', name: 'Insalata Nizzarda', description: 'Großer gemischter Salat mit Thunfisch, Zwiebel, Oliven und Ei', price: '11,00 €', category: 'Salate', tags: [] },
  { id: 's9', number: '9', name: 'Insalata Capricciosa', description: 'Großer gemischter Salat mit Schinken, Käse und Artischocken', price: '11,00 €', category: 'Salate', tags: [] },
  { id: 's10', number: '10', name: 'Insalata di Tacchino', description: 'Großer gemischter Salat mit Putenstreifen und Champignon', price: '13,00 €', category: 'Salate', tags: [] },
  // Pizza
  { id: 'p31', number: '31', name: 'Pizzabrot', description: '', price: '6,50 €', priceLarge: '19,50 €', category: 'Pizza', tags: ['vegetarisch', 'vegan', 'glutenfrei-möglich'] },
  { id: 'p32', number: '32', name: 'Margherita', description: 'Tomaten und Käse', price: '9,00 €', priceLarge: '27,00 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'p33', number: '33', name: 'Salami', description: 'auf Wunsch auch Rind (+1,00 €)', price: '10,00 €', priceLarge: '30,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p34', number: '34', name: 'Pizza Prosciutto', description: 'Vorderschinken', price: '10,00 €', priceLarge: '30,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p35', number: '35', name: 'Funghi', description: 'mit frischen Champignons', price: '10,00 €', priceLarge: '30,00 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'p36', number: '36', name: 'Regina', description: 'Vorderschinken und Champignons', price: '11,00 €', priceLarge: '33,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p37', number: '37', name: 'Carciofini', description: 'Artischocken und Knoblauch', price: '11,00 €', priceLarge: '33,00 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'p38', number: '38', name: 'Hawaii', description: 'Vorderschinken und Ananas', price: '11,00 €', priceLarge: '33,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p39', number: '39', name: 'Verde al Gorgonzola', description: 'Gorgonzola und Spinat', price: '11,00 €', priceLarge: '30,00 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'p40', number: '40', name: 'Pizza Napoletan', description: 'Sardellen, Oliven und Kapern', price: '11,50 €', priceLarge: '34,50 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p41', number: '41', name: 'Quattro Stagioni', description: 'Vorderschinken, Champignons, Artischocken und Peperoni', price: '12,00 €', priceLarge: '36,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p42', number: '42', name: 'Pizza Vulcano', description: 'Salami, Peperoni, Zwiebeln und Knoblauch', price: '12,00 €', priceLarge: '36,00 €', category: 'Pizza', tags: ['scharf', 'glutenfrei-möglich'] },
  { id: 'p43', number: '43', name: 'Isabella', description: 'Vorderschinken, Paprika, Zwiebeln, Knoblauch und Ei', price: '12,00 €', priceLarge: '36,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p44', number: '44', name: 'Calzone', description: 'gefüllte Pizza mit Vorderschinken, Salami und Artischocken', price: '12,00 €', priceLarge: '36,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p45', number: '45', name: 'Tonno', description: 'Thunfisch und Zwiebel', price: '12,00 €', priceLarge: '36,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p46', number: '46', name: 'Diavolo', description: 'scharfe italienische Salami', price: '12,50 €', priceLarge: '37,50 €', category: 'Pizza', tags: ['scharf', 'glutenfrei-möglich'] },
  { id: 'p47', number: '47', name: 'Capricciosa', description: 'Salami, Champignons, Paprika und Peperoni', price: '12,50 €', priceLarge: '37,50 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p48', number: '48', name: 'Pizza Marinara', description: 'Meeresfrüchte und Knoblauch', price: '13,00 €', priceLarge: '39,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p49', number: '49', name: 'Pizza Ornella', description: 'frische Tomate, Mozzarella und Basilikum', price: '12,50 €', priceLarge: '37,50 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'p50', number: '50', name: 'Pizza della Casa', description: 'mit allem außer Fisch', price: '14,00 €', priceLarge: '42,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p51', number: '51', name: 'Pizza Spaghetti Bolognese', description: 'Rinderhackfleisch', price: '13,00 €', priceLarge: '39,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p52', number: '52', name: 'Vegetarische Pizza', description: '', price: '13,00 €', priceLarge: '39,00 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'p53', number: '53', name: 'Pizza Quattro Formaggi', description: 'Vier Käsesorten', price: '14,00 €', priceLarge: '42,00 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'p54', number: '54', name: 'Pizza Parma', description: 'Parmaschinken, Rucola, Parmesan-Späne', price: '14,00 €', priceLarge: '42,00 €', category: 'Pizza', tags: ['glutenfrei-möglich'] },
  { id: 'p55', number: '55', name: 'Pizza Mediterranea', description: 'gegrillte Aubergine, schwarze Oliven, Feta-Käse', price: '14,50 €', priceLarge: '43,50 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'p56', number: '56', name: 'Pizza Gamberetti', description: 'Garnelen, Knoblauch, Chiliöl, Rucola', price: '15,50 €', priceLarge: '46,50 €', category: 'Pizza', tags: ['scharf', 'glutenfrei-möglich'] },
  { id: 'p57', number: '57', name: 'Pizza Pere', description: 'Birnenscheiben, Gorgonzola, Walnnüsse, Honig', price: '14,50 €', priceLarge: '43,50 €', category: 'Pizza', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  // Pasta
  { id: 'pa13', number: '13', name: 'Spaghetti Bolognese', description: '100% Rinderhackfleisch', price: '10,50 €', category: 'Pasta', tags: ['glutenfrei-möglich'] },
  { id: 'pa14', number: '14', name: 'Spaghetti Knoblauch', description: '', price: '9,50 €', category: 'Pasta', tags: ['vegetarisch', 'vegan', 'glutenfrei-möglich'] },
  { id: 'pa15', number: '15', name: 'Spaghetti Carbonara', description: 'Bauchspeck, Ei, Parmiggiano', price: '11,00 €', category: 'Pasta', tags: ['glutenfrei-möglich'] },
  { id: 'pa16', number: '16', name: 'Spaghetti Marinara', description: 'Meeresfrüchte, Knoblauch', price: '13,50 €', category: 'Pasta', tags: ['glutenfrei-möglich'] },
  { id: 'pa17', number: '17', name: 'Spaghetti Scampi', description: '', price: '15,50 €', category: 'Pasta', tags: ['glutenfrei-möglich'] },
  { id: 'pa19', number: '19', name: 'Rigatoni al Forno', description: 'Formschinken, Champignons, Erbsen, und Käse überbacken', price: '13,00 €', category: 'Pasta', tags: ['glutenfrei-möglich'] },
  { id: 'pa20', number: '20', name: 'Rigatoni Arrabbiata', description: 'hausgemachte Tomatensoße', price: '8,50 €', category: 'Pasta', tags: ['vegetarisch', 'vegan', 'scharf', 'glutenfrei-möglich'] },
  { id: 'pa21', number: '21', name: 'Rigatoni al Salmone', description: 'Lachs, Tomatensoße', price: '14,50 €', category: 'Pasta', tags: ['glutenfrei-möglich'] },
  { id: 'pa22', number: '22', name: 'Rigatoni ai Quattro Forgmaggio', description: '4 verschiedene Käsesorten', price: '13,00 €', category: 'Pasta', tags: ['vegetarisch', 'glutenfrei-möglich'] },
  { id: 'pa23', number: '23', name: 'Rigatoni ai Tacchino', description: 'mit Putenstreifen, Champignon-Rahmsoße', price: '15,50 €', category: 'Pasta', tags: ['glutenfrei-möglich'] },
  { id: 'pa24', number: '24', name: 'Tortellini Panna e Prosciutto', description: 'Formschinken und Sahnesoße', price: '11,50 €', category: 'Pasta', tags: [] },
  { id: 'pa25', number: '25', name: 'Tortellini Emiliana', description: 'Formschinken, Erbsen, Champignons in Sahnesoße', price: '11,50 €', category: 'Pasta', tags: [] },
  { id: 'pa26', number: '26', name: 'Tortellini al Forno', description: 'Formschinken, Erbsen, Champignons in Sahnesoße und mit Käse überbacken', price: '13,00 €', category: 'Pasta', tags: [] },
  // Nachspeisen
  { id: 'n60', number: '60', name: 'hausgemachte Tiramisu', description: '', price: '5,50 €', category: 'Nachspeisen', tags: ['vegetarisch'] },
  { id: 'n61', number: '61', name: 'Tartufo nero', description: '', price: '6,00 €', category: 'Nachspeisen', tags: ['vegetarisch'] },
  { id: 'n62', number: '62', name: 'Bananasplit Eis', description: '', price: '6,50 €', category: 'Nachspeisen', tags: ['vegetarisch'] },
  { id: 'n63', number: '63', name: 'Heiße Liebe', description: 'Vanille Eis mit Sahne und heiße Himbeeren', price: '6,50 €', category: 'Nachspeisen', tags: ['vegetarisch'] },
  // Getränke
  { id: 'g1', number: '', name: 'Cola', description: '', price: '3,50 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
  { id: 'g2', number: '', name: 'Spezi', description: '', price: '3,50 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
  { id: 'g3', number: '', name: 'Orangen-Limonade', description: '', price: '3,50 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
  { id: 'g4', number: '', name: 'Johannisbeerschorle', description: '', price: '4,20 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
  { id: 'g5', number: '', name: 'Apfelschorle', description: '', price: '3,50 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
  { id: 'g6', number: '', name: 'Maracujaschorle', description: '', price: '4,20 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
  { id: 'g7', number: '', name: 'Zitronen-Limonade', description: '', price: '3,50 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
  { id: 'g8', number: '', name: 'Mineralwasser (still)', description: '', price: '3,20 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
  { id: 'g9', number: '', name: 'Sprudelwasser', description: '', price: '3,20 €', priceLarge: '0,5 l', category: 'Getränke', tags: ['vegan', 'vegetarisch', 'glutenfrei-möglich'] },
];

// --- Components ---

function WeatherWidget() {
  const [weather, setWeather] = useState<{temp: number, isGood: boolean} | null>(null);
  useEffect(() => {
    // Haag an der Amper approx: 48.45, 11.83
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.45&longitude=11.83&current_weather=true')
      .then(res => res.json())
      .then(data => {
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        // Good weather: temp >= 18 and not raining heavily (codes 0,1,2,3 are generally fine)
        const isGood = temp >= 18 && code <= 3;
        setWeather({ temp, isGood });
      })
      .catch(() => setWeather({ temp: 24, isGood: true })); // Fallback
  }, []);

  if (!weather) return null;

  return (
    <div className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
      {weather.isGood ? <Sun size={14} className="text-brand-gold" /> : <CloudSun size={14} className="text-gray-400" />}
      <span className="text-gray-300">
        {weather.temp}°C <span className="mx-2 opacity-30">|</span> 
        <span className={weather.isGood ? "text-brand-gold" : "text-gray-400"}>
          {weather.isGood ? "Biergarten geöffnet" : "Innenbereich gemütlich"}
        </span>
      </span>
    </div>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg shadow-black/20' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Hamburger & Logo */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-white hover:text-brand-gold transition-colors"
              aria-label="Menü öffnen"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
            <a href="#" className="block">
              <img 
                src="https://s1.directupload.eu/images/260318/f7zk2ni6.png" 
                alt="Casa della Pizza Alma Logo" 
                className="h-12 md:h-14 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {[
              { name: 'Speisekarte', href: '#speisekarte' },
              { name: 'Über uns', href: '#ueber-uns' },
              { name: 'Standorte', href: '#standorte' },
              { name: 'Events', href: '#events' },
              { name: 'Jobs', href: '#jobs' },
              { name: 'Kontakt', href: '#kontakt' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs text-gray-300 hover:text-white transition-colors uppercase tracking-[0.15em] relative group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          {/* Right side is intentionally empty now to balance the hamburger menu or can hold a small CTA */}
          <div className="hidden md:flex items-center gap-6">
             <a href="tel:+4987613872092" className="text-xs tracking-[0.15em] uppercase text-brand-gold hover:text-white transition-colors">
               +49 8761 3872092
             </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-darker/95 backdrop-blur-xl z-[60] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 md:p-12">
          <img 
            src="https://s1.directupload.eu/images/260318/f7zk2ni6.png" 
            alt="Casa della Pizza Alma Logo" 
            className="h-10 md:h-12 w-auto object-contain" 
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-brand-gold transition-colors"
            aria-label="Menü schließen"
          >
            <X size={36} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center flex-1 gap-10">
          {[
            { name: 'Speisekarte', href: '#speisekarte' },
            { name: 'Über uns', href: '#ueber-uns' },
            { name: 'Standorte', href: '#standorte' },
            { name: 'Events', href: '#events' },
            { name: 'Jobs', href: '#jobs' },
            { name: 'Kontakt', href: '#kontakt' }
          ].map((item, i) => (
            <motion.a
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-5xl md:text-6xl text-white hover:text-brand-gold transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
        </nav>
      </div>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const contentY = useTransform(scrollY, [0, 600], [0, -150]);

  return (
    <section 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-brand-darker"
      aria-label="Hero Sektion - Casa della Pizza Alma"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        style={{ y, scale }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://s1.directupload.eu/images/260318/czhmtsrw.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark Overlay / Vignette fading to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-black/40 to-brand-darker"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,14,12,0.8)_100%)]"></div>
      </motion.div>

      {/* Center Content */}
      <motion.div 
        style={{ opacity, y: contentY }} 
        className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mt-24 md:mt-32 pointer-events-auto"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[1.05] mb-12 drop-shadow-2xl"
        >
          L'arte del gusto — <br className="hidden md:block" />
          <span className="italic text-gray-300">ein Stück Italien</span> <br className="hidden md:block" />
          in Haag an der Amper.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-16 font-light tracking-wide drop-shadow-md"
        >
          Authentische Pizza, frische Zutaten und echte Leidenschaft.
        </motion.p>

        <motion.a 
          href="tel:+4987613872092"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative px-12 py-6 bg-brand-gold text-black text-sm md:text-base tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] rounded-sm flex items-center gap-4 cursor-pointer z-50"
        >
          <Phone size={20} />
          <span>Tisch reservieren</span>
        </motion.a>
      </motion.div>

      {/* Bottom Elements */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex justify-between items-end z-10"
      >
        {/* Scroll Down */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hidden md:flex flex-col items-center gap-6"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase rotate-180 opacity-60" style={{ writingMode: 'vertical-rl' }}>
            Scroll Down
          </span>
          <div className="w-[1px] h-20 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-gold animate-[scroll_2s_ease-in-out_infinite]"></div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-right hidden md:block"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-2">Tischreservierung & Abholung</p>
          <a href="tel:+4987613872092" className="font-serif text-4xl hover:text-brand-gold transition-colors duration-300 drop-shadow-lg">
            +49 8761 3872092
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function InfoBar() {
  const openingHours = [
    { day: 'Montag', hours: 'Ruhetag', closed: true },
    { day: 'Dienstag', hours: '17:00 – 22:30 Uhr' },
    { day: 'Mittwoch', hours: '17:00 – 22:30 Uhr' },
    { day: 'Donnerstag', hours: '17:00 – 22:30 Uhr' },
    { day: 'Freitag', hours: '17:00 – 22:30 Uhr' },
    { day: 'Samstag', hours: '17:00 – 22:30 Uhr' },
    { day: 'Sonntag', hours: '11:00 – 22:30 Uhr', highlight: true },
  ];

  return (
    <section id="standorte" className="bg-brand-darker relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Informationen</span>
              <h2 className="font-serif text-5xl md:text-6xl mb-6">Besuchen Sie uns.</h2>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Erleben Sie authentische italienische Küche in einem Ambiente, das zum Verweilen einlädt.
              </p>
              <div className="inline-block">
                <WeatherWidget />
              </div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 space-y-12 md:space-y-24">
            
            {/* Standort */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-gold/5">
                  <MapPin className="text-brand-gold" size={20} />
                </div>
                <h3 className="font-serif text-3xl">Standort</h3>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 hover:bg-white/[0.04] transition-colors">
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-300">
                  Moosburger Str. 23<br />
                  <span className="text-brand-gold">85410 Haag an der Amper</span>
                </p>
                <div className="mt-8">
                  <a href="https://maps.google.com/?q=Moosburger+Str.+23,+85410+Haag+an+der+Amper" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-white hover:text-brand-gold transition-colors border-b border-white/20 hover:border-brand-gold pb-1">
                    Route planen <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Öffnungszeiten */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-gold/5">
                  <Clock className="text-brand-gold" size={20} />
                </div>
                <h3 className="font-serif text-3xl">Öffnungszeiten</h3>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 hover:bg-white/[0.04] transition-colors">
                <ul className="space-y-4">
                  {openingHours.map((item, i) => (
                    <motion.li 
                      key={item.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-4 last:border-0 last:pb-0 ${item.closed ? 'text-gray-500' : 'text-gray-300'}`}
                    >
                      <span className={`text-lg md:text-xl font-light ${item.closed ? '' : 'text-white'}`}>{item.day}</span>
                      <span className={`text-lg md:text-xl font-light mt-1 sm:mt-0 ${item.highlight ? 'text-brand-gold' : ''}`}>{item.hours}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Ambiente */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-gold/5">
                  <Info className="text-brand-gold" size={20} />
                </div>
                <h3 className="font-serif text-3xl">Ambiente</h3>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300 mb-8">
                    Genießen Sie unsere wunderschöne Außenterrasse im Sommer oder den gemütlichen Innenbereich an kühleren Tagen.
                  </p>
                  <div className="flex items-center gap-3 text-brand-gold/80 bg-brand-gold/10 inline-flex px-4 py-2 rounded-full text-sm">
                    <Users size={16} />
                    <span>Hochstühle für die Bambini sind vorhanden.</span>
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                  <Leaf size={200} className="translate-x-1/4 translate-y-1/4" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

function MenuComponent() {
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = ['Vorspeisen', 'Salate', 'Pizza', 'Pasta', 'Nachspeisen', 'Getränke'];
  const filters = [
    { id: 'vegetarisch', label: 'Vegetarisch', icon: <Leaf size={14} /> },
    { id: 'vegan', label: 'Vegan', icon: <Leaf size={14} className="text-green-400" /> },
    { id: 'scharf', label: 'Scharf', icon: <Flame size={14} className="text-red-500" /> },
    { id: 'glutenfrei-möglich', label: 'Glutenfrei (Option)', icon: <WheatOff size={14} className="text-amber-200" /> },
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredItems = menuItems.filter(item => {
    if (item.category !== activeCategory) return false;
    if (activeFilters.length === 0) return true;
    return activeFilters.every(filter => item.tags.includes(filter));
  });

  return (
    <section id="speisekarte" className="py-24 md:py-32 px-6 bg-brand-dark relative z-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-7xl mb-6">Speisekarte</h2>
          <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">
            Entdecken Sie unsere authentischen italienischen Gerichte.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'bg-brand-gold text-black border-brand-gold' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-brand-gold/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 border ${
                activeFilters.includes(filter.id)
                  ? 'bg-white/10 text-white border-white/30'
                  : 'bg-transparent text-gray-500 border-white/5 hover:border-white/20 hover:text-gray-300'
              }`}
            >
              {filter.icon}
              {filter.label}
              {activeFilters.includes(filter.id) && <Check size={12} className="ml-1" />}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={item.id}
                className="group border-b border-white/5 pb-6"
              >
                <div className="flex justify-between items-baseline mb-2 gap-4">
                  <h4 className="font-serif text-2xl text-white group-hover:text-brand-gold transition-colors">
                    <span className="text-brand-gold/50 text-lg mr-2">{item.number}.</span>
                    {item.name}
                  </h4>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-lg font-light tracking-wider">{item.price}</span>
                    {item.priceLarge && (
                      <span className="text-xs text-gray-500 tracking-widest mt-1">Groß: {item.priceLarge}</span>
                    )}
                  </div>
                </div>
                {item.description && (
                  <p className="text-gray-400 font-light text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  {item.tags.includes('vegetarisch') && <Leaf size={14} className="text-gray-500" title="Vegetarisch" />}
                  {item.tags.includes('vegan') && <Leaf size={14} className="text-green-500/70" title="Vegan" />}
                  {item.tags.includes('scharf') && <Flame size={14} className="text-red-500/70" title="Scharf" />}
                  {item.tags.includes('glutenfrei-möglich') && <WheatOff size={14} className="text-amber-200/50" title="Glutenfrei möglich" />}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 text-gray-500 font-light"
            >
              Keine Gerichte für die gewählten Filter gefunden.
            </motion.div>
          )}
        </div>
        
        {activeCategory === 'Pizza' && (
          <div className="mt-12 text-center text-sm text-brand-gold/70 font-light tracking-wider">
            Alle Pizzen auch in GLUTENFREI für 6,00€ Aufpreis!
          </div>
        )}
        {activeCategory === 'Pasta' && (
          <div className="mt-12 text-center text-sm text-brand-gold/70 font-light tracking-wider">
            Alle Nudeln auch in GLUTENFREI für 5,00€ Aufpreis!
          </div>
        )}
      </div>
    </section>
  );
}

function CateringEvent() {
  return (
    <section id="events" className="relative py-24 md:py-32 px-6 bg-brand-darker border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
          <img 
            src="https://s1.directupload.eu/images/260318/fnaaym68.webp" 
            alt="Catering und Events" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Form Side */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <div className="mb-10">
            <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Catering & Events</span>
            <h2 className="font-serif text-5xl md:text-6xl mb-6 leading-[1.1]">Feiern Sie mit uns.</h2>
            <p className="text-gray-400 font-light text-lg leading-relaxed">
              Ob Firmenfeier, Geburtstag oder Jubiläum – wir bieten den perfekten Rahmen und authentisches italienisches Catering für Ihr Event.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input type="text" id="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-brand-gold transition-colors peer" placeholder=" " required />
                <label htmlFor="name" className="absolute text-gray-500 text-sm left-4 top-4 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs">Name</label>
              </div>
              <div className="relative">
                <input type="email" id="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-brand-gold transition-colors peer" placeholder=" " required />
                <label htmlFor="email" className="absolute text-gray-500 text-sm left-4 top-4 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs">E-Mail</label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative flex items-center">
                <Calendar className="absolute left-4 text-gray-500 pointer-events-none" size={18} />
                <input type="date" id="date" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none" required />
              </div>
              <div className="relative flex items-center">
                <Users className="absolute left-4 text-gray-500 pointer-events-none" size={18} />
                <select id="guests" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none" required defaultValue="">
                  <option value="" disabled className="bg-brand-dark text-gray-500">Anzahl Gäste</option>
                  <option value="10-20" className="bg-brand-dark">10 - 20 Personen</option>
                  <option value="20-50" className="bg-brand-dark">20 - 50 Personen</option>
                  <option value="50+" className="bg-brand-dark">50+ Personen</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-gray-500 pointer-events-none" size={18} />
              <textarea id="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 pt-4 pb-2 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none" placeholder="Details zu Ihrem Event (Art der Feier, besondere Wünsche...)" required></textarea>
            </div>

            <button type="submit" className="w-full group relative px-8 py-4 bg-brand-gold text-black text-sm tracking-[0.2em] uppercase font-medium overflow-hidden rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <span className="relative z-10">Anfrage senden</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0"></div>
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}

function StickyMobileActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around p-2">
        <a href="tel:+4987613872092" className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-brand-gold transition-colors flex-1">
          <Phone size={20} className="mb-1" />
          <span className="text-[10px] uppercase tracking-wider">Anrufen</span>
        </a>
        <div className="w-[1px] h-8 bg-white/10"></div>
        <a href="https://maps.google.com/?q=Moosburger+Str.+23,+85410+Haag+an+der+Amper" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-brand-gold transition-colors flex-1">
          <Navigation size={20} className="mb-1" />
          <span className="text-[10px] uppercase tracking-wider">Route</span>
        </a>
        <div className="w-[1px] h-8 bg-white/10"></div>
        <a href="tel:+4987613872092" className="flex flex-col items-center justify-center p-2 text-brand-gold hover:text-white transition-colors flex-1">
          <Calendar size={20} className="mb-1" />
          <span className="text-[10px] uppercase tracking-wider font-medium">Reservieren</span>
        </a>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <section id="ueber-uns" className="py-24 md:py-32 px-6 bg-brand-dark relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1"
        >
          <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">La Famiglia</span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1]">Tradition & Leidenschaft.</h2>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-6">
            Hinter Casa della Pizza Alma steht eine montenegrinisch-sizilianische Großfamilie. Alma Bakic und ihr Team bringen echte italienische Handwerkskunst nach Inkofen und Haag an der Amper.
          </p>
          <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed">
            Jede Pizza wird mit Liebe, den besten Zutaten und einem Hauch familiärer Wärme gebacken. Bei uns sind Sie nicht nur Gast, sondern Teil der Familie.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden order-1 lg:order-2 group"
        >
          <img 
            src="https://www.merkur.de/assets/images/38/624/38624087-montenegrinisch-sizilianische-grossfamilie-alma-bakic-betreibt-die-casa-della-pizza-alma-in-inkofen-2jSQ4nzCqme9.jpg" 
            alt="Familie Alma Bakic" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/80 via-transparent to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}

function Jobs() {
  return (
    <section id="jobs" className="py-24 md:py-32 px-6 bg-brand-darker border-y border-white/5 relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]"></div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Karriere</span>
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">Werde Teil der Famiglia.</h2>
        <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Wir suchen leidenschaftliche Pizzabäcker, Servicekräfte und Fahrer, die unsere Liebe zur italienischen Küche teilen.
        </p>
        <a href="mailto:info@casadellapizzaalma.de" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 rounded-xl text-sm tracking-[0.2em] uppercase font-medium">
          Jetzt bewerben
        </a>
      </motion.div>
    </section>
  );
}

function ReviewSlider() {
  const [current, setCurrent] = useState(0);
  const reviews = [
    { text: "Die beste Pizza außerhalb Neapels. Der Teig ist ein Traum!", author: "Michael S." },
    { text: "Wunderschönes Ambiente im Biergarten und unglaublich herzlicher Service.", author: "Sarah L." },
    { text: "Authentisch, frisch und mit viel Liebe gemacht. Absolute Empfehlung.", author: "Thomas M." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 bg-brand-dark relative z-20 overflow-hidden border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center relative">
        <Quote className="absolute -top-10 left-1/2 -translate-x-1/2 text-brand-gold/20 w-24 h-24 rotate-180" />
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-brand-gold fill-brand-gold" />)}
        </div>
        <div className="relative h-48 md:h-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-serif text-3xl md:text-5xl leading-tight mb-6 text-white">"{reviews[current].text}"</p>
              <span className="text-brand-gold text-sm tracking-[0.2em] uppercase font-medium">— {reviews[current].author}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-gold w-8' : 'bg-white/20'}`}
              aria-label={`Gehe zu Bewertung ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Gibt es Parkplätze direkt am Restaurant?", a: "Ja, wir haben ausreichend kostenfreie Parkplätze direkt an der Moosburger Str. für unsere Gäste." },
    { q: "Sind Hunde bei euch erlaubt?", a: "Selbstverständlich! Gut erzogene Vierbeiner sind sowohl auf der Terrasse als auch im Innenbereich herzlich willkommen. Ein Wassernapf steht immer bereit." },
    { q: "Ist das Restaurant rollstuhlgerecht?", a: "Ja, unser Restaurant sowie die Sanitäranlagen sind ebenerdig und vollständig barrierefrei zugänglich." },
    { q: "Kann ich mit Karte zahlen?", a: "Wir akzeptieren EC-Karten, Visa, Mastercard sowie Apple Pay und Google Pay." }
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-brand-darker relative z-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Häufige Fragen</span>
          <h2 className="font-serif text-5xl md:text-6xl mb-6">Gut zu wissen.</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-serif text-2xl pr-8">{faq.q}</span>
                {openIndex === i ? <ChevronUp className="text-brand-gold flex-shrink-0" /> : <ChevronDown className="text-gray-500 flex-shrink-0" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramGrid() {
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", // Pizza
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800", // Pasta
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800", // Restaurant
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800", // Wine
    "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800"  // Pizza detail
  ]);
  const [links, setLinks] = useState<string[]>(Array(5).fill("https://instagram.com/casadellapizzaalma"));

  useEffect(() => {
    const fetchInstagram = async () => {
      try {
        // Requires VITE_INSTAGRAM_TOKEN in environment variables for live data
        const token = import.meta.env.VITE_INSTAGRAM_TOKEN;
        if (!token) return;

        const res = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${token}&limit=10`);
        const data = await res.json();
        
        if (data && data.data) {
          const validPosts = data.data.filter((item: any) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM');
          if (validPosts.length >= 5) {
            setImages(validPosts.slice(0, 5).map((item: any) => item.media_url));
            setLinks(validPosts.slice(0, 5).map((item: any) => item.permalink));
          }
        }
      } catch (error) {
        console.error("Failed to fetch Instagram feed", error);
      }
    };
    fetchInstagram();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-brand-dark relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Social Media</span>
          <h2 className="font-serif text-5xl md:text-6xl">Folge dem Genuss.</h2>
        </div>
        <a href="https://instagram.com/casadellapizzaalma" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors uppercase tracking-widest text-sm font-medium">
          <Instagram size={18} />
          @casadellapizzaalma
        </a>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[250px]">
          <a href={links[0]} target="_blank" rel="noopener noreferrer" className="col-span-2 row-span-2 rounded-2xl overflow-hidden group relative block">
            <img src={images[0]} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white w-12 h-12" />
            </div>
          </a>
          <a href={links[1]} target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl overflow-hidden group relative block">
            <img src={images[1]} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </a>
          <a href={links[2]} target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-2 rounded-2xl overflow-hidden group relative block">
            <img src={images[2]} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white w-10 h-10" />
            </div>
          </a>
          <a href={links[3]} target="_blank" rel="noopener noreferrer" className="col-span-1 row-span-1 rounded-2xl overflow-hidden group relative block">
            <img src={images[3]} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </a>
          <a href={links[4]} target="_blank" rel="noopener noreferrer" className="col-span-2 md:col-span-4 row-span-1 md:hidden rounded-2xl overflow-hidden group relative block">
            <img src={images[4]} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="kontakt" className="bg-brand-darker pt-24 md:pt-32 pb-24 md:pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32 relative z-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <img 
            src="https://s1.directupload.eu/images/260318/f7zk2ni6.png" 
            alt="Casa della Pizza Alma Logo" 
            className="h-24 w-auto mb-8 object-contain" 
            referrerPolicy="no-referrer"
          />
          <p className="text-gray-400 font-light leading-relaxed mb-8 text-lg">
            Authentische Pizza, frische Zutaten und echte Leidenschaft. Ein Stück Italien in Haag an der Amper.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300"><Instagram size={20} strokeWidth={1.5} /></a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300"><Facebook size={20} strokeWidth={1.5} /></a>
          </div>
        </div>
        
        {/* Links */}
        <div>
          <h4 className="font-serif text-3xl mb-8">Entdecken</h4>
          <ul className="space-y-4 text-gray-400 font-light text-lg">
            <li><a href="#speisekarte" className="hover:text-brand-gold transition-colors">Speisekarte</a></li>
            <li><a href="#ueber-uns" className="hover:text-brand-gold transition-colors">Über uns</a></li>
            <li><a href="#standorte" className="hover:text-brand-gold transition-colors">Standorte</a></li>
            <li><a href="#jobs" className="hover:text-brand-gold transition-colors">Jobs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-3xl mb-8">Kontakt</h4>
          <ul className="space-y-6 text-gray-400 font-light text-lg">
            <li className="flex items-start gap-4">
              <MapPin size={24} strokeWidth={1.5} className="text-brand-gold shrink-0 mt-1" />
              <span>Moosburger Str. 23<br/>85410 Haag an der Amper</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={24} strokeWidth={1.5} className="text-brand-gold shrink-0" />
              <a href="tel:+4987613872092" className="hover:text-brand-gold transition-colors">+49 8761 3872092</a>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={24} strokeWidth={1.5} className="text-brand-gold shrink-0" />
              <a href="mailto:info@casadellapizzaalma.de" className="hover:text-brand-gold transition-colors">info@casadellapizzaalma.de</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-serif text-3xl mb-8">Öffnungszeiten</h4>
          <ul className="space-y-4 text-gray-400 font-light text-lg">
            <li className="flex justify-between border-b border-white/5 pb-3"><span className="text-white">Mi-Sa</span> <span>17:00–22:30</span></li>
            <li className="flex justify-between border-b border-white/5 pb-3"><span className="text-white">So</span> <span>11:00–22:30</span></li>
            <li className="flex justify-between border-b border-white/5 pb-3"><span className="text-white">Di</span> <span>17:00–22:30</span></li>
            <li className="flex justify-between text-brand-gold/70 pt-2"><span>Mo</span> <span>Geschlossen</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-xs font-light tracking-[0.15em] uppercase">
          &copy; {new Date().getFullYear()} Casa della Pizza Alma. Alle Rechte vorbehalten.
        </p>
        <div className="flex gap-8 text-gray-500 text-xs font-light tracking-[0.15em] uppercase">
          <a href="#" className="hover:text-white transition-colors">Impressum</a>
          <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
        </div>
      </div>
      
      {/* Huge Typography Background */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none opacity-[0.02] z-0 overflow-hidden translate-y-1/4">
        <span className="font-serif text-[28vw] leading-none whitespace-nowrap">ALMA</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-brand-dark selection:bg-brand-gold selection:text-black">
      {/* Invisible aria-labels for Local SEO */}
      <div className="sr-only" aria-hidden="false">
        <h1>Pizza Haag an der Amper</h1>
        <h2>Italienisches Restaurant Haag an der Amper</h2>
        <p>Beste Pizza in Haag an der Amper, authentische italienische Küche, Tischreservierung.</p>
      </div>

      <Header />
      <Hero />
      <InfoBar />
      <AboutUs />
      <MenuComponent />
      <ReviewSlider />
      <CateringEvent />
      <FAQ />
      <InstagramGrid />
      <Jobs />
      <Footer />
      <StickyMobileActionBar />
    </main>
  );
}
