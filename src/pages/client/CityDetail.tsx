import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { citiesData } from '../../data/seoData';
import { LeadForm } from '../../components/LeadForm';
import { 
  MapPin, Check, HelpCircle, 
  ArrowLeft, Award, Shield, ChevronRight, Info
} from 'lucide-react';

export const CityDetail: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const city = citiesData.find(c => c.id === cityId);

  if (!city) {
    return (
      <div className="py-20 text-center bg-slate-50 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold font-heading text-primary uppercase">City Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">We could not find the specific service area page you requested.</p>
        <Link to="/" className="mt-6 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. Page Header (SEO Target) */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          
          <span className="bg-accent/20 border border-accent/30 text-accent-light text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            Local Service Area
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            Appliance Repair in {city.name}, KS
          </h1>
          
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            Same-day washing machine, dryer, refrigerator, dishwasher, and oven repairs for homeowners in <span className="font-semibold text-white">{city.name}, Kansas</span> and surrounding zip codes.
          </p>
        </div>
      </section>

      {/* 2. Content & Lead Form Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left SEO Content Panel */}
            <div className="lg:col-span-7 text-left space-y-10">
              
              {/* Local welcome introduction */}
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold font-heading text-primary uppercase tracking-wide border-b pb-3 border-slate-100 flex items-center gap-2">
                  <MapPin className="w-5.5 h-5.5 text-accent" /> Serving the {city.name} Community
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-4">
                  {city.intro} If you are experiencing a warm refrigerator, a loud washing machine, or an oven that won't heat, our local dispatch trucks can be at your house today.
                </p>
              </div>

              {/* Specific landmarks & neighborhoods served */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl">
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Landmarks We Service Near</h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {city.landmarks.map((l, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-accent stroke-[2.5]" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Neighborhoods Served</h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {city.neighborhoods.map((n, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-accent stroke-[2.5]" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service Areas Highlights */}
              <div>
                <h3 className="text-xl font-bold font-heading text-primary uppercase tracking-wide border-b pb-3 border-slate-100 flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" /> {city.name} Repair Highlights
                </h3>
                <div className="mt-4 space-y-3">
                  {city.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                      <div className="w-6 h-6 bg-primary/5 text-primary rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{h}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Localized FAQ Accordion */}
              <div>
                <h3 className="text-xl font-bold font-heading text-primary uppercase tracking-wide border-b pb-3 border-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" /> Frequently Asked Questions in {city.name}
                </h3>
                <div className="mt-6 space-y-4">
                  {city.faq.map((faq, i) => (
                    <div key={i} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5">
                      <h4 className="font-bold text-primary text-sm uppercase tracking-wide flex items-center gap-2">
                        <span className="text-accent text-lg font-black font-heading">Q:</span> {faq.q}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed pl-5 border-l-2 border-accent/40">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sticky Booking Panel */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                {/* Form automatically defaults to the active city in the dropdown */}
                <LeadForm />

                {/* ZIP Codes Served Badge */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mt-6 text-left shadow-sm">
                  <h4 className="font-bold text-primary font-heading text-sm uppercase tracking-wider mb-2">ZIP Codes We Service</h4>
                  <div className="flex flex-wrap gap-2">
                    {city.zips.map(zip => (
                      <span key={zip} className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-600 font-semibold shadow-xs">
                        {zip}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 border-t border-slate-200/60 pt-4 mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest justify-around">
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-accent" /> 40 yrs trust</span>
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-accent" /> Licensed &amp; Insured</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Link directory for surrounding cities */}
      <section className="py-16 bg-light-bg border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-left">
          <h3 className="text-xl font-bold font-heading text-primary uppercase tracking-wide mb-6">
            Other Wichita Area Cities We Serve
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {citiesData.filter(c => c.id !== cityId).slice(0, 8).map(c => (
              <Link 
                key={c.id} 
                to={`/cities/${c.id}`}
                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow hover:border-primary/20 transition flex justify-between items-center"
              >
                <span className="text-xs font-bold text-primary uppercase tracking-wide">{c.name}, KS</span>
                <ChevronRight className="w-4 h-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
export default CityDetail;
