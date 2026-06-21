import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LeadForm } from '../../components/LeadForm';
import { servicesData, citiesData, brandsData } from '../../data/seoData';
import { 
  Phone, Shield, Award, Clock, Star, CheckCircle, 
  Calendar, ArrowRight, Settings, 
  MapPin, ShieldAlert, Sparkles, MessageSquare
} from 'lucide-react';

interface HomeProps {
  onBookClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onBookClick }) => {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const reviews = [
    { name: 'Marcus K.', city: 'Wichita', rating: 5, date: '2 days ago', text: 'My refrigerator stopped cooling on a Sunday morning. Called Rick Nees and they had John out by 1 PM. He diagnosed a failed relay, had the part on his truck, and fixed it in 30 minutes. Amazing service!' },
    { name: 'Sarah L.', city: 'Andover', rating: 5, date: '1 week ago', text: 'Our washer overflowed and soaked the laundry room. Dave arrived quickly, found a clogged drain pump, cleared it, and tested the machine. Very professional, honest, and reasonably priced. Will definitely use again.' },
    { name: 'David T.', city: 'Derby', rating: 5, date: '2 weeks ago', text: 'Mark repaired our Viking stove that wouldn\'t ignite. High-end appliance service is hard to find in the Wichita area, but these guys are true pros. Honest pricing and outstanding work.' }
  ];

  return (
    <div className="bg-white flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden py-20 lg:py-32 flex items-center">
        {/* Background gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />
        
        {/* Hero Background Image */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 h-full z-0 opacity-40 lg:opacity-100">
          <img 
            src="/assets/hero-tech.png" 
            alt="Rick Nees Appliance Repair Technician" 
            className="w-full h-full object-cover object-center lg:object-left"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 z-20 relative w-full text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-white space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent-light">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Wichita's First Choice
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white uppercase leading-[1.05] drop-shadow-md">
                Wichita's Trusted <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">Appliance Repair</span> Experts
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg md:text-xl font-medium text-slate-300 max-w-xl">
                Serving Wichita Homeowners for Over 40 Years. Same-day diagnostics and repairs on washers, dryers, refrigerators, dishwashers, ovens, and more.
              </p>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/10 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-white uppercase">40 Years</p>
                    <p className="text-slate-400">Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-white uppercase">Licensed</p>
                    <p className="text-slate-400">& Insured</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-white uppercase">Same-Day</p>
                    <p className="text-slate-400">Service Promise</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-white uppercase">Warranty</p>
                    <p className="text-slate-400">Parts & Labor</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a 
                  href="tel:3162131874" 
                  className="bg-accent hover:bg-accent-dark text-white font-heading text-lg font-bold tracking-wider py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-150 uppercase flex items-center justify-center gap-2.5"
                >
                  <Phone className="w-5 h-5 fill-white animate-pulse" /> Call Now: (316) 213-1874
                </a>
                <button 
                  onClick={onBookClick}
                  className="bg-white/10 hover:bg-white/20 text-white font-heading text-lg font-bold tracking-wider py-4 px-8 rounded-xl border border-white/20 hover:border-white/35 transition uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5 text-slate-300" /> Book Service Online
                </button>
              </div>

            </div>

            {/* Hero Right Widget - Form (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="scale-95 origin-right">
                <LeadForm compact />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Scrolling Emergency Ticker */}
      <div className="bg-accent text-white py-3 overflow-hidden select-none border-y border-accent-dark/20 z-10 relative">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(6)].map((_, idx) => (
            <span key={idx} className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
              Need Immediate Repair? Call (316) 213-1874 for Same-Day Dispatch &amp; Diagnostics!
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* 3. Services Grid */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary uppercase tracking-wider">
              Professional Appliance Repairs
            </h2>
            <p className="text-slate-500 mt-3 text-sm">
              We repair all major home appliances. Our technicians carry standard replacement parts to complete your repairs on the very first visit.
            </p>
            <div className="w-16 h-1 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.slice(0, 8).map(s => (
              <Link 
                key={s.id} 
                to={`/services/${s.id}`}
                className="group bg-white border border-slate-100 rounded-3xl p-6 shadow-soft hover:shadow-premium hover:-translate-y-1 transition duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  {/* Styled Icon */}
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition duration-300 mb-6">
                    <Settings className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-primary uppercase tracking-wide group-hover:text-accent transition duration-300">
                    {s.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                    {s.shortDesc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-accent transition duration-300 mt-6 pt-4 border-t border-slate-50">
                  Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-300" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={onBookClick}
              className="bg-primary hover:bg-brand-dark text-white font-heading font-bold tracking-wider px-8 py-3.5 rounded-xl transition uppercase text-sm cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <Calendar className="w-4.5 h-4.5" /> Book My Service Call
            </button>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us / Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Placeholder/Illustration */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-100 group">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10" />
              <img 
                src="/assets/hero-tech.png" 
                alt="Wichita Appliance Repair Service" 
                className="w-full h-[400px] object-cover opacity-80 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20 text-white text-left">
                <div className="flex gap-1.5 text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-none" />)}
                </div>
                <h4 className="text-xl font-bold font-heading uppercase">Over 40 Years in Wichita</h4>
                <p className="text-xs text-slate-200 mt-1">Providing reliable, honest repairs since 1986.</p>
              </div>
            </div>

            {/* Trust Content */}
            <div className="text-left space-y-6">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Why Rick Nees Appliance Repair?</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary uppercase tracking-wide">
                Wichita's Most Trusted Repair Service
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                We believe appliance repair should be straightforward and worry-free. When you book a service call with Rick Nees, you receive certified expert care backed by four decades of family-owned pride.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent/15 text-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Honest, Flat-Rate Pricing</h4>
                    <p className="text-xs text-slate-500 mt-1">No surprise fees. We offer a flat-rate diagnostic fee that is applied directly to the cost of your repair.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent/15 text-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Same-Day Service &amp; Local Focus</h4>
                    <p className="text-xs text-slate-500 mt-1">Based in Wichita, KS. We optimize routes daily so our technicians can respond to washing machine or refrigerator breakdowns immediately.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-accent/15 text-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm uppercase tracking-wide">Reliable Parts &amp; Labor Warranty</h4>
                    <p className="text-xs text-slate-500 mt-1">We stand by our repairs. All parts used are OEM high-grade components backed by manufacturer and labor warranties.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Brands We Repair Marquee */}
      <section className="py-12 bg-light-bg border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            We Service All Major Appliance Brands
          </p>
          <div className="flex gap-12 whitespace-nowrap animate-[brandsMarquee_35s_linear_infinite] no-scrollbar">
            {brandsData.concat(brandsData).map((brand, idx) => (
              <span key={idx} className="text-xl font-bold font-heading uppercase text-slate-400 hover:text-primary transition duration-200 select-none px-4">
                {brand.name}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes brandsMarquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold font-heading text-primary uppercase tracking-wider">
              Wichita Customer Reviews
            </h2>
            <p className="text-slate-500 mt-2.5 text-xs">
              Read verified testimonials from homeowners in Wichita, Derby, Andover, and surrounding areas.
            </p>
            <div className="w-16 h-1 bg-accent mx-auto mt-4" />
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-soft relative text-left">
            <div className="flex gap-1.5 text-yellow-400 mb-4 justify-center md:justify-start">
              {[...Array(reviews[activeReviewIdx].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-none" />
              ))}
            </div>
            
            <p className="text-slate-700 italic text-base md:text-lg leading-relaxed text-center md:text-left mb-6">
              "{reviews[activeReviewIdx].text}"
            </p>

            <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-slate-200/60">
              <div className="text-center md:text-left">
                <span className="font-bold text-primary font-heading text-base uppercase tracking-wide">
                  {reviews[activeReviewIdx].name}
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  ({reviews[activeReviewIdx].city}, KS)
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-400 mt-2 md:mt-0 flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-accent" /> Verified Review &bull; {reviews[activeReviewIdx].date}
              </div>
            </div>

            {/* Dots navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition ${idx === activeReviewIdx ? 'bg-accent' : 'bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Cities Directory / Service Map */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content List */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Local SEO Directory</span>
              <h2 className="text-3xl font-extrabold font-heading text-primary uppercase tracking-wide">
                Cities We Serve Near Wichita
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                Rick Nees Appliance Repair provides prompt, same-day home appliance repair dispatch to towns throughout Sedgwick, Butler, and Harvey counties. Click your local city below to review customized service maps and coupons.
              </p>

              {/* Grid of Cities links */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {citiesData.map(c => (
                  <Link 
                    key={c.id} 
                    to={`/cities/${c.id}`}
                    className="flex items-center gap-2 bg-white border border-slate-100 hover:border-primary/20 hover:shadow-sm px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-primary transition"
                  >
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Map Image */}
            <div className="lg:col-span-6 bg-white border border-slate-100 rounded-3xl p-4 shadow-soft">
              <div className="aspect-video w-full rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-100 flex flex-col items-center justify-center text-center p-6">
                {/* Styled Map Background Representation */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0B2E59_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <MapPin className="w-12 h-12 text-accent animate-bounce mb-3 z-10" />
                <h4 className="text-lg font-bold font-heading text-primary uppercase z-10">Wichita Metro Dispatch Area</h4>
                <p className="text-[11px] text-slate-500 max-w-sm mt-1 leading-normal z-10">
                  Headquartered in Wichita, KS. Serving a 30-mile radius including Derby, Andover, Bel Aire, Maize, Goddard, and Haysville.
                </p>
                <div className="mt-4 bg-primary/5 text-primary text-[10px] font-bold px-3 py-1.5 rounded-lg border border-primary/10 z-10 uppercase tracking-wide">
                  Active Dispatch Trucks: 4
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Conversion Capture Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(214,40,40,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-slate-900/40" />

        <div className="max-w-5xl mx-auto px-4 md:px-6 z-10 relative text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-wider uppercase">
            Schedule Your Same-Day Repair Today
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Get honest pricing, certified technicians, and parts warranties. Call our office now or fill out our online booking form to secure your appointment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a 
              href="tel:3162131874" 
              className="bg-accent hover:bg-accent-dark text-white font-heading text-lg font-bold tracking-wider py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition uppercase flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 fill-white animate-pulse" /> Call (316) 213-1874
            </a>
            <button 
              onClick={onBookClick}
              className="bg-white text-primary hover:bg-slate-100 font-heading text-lg font-bold tracking-wider py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-accent" /> Schedule Online
            </button>
          </div>
          
          <div className="text-[10px] text-slate-400 uppercase tracking-widest pt-2">
            No obligation diagnostics &bull; Applied directly to your repair invoice
          </div>
        </div>
      </section>

    </div>
  );
};
export default Home;
