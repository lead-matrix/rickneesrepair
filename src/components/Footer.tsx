import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData, citiesData } from '../data/seoData';
import { Phone, Mail, MapPin, Award, CheckCircle } from 'lucide-react';

interface FooterProps {
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/5 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Company Column */}
          <div className="flex flex-col text-left">
            <Link to="/" className="flex items-center gap-2 mb-4 group select-none">
              <div className="flex flex-col">
                <div className="text-2xl font-black font-heading tracking-wider text-white leading-none">
                  RICK NEES
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="h-[2px] w-3 bg-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none">
                    APPLIANCE REPAIR
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Wichita's premier local appliance repair service for over 40 years. Same-day diagnostics and repairs backed by parts and labor warranties.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[9px] font-bold uppercase text-white tracking-wide">
                <Award className="w-3 h-3 text-accent" /> 40 Years Experience
              </span>
              <span className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[9px] font-bold uppercase text-white tracking-wide">
                <CheckCircle className="w-3 h-3 text-accent" /> Licensed & Insured
              </span>
            </div>
            
            {/* NAP Info */}
            <div className="space-y-2.5 text-xs text-slate-400">
              <a href="tel:3162131874" className="flex items-center gap-2 hover:text-white transition">
                <Phone className="w-4 h-4 text-accent fill-accent" />
                <span className="font-semibold text-slate-300">(316) 213-1874</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Wichita, KS & Surrounding Area</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>service@rickneesrepair.com</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="text-left">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 border-l-2 border-accent pl-2.5">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesData.slice(0, 7).map(s => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="hover:text-white transition">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/brands" className="text-accent hover:text-accent-dark transition font-semibold">
                  Brands We Service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities Column */}
          <div className="text-left">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 border-l-2 border-accent pl-2.5">
              Areas We Serve
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {citiesData.slice(0, 10).map(c => (
                <li key={c.id}>
                  <Link to={`/cities/${c.id}`} className="hover:text-white transition">
                    {c.name}, KS
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA & Company Details */}
          <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-bold font-heading uppercase text-white tracking-wide mb-1">
                Need Fast Repair?
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Contact our dispatch office now for immediate assistance or book online below.
              </p>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:3162131874"
                className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-bold text-center py-2.5 rounded-xl text-xs uppercase tracking-wider transition border border-white/10 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 fill-white" /> Call (316) 213-1874
              </a>
              <button
                onClick={onBookClick}
                className="w-full bg-accent hover:bg-accent-dark text-white font-heading font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg cursor-pointer"
              >
                Schedule Service
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Rick Nees Appliance Repair. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
            <span>&bull;</span>
            <Link to="/admin" className="hover:text-slate-300 transition font-bold text-slate-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
