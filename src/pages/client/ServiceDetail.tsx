import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../../data/seoData';
import { LeadForm } from '../../components/LeadForm';
import { 
  Wrench, Check, ShieldAlert, 
  HelpCircle, ChevronRight, ArrowLeft, Info
} from 'lucide-react';

export const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="py-20 text-center bg-slate-50 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold font-heading text-primary uppercase">Service Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">The appliance service page you are looking for does not exist.</p>
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
            Wichita Metro Service
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            {service.name} in Wichita, KS
          </h1>
          
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            Same-day diagnostic calls and professional repair for all major brands of <span className="font-semibold text-white">{service.name.replace(' Repair', '').toLowerCase()}s</span>. Backed by parts &amp; labor warranties.
          </p>
        </div>
      </section>

      {/* 2. Main Content & Booking Form Row */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: SEO Content & troubleshooting details */}
            <div className="lg:col-span-7 text-left space-y-10">
              
              {/* Detailed Description */}
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold font-heading text-primary uppercase tracking-wide border-b pb-3 border-slate-100 flex items-center gap-2">
                  <Wrench className="w-5.5 h-5.5 text-accent" /> Professional {service.name}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-4">
                  {service.fullDesc}
                </p>
              </div>

              {/* Symptoms we resolve */}
              <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl">
                <h3 className="text-lg font-bold font-heading text-primary uppercase tracking-wide mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-accent" /> Common Symptoms We Diagnose
                </h3>
                <p className="text-xs text-slate-500 mb-4">If you notice any of these signs, contact our Wichita dispatch line immediately:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  {service.symptoms.map((symp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      <span>{symp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips for homeowners */}
              <div>
                <h3 className="text-xl font-bold font-heading text-primary uppercase tracking-wide border-b pb-3 border-slate-100 flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" /> Maintenance Tips to Extend Lifespan
                </h3>
                <div className="mt-4 space-y-3">
                  {service.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                      <div className="w-6 h-6 bg-primary/5 text-primary rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion specific to this appliance */}
              <div>
                <h3 className="text-xl font-bold font-heading text-primary uppercase tracking-wide border-b pb-3 border-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" /> Frequently Asked Questions
                </h3>
                <div className="mt-6 space-y-4">
                  {service.faqs.map((faq, i) => (
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

            {/* Right Column: Sticky Booking Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <LeadForm />
                
                {/* Additional Trust Indicators */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mt-6 text-left space-y-4 shadow-sm">
                  <h4 className="font-bold text-primary font-heading text-sm uppercase tracking-wider">Rick's Same-Day Promise</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We schedule appliance service calls in 3-hour arrival windows, and our technicians will text you 30 minutes before arrival. We diagnose the issue honestly.
                  </p>
                  <div className="flex flex-col gap-2.5 pt-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 stroke-[2.5]" />
                      <span>$89 Diagnostic Fee (Waived on Repair)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 stroke-[2.5]" />
                      <span>90-Day Parts &amp; Labor Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 stroke-[2.5]" />
                      <span>Fully Stocked Service Vans</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Link back to other services directory */}
      <section className="py-16 bg-light-bg border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-left">
          <h3 className="text-xl font-bold font-heading text-primary uppercase tracking-wide mb-6">
            Other Services We Provide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {servicesData.filter(s => s.id !== serviceId).slice(0, 8).map(s => (
              <Link 
                key={s.id} 
                to={`/services/${s.id}`}
                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow hover:border-primary/20 transition flex justify-between items-center"
              >
                <span className="text-xs font-bold text-primary uppercase tracking-wide">{s.name}</span>
                <ChevronRight className="w-4 h-4 text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
export default ServiceDetail;
