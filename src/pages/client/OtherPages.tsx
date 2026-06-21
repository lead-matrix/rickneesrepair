import React, { useState } from 'react';
import { LeadForm } from '../../components/LeadForm';
import { brandsData } from '../../data/seoData';
import confetti from 'canvas-confetti';
import { 
  Phone, MapPin, Clock, Star, 
  HelpCircle, CheckCircle, Sparkles, CreditCard, 
  DollarSign, Send
} from 'lucide-react';

interface BookableProps {
  onBookClick: () => void;
}

// ==========================================
// 1. ABOUT US PAGE
// ==========================================
export const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-left">
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <span className="bg-accent/20 border border-accent/30 text-accent-light text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            About Rick Nees Appliance Repair
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            Serving Wichita, Kansas families with premium, honest home appliance service for over 40 years.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading text-primary uppercase">Four Decades of Trusted Service</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded in 1986 in Wichita, KS, Rick Nees Appliance Repair was established on a simple core principle: deliver honest diagnostic evaluations and premium-quality repairs at a fair price. 
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              What started as a single service van driving through Wichita has grown into a highly trusted team of technicians. Despite our growth, we remain a local, family-owned business. We treat our customers like neighbors, not invoice numbers.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <h4 className="text-2xl font-black text-accent font-heading">40+</h4>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Years in Business</p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-accent font-heading">15,000+</h4>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Appliances Fixed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-bold font-heading text-primary uppercase">Our Business Standards</h3>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary text-xs uppercase">Certified & Background Checked</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Every technician on our team is fully certified and undergoes complete screening.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary text-xs uppercase">Fully Licensed & Insured</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We maintain comprehensive liability and commercial insurance policies for your protection.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-primary text-xs uppercase">OEM Part Replacement Guarantee</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We use only original manufacturer components to ensure durability and match factory specs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// 2. FINANCING PAGE
// ==========================================
export const Financing: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-left">
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <span className="bg-accent/20 border border-accent/30 text-accent-light text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            Flexible Payments
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            Payment &amp; Financing Options
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            We offer transparent pricing, discounts, and flexible billing methods to make your home repairs stress-free.
          </p>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Flat Rate Diagnostics */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-heading text-primary uppercase">Flat-Rate Diagnostic Fee</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  We charge a straightforward flat-rate diagnostic fee of <span className="font-bold text-accent">$89</span> to inspect, run tests, and locate your appliance failure.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                Waived with Any Approved Repair
              </div>
            </div>

            {/* Credit Cards Accepted */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-heading text-primary uppercase">Major Payments Accepted</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  We accept cash, personal checks, Visa, MasterCard, Discover, and American Express. Payment is collected securely on-site by our technician.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                Secure Mobile Processing
              </div>
            </div>

            {/* Financing Programs */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-heading text-primary uppercase">Coupon Discounts</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  We offer $25 discounts on first-time repairs for new customers in Wichita, and additional discounts for senior citizens, veterans, and military families.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] text-accent font-extrabold uppercase tracking-wider">
                Ask Tech for Senior/Mil Discount
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// 3. BRANDS WE REPAIR PAGE
// ==========================================
export const BrandsWeRepair: React.FC<BookableProps> = ({ onBookClick }) => {
  return (
    <div className="bg-white min-h-screen text-left">
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <span className="bg-accent/20 border border-accent/30 text-accent-light text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            Full Coverage
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            Brands We Repair
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            We service all major domestic and luxury appliance brands. Our technicians carry specialized parts on their trucks.
          </p>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandsData.map(b => (
              <div key={b.name} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-soft flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-primary uppercase tracking-wide">{b.name}</h3>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{b.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-[10px] text-accent font-extrabold uppercase tracking-wide">Pro Tip:</div>
                  <p className="text-[11px] text-slate-600 italic mt-0.5">"{b.tip}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onBookClick}
              className="bg-accent hover:bg-accent-dark text-white font-heading text-lg font-bold tracking-wider py-4 px-8 rounded-xl shadow-lg hover:shadow-xl uppercase cursor-pointer"
            >
              Book Brand Diagnostics
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// 4. REVIEWS PAGE
// ==========================================
export const Reviews: React.FC = () => {
  const [allReviews, setAllReviews] = useState([
    { name: 'Marcus K.', city: 'Wichita', rating: 5, date: '2 days ago', text: 'My refrigerator stopped cooling on a Sunday morning. Called Rick Nees and they had John out by 1 PM. He diagnosed a failed relay, had the part on his truck, and fixed it in 30 minutes. Amazing service!' },
    { name: 'Sarah L.', city: 'Andover', rating: 5, date: '1 week ago', text: 'Our washer overflowed and soaked the laundry room. Dave arrived quickly, found a clogged drain pump, cleared it, and tested the machine. Very professional, honest, and reasonably priced. Will definitely use again.' },
    { name: 'David T.', city: 'Derby', rating: 5, date: '2 weeks ago', text: 'Mark repaired our Viking stove that wouldn\'t ignite. High-end appliance service is hard to find in the Wichita area, but these guys are true pros. Honest pricing and outstanding work.' },
    { name: 'Brenda M.', city: 'Maize', rating: 5, date: '3 weeks ago', text: 'Outstanding communication! I received a text showing the technician\'s face and name before arrival. John explained the control board issue clearly and did a great job repairing my dishwasher.' }
  ]);

  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('Wichita');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formText) return;

    const newRev = {
      name: formName,
      city: formCity,
      rating: formRating,
      date: 'Just now',
      text: formText
    };

    setAllReviews([newRev, ...allReviews]);
    setIsSubmitted(true);

    // Trigger confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0B2E59', '#D62828', '#FFFFFF']
    });

    // Reset Form
    setTimeout(() => {
      setFormName('');
      setFormText('');
      setFormRating(5);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen text-left">
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <span className="bg-accent/20 border border-accent/30 text-accent-light text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            Customer Feedback
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            Customer Reviews
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            Read verified reviews from local Wichita families or submit your own service feedback.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reviews List */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold font-heading text-primary uppercase border-b pb-3 mb-6">Verified Local Reviews</h2>
            
            <div className="space-y-6">
              {allReviews.map((rev, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-xs">
                  <div className="flex gap-1.5 text-yellow-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-none" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-4">"{rev.text}"</p>
                  <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-200/50">
                    <div>
                      <span className="font-bold text-slate-800 uppercase font-heading">{rev.name}</span>
                      <span className="ml-1 text-[11px]">({rev.city}, KS)</span>
                    </div>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Review Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-slate-100 rounded-3xl p-6 shadow-premium text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              
              <h3 className="text-xl font-bold font-heading text-primary uppercase mb-1">Leave A Review</h3>
              <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">
                Had service done recently? Share your experience with your neighbors.
              </p>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-green-600 bg-green-50/50 border border-green-100 rounded-2xl">
                  <CheckCircle className="w-10 h-10 mb-2" />
                  <h4 className="font-bold uppercase text-xs font-heading">Thank You!</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Your review has been successfully submitted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandra B."
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">City</label>
                    <select
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white"
                      value={formCity}
                      onChange={e => setFormCity(e.target.value)}
                    >
                      <option value="Wichita">Wichita</option>
                      <option value="Derby">Derby</option>
                      <option value="Andover">Andover</option>
                      <option value="Bel Aire">Bel Aire</option>
                      <option value="Maize">Maize</option>
                      <option value="Goddard">Goddard</option>
                      <option value="Haysville">Haysville</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rating</label>
                    <div className="flex gap-1.5 pt-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="cursor-pointer transition"
                        >
                          <Star className={`w-6 h-6 ${star <= formRating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Review Details</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the diagnostics and repair. Did the tech fix it quickly?"
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      value={formText}
                      onChange={e => setFormText(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-brand-dark text-white font-heading text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

// ==========================================
// 5. FAQ PAGE
// ==========================================
export const FAQ: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const faqsList = [
    { q: 'How much do you charge for a service call?', a: 'Our standard diagnostic trip fee is $89. This fee covers our technician\'s travel to your home and a thorough diagnostic testing phase. If you approve the repair, this fee is waived, and you only pay for parts and labor.' },
    { q: 'Can you complete repairs on the same day?', a: 'Yes! We carry a wide selection of common OEM replacement parts in our service vans (e.g. pumps, elements, thermostats). If a special part must be ordered, we expedite it to complete the fix ASAP.' },
    { q: 'Are your technicians insured?', a: 'Absolutely. Every technician at Rick Nees Appliance Repair is fully licensed, insured, and certified, protecting your home and appliances.' },
    { q: 'What brands do you service?', a: 'We service all major brands, including Samsung, Whirlpool, LG, GE, Maytag, Bosch, Frigidaire, Sub-Zero, and luxury brands like Viking, Wolf, JennAir, and Thermador.' },
    { q: 'Why is my refrigerator not cooling but the freezer is cold?', a: 'This is usually an airflow or defrost issue, commonly triggered by a failed evaporator fan or frozen coils. We can diagnose and fix this during a service call.' }
  ];

  const filteredFaqs = faqsList.filter(faq => 
    faq.q.toLowerCase().includes(search.toLowerCase()) || 
    faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen text-left">
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <span className="bg-accent/20 border border-accent/30 text-accent-light text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            Help Center
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            Find answers to common questions about diagnostic fees, repair scheduling, and brand services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Search bar */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft mb-8">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Search Questions</label>
            <input
              type="text"
              placeholder="Type keywords (e.g. washer, fee, same-day...)"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft">
                  <h4 className="font-bold text-primary font-heading text-sm uppercase tracking-wide flex items-center gap-1.5">
                    <HelpCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed pl-6 border-l-2 border-accent/40">
                    {faq.a}
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-soft">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold font-heading text-primary uppercase">No Results</h3>
                <p className="text-slate-500 text-xs mt-1">Try searching for other terms like "fee" or "warranty".</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// 6. CONTACT PAGE
// ==========================================
export const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-left">
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <span className="bg-accent/20 border border-accent/30 text-accent-light text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            Contact Our Dispatch Office
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            Call (316) 213-1874 for immediate diagnostic bookings or submit an online request below.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-6">
              <h3 className="text-xl font-bold font-heading text-primary uppercase border-b pb-3 border-slate-200">Office Info</h3>
              
              <div className="space-y-4">
                <a href="tel:3162131874" className="flex items-center gap-3 hover:text-primary transition text-slate-600">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-accent shadow-xs">
                    <Phone className="w-5 h-5 fill-accent" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-500 uppercase tracking-wide">Phone Number</p>
                    <p className="text-sm font-bold text-slate-800">(316) 213-1874</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-accent shadow-xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-500 uppercase tracking-wide">Hours of Operation</p>
                    <p className="text-slate-800 font-semibold">Mon - Sun: 7:00 AM - 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-accent shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-500 uppercase tracking-wide">Service Location</p>
                    <p className="text-slate-800 font-semibold">Wichita, KS &amp; Surrounding Areas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Maps Mock */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 shadow-xs">
              <div className="aspect-video w-full rounded-2xl bg-slate-200 overflow-hidden relative flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0B2E59_1px,transparent_1px)] [background-size:16px_16px]" />
                <MapPin className="w-10 h-10 text-accent animate-bounce mb-2" />
                <h4 className="font-bold text-primary uppercase text-sm">Wichita Dispatch Hub</h4>
                <p className="text-[10px] text-slate-500 max-w-xs mt-1">Providing same-day home appliance services to Sedgwick, Butler, and Harvey counties.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <LeadForm />
          </div>

        </div>
      </section>
    </div>
  );
};

// ==========================================
// 7. PRIVACY POLICY
// ==========================================
export const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-left py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-slate">
        <h1 className="text-3xl font-black font-heading uppercase text-primary border-b pb-3 mb-6">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: June 21, 2026</p>
        <p className="text-sm text-slate-600 leading-relaxed mt-4">
          At Rick Nees Appliance Repair, we value your privacy. This Privacy Policy describes how we collect, use, and share your personal information when you visit our website or book an appointment.
        </p>
        <h3 className="text-lg font-bold font-heading text-primary uppercase mt-6">Information We Collect</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          When you submit a service request, we collect your name, phone number, email address, physical address, and appliance information to book and perform the diagnostic service call.
        </p>
        <h3 className="text-lg font-bold font-heading text-primary uppercase mt-6">How We Use Information</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          We use your information exclusively to schedule appointments, dispatch technicians, send invoices, send status updates (via SMS and email), and request reviews after service completion.
        </p>
        <h3 className="text-lg font-bold font-heading text-primary uppercase mt-6">Data Security</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Your personal data is protected by encryption and secure database systems. We do not sell or share customer contact information with third-party advertisers.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 8. TERMS OF SERVICE
// ==========================================
export const Terms: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-left py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-slate">
        <h1 className="text-3xl font-black font-heading uppercase text-primary border-b pb-3 mb-6">Terms of Service</h1>
        <p className="text-xs text-slate-500">Effective Date: June 21, 2026</p>
        <h3 className="text-lg font-bold font-heading text-primary uppercase mt-6">Diagnostic Call Fees</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          We charge a flat-rate diagnostic fee of $89 for a technician to visit your home and evaluate your appliance. If you approve the suggested repair, this diagnostic fee is fully waived.
        </p>
        <h3 className="text-lg font-bold font-heading text-primary uppercase mt-6">Warranty &amp; Guarantees</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          All repairs are backed by our 90-day parts and labor warranty. If the same component fails within 90 days of the repair date, we will replace it at no charge.
        </p>
        <h3 className="text-lg font-bold font-heading text-primary uppercase mt-6">Appointment Cancellations</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          We ask that you cancel or reschedule your service call at least 2 hours before your scheduled arrival window to help us optimize routes for other customers.
        </p>
      </div>
    </div>
  );
};
