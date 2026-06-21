import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { servicesData, citiesData } from '../data/seoData';
import { Phone, Calendar, Menu, X, ChevronDown, Award } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCitiesDropdownOpen(false);
  }, [location.pathname]);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-primary text-white text-[11px] font-semibold py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-1.5 border-b border-white/5 z-40 relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-accent fill-accent animate-pulse" />
            <span>Serving Wichita, KS Exclusively for 40+ Years</span>
          </div>
          <span className="hidden sm:inline bg-red-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-400/30">
            Master Mechanical AC Contractor
          </span>
        </div>
        <div className="flex items-center gap-4 text-white/90">
          <span>Same-Day Service Available</span>
          <span className="hidden sm:inline">|</span>
          <span>Mon-Sun: 7 AM - 9 PM</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/5 py-2.5' 
            : 'bg-slate-900/90 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo Container */}
          <Link to="/" className="flex items-center gap-2 group select-none">
            <img 
              src="/logo.png" 
              alt="Rick Nees Appliance Repair" 
              className="h-12 md:h-14 w-auto object-contain drop-shadow-lg"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-200">
            <Link to="/" className={`hover:text-white transition ${location.pathname === '/' ? 'text-white border-b-2 border-accent pb-0.5' : ''}`}>Home</Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-white transition py-1 cursor-pointer">
                Services <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-slate-950/95 backdrop-blur-lg border border-white/10 rounded-2xl p-2 shadow-2xl grid grid-cols-1 gap-1 text-xs">
                  <div className="max-h-80 overflow-y-auto no-scrollbar py-1">
                    {servicesData.map(s => (
                      <Link 
                        key={s.id} 
                        to={`/services/${s.id}`} 
                        className="block px-4 py-2 hover:bg-white/10 rounded-xl hover:text-white transition"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Service Areas Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCitiesDropdownOpen(true)}
              onMouseLeave={() => setCitiesDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-white transition py-1 cursor-pointer">
                Cities We Serve <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              {citiesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-slate-950/95 backdrop-blur-lg border border-white/10 rounded-2xl p-2 shadow-2xl grid grid-cols-1 gap-1 text-xs">
                  <div className="max-h-80 overflow-y-auto no-scrollbar py-1">
                    {citiesData.map(c => (
                      <Link 
                        key={c.id} 
                        to={`/cities/${c.id}`} 
                        className="block px-4 py-2 hover:bg-white/10 rounded-xl hover:text-white transition"
                      >
                        {c.name}, KS
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/brands" className={`hover:text-white transition ${location.pathname === '/brands' ? 'text-white border-b-2 border-accent pb-0.5' : ''}`}>Brands We Repair</Link>
            <Link to="/financing" className={`hover:text-white transition ${location.pathname === '/financing' ? 'text-white border-b-2 border-accent pb-0.5' : ''}`}>Financing</Link>
            <Link to="/reviews" className={`hover:text-white transition ${location.pathname === '/reviews' ? 'text-white border-b-2 border-accent pb-0.5' : ''}`}>Reviews</Link>
            <Link to="/blog" className={`hover:text-white transition ${location.pathname.startsWith('/blog') ? 'text-white border-b-2 border-accent pb-0.5' : ''}`}>Blog</Link>
            <Link to="/contact" className={`hover:text-white transition ${location.pathname === '/contact' ? 'text-white border-b-2 border-accent pb-0.5' : ''}`}>Contact</Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:3162131874" 
              className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-xl border border-white/10 transition"
            >
              <Phone className="w-4 h-4 text-accent fill-accent animate-pulse" />
              <span className="font-extrabold">(316) 213-1874</span>
            </a>
            
            <button
              onClick={onBookClick}
              className="flex items-center gap-1.5 bg-accent hover:bg-accent-dark text-white font-heading font-bold tracking-wider px-5 py-2.5 rounded-xl transition shadow-lg cursor-pointer text-xs uppercase"
            >
              <Calendar className="w-4 h-4" /> Book Online
            </button>
          </div>

          {/* Mobile Right CTAs / Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a 
              href="tel:3162131874" 
              className="flex items-center justify-center bg-accent text-white p-2.5 rounded-xl shadow-lg border border-white/5 cursor-pointer"
              aria-label="Call Rick Nees Appliance Repair"
            >
              <Phone className="w-4.5 h-4.5 fill-white animate-pulse" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-200 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950 border-t border-white/5 py-4 px-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5 duration-200 max-h-[85vh] overflow-y-auto">
            <Link to="/" className="text-slate-200 hover:text-white font-semibold text-sm border-b border-white/5 pb-2">Home</Link>
            
            {/* Mobile Services list (Collapsed accordion style) */}
            <div className="border-b border-white/5 pb-2">
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="w-full flex justify-between items-center text-slate-200 hover:text-white font-semibold text-sm cursor-pointer"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesDropdownOpen && (
                <div className="grid grid-cols-2 gap-2 mt-2 pl-3 text-xs text-slate-400">
                  {servicesData.map(s => (
                    <Link key={s.id} to={`/services/${s.id}`} className="py-1 hover:text-white">
                      {s.name.replace(' Repair', '')}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Cities List */}
            <div className="border-b border-white/5 pb-2">
              <button 
                onClick={() => setCitiesDropdownOpen(!citiesDropdownOpen)}
                className="w-full flex justify-between items-center text-slate-200 hover:text-white font-semibold text-sm cursor-pointer"
              >
                Cities We Serve
                <ChevronDown className={`w-4 h-4 transition ${citiesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {citiesDropdownOpen && (
                <div className="grid grid-cols-2 gap-2 mt-2 pl-3 text-xs text-slate-400">
                  {citiesData.map(c => (
                    <Link key={c.id} to={`/cities/${c.id}`} className="py-1 hover:text-white">
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/brands" className="text-slate-200 hover:text-white font-semibold text-sm border-b border-white/5 pb-2">Brands We Repair</Link>
            <Link to="/financing" className="text-slate-200 hover:text-white font-semibold text-sm border-b border-white/5 pb-2">Financing</Link>
            <Link to="/reviews" className="text-slate-200 hover:text-white font-semibold text-sm border-b border-white/5 pb-2">Reviews</Link>
            <Link to="/blog" className="text-slate-200 hover:text-white font-semibold text-sm border-b border-white/5 pb-2">Blog</Link>
            <Link to="/contact" className="text-slate-200 hover:text-white font-semibold text-sm border-b border-white/5 pb-2">Contact</Link>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full bg-accent hover:bg-accent-dark text-white font-heading font-bold tracking-wider py-3.5 rounded-xl uppercase text-sm mt-2 transition"
            >
              Book Service Online
            </button>
          </div>
        )}
      </header>
    </>
  );
};
export default Header;
